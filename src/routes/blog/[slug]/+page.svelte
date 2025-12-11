<script lang="ts">
	import type { Post } from '$lib/types';

	let { data } = $props();

	const Content = data.content;
	const meta: Post = data.meta;

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).toUpperCase();
	}
</script>

<svelte:head>
	<title>{meta.title} — Blog</title>
	<meta name="description" content={meta.description} />
</svelte:head>

<div class="page-container">
	<div class="main-frame">
		<!-- Top Bar -->
		<div class="top-bar">
			<span>&lt;&lt;&lt;</span>
			<span>{formatDate(meta.date)}</span>
			<span>&gt;&gt;&gt;</span>
		</div>

		<!-- Header -->
		<div class="header-row">
			<a href="/blog" class="back-link">← RETURN TO ARCHIVE</a>
			<span class="header-title">BLOG POST</span>
		</div>

		<!-- Article -->
		<article class="article-container">
			<!-- Post Header -->
			<header class="article-header">
				<div class="meta-row">
					<span class="meta-date">{formatDate(meta.date)}</span>
					<span class="meta-divider">/</span>
					<span class="meta-tags">
						{#each meta.tags as tag, i}
							{tag.toUpperCase()}{i < meta.tags.length - 1 ? ' · ' : ''}
						{/each}
					</span>
				</div>
				<h1 class="article-title">{meta.title}</h1>
				<p class="article-desc">{meta.description}</p>
			</header>

			<!-- Divider -->
			<div class="article-divider">
				<span class="divider-line"></span>
				<span class="divider-text">BEGIN BLOG POST</span>
				<span class="divider-line"></span>
			</div>

			<!-- Content -->
			<div class="prose">
				<Content />
			</div>

			<!-- End Divider -->
			<div class="article-divider">
				<span class="divider-line"></span>
				<span class="divider-text">END BLOG POST</span>
				<span class="divider-line"></span>
			</div>
		</article>

		<!-- Footer -->
		<div class="footer-row">
			<a href="/blog" class="back-link">← RETURN TO ARCHIVE </a>
			<span class="footer-text">SIGTERM</span>
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
		opacity: 1;
		transition: opacity 0.2s;
	}

	.back-link:hover {
		opacity: 1;
	}

	.header-title {
		opacity: 1;
	}

	.article-container {
		padding: 2rem 1.5rem;
	}

	.article-header {
		margin-bottom: 2rem;
	}

	.meta-row {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		opacity: 0.9;
		margin-bottom: 1rem;
		display: flex;
		gap: 0.5rem;
	}

	.meta-divider {
		opacity: 0.3;
	}

	.article-title {
		font-family: var(--font-serif);
		font-size: 2.5rem;
		line-height: 1.1;
		margin-bottom: 1rem;
		font-weight: bold;
	}

	.article-desc {
		font-size: 1.1rem;
		opacity: 0.9;
		line-height: 1.5;
	}

	.article-divider {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: 2rem 0;
	}

	.divider-line {
		flex: 1;
		height: 1px;
		background-color: var(--color-dark);
		opacity: 0.7;
	}

	.divider-text {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		letter-spacing: 0.1em;
		opacity: 0.7;
	}

	.footer-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		border-top: 1px solid var(--color-dark);
		font-family: var(--font-mono);
		font-size: 0.8rem;
	}

	.footer-text {
		opacity: 1.0;
	}

	/* Prose Styles */
	.prose {
		font-size: 0.95rem;
		line-height: 1.75;
	}

	.prose :global(h1),
	.prose :global(h2),
	.prose :global(h3),
	.prose :global(h4) {
		font-family: var(--font-serif);
		margin-top: 2.5rem;
		margin-bottom: 1rem;
		line-height: 1.2;
	}

	.prose :global(h1) {
		font-size: 2rem;
	}

	.prose :global(h2) {
		font-size: 1.5rem;
	}

	.prose :global(h3) {
		font-size: 1.25rem;
	}

	.prose :global(p) {
		margin-bottom: 1.5rem;
		opacity: 1.0;
	}

	.prose :global(ul),
	.prose :global(ol) {
		margin-bottom: 1.5rem;
		padding-left: 1.5rem;
	}

	.prose :global(li) {
		margin-bottom: 0.5rem;
		opacity: 1.0;
	}

	.prose :global(ul) {
		list-style-type: disc;
	}

	.prose :global(ol) {
		list-style-type: decimal;
	}

	.prose :global(strong) {
		font-weight: 600;
	}

	.prose :global(a) {
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.prose :global(a:hover) {
		opacity: 1;
	}

	.prose :global(pre) {
		background-color: var(--color-dark);
		color: var(--color-cream);
		padding: 1.25rem;
		overflow-x: auto;
		margin-bottom: 1.5rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		line-height: 1.6;
		border: 1px solid var(--color-dark);
	}

	.prose :global(code) {
		font-family: var(--font-mono);
		font-size: 0.85em;
	}

	.prose :global(:not(pre) > code) {
		background-color: var(--color-dark);
		color: var(--color-cream);
		padding: 0.15em 0.35em;
	}

	.prose :global(blockquote) {
		border-left: 2px solid var(--color-accent);
		padding-left: 1rem;
		margin: 1.5rem 0;
		font-style: italic;
		opacity: 1;
	}

	.prose :global(hr) {
		border: none;
		border-top: 1px solid var(--color-dark);
		opacity: 0.5;
		margin: 2rem 0;
	}

	@media (max-width: 600px) {
		.top-bar {
			flex-direction: column;
			gap: 0.25rem;
			text-align: center;
		}

		.article-title {
			font-size: 2rem;
		}
	}
</style>
