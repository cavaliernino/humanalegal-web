# Runbook de deploy — humanalegal.cl

Servidor: `fuego` (Linode, Tailscale `100.103.188.71`, público `45.56.125.15`).
Multi-sitio: contiene varios sitios de Nino, así que cada paso valida con `nginx -t`
antes de recargar. Los pasos con `sudo` los corre Nino (sudo pide contraseña).

**Estado de partida (preparado por Claude, sin sudo):**
- Build del sitio en `~/deploy/humanalegal.cl/` (19 archivos).
- Vhosts listos en `~/deploy/nginx/humanalegal.conf` y `~/deploy/nginx/ninoytami.conf`.
- Hoy: `ninoytami.cl` y `tamaralopez.cl` muestran la v1 desde el vhost `ninoytami`
  (root `/var/www/ninoytami.cl`). `humanalegal.cl` no tiene vhost ni certificado.

Plan: **Fase 1 (ahora)** deja humanalegal.cl live y redirige ninoytami.cl, dejando
tamaralopez.cl con la v1. **Fase 2 (19-jun)** flipea tamaralopez.cl. **Fase 3** activa
el formulario cuando exista el buzón.

---

## FASE 1 — humanalegal.cl live + ninoytami redirige (ahora)

```bash
# 1) Publicar el sitio
sudo mkdir -p /var/www/humanalegal.cl
sudo rsync -a --delete ~/deploy/humanalegal.cl/ /var/www/humanalegal.cl/

# 2) Instalar vhost del sitio nuevo (solo :80 por ahora)
sudo cp ~/deploy/nginx/humanalegal.conf /etc/nginx/sites-available/humanalegal
sudo ln -sf /etc/nginx/sites-available/humanalegal /etc/nginx/sites-enabled/humanalegal
sudo nginx -t && sudo systemctl reload nginx
#   verificar:  curl -I http://humanalegal.cl/   → 200 y sirve el sitio

# 3) Certificado + HTTPS para el sitio nuevo (certbot agrega el bloque :443)
sudo certbot --nginx -d humanalegal.cl -d www.humanalegal.cl
#   verificar:  https://www.humanalegal.cl  carga el sitio nuevo

# 4) Separar ninoytami (redirige) de tamaralopez (sigue con la v1)
sudo cp /etc/nginx/sites-available/ninoytami /etc/nginx/sites-available/ninoytami.bak   # backup
sudo cp ~/deploy/nginx/ninoytami.conf /etc/nginx/sites-available/ninoytami
sudo nginx -t && sudo systemctl reload nginx
```

**Verificación Fase 1:**
```bash
curl -sI https://www.humanalegal.cl/        | head -1   # 200
curl -sI https://ninoytami.cl/              | head -1   # 301 → www.humanalegal.cl
curl -sI https://tamaralopez.cl/            | head -1   # 200 (sigue la v1)
curl -s  https://www.humanalegal.cl/ | grep -o '<title>[^<]*'   # título nuevo
```

**Rollback Fase 1:**
```bash
sudo cp /etc/nginx/sites-available/ninoytami.bak /etc/nginx/sites-available/ninoytami
sudo rm -f /etc/nginx/sites-enabled/humanalegal
sudo nginx -t && sudo systemctl reload nginx
```

---

## FASE 2 — flip tamaralopez.cl → humanalegal.cl (día 19)

Editar `/etc/nginx/sites-available/ninoytami`:
- Comentar el bloque marcado **"SERVIR tamaralopez (v1)"**.
- Descomentar el bloque marcado **"REDIRECT tamaralopez"**.

```bash
sudo nginx -t && sudo systemctl reload nginx
curl -sI https://tamaralopez.cl/ | head -1   # ahora 301 → www.humanalegal.cl
```

---

## FASE 3 — formulario de contacto (cuando exista el buzón tamara@humanalegal.cl)

1. Crear el buzón y un remitente SMTP; configurar SPF/DKIM/DMARC en el DNS.
2. Montar el backend (ver `~/deploy/contact-api/` → instrucciones en el `.service`):
   editar `/etc/contact-api/env` con las credenciales SMTP, instalar y habilitar el servicio.
3. Definir la zona de rate-limit en el `http{}` de `/etc/nginx/nginx.conf`:
   `limit_req_zone $binary_remote_addr zone=contact:10m rate=5r/m;`
4. En `/etc/nginx/sites-available/humanalegal`, descomentar el bloque `location = /api/contact`.
5. `sudo nginx -t && sudo systemctl reload nginx` y probar el formulario.

> Hasta la Fase 3, el formulario usa su fallback: abre el cliente de correo
> con el mensaje prellenado hacia tamara@humanalegal.cl (no se pierde la consulta).

---

## Hardening — catch-all para hosts sin vhost (SEO/seguridad)

Evita que un dominio sin vhost propio reciba el contenido del primer vhost
(bozzialvarez). Verificado: no hay otro `default_server`, nginx 1.26.3 soporta
`ssl_reject_handshake`, `/var/www/html` existe.

```bash
sudo cp ~/deploy/nginx/000-default.conf /etc/nginx/sites-available/000-default
sudo ln -sf /etc/nginx/sites-available/000-default /etc/nginx/sites-enabled/000-default
sudo nginx -t && sudo systemctl reload nginx
```

