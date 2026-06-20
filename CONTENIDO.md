# Guía de contenido del blog

Cómo publicar artículos en Humana Legal y cómo producir contenido semanal con ayuda de Claude.

---

## 1. Cómo funciona el blog (lo mínimo que hay que saber)

- Cada artículo es un archivo `.md` en `src/content/blog/<idioma>/<slug>.md`.
  - Español → `src/content/blog/es/`
  - Inglés → `src/content/blog/en/`
- El **slug** (la parte de la URL) sale del nombre del archivo. `mi-articulo.md` → `/blog/mi-articulo/`.
- Arriba de cada archivo va el "frontmatter" (los datos entre `---`):

```yaml
---
title: 'Título del artículo'
description: 'Resumen de 1-2 frases. Aparece en Google y en redes.'
pubDate: 2026-07-01
lang: es                 # es | en — debe coincidir con la carpeta
tags: ['Derecho migratorio', 'Residencias']
translationKey: mi-tema  # MISMO valor en la versión ES y EN para enlazarlas
draft: true              # true = NO se publica (solo se ve en desarrollo)
---
```

- **`draft: true` es la red de seguridad.** Un artículo en `draft` se ve al previsualizar localmente, pero **nunca** sale en el sitio publicado. Tamara debe revisar y recién entonces cambiarlo a `draft: false`.
- Para que el botón ES/EN enlace dos versiones del mismo artículo, ambas deben compartir el mismo `translationKey`. Si un artículo solo existe en español, no pasa nada: el botón de idioma lleva al índice del otro idioma.

## 2. Publicar un artículo, paso a paso

1. Crear el archivo en la carpeta del idioma (`es/` o `en/`).
2. Llenar el frontmatter y escribir el cuerpo en Markdown (`##` para subtítulos, `**negrita**`, listas con `-`, enlaces `[texto](url)`).
3. Previsualizar: `npm run dev` y abrir `http://localhost:4321/blog/`. **En desarrollo se ven también los drafts.**
4. Cuando Tamara lo apruebe, poner `draft: false`.
5. `npm run build` y desplegar (subir `dist/` al servidor). El sitemap y el RSS se actualizan solos.

## 3. Guardarraíles (importante, es el sitio de una abogada)

- **Todo artículo con contenido jurídico lo revisa Tamara antes de publicar.** Claude redacta borradores; la abogada valida y firma.
- **No inventar plazos, montos ni artículos de ley exactos.** Si no hay certeza, se escribe en general ("los plazos son acotados", "según el caso") y Tamara completa lo preciso.
- **Cada guía lleva el descargo** al final: *"Este artículo entrega información general y no constituye asesoría legal…"*. Ya viene en las plantillas.
- Tono: claro, humano, sin jerga. La idea es que un migrante angustiado entienda, no lucirse técnicamente.

## 4. Flujo semanal con Claude

La meta es **un artículo por semana**. Receta repetible:

1. **Elegir un tema** del backlog (sección 5) o uno que haya surgido de consultas reales de la semana.
2. **Pedirle el borrador a Claude.** Prompt sugerido:

   > "Escribe un borrador de artículo para el blog de Humana Legal sobre **[TEMA]**. Público: personas migrantes en Chile (y empresas, según el tema). Tono claro y humano, sin jerga. Estructura: introducción breve, 2-4 subtítulos con `##`, y cierre. No inventes plazos ni artículos de ley exactos: si hace falta un dato preciso, déjalo marcado como `[VERIFICAR: …]` para que Tamara lo complete. Crea el `.md` en `src/content/blog/es/` con `draft: true`, frontmatter completo y el descargo legal al final."

3. **Tamara revisa**: corrige lo jurídico, resuelve los `[VERIFICAR: …]`, ajusta el tono.
4. (Opcional) **Traducción**: "Traduce este artículo al inglés en `src/content/blog/en/` con el mismo `translationKey`."
5. Quitar `draft`, build y deploy.

Sugerencia de ritmo sostenible: que Claude deje **2-3 borradores adelantados** en la carpeta como `draft: true`; así Tamara revisa cuando puede y siempre hay cola publicable.

## 5. Backlog de temas (ideas para empezar)

Pensados para SEO migratorio y para las consultas más frecuentes:

- [ ] Reunificación familiar: guía paso a paso *(borrador ya creado)*
- [ ] Recibí una orden de expulsión: qué hacer *(borrador ya creado)*
- [ ] Tipos de residencia temporal y cuál me corresponde
- [ ] Residencia definitiva: cuándo se puede solicitar
- [ ] Nacionalización chilena: requisitos y mitos
- [ ] Visa por actividades remuneradas: lo que las empresas deben saber
- [ ] Qué hacer si rechazan o archivan tu solicitud
- [ ] Refugio en Chile: en qué consiste y a quién protege
- [ ] Multas por situación migratoria irregular: cómo se calculan y se reclaman
- [ ] Derechos de niños, niñas y adolescentes migrantes
- [ ] Contratar talento extranjero: guía para empresas e instituciones

> Los dos primeros ya existen como `draft: true` en `src/content/blog/`. Necesitan la revisión de Tamara (verificar normativa vigente) antes de quitarles el `draft`.
