# Seguridad del Sitio en VPS Linode
## Guía de despliegue y endurecimiento

Esta guía cubre las medidas de seguridad recomendadas para desplegar el sitio de Tamara López G. en tu VPS Linode sin comprometer el resto de servicios que corres en él.

---

## 1. Principios generales

- **Menor privilegio**: el sitio corre como usuario no-root (`www-data`), sin acceso a otras rutas.
- **Aislamiento**: ejecutarlo en su propio vhost de nginx, idealmente dentro de un contenedor Docker si alojás múltiples proyectos.
- **Fail closed**: todo lo que no está explícitamente permitido, se rechaza.
- **Logs y monitoreo**: nada se da por seguro si no se observa.

---

## 2. Configuración a nivel de sistema (Ubuntu/Debian)

### 2.1 Actualizaciones automáticas

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install unattended-upgrades apt-listchanges -y
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

Editar `/etc/apt/apt.conf.d/50unattended-upgrades` para activar actualizaciones de seguridad automáticas.

### 2.2 Usuario SSH y bloqueo de root

```bash
# Crear usuario dedicado si no existe
sudo adduser tlopez
sudo usermod -aG sudo tlopez

# Copiar tu llave pública
sudo rsync --archive --chown=tlopez:tlopez ~/.ssh /home/tlopez
```

Editar `/etc/ssh/sshd_config`:

```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
Protocol 2
MaxAuthTries 3
LoginGraceTime 30
AllowUsers tlopez
X11Forwarding no
```

Reiniciar: `sudo systemctl restart sshd`

### 2.3 Firewall (UFW)

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp        # SSH (o el puerto que uses)
sudo ufw allow 80/tcp        # HTTP (solo para redirect)
sudo ufw allow 443/tcp       # HTTPS
sudo ufw enable
sudo ufw status verbose
```

Si cambiaste el puerto SSH, ajustá. Recomendado: mover SSH a un puerto no-estándar (ej. 2222) para reducir ruido en logs.

### 2.4 Fail2Ban

Bloquea automáticamente IPs con intentos maliciosos.

```bash
sudo apt install fail2ban -y
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

Editar `/etc/fail2ban/jail.local` y activar los jails `sshd`, `nginx-http-auth`, `nginx-limit-req`, `nginx-botsearch`, `nginx-badbots`.

```ini
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5
backend = systemd

[sshd]
enabled = true

[nginx-http-auth]
enabled = true

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
logpath = /var/log/nginx/*error.log

[nginx-botsearch]
enabled = true
```

Reiniciar: `sudo systemctl restart fail2ban`

---

## 3. Nginx

### 3.1 Instalación y setup básico

```bash
sudo apt install nginx -y
sudo systemctl enable nginx
```

### 3.2 Desplegar el sitio

```bash
# Crear directorio web
sudo mkdir -p /var/www/humanalegal.cl
sudo chown -R www-data:www-data /var/www/humanalegal.cl

# Subir archivos (desde tu máquina, reemplazar TU_VPS_IP)
# rsync -avz --delete ./tamara-lopez/ tlopez@TU_VPS_IP:/tmp/site/
# sudo rsync -avz /tmp/site/ /var/www/humanalegal.cl/
# sudo chown -R www-data:www-data /var/www/humanalegal.cl

# Copiar configuración de vhost
sudo cp nginx.conf /etc/nginx/sites-available/humanalegal.cl
sudo ln -s /etc/nginx/sites-available/humanalegal.cl /etc/nginx/sites-enabled/

# Agregar zonas de rate limit en /etc/nginx/nginx.conf (dentro de http{})
# Probar configuración
sudo nginx -t
sudo systemctl reload nginx
```

### 3.3 HTTPS con Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado
sudo certbot --nginx -d humanalegal.cl -d www.humanalegal.cl \
    --email contacto@humanalegal.cl --agree-tos --no-eff-email --redirect