**Verificación:**
```bash
# Dominios reales siguen OK
curl -sI https://www.humanalegal.cl/ | head -1     # 200
curl -sI https://bozzi.cl/           | head -1     # 200
curl -sI https://tamaralopez.cl/     | head -1     # 200 (v1, hasta el 19)
# Host desconocido ahora es rechazado (antes servía Bozzi)
curl -s -o /dev/null -w '%{http_code}\n' --resolve foo.invalid:80:45.56.125.15 http://foo.invalid/   # 000 (conexión cerrada / 444)
```

**Rollback:**
```bash
sudo rm -f /etc/nginx/sites-enabled/000-default
sudo nginx -t && sudo systemctl reload nginx
```

---

## Hardening — TLS 1.3 (nota A+ en SSL Labs)

SSL Labs daba **A-** con el aviso *"This server does not support TLS 1.3"*.

**Causa (no obvia):** el vhost de humanalegal SÍ pide `TLSv1.2 TLSv1.3` (vía
`include /etc/letsencrypt/options-ssl-nginx.conf`), pero en un socket `:443`
compartido por varios vhosts **el `default_server` fija las versiones de TLS de
todo el socket**. Nuestro `default_server` es `000-default`, que no declara
`ssl_protocols`, así que hereda el del bloque `http{}` de
`/etc/nginx/nginx.conf` — y en Debian/Ubuntu ese viene como
`TLSv1 TLSv1.1 TLSv1.2` (sin 1.3). nginx arranca el handshake en el contexto del
default y el callback SNI sólo puede *restringir* protocolos, nunca reactivar uno
ya deshabilitado: por eso TLS 1.3 quedaba apagado para todos los sitios del socket.

```bash
# 1) Diagnóstico: ver TODAS las líneas ssl_protocols efectivas y de dónde salen
sudo nginx -T 2>/dev/null | grep -n ssl_protocols
sudo grep -rn ssl_protocols /etc/nginx/ /etc/letsencrypt/
#   Culpable típico en /etc/nginx/nginx.conf (http{}):  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

# 2) Habilitar TLS 1.3 a nivel http{} (cubre el default_server y de paso
#    elimina TLS 1.0/1.1 obsoletos de todo el server)
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak
sudo sed -i -E 's/^([[:space:]]*)ssl_protocols .*/\1ssl_protocols TLSv1.2 TLSv1.3;/' /etc/nginx/nginx.conf

# 3) Validar y recargar
sudo nginx -t && sudo systemctl reload nginx
```

**Verificación:**
```bash
# TLS 1.3 ahora negocia → debe imprimir: New, TLSv1.3, Cipher is TLS_AES_256_GCM_SHA384
echo | openssl s_client -connect www.humanalegal.cl:443 -servername www.humanalegal.cl -tls1_3 2>/dev/null | grep "New,"
# TLS 1.2 sigue OK (compatibilidad)
echo | openssl s_client -connect www.humanalegal.cl:443 -servername www.humanalegal.cl -tls1_2 2>/dev/null | grep "New,"
# Redirect HTTP→HTTPS (apex y www) — ambos 301 a https://
curl -sI http://humanalegal.cl/     | grep -iE '^HTTP|^location'
curl -sI http://www.humanalegal.cl/ | grep -iE '^HTTP|^location'
```

Luego re-correr los tests **con caché limpia** (ambos sitios cachean resultados viejos):
- SSL Labs: `https://www.ssllabs.com/ssltest/analyze.html?d=www.humanalegal.cl&clearCache=on` → esperado **A+**
- Security Headers: re-enviar `https://www.humanalegal.cl` en https://securityheaders.com → esperado **A**

> **PQC** (*"does not support PQC key exchange"*): es informativo y **no baja la
> nota**. El intercambio post-cuántico (X25519MLKEM768) requiere OpenSSL 3.5+
> (abril 2025) enlazado con nginx; el OpenSSL del sistema (3.0.x) no lo trae.
> Omitir hasta actualizar el SO.

**Rollback:**
```bash
sudo cp /etc/nginx/nginx.conf.bak /etc/nginx/nginx.conf
sudo nginx -t && sudo systemctl reload nginx
```

---

## Re-deploy de contenido (después de editar el sitio)

**Vía principal: GitHub Actions.** `git push origin main` reconstruye y despliega
solo (workflow `Build & Deploy`, ~1-2 min). No requiere nada más.

**Fallback manual (solo si Actions está caído).** OJO: el usuario `deploy` de CI
es el dueño de `/var/www/humanalegal.cl`; un `sudo rsync -a` pelado preserva el
dueño de origen (nino) y **rompe los deploys de Actions siguientes** con
`Permission denied` (pasó el 8-ago-2026). Usar siempre `--chown`:

```bash
# En el Mac (repo tamaralopez-web):
npm run build
rsync -az --delete --exclude='.DS_Store' -e 'ssh -o BatchMode=yes' dist/ fuego:deploy/humanalegal.cl/
# En fuego:
sudo rsync -a --delete --chown=deploy:deploy ~/deploy/humanalegal.cl/ /var/www/humanalegal.cl/
```

**Si Actions falla con `Permission denied` / `failed to set times`** (dueño
pisado por un deploy manual antiguo), restaurar en fuego:

```bash
sudo chown -R deploy:deploy /var/www/humanalegal.cl
sudo find /var/www/humanalegal.cl -name .DS_Store -delete
```

y relanzar el workflow (*Actions → Build & Deploy → Re-run* o un push nuevo).
