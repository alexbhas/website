import { error } from '@sveltejs/kit';
import type { Post } from '$lib/types';

export async function load({ params }) {
	try {
		const post = await import(`../../../content/posts/${params.slug}.svx`);

		return {
			content: post.default,
			meta: post.metadata as Post
		};
	} catch {
		throw error(404, `Post not found: ${params.slug}`);
	}
}
