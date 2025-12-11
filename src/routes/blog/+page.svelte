<script lang="ts">
	import type { Post } from '$lib/types';

	let { data } = $props();
	const posts: Post[] = data.posts;

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).toUpperCase();
	}
</script>

<svelte:head>
	<title>Blog</title>
	<meta name="description" content="Blog posts about technology, projects, and thoughts." />
</svelte:head>

<div class="page-container">
	<div class="main-frame">
		<!-- Top Bar -->
		<div class="top-bar">
			<span>&lt;&lt;&lt;</span>
			<span>BLOG ARCHIVE</span>
			<span>&gt;&gt;&gt;</span>
		</div>

		<!-- Header -->
		<div class="header-row">
			<a href="/" class="back-link">← RETURN TO HOME</a>
			<span class="header-title">BLOG POSTS</span>
		</div>

		<!-- Main Content -->
		<div class="content-area">
			<div class="page-header">
				<div class="header-label">[ BLOG ]</div>
				<h1 class="page-title">Blog Posts</h1>
				<p class="page-desc">Thoughts, tutorials, and updates from the field.</p>
			</div>

			<div class="posts-list">
				{#each posts as post, i}
					<a href="/blog/{post.slug}" class="post-item">
						<div class="post-index">{String(i + 1).padStart(2, '0')}</div>
						<div class="post-content">
							<div class="post-meta">
								<span class="post-date">{formatDate(post.date)}</span>
								<span class="post-divider">/</span>
								<span class="post-tags">
									{#each post.tags as tag, j}
										{tag}{j < post.tags.length - 1 ? ', ' : ''}
									{/each}
								</span>
							</div>
							<h2 class="post-title">{post.title}</h2>
							<p class="post-desc">{post.description}</p>
						</div>
						<div class="post-arrow">→</div>
					</a>
				{/each}

				{#if posts.length === 0}
					<div class="empty-state">
						<span>NO TRANSMISSIONS AVAILABLE</span>
						<span class="blink">_</span>
					</div>
				{/if}
			</div>
		</div>

		<!-- Footer -->
		<div class="footer-bar">
			<span>END OF BLOG ARCHIVE</span>
		</div>
	</div>
</div>

<style>
	.page-container {
		min-height: 100vh;
		background-color: var(--color-cream);
		display: flex;
		justify-content: center;
		padding: 1.5rem;
	}

	.main-frame {
		width: 100%;
		max-width: 900px;
		border: 1px solid var(--color-dark);
		background-color: var(--color-cream);
	}

	.top-bar {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 1rem;
		border-bottom: 1px solid var(--color-dark);
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.05em;
	}

	.header-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--color-dark);
		font-family: var(--font-mono);
		font-size: 0.8rem;
	}

	.back-link {
		opacity: 1.0;
		transition: opacity 0.2s;
	}

	.back-link:hover {
		opacity: 1;
	}

	.header-title {
		opacity: 1.0;
	}

	.content-area {
		padding: 2rem 1.5rem;
	}

	.page-header {
		margin-bottom: 2.5rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}

	.header-label {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		letter-spacing: 0.1em;
		opacity: 1.0;
		margin-bottom: 0.75rem;
	}

	.page-title {
		font-family: var(--font-serif);
		font-size: 3rem;
		margin-bottom: 0.75rem;
		font-weight: bold;
	}

	.page-desc {
		font-size: 0.95rem;
		opacity: 0.9;
		max-width: 400px;
	}

	.posts-list {
		display: flex;
		flex-direction: column;
	}

	.post-item {
		display: grid;
		grid-template-columns: 40px 1fr 30px;
		gap: 1rem;
		padding: 1.25rem 0;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		align-items: start;
		transition: background-color 0.2s;
	}

	.post-item:hover {
		background-color: rgba(0,0,0,0.02);
		margin: 0 -1rem;
		padding-left: 1rem;
		padding-right: 1rem;
	}

	.post-item:hover .post-title {
		color: var(--color-accent);
	}

	.post-item:hover .post-arrow {
		opacity: 1;
	}

	.post-index {
		font-family: var(--font-mono);
		font-size: 1rem;
		opacity: 0.9;
		padding-top: 0.25rem;
	}

	.post-meta {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		opacity: 0.9;
		margin-bottom: 0.5rem;
		display: flex;
		gap: 0.5rem;
	}

	.post-divider {
		opacity: 0.3;
	}

	.post-title {
		font-family: var(--font-serif);
		font-size: 1.4rem;
		margin-bottom: 0.5rem;
		transition: color 0.2s;
		font-weight: bold;
	}

	.post-desc {
		font-size: 0.9rem;
		opacity: 0.9;
		line-height: 1.5;
	}

	.post-arrow {
		font-family: var(--font-mono);
		opacity: 0.9;
		padding-top: 0.25rem;
		transition: opacity 0.2s;
	}

	.empty-state {
		text-align: center;
		padding: 3rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		opacity: 0.9;
	}

	.blink {
		animation: blink 1s infinite;
	}

	@keyframes blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0; }
	}

	.footer-bar {
		padding: 0.75rem 1rem;
		text-align: center;
		font-family: var(--font-mono);
		font-size: 0.65rem;
		border-top: 1px solid var(--color-dark);
		opacity: 0.9;
	}

	@media (max-width: 600px) {
		.top-bar {
			flex-direction: column;
			gap: 0.25rem;
			text-align: center;
		}

		.post-item {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}

		.post-index,
		.post-arrow {
			display: none;
		}
	}
</style>