# Renovación automática (ya viene con certbot; verificar)
sudo systemctl status certbot.timer
```

### 3.4 Headers y Rate limiting

Ya vienen definidos en `nginx.conf`. Verificar con:

```bash
curl -I https://www.humanalegal.cl
```

Debe mostrar: `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Content-Security-Policy`, etc.

Probar la calidad TLS en: https://www.ssllabs.com/ssltest/analyze.html?d=humanalegal.cl (buscar calificación A+).

Probar headers en: https://securityheaders.com/?q=humanalegal.cl

### 3.5 ModSecurity (WAF opcional pero recomendado)

```bash
sudo apt install libnginx-mod-http-modsecurity -y
sudo mkdir /etc/nginx/modsec
sudo wget -P /etc/nginx/modsec/ https://raw.githubusercontent.com/SpiderLabs/ModSecurity/v3/master/modsecurity.conf-recommended
sudo mv /etc/nginx/modsec/modsecurity.conf-recommended /etc/nginx/modsec/modsecurity.conf
```

Y OWASP CRS (Core Rule Set):

```bash
cd /etc/nginx/modsec/
sudo git clone https://github.com/coreruleset/coreruleset.git
sudo cp coreruleset/crs-setup.conf.example coreruleset/crs-setup.conf
```

Incluir en `nginx.conf` server block:

```
modsecurity on;
modsecurity_rules_file /etc/nginx/modsec/modsecurity.conf;
```

---

## 4. Formulario de contacto — Backend seguro

Tenés varias opciones. La más simple y segura para empezar:

### Opción A — Servicio externo (más simple, 0 mantenimiento)

Usar **Formspree**, **FormSubmit** o **Basin** como endpoint. Cambiás la línea en `main.js`:

```js
const res = await fetch('https://formspree.io/f/TU_FORM_ID', { ... });
```

No corrés servidor, no tenés superficie de ataque.

### Opción B — Backend propio en el VPS

Crear un pequeño servicio Node.js aislado:

```bash
sudo useradd -r -s /bin/false tlopez-api
sudo mkdir -p /opt/tlopez-api
sudo chown tlopez-api:tlopez-api /opt/tlopez-api
```

Dentro, un `server.js` mínimo con Express que:
- Reciba POST /api/contact
- Valide con `express-validator`
- Rate-limit por IP (`express-rate-limit`)
- Use `helmet` para headers
- Envíe email con Nodemailer via SMTP autenticado (no sendmail local)
- NUNCA loguee el cuerpo completo del mensaje (secreto profesional)

Correrlo con systemd como usuario `tlopez-api`. Exponer solo en 127.0.0.1:3000 y que nginx haga proxy. Activar el `upstream` y `proxy_pass` en `nginx.conf`.

### Opción C — Sin backend, mailto fallback (ya implementado)

El JS actual, si falla el POST a `/api/contact`, abre el cliente de mail del usuario con el mensaje pre-completado. Es la opción más simple si recién empezás.

---

## 5. Protección del resto de tu VPS

Como tenés otros servicios en el mismo Linode:

### 5.1 Aislamiento por vhost

Cada sitio debe estar en su propio bloque `server` con su propio `root`. El de Tamara no ve los otros. Nunca pongas los proyectos dentro del mismo directorio raíz.

### 5.2 Contenedores Docker (muy recomendado)

Si es viable, meter el sitio (y el backend si lo hay) en contenedores Docker. Aunque sea estático, el aislamiento te da tranquilidad. Podés usar `docker compose` con una imagen de nginx-alpine y montar el directorio como volumen read-only:

```yaml
services:
  tlopez-web:
    image: nginx:alpine
    restart: unless-stopped
    volumes:
      - ./tamara-lopez:/usr/share/nginx/html:ro
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    ports:
      - "127.0.0.1:8081:80"
    read_only: true
    tmpfs:
      - /var/cache/nginx
      - /var/run
    security_opt:
      - no-new-privileges:true
    cap_drop: [ALL]
    cap_add: [CHOWN, SETGID, SETUID, NET_BIND_SERVICE]
