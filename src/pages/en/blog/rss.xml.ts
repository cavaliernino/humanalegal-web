import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_URL } from '../../../config';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
	const posts = (
		await getCollection('blog', (e) => e.data.lang === 'en' && !e.data.draft)
	).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	return rss({
		title: 'Humana Legal — Blog',
		description: 'Articles and guides on immigration and human rights law in Chile.',
		site: context.site ?? SITE_URL,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/en/blog/${post.id.replace(/^en\//, '')}/`,
		})),
		customData: '<language>en</language>',
	});
}
