# CMS web (Sveltia) — puesta en marcha

Editor en `https://www.humanalegal.cl/admin/` para que **Tamara escriba, edite y
publique sola** desde el navegador. Arquitectura elegida: **GitHub + Cloudflare + GitHub Actions**.

```
Tamara → /admin (Sveltia)  ──commit──▶  repo GitHub (main)
                                            │  push
                                            ▼
                                   GitHub Actions: npm build
                                            │  rsync (SSH)
                                            ▼
                                   fuego:/var/www/humanalegal.cl
```

Piezas ya creadas en el repo (no tienes que tocarlas):
- `public/admin/index.html` + `public/admin/config.yml` — el editor y su configuración (2 colecciones: Blog ES / Blog EN, con todos los campos del frontmatter).
- `.github/workflows/deploy.yml` — build + deploy a fuego en cada push a `main`.
- `public/assets/images/blog/` — destino de las imágenes que suba Tamara.

---

## Setup (una sola vez)

### 1. Repo en GitHub
```bash
cd ~/dev/tamaralopez-web
git add -A && git commit -m "Sitio Humana Legal + CMS"     # primer commit
# crear repo PRIVADO "humanalegal-web" en github.com, luego:
git remote add origin git@github.com:TU_USUARIO/humanalegal-web.git
git push -u origin main
```

### 2. GitHub OAuth App (login del CMS)
GitHub → *Settings → Developer settings → OAuth Apps → New OAuth App*:
- **Homepage URL:** `https://www.humanalegal.cl`
- **Authorization callback URL:** `https://TU-WORKER.workers.dev/callback` (la del paso 3)
- Guardar y anotar **Client ID** y generar un **Client Secret**.

### 3. Cloudflare Worker (intermediario OAuth)
Es el que intercambia el código por un token usando el secret (no puede ir en el repo).
- Desplegar el worker **`sveltia/sveltia-cms-auth`** (cuenta Cloudflare gratis; instrucciones en su repo).
- Variables del worker: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `ALLOWED_DOMAINS = www.humanalegal.cl`.
- Anotar la URL del worker (ej. `https://humanalegal-auth.tucuenta.workers.dev`).

### 4. Completar `public/admin/config.yml`
- `backend.repo:` → `TU_USUARIO/humanalegal-web`
- `backend.base_url:` → la URL del worker del paso 3
- commit + push.

### 5. Usuario de deploy en fuego (recomendado por seguridad)
Para que GitHub Actions copie el sitio sin usar tu usuario (que tiene acceso total):
```bash
# en fuego:
sudo adduser --disabled-password --gecos "" deploy
sudo chown -R deploy:deploy /var/www/humanalegal.cl
sudo -u deploy ssh-keygen -t ed25519 -f /home/deploy/.ssh/id_deploy -N ""
sudo -u deploy bash -c 'cat /home/deploy/.ssh/id_deploy.pub >> /home/deploy/.ssh/authorized_keys'
sudo cat /home/deploy/.ssh/id_deploy        # <-- la CLAVE PRIVADA para el secret de GitHub
```
(Alternativa rápida y menos segura: usar tu usuario `nino` y `sudo chown -R nino /var/www/humanalegal.cl`.)

### 6. Secrets en GitHub (repo → Settings → Secrets and variables → Actions)
- `DEPLOY_SSH_KEY` → la clave privada del paso 5 (contenido completo).
- `DEPLOY_HOST` → `45.56.125.15`
- `DEPLOY_USER` → `deploy` (o `nino`)
- `DEPLOY_PATH` → `/var/www/humanalegal.cl`

### 7. Primer deploy + acceso de Tamara
- Push a `main` (o *Actions → Build & Deploy → Run workflow*) y revisar que el job quede verde.
- Crear/usar una cuenta GitHub para **Tamara** y agregarla como **colaboradora con permiso de escritura** al repo (así el CMS guarda como ella).
- Tamara entra a `https://www.humanalegal.cl/admin/`, inicia sesión con GitHub y listo.

---

## Uso diario (Tamara)
1. Entrar a `/admin/` → *Iniciar sesión con GitHub*.
2. *Blog · Español* (o *English*) → **New** o abrir uno existente.
3. Escribir, subir imágenes, completar fecha/etiquetas.
4. **Borrador activado** = no se publica; **desactivado** = se publica.
5. **Save/Publish**: confirma → commitea → GitHub Actions reconstruye y despliega solo (1–2 min).

> Para enlazar un artículo ES con su versión EN, ponles la **misma "clave de traducción"**.

---

## Notas
- **Seguridad:** `/admin` es solo estático (sin secretos) y ya está en `Disallow` de robots.txt + `noindex`. El secret de OAuth vive en Cloudflare; la clave de deploy, en los Secrets de GitHub.
- **Imágenes:** se guardan en `public/assets/images/blog/` y se sirven desde `/assets/images/blog/...`.
- **Borradores existentes:** los `.md` con `draft: true` aparecen en el CMS para que Tamara los termine (reunificación, expulsión, niñez ES/EN, contratar).
- **Fallback:** el deploy manual (`npm run build` + rsync, ver RUNBOOK) sigue funcionando; una vez activo el CI, GitHub Actions pasa a ser la vía principal.
