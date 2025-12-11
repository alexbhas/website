export interface Post {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	published: boolean;
}

export interface PostModule {
	metadata: Post;
	default: ConstructorOfATypedSvelteComponent;
}
