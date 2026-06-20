# Humana Legal — humanalegal.cl

Sitio del estudio jurídico de Tamara López G. (derecho público, migratorio y DDHH).
Port a **Astro** de la v1 vanilla (en `v1/`, hoy desplegada en tamaralopez.cl): mismo
diseño y copy, pero con el contenido es/en en una sola fuente y base para crecer
(blog, páginas por área).

**Decisiones vigentes (jun 2026):** dominio primario `www.humanalegal.cl` (tamaralopez.cl
y tamaralopezabogada.cl redirigen) · formulario con backend propio en el Linode
(`deploy/contact-api/`, sin Formspree) · identidad según `v1/humana-legal/brand/humana-legal.html`.

## Comandos

```sh
npm run dev      # dev server en localhost:4321
npm run build    # build estático en dist/
npx astro check  # chequeo de tipos
```

## Estructura

```
src/
├── config.ts              # contacto, URLs y Umami centralizados (TODOs viven aquí)
├── i18n/content.ts        # TODO el copy es/en — una sola fuente para ambas páginas
├── i18n/jsonld.ts         # Schema.org (LegalService + Person + WebSite + BlogPosting)
├── content.config.ts      # colección "blog" (glob loader, frontmatter es/en)
├── content/blog/          # artículos .md en es/ y en/ (ver CONTENIDO.md)
├── layouts/Base.astro     # head completo (SEO/OG/hreflang) — acepta props para el blog
├── layouts/BlogPost.astro # plantilla de artículo (reutiliza Base)
├── components/            # Nav, Hero, Marquee, Areas, Profile, Approach, Process, Contact, Footer, WaFloat, PostList
└── pages/                 # index.astro (es) · en/index.astro · blog/ · en/blog/ · sitemap.xml.ts
public/
├── assets/css/styles.css  # CSS de la v1, sin tocar (paleta Humana + Fraunces/Manrope)
├── assets/js/main.js      # JS de la v1; el form ahora envía a /api/contact
├── privacidad.html        # actualizada: formulario propio en vez de Formspree
├── en/privacy.html        # NUEVA — la v1 la enlazaba pero no existía
└── 404.html, robots.txt, imágenes   # (sitemap.xml ahora es dinámico: src/pages/sitemap.xml.ts)
deploy/
├── contact-api/           # backend del formulario: Python stdlib + systemd + env.example
├── nginx/                 # humanalegal.cl.conf (CSP sin Formspree, /api/contact activo) + staging
├── docker-compose.umami.yml
└── SECURITY.md
v1/                        # versión desplegada hoy en tamaralopez.cl (referencia, no editar)
```

## Checklist hacia el lanzamiento (juramento: 19-jun-2026)

- [x] **DNS `humanalegal.cl` → Linode (45.56.125.15)** — resuelto.
- [x] Contenido real de Tamara incorporado (`content.ts`, `jsonld.ts`); datos de
      contacto reales en `src/config.ts` (email `tamara@humanalegal.cl`, WhatsApp, LinkedIn).
- [ ] Certbot para los hostnames y activar `deploy/nginx/humanalegal.cl.conf`
      (tamaralopez.cl pasa a redirigir 301).
- [ ] Buzón `tamara@humanalegal.cl` (+ SPF/DKIM/DMARC) y un remitente SMTP para el handler.
- [ ] Instalar `deploy/contact-api/` (instrucciones en el .service) y probar el formulario.
- [ ] Calendly: `CAL_URL` en `public/assets/js/main.js` (opcional).
- [ ] Umami: desplegar compose, subdominio y completar `UMAMI` en `src/config.ts`
      (con valores vacíos el script no se emite).
- [ ] Deploy: `npm run build` y copiar `dist/` a `/var/www/humanalegal.cl/`.
- [ ] Post-lanzamiento: Search Console, Bing, Google Business Profile, post en LinkedIn.

Pendientes de contenido (con Tamara): **sesión de fotos** (la actual tiene +2 años),
revisar/regenerar `og-image.jpg` (puede tener texto viejo) y los favicons PNG, y
**revisar los borradores del blog** (`draft: true`) antes de publicarlos.

## Blog

Blog bilingüe con Astro content collections. Índices en `/blog/` y `/en/blog/`,
artículos en `src/content/blog/<es|en>/`, RSS en `/blog/rss.xml`, sitemap dinámico.
Los `.md` con `draft: true` se ven en `npm run dev` pero **no** se publican.
**Cómo escribir y publicar (incluye el flujo semanal con Claude): ver [CONTENIDO.md](CONTENIDO.md).**

## Exploraciones de diseño

En `explorations/opcion-b/` vive una **propuesta alternativa de marca** (junio 2026),
independiente del estudio de Humana Legal: marca personal "Tamara López G." con
estética de autoridad (Archivo expandida + Inter + IBM Plex Mono, grafito/cobalto).
Dos piezas autocontenidas, abribles directo en el navegador:

- `brand.html` — estudio de marca (concepto, identidad, paleta, tipografía, taglines, trade-offs vs Humana Legal)
- `index.html` — prototipo navegable de la página completa (ES)

Si esta opción gana, se porta al mismo proyecto Astro (el contenido ya está separado
del diseño en `src/i18n/content.ts`).

## Siguientes iteraciones

Blog (`/blog/`, `/en/blog/`), páginas por área, lead magnets, newsletter —
heredadas del plan de la v1, ahora baratas de hacer en Astro.
