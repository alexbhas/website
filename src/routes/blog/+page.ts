import type { Post } from '$lib/types';

export async function load() {
	const posts: Post[] = [];

	const paths = import.meta.glob('/src/content/posts/*.svx', { eager: true });

	for (const path in paths) {
		const file = paths[path] as { metadata: Post };
		const slug = path.split('/').pop()?.replace('.svx', '') ?? '';

		if (file.metadata.published) {
			posts.push({
				...file.metadata,
				slug
			});
		}
	}

	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return { posts };
}
