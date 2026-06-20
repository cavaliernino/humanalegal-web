# Humana Legal — Sitio Web

Landing ejecutiva bilingüe (ES/EN) para Humana Legal, estudio jurídico fundado por Tamara Valeria López González. Servicios de derecho migratorio, derechos humanos y derecho administrativo.

**Tagline**: El derecho, más humano.
**Dominio**: humanalegal.cl (con redirects desde tamaralopez.cl y tamaralopezabogada.cl)
**Stack**: HTML/CSS/JS vanilla. Sin frameworks.
**Analítica**: Umami self-hosted, sin cookies, sin banner.
**Formulario**: Formspree (external).

---

## Desarrollo local

Los paths de CSS/JS son absolutos (`/assets/...`) porque así lo requiere producción. Para ver el sitio en tu máquina, **no se puede abrir el HTML con doble clic** — necesitás un servidor HTTP local que interprete esos paths correctamente.

```bash
# Opción más simple (viene con Python)
cd humana-legal
python3 -m http.server 8080

# O con Node
npx serve -p 8080

# O con el script incluido (detecta qué tenés disponible)
chmod +x serve.sh
./serve.sh
```

Luego abrí http://localhost:8080 y todo carga como corresponde.

Para VS Code: extensión **Live Server** de Ritwick Dey → click derecho sobre `index.html` → "Open with Live Server". Tiene hot reload.

---

## Estructura

```
humana-legal/
├── index.html                      # Landing ES (default)
├── en/index.html                   # Landing EN
├── assets/
│   ├── css/styles.css              # Paleta Humana + Fraunces/Manrope
│   ├── js/main.js                  # Formspree + honeypot
│   └── images/
│       ├── favicon.svg             # Monograma hl
│       ├── tamara.jpg              # Foto profesional (600×750)
│       └── og-image.jpg            # Open Graph (1200×630)
├── brand/humana-legal.html         # Exploración de marca (referencia)
├── sitemap.xml
├── robots.txt
├── 404.html
├── privacidad.html
├── nginx.conf                      # Producción (humanalegal.cl + redirects)
├── nginx-staging.conf              # Staging + reverse proxy Umami
├── docker-compose.umami.yml        # Umami self-hosted
├── SECURITY.md
└── README.md
```

---

## Placeholders a reemplazar antes de lanzamiento

| Placeholder | Reemplazar con |
|---|---|
| `contacto@humanalegal.cl` | email real (crear buzón en tu proveedor) |
| `+56 9 0000 0000` / `56900000000` | teléfono real |
| `https://www.linkedin.com/` | URL de LinkedIn de Tamara |
| `TU_FORM_ID` (main.js) | endpoint de Formspree |
| `umami.tudominio.cl` | subdominio real de Umami |
| `YOUR-UMAMI-WEBSITE-ID` | ID del sitio en el panel de Umami |

---

## Tareas pendientes (orden recomendado)

### Antes del lanzamiento

1. **Dominio + DNS**
   - [ ] Comprar en NIC Chile: `humanalegal.cl`, `tamaralopez.cl`, `tamaralopezabogada.cl`
   - [ ] Configurar registros A (y AAAA si IPv6) hacia el VPS Linode
   - [ ] Agregar registro CAA: `0 issue "letsencrypt.org"` (opcional, hardening)

2. **Email corporativo**
   - [ ] Crear buzón `contacto@humanalegal.cl` (Gmail Workspace, Zoho, o tu propio MTA)
   - [ ] Actualizar MX, SPF, DKIM, DMARC en DNS

3. **Marca INAPI**
   - [ ] Registrar "Humana Legal" en INAPI, clase 45 (servicios jurídicos)
   - [ ] Costo aproximado: $150.000 CLP, vigencia 10 años

4. **Formspree**
   - [ ] Crear cuenta en [formspree.io](https://formspree.io)
   - [ ] Crear formulario, copiar endpoint, reemplazar `TU_FORM_ID` en `main.js`
   - [ ] Configurar email de destino
   - [ ] Activar reCAPTCHA o hCaptcha

5. **Umami**
   - [ ] Subir `docker-compose.umami.yml` a `/opt/umami/docker-compose.yml`
   - [ ] Crear `.env` con `DB_PASSWORD` y `APP_SECRET`
   - [ ] DNS: `umami.tudominio.cl` → VPS
   - [ ] Activar bloque Umami de `nginx-staging.conf`
   - [ ] Certbot + login inicial + cambiar password
   - [ ] Crear sitio en panel, copiar website-id a ambos `index.html`

6. **Staging**
   - [ ] DNS: `staging.tudominio.cl` → VPS
   - [ ] `sudo htpasswd -c /etc/nginx/.htpasswd-staging tamara`
   - [ ] Desplegar en `/var/www/staging-humanalegal.cl/`
   - [ ] Compartir con Tamara para revisión

7. **Calendly**
   - [ ] Tamara crea cuenta y configura su disponibilidad
   - [ ] Copiar URL a `CAL_URL` en `main.js`

### Lanzamiento (post-jura, junio 2026)

Ver **SECURITY.md** para la guía completa de despliegue en producción.

1. Copiar archivos a `/var/www/humanalegal.cl/`
2. Activar `nginx.conf` para los tres dominios (humanalegal + redirects)
3. Certbot para los tres dominios de una vez:
   ```bash
   sudo certbot --nginx \
     -d humanalegal.cl -d www.humanalegal.cl \
     -d tamaralopez.cl -d www.tamaralopez.cl \
     -d tamaralopezabogada.cl -d www.tamaralopezabogada.cl
   ```
4. Validar: ssllabs.com/ssltest, securityheaders.com, pagespeed.web.dev

### Post-lanzamiento

- [ ] Google Search Console verificado (propiedad de dominio), sitemap subido
- [ ] Bing Webmaster Tools
- [ ] Google Business Profile (crítico para SEO local)
- [ ] Post de lanzamiento en LinkedIn

---

## Siguientes iteraciones

1. **Blog** en `/blog/` y `/en/blog/` — prioridad alta SEO
2. **Páginas dedicadas por área** (`/migratorio/`, `/ddhh/`, `/administrativo/`)
3. **Testimonios** con foto + nombre del cliente autorizado
4. **Lead magnets** (PDFs: "Guía para tramitar tu primera visa", etc.)
5. **Newsletter** con Buttondown

---

## Decisiones de diseño

- **Tipografía**: Fraunces (display serif variable editorial) + Manrope (sans humanista)
- **Paleta**: tinta #141414 · arcilla #7A2F2F · hueso cálido #F4EFE6 · crema #FDF9F0
- **Numeración**: romanos minúsculas en itálica (i. ii. iii.) para refuerzo editorial
- **Tratamiento de énfasis**: itálica arcilla en todos los titulares
- **Foto**: recortada a 4:5 con la cara en el tercio superior
- **Monograma**: `hl` en Fraunces con la `l` en itálica arcilla

---

## Licencia

Código a medida para Humana Legal — Tamara Valeria López González.
Uso no transferible.
