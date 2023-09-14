<script lang="ts">
	import { mdiFileDocumentOutline, mdiGithub, mdiLinkedin, mdiOpenInNew } from "@mdi/js"
	import Icon from "$components/Icon.svelte"
	import Logo from "$components/Logo.svelte"
</script>

<section class="landing">
	<h1>
		Alexander Bhasin
		<Logo size="0.9em" color="var(--color-primary-400)" />
	</h1>
	<p>
		Hello! I'm a software developer from Ottawa, Canada.
	</p>
	<hr class="bold" />
	<ul class="links">
		<li>
			<a
				href="/AlexanderBhasinResume.pdf"
				title="Resume"
				target="_blank"
				rel="noopener"
			>
				<Icon title="GitHub Icon" path={mdiFileDocumentOutline} size="1.5em" />
				<span>CV</span>
				<Icon path={mdiOpenInNew} />
			</a>
		</li>
		<li>
			<a
				href="https://github.com/alexbhas"
				title="GitHub profile"
				target="_blank"
				rel="noopener"
			>
				<Icon title="GitHub Icon" path={mdiGithub} size="1.5em" />
				<span>GitHub</span>
				<Icon path={mdiOpenInNew} />
			</a>
		</li>
		<li>
			<a
				href="https://www.linkedin.com/in/alexander-bhasin/"
				title="LinkedIn profile"
				target="_blank"
				rel="noopener"
			>
				<Icon title="LinkedIn Icon" path={mdiLinkedin} size="1.5em" />
				<span>LinkedIn</span>
				<Icon path={mdiOpenInNew} />
			</a>
		</li>
	</ul>
</section>

<style>
	.landing {
		grid-area: landing;
	}

	h1 :global(.svg-icon) {
		top: 0.15em; /* visual balance */
	}

	hr {
		width: 4em;
		margin: calc(1.5 * var(--line-space)) 0;
	}

	ul.links {
		display: flex;
		flex-direction: column;
		list-style-type: none;
		margin-bottom: var(--line-space);
	}

	ul.links li {
		float: left;
		margin-bottom: var(--line-space);
	}

	ul.links a {
		display: flex;
		align-items: center;
		float: left;
	}

	ul.links a:hover {
		text-decoration: underline;
	}

	ul.links span {
		padding-left: 0.75em;
		padding-right: 0.6em;
	}
</style>
