import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_URL } from '../../config';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
	const posts = (
		await getCollection('blog', (e) => e.data.lang === 'es' && !e.data.draft)
	).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	return rss({
		title: 'Humana Legal — Blog',
		description:
			'Artículos y guías sobre derecho migratorio y derechos humanos en Chile.',
		site: context.site ?? SITE_URL,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id.replace(/^es\//, '')}/`,
		})),
		customData: '<language>es-CL</language>',
	});
}
