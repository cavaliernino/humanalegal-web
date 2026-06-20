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

## Re-deploy de contenido (después de editar el sitio)

```bash
# En el Mac (repo tamaralopez-web):
npm run build
rsync -az --delete -e 'ssh -o BatchMode=yes' dist/ fuego:deploy/humanalegal.cl/
# En fuego:
sudo rsync -a --delete ~/deploy/humanalegal.cl/ /var/www/humanalegal.cl/
```
