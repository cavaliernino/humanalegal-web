import { getCollection } from 'astro:content';
import { SITE_URL } from '../config';

/*
 * Sitemap dinámico: se regenera en cada build incluyendo los artículos del blog
 * (excluye drafts). Evita tener que mantener un sitemap.xml estático a mano.
 */
interface Entry {
	loc: string;
	lastmod?: Date;
	priority: string;
}

export async function GET() {
	const posts = await getCollection('blog', (e) => !e.data.draft);

	const entries: Entry[] = [
		{ loc: `${SITE_URL}/`, priority: '1.0' },
		{ loc: `${SITE_URL}/en/`, priority: '0.9' },
		{ loc: `${SITE_URL}/blog/`, priority: '0.8' },
		{ loc: `${SITE_URL}/en/blog/`, priority: '0.7' },
		{ loc: `${SITE_URL}/privacidad.html`, priority: '0.3' },
		{ loc: `${SITE_URL}/en/privacy.html`, priority: '0.3' },
		...posts.map((post): Entry => {
			const base = post.data.lang === 'es' ? '' : '/en';
			const slug = post.id.replace(/^(es|en)\//, '');
			return {
				loc: `${SITE_URL}${base}/blog/${slug}/`,
				lastmod: post.data.updatedDate ?? post.data.pubDate,
				priority: '0.6',
			};
		}),
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		(e) =>
			`  <url>\n    <loc>${e.loc}</loc>${
				e.lastmod ? `\n    <lastmod>${e.lastmod.toISOString().slice(0, 10)}</lastmod>` : ''
			}\n    <priority>${e.priority}</priority>\n  </url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
}
