<script lang="ts">
    import { friendlyDate } from "$lib/dateTime";
    import Icon from "$components/Icon.svelte";
    import { mdiGithub, mdiArrowRight, mdiArrowLeft} from "@mdi/js";
    import type { Project } from "$lib/works";

    export let projects: Project[];

    // Pagination variables
    let currentPage = 1;
    const itemsPerPage = 2;
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    $: paginatedProjects = projects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    function nextPage() {
        if (currentPage < totalPages) currentPage += 1;
    }

    function prevPage() {
        if (currentPage > 1) currentPage -= 1;
    }
</script>

<section class="work">
    <h2>
        <a href="/work" sveltekit:prefetch>Projects</a>
    </h2>
	<!-- Pagination controls -->
    <div class="pagination-controls">
        <button class="arrow-button" on:click={prevPage} disabled={currentPage <= 1}>
            <Icon path={mdiArrowLeft} />
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button class="arrow-button" on:click={nextPage} disabled={currentPage >= totalPages}>
            <Icon path={mdiArrowRight} />
        </button>
    </div>
    {#each paginatedProjects as project}
        <article class="project">
            <h3>
                <a href="/work/{project.slug}" sveltekit:prefetch>
                    {project.name}
                </a>
                {#if project.repo}
                    <a
                        class="repo-link"
                        href={project.repo}
                        title="GitHub repository"
                        target="_blank"
                        rel="noopener"
                    >
                        <Icon path={mdiGithub} />
                    </a>
                {/if}
            </h3>
            <div class="article-info">
                <time datetime={project.created}>
                    {friendlyDate(project.created)}
                </time>
                ·
                <span>{project.kind}</span>
            </div>
            <p>{project.summary}</p>
            <p>
                <a class="text-link" href="/work/{project.slug}" sveltekit:prefetch>
                    Read more
                </a>
            </p>
        </article>
    {/each}
    
</section>

<style lang="postcss">
    .work {
        grid-area: work;
    }

    .project {
        border: 1px solid var(--color-text-100);
        padding: calc(var(--line-space) - 1px);
        margin-bottom: var(--line-space);
        border-radius: 1em;
        overflow: hidden; /* prevent margin collapse */

        @media (prefers-color-scheme: dark) {
            background: var(--color-background-300);
            border-color: var(--color-background-300);
        }

        h3 {
            margin-bottom: 0;
        }

        .repo-link :global(.svg-icon) {
            top: 0.125em; /* visual balance */
        }

        .article-info {
            color: var(--color-text-300);
            margin-bottom: calc(var(--line-space) * 0.5);
        }

        p {
            margin-bottom: calc(var(--line-space) * 0.5);
        }

        > :last-child {
            margin-bottom: 0;
        }
    }

    .pagination-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-top: 1rem; /* spacing between project boxes and pagination controls */
    }

    .arrow-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        transition: opacity 0.3s ease;
        color: var(--color-text-400); /* adjust if needed */
        font-size: 1.5rem; /* adjust if needed */
    }

    .arrow-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .arrow-button:not(:disabled):hover {
        opacity: 0.7;
    }
</style>
