<script lang="ts">
	// @ts-ignore
	import portrait from "../../portrait.jpg?w=160&webp&meta"
	import { rot } from "./cipher"
	import HiddenText from "./HiddenText.svelte"
	import { selectable } from "./selectable"
	import { browser } from "$app/env"

	const email = rot("nyrk@nyrkounfva.pn", -13)
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<article class="article">
	<h1>About</h1>
	<div class="profile-card">
		<img
			class="portrait"
			src={portrait.src}
			alt="Alexander's portrait"
			style="width: {portrait.width}px; height: {portrait.height}px"
		/>
		<div class="title">
			<h2>Alexander Bhasin</h2>
			<div class="tagline">Software Developer</div>
		</div>

		<p>
			Hello, I'm Alexander! I'm a recent computer science graduate from Carleton University. I'm interested in
			Accessibility, AI, Full Stack Development, iOS/macOS development, and Cybersecurity.
		</p>

		<p>
			The aspects of computer science that I am mosted interested in are its potential applications.
			I have seen firsthand the impact that well-designed applications can have on improving the different
			areas of our lives. A long standing goal of mine is to contribute to projects that are accessible, and
			revolve around causes that are important to me.
		</p>

		<p>Some of my personal interests include:</p>
		<ul class="list">
			<li>Music - I'm learning the electric guitar! My favourite genre is 2000s pop punk.</li>
			<li>Baking - I'm currently working my way through several chocolate moose cake recipes.</li>
			<li>Working out - I do strength training as well as swimming.</li>
			<li>Gaming - I love all genres but RPGs are my favourite!</li>
		</ul>

		<h3>Contact</h3>

		{#if browser}
			<p>
				If you want to get in touch you can send me a message at:
				<HiddenText>
					<span slot="hidden" aria-label="email is hidden, tap to reveal">
						&lt;tap to show&gt;
					</span>
					<span slot="visible" use:selectable>{email}</span>
				</HiddenText>
			</p>
		{:else}
			<noscript>
				<blockquote>
					Contact info is not shown with JavaScript disabled. This is to prevent
					it from getting picked up by web scrapers. Sorry!
				</blockquote>
			</noscript>
		{/if}
	</div>
</article>

<style>
	.portrait {
		border-radius: 100%;
		float: left;
		margin-right: 2em;
		margin-bottom: 1em;
	}
	.title h2 {
		margin-bottom: 0;
	}
	.tagline {
		color: var(--color-text-300);
		margin-bottom: var(--line-space);
	}

	@media (max-width: 30rem) {
		.portrait {
			display: block;
			float: none;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: calc(0.5 * var(--line-space));
		}

		.title {
			text-align: center;
		}
	}

	[slot="hidden"] {
		cursor: pointer;
		background: var(--color-secondary-200);
		color: var(--color-secondary-200-text);
	}

	[slot="visible"] {
		@keyframes flash {
			from {
				background: var(--color-secondary-400);
				color: var(--color-secondary-400-text);
			}
			to {
				background: transparent;
				color: inherit;
			}
		}

		animation: flash 1s var(--standard-curve);
		border: 1px dashed var(--color-text-100);
	}
</style>
