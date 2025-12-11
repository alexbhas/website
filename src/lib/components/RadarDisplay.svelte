<script lang="ts">
	let { class: className = '' } = $props();
</script>

<div class="radar-container {className}">
	<svg viewBox="0 0 400 400" class="w-full h-full">
		<!-- Outer circle -->
		<circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3" />
		<!-- Middle circle -->
		<circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2" stroke-dasharray="4 4" />
		<!-- Inner circle -->
		<circle cx="200" cy="200" r="60" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2" stroke-dasharray="2 2" />

		<!-- Cross lines -->
		<line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" stroke-width="1" opacity="0.15" />
		<line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" stroke-width="1" opacity="0.15" />

		<!-- Diagonal lines -->
		<line x1="72" y1="72" x2="328" y2="328" stroke="currentColor" stroke-width="1" opacity="0.1" />
		<line x1="328" y1="72" x2="72" y2="328" stroke="currentColor" stroke-width="1" opacity="0.1" />

		<!-- Center crosshair -->
		<line x1="190" y1="200" x2="210" y2="200" stroke="currentColor" stroke-width="2" opacity="0.5" />
		<line x1="200" y1="190" x2="200" y2="210" stroke="currentColor" stroke-width="2" opacity="0.5" />

		<!-- Blip points -->
		<circle cx="150" cy="140" r="3" fill="currentColor" opacity="0.6" />
		<circle cx="260" cy="180" r="2" fill="currentColor" opacity="0.4" />
		<circle cx="180" cy="280" r="2" fill="currentColor" opacity="0.3" />
	</svg>

	<!-- Range labels -->
	<div class="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-xs opacity-40 writing-mode-vertical">
		SIGNAL RANGE: 1.000 MHZ — 001.000 MHZ
	</div>
	<div class="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-xs opacity-40 writing-mode-vertical">
		SIGNAL RANGE: 1.000 MHZ — 001.000 MHZ
	</div>
</div>

<style>
	.radar-container {
		position: relative;
	}

	.writing-mode-vertical {
		writing-mode: vertical-rl;
		text-orientation: mixed;
	}
</style>
