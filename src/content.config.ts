import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
 * Blog bilingüe. Los .md viven en src/content/blog/<es|en>/<slug>.md
 * El id queda como "es/mi-articulo"; el slug se deriva quitando ese prefijo.
 *
 * - lang: idioma del artículo (debe coincidir con la carpeta).
 * - translationKey: enlaza la versión ES y EN del mismo artículo (opcional).
 * - draft: true => visible en `npm run dev`, EXCLUIDO del build de producción.
 *   Úsalo para artículos pendientes de revisión de Tamara antes de publicar.
 */
const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		lang: z.enum(['es', 'en']),
		tags: z.array(z.string()).default([]),
		translationKey: z.string().optional(),
		draft: z.boolean().default(false),
		author: z.string().default('Tamara López González'),
	}),
});

export const collections = { blog };
