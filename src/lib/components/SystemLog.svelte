<script lang="ts">
	let {
		lines = [],
		class: className = ''
	}: {
		lines?: string[];
		class?: string;
	} = $props();
</script>

<div class="system-log font-mono text-xs {className}">
	<div class="log-header opacity-60 mb-1">[ SYSTEM LOG ]</div>
	{#each lines as line}
		<div class="log-line opacity-80"># {line}</div>
	{/each}
	<div class="cursor-line opacity-40">_</div>
</div>

<style>
	.system-log {
		line-height: 1.6;
	}

	.cursor-line {
		animation: blink 1s infinite;
	}

	@keyframes blink {
		0%, 50% { opacity: 0.4; }
		51%, 100% { opacity: 0; }
	}
</style>
