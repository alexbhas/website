<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		class: className = '',
		label = ''
	}: {
		children: Snippet;
		class?: string;
		label?: string;
	} = $props();
</script>

<div class="tactical-box {className}">
	{#if label}
		<div class="tactical-label font-mono text-xs tracking-wider opacity-60 mb-2">
			{label}
		</div>
	{/if}
	<div class="tactical-content">
		{@render children()}
	</div>
	<!-- Corner brackets -->
	<div class="corner corner-tl"></div>
	<div class="corner corner-tr"></div>
	<div class="corner corner-bl"></div>
	<div class="corner corner-br"></div>
</div>

<style>
	.tactical-box {
		position: relative;
		border: 1px solid var(--color-dark);
		padding: 1.5rem;
	}

	.corner {
		position: absolute;
		width: 12px;
		height: 12px;
		border: 1px solid var(--color-dark);
	}

	.corner-tl {
		top: -6px;
		left: -6px;
		border-right: none;
		border-bottom: none;
	}

	.corner-tr {
		top: -6px;
		right: -6px;
		border-left: none;
		border-bottom: none;
	}

	.corner-bl {
		bottom: -6px;
		left: -6px;
		border-right: none;
		border-top: none;
	}

	.corner-br {
		bottom: -6px;
		right: -6px;
		border-left: none;
		border-top: none;
	}
</style>