```

Y nginx del host hace proxy a 127.0.0.1:8081. Tres capas de aislamiento.

### 5.3 Logs centralizados y rotación

```bash
sudo apt install logrotate -y
```

Configurar `/etc/logrotate.d/nginx` para rotar cada semana, comprimir y guardar 12 semanas.

### 5.4 Backups

- Snapshot de Linode semanal (pagado, ~$2/mes).
- Dump diario del directorio del sitio a otro storage:

```bash
# /etc/cron.daily/backup-tlopez
#!/bin/bash
tar czf /backups/tlopez-$(date +\%Y\%m\%d).tar.gz /var/www/humanalegal.cl
find /backups -name "tlopez-*.tar.gz" -mtime +30 -delete
```

### 5.5 Monitoreo

- **UptimeRobot** (gratis) para avisarte si el sitio cae.
- **Linode Longview** (gratis en tier base) para métricas del VPS.
- Revisar `/var/log/nginx/humanalegal.error.log` y `/var/log/fail2ban.log` semanalmente los primeros meses.

---

## 6. Checklist de lanzamiento

Antes de apuntar el dominio:

- [ ] DNS apuntando al VPS (A + AAAA records, CAA record opcional)
- [ ] Certificado SSL válido y auto-renovando
- [ ] Redirect HTTP → HTTPS funcionando
- [ ] Redirect apex → www funcionando (o al revés, pero consistente)
- [ ] `curl -I` muestra todos los security headers
- [ ] SSL Labs: A+ rating
- [ ] Security Headers: A
- [ ] Formulario enviando (con honeypot activo)
- [ ] `robots.txt` y `sitemap.xml` accesibles
- [ ] Google Search Console verificado (subir sitemap)
- [ ] Google Analytics / Plausible / Umami instalado (opcional)
- [ ] Fail2Ban activo con jails relevantes
- [ ] UFW activo con solo 22, 80, 443
- [ ] Unattended-upgrades corriendo
- [ ] Backup programado y verificado
- [ ] Página de privacidad linkeada en el footer
- [ ] Schema.org LegalService validado en https://validator.schema.org/
- [ ] PageSpeed Insights > 90 móvil y desktop

---

## 7. Tras el lanzamiento

### 7.1 Google Search Console
1. Propiedad: `www.humanalegal.cl` (dominio completo)
2. Verificación por archivo HTML o registro TXT en DNS
3. Subir `https://www.humanalegal.cl/sitemap.xml`

### 7.2 Perfil de Google Business
Crítico para SEO local. Crear perfil con:
- Categoría: "Abogado / Bufete de abogados"
- Dirección (o "atiende en el domicilio del cliente" si no querés publicar la oficina en casa)
- Áreas de servicio: Santiago, Valparaíso, Viña del Mar
- Horario
- Enlace al sitio

### 7.3 Bing Webmaster Tools
Complementa Google, 10% del mercado.

### 7.4 Directorios jurídicos
- Abogados.cl, Find A Lawyer, LinkedIn, Justia.
- Backlinks naturales de universidades o de clínicas donde haya colaborado.

---

## 8. Mantenimiento mensual (15 min)

1. `sudo apt update && sudo apt upgrade -y`
2. Revisar `fail2ban-client status` (IPs banneadas)
3. Revisar `access.log` para picos anómalos
4. Verificar que el certificado no esté próximo a expirar (`sudo certbot certificates`)
5. Confirmar backups existen y son restaurables
6. Revisar Google Search Console por errores de rastreo

---

**En caso de incidente**: Desactivá el sitio vía firewall (`sudo ufw deny 443`), preservá logs, revertí al último backup limpio, rotá secretos (API keys, SMTP, SSH), e informá a Tamara si hay sospecha de fuga de datos de clientes (obligación legal bajo Ley 19.628).
