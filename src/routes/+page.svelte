<script lang="ts">
	import { onMount } from 'svelte';

	// Placeholder data - easy to change
	const name = "Alexander Bhasin";
	const role = "Software Developer";
	const tagline = "Software developer based in Ottawa, Canada. Currently working at Daitoku Co. building B2C mobile applications and full stack web applications.";

	// Dynamic date
	const now = new Date();
	const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
	const currentMonth = months[now.getMonth()];
	const currentDay = now.getDate();
	const currentYear = now.getFullYear();

	const status = {
		mode: "CURRENT STATUS",
		unit: "DEV-2025",
		shield: "OPEN TO WORK"
	};

	// Quotes collection - add your own here
	const quotes = [
		'2025-12-11 - Published the new version of this website'
	];

	// Pick a random quote on page load
	const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

	// Weather data for Ottawa from Open-Meteo (free, no API key needed)
	let weatherData = $state<{temps: number[], times: string[], current: number, condition: string, currentIndex: number}>({
		temps: [],
		times: [],
		current: 0,
		condition: 'LOADING',
		currentIndex: 24 // Default to middle
	});

	onMount(async () => {
		try {
			// Ottawa, Ontario, Canada coordinates: 45.4215, -75.6972
			// Fetch hourly temperature for past 24 hours and forecast
			const response = await fetch(
				'https://api.open-meteo.com/v1/forecast?latitude=45.4215&longitude=-75.6972&hourly=temperature_2m&current=temperature_2m,weather_code&timezone=America/Toronto&past_days=1&forecast_days=2'
			);
			const data = await response.json();

			console.log('Weather API response:', {
				currentTime: data.current.time,
				currentTemp: data.current.temperature_2m,
				firstHour: data.hourly.time[0],
				lastHour: data.hourly.time[data.hourly.time.length - 1],
				totalHours: data.hourly.time.length
			});

			// Get weather condition from code
			const weatherCodes: Record<number, string> = {
				0: 'CLEAR SKY',
				1: 'MAINLY CLEAR', 2: 'PARTLY CLOUDY', 3: 'OVERCAST',
				45: 'FOG', 48: 'RIME FOG',
				51: 'LIGHT DRIZZLE', 53: 'DRIZZLE', 55: 'DENSE DRIZZLE',
				61: 'LIGHT RAIN', 63: 'RAIN', 65: 'HEAVY RAIN',
				71: 'LIGHT SNOW', 73: 'SNOW', 75: 'HEAVY SNOW',
				77: 'SNOW GRAINS',
				80: 'LIGHT SHOWERS', 81: 'SHOWERS', 82: 'HEAVY SHOWERS',
				95: 'THUNDERSTORM'
			};

			// Find the index of the current hour in the times array
			const currentTimeStr = data.current.time; // e.g., "2025-12-11T11:00"
			let currentHourIndex = data.hourly.time.findIndex((t: string) => t === currentTimeStr);

			// If exact match not found, find closest hour
			if (currentHourIndex === -1) {
				const currentTime = new Date(currentTimeStr).getTime();
				let minDiff = Infinity;
				data.hourly.time.forEach((t: string, i: number) => {
					const diff = Math.abs(new Date(t).getTime() - currentTime);
					if (diff < minDiff) {
						minDiff = diff;
						currentHourIndex = i;
					}
				});
			}

			// Use the temperature from the hourly array at current index for consistency
			const hourlyTempAtIndex = currentHourIndex !== -1
				? data.hourly.temperature_2m[currentHourIndex]
				: data.current.temperature_2m;

			console.log('Current index calculation:', {
				currentHourIndex,
				timeAtIndex: data.hourly.time[currentHourIndex],
				hourlyTempAtIndex,
				apiCurrentTemp: data.current.temperature_2m
			});

			// Use the API's current temperature for display (more accurate)
			// but the index for positioning
			weatherData = {
				temps: data.hourly.temperature_2m,
				times: data.hourly.time,
				current: Math.round(data.current.temperature_2m),
				condition: weatherCodes[data.current.weather_code] || 'UNKNOWN',
				currentIndex: currentHourIndex !== -1 ? currentHourIndex : 24
			};
		} catch (e) {
			// Fallback if API fails
			weatherData = {
				temps: Array.from({ length: 48 }, (_, i) => -5 + Math.sin(i / 8) * 10),
				times: [],
				current: -3,
				condition: 'DATA UNAVAILABLE',
				currentIndex: 24
			};
		}
	});

	// Chart dimensions and padding for axis labels
	const chartConfig = {
		width: 380,
		height: 130,  // Taller to fit NOW label
		paddingLeft: 35,  // Space for Y axis labels
		paddingRight: 10,
		paddingTop: 10,
		paddingBottom: 20  // More space at bottom for NOW label
	};

	// Calculate the X position of the "NOW" marker based on currentIndex
	let nowMarkerX = $derived(() => {
		if (weatherData.temps.length === 0) return 202; // Default center
		const { paddingLeft } = chartConfig;
		const chartWidth = 370 - paddingLeft; // Match the path calculation
		const stepX = chartWidth / (weatherData.temps.length - 1);
		return paddingLeft + weatherData.currentIndex * stepX;
	});

	// Calculate hours before/after NOW for footer labels
	let timeLabels = $derived(() => {
		const hoursBack = weatherData.currentIndex;
		const hoursForward = weatherData.temps.length - weatherData.currentIndex - 1;
		return {
			left: `${hoursBack}H AGO`,
			right: `+${hoursForward}H`
		};
	});

	// Calculate nice round numbers for Y axis
	let yAxisLabels = $derived(() => {
		if (weatherData.temps.length === 0) return { min: 0, max: 0, mid: 0 };
		const temps = weatherData.temps;
		const minTemp = Math.min(...temps);
		const maxTemp = Math.max(...temps);

		// Round to nearest 5 for cleaner labels
		const roundedMin = Math.floor(minTemp / 5) * 5;
		const roundedMax = Math.ceil(maxTemp / 5) * 5;
		const mid = Math.round((roundedMin + roundedMax) / 2);

		return { min: roundedMin, max: roundedMax, mid };
	});

	// Generate smooth SVG path from temperature data
	let weatherPath = $derived(() => {
		if (weatherData.temps.length === 0) return '';

		const temps = weatherData.temps;
		const { paddingLeft, paddingRight } = chartConfig;

		// Chart area: y from 10 to 100 (matching grid lines)
		const chartTop = 10;
		const chartBottom = 100;
		const chartHeight = chartBottom - chartTop;
		const chartWidth = 370 - paddingLeft; // 370 is where grid ends

		// Use rounded axis values for consistent scaling
		const { min, max } = yAxisLabels();
		const range = max - min || 1;

		const stepX = chartWidth / (temps.length - 1);

		// Scale temperature to y position
		const getY = (temp: number) => {
			const normalized = (temp - min) / range;
			return chartBottom - (normalized * chartHeight);
		};

		// Build smooth path using cubic bezier curves
		let path = `M ${paddingLeft} ${getY(temps[0])}`;

		for (let i = 1; i < temps.length; i++) {
			const x0 = paddingLeft + (i - 1) * stepX;
			const x1 = paddingLeft + i * stepX;
			const y0 = getY(temps[i - 1]);
			const y1 = getY(temps[i]);

			// Control points for smooth curve
			const cpx1 = x0 + (x1 - x0) / 2;
			const cpx2 = x0 + (x1 - x0) / 2;

			path += ` C ${cpx1} ${y0} ${cpx2} ${y1} ${x1} ${y1}`;
		}

		return path;
	});

	const systemLog = [
		"WORKING ON MOBILE APPS",
		"LEARNING MUSIC PRODUCTION",
		"CREATING DIGITAL ART",
		"AWAITING SPRING SO FARMER'S MARKETS OPEN",
	];

	const experience = [
		{
			company: "Daitoku Co.",
			role: "Full Stack Developer",
			period: "Jan 2024 — Present",
			description: "At Daitoku, I've worked on both the frontend and backend on B2C mobile applications for iOS and Android. I've built web applications using Svelte, as well as managed cloud deployments and databases for a variety of different applications."
		},
		{
			company: "Sitecore",
			role: "Cloud Engineer",
			period: "Jul 2023 — Apr 2025",
			description: "At Sitecore, I upgraded and managed hundreds of cloud deployments in Azure, automated several customer facing operations reducing overhead greatly, mitigated DDoS attacks on high traffic websites, and integrated generative AI workflows into the cloud monitoring process"
		},
		{
			company: "Bank of Canada",
			role: "Web Developer Co-op",
			period: "Sept 2022 — Dec 2022",
			description: "At the Bank of Canada, I worked on adding new accessibility based features to custom WordPress deployments, greatly improving the overall accessibility of the websites and specifically the charts used to display complex economic datasets."
		},
		{
			company: "Paphus Solutions",
			role: "Software Developer Co-op",
			period: "Sept 2020 — Dec 2020",
			description: "At Paphus Solutions, I improved the open source AI chatbot platform BotLibre through the integration of NLP features, and worked to ensure parity on a mobile application by migrating thousands of lines of code between the Android and iOS versions."
		}
	];

	const projects = [
		{
			name: "Project",
			description: "Test",
			tech: ["Test", "Test", "Test"],
			link: "#"
		}
	];

	const links = {
		github: "https://github.com/alexbhas",
		linkedin: "https://linkedin.com/in/alexbhas",
		resume: "/resume2025.pdf"
	};

	const stats = [
		{ value: "98%", label: "CODE COVERAGE", desc: "Comprehensive test suites across all projects" },
		{ value: "50+", label: "PROJECTS SHIPPED", desc: "Production deployments delivered" }
	];
</script>

<svelte:head>
	<title>{name} — {role}</title>
	<meta name="description" content={tagline} />
</svelte:head>

<div class="page-container">
	<!-- Main Frame -->
	<div class="main-frame">
		<!-- Top Status Bar -->
		<div class="top-bar">
			<span class="top-bar-item">WELCOME TO MY PERSONAL WEBSITE</span>
			<span class="top-bar-item"></span>
			<span class="top-bar-item">MADE BY ALEXANDER BHASIN USING SVELTEKIT</span>
		</div>

		<!-- Header Row -->
		<div class="header-row">
			<div class="logo-section">
				<div class="logo">
					<span class="logo-text">{name}</span>
				</div>
				<nav class="nav-links">
					<a href="/blog">Blog</a>
					<a href="#experience">Experience</a>
					<a href="#contact">Contact</a>
				</nav>
			</div>

			<div class="status-panel">
				<div class="status-panel-header">{status.mode}</div>
				<div class="system-log">
					<div class="log-title">[ LOG ]</div>
					{#each systemLog as line}
						<div class="log-line"># {line}</div>
					{/each}
					<div class="log-cursor">_</div>
				</div>
				<div class="freq-display">
					<span class="freq-label">TODAY'S DATE:</span>
					<span class="freq-value">{currentMonth} {currentDay}</span>
					<span class="freq-unit">{currentYear}</span>
				</div>
			</div>
		</div>

		<!-- Main Content Grid -->
		<div class="content-grid">
			<!-- Left Column: Hero + About -->
			<div class="left-column">
				<div class="location-bar">
					<span>ABOUT ME</span>
				</div>

				<p class="main-description">{tagline}</p>

				<!-- Ottawa Weather Chart -->
				<div class="waveform-container">
					<div class="waveform-header">
						<span>OTTAWA, ON — TEMPERATURE</span>
						<span class="waveform-current">{weatherData.current}°C — {weatherData.condition}</span>
					</div>
					<svg viewBox="0 0 380 130" class="waveform-svg">
						<!-- Y-axis labels (positioned to align with grid: 10, 55, 100 + ~4px for text baseline) -->
						<text x="30" y="14" class="axis-label" text-anchor="end">{yAxisLabels().max}°</text>
						<text x="30" y="59" class="axis-label" text-anchor="end">{yAxisLabels().mid}°</text>
						<text x="30" y="104" class="axis-label" text-anchor="end">{yAxisLabels().min}°</text>

						<!-- Grid lines horizontal at y=10 (max), y=55 (mid), y=100 (min) -->
						<line x1="35" y1="10" x2="370" y2="10" stroke="currentColor" stroke-width="1" opacity="0.1" stroke-dasharray="2 4"/>
						<line x1="35" y1="55" x2="370" y2="55" stroke="currentColor" stroke-width="1" opacity="0.15"/>
						<line x1="35" y1="100" x2="370" y2="100" stroke="currentColor" stroke-width="1" opacity="0.1" stroke-dasharray="2 4"/>

						<!-- Temperature line -->
						{#if weatherPath()}
							<path
								d={weatherPath()}
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								opacity="0.6"
								class="weather-line"
							/>
						{/if}

						<!-- Current time marker (dynamically positioned) -->
						<line x1={nowMarkerX()} y1="5" x2={nowMarkerX()} y2="105" stroke="var(--color-accent)" stroke-width="1.5" opacity="0.5" stroke-dasharray="3 3"/>
						<!-- Debug: dot at current temp position -->
						{#if weatherData.temps.length > 0 && weatherData.currentIndex >= 0}
							{@const currentTempY = (() => {
								const { min, max } = yAxisLabels();
								const range = max - min || 1;
								const temp = weatherData.temps[weatherData.currentIndex];
								const normalized = (temp - min) / range;
								return 100 - (normalized * 90);
							})()}
							<circle cx={nowMarkerX()} cy={currentTempY} r="4" fill="var(--color-accent)" opacity="0.8"/>
						{/if}
						<text x={nowMarkerX()} y="122" class="axis-label axis-label-now" text-anchor="middle">NOW</text>
					</svg>
					<div class="waveform-footer">
						<span>{timeLabels().left}</span>
						<span>TEMPERATURE</span>
						<span>{timeLabels().right}</span>
					</div>
				</div>
			</div>

			<!-- Right Column: Radar Display -->
			<div class="right-column">
				<div class="radar-container">
					<svg viewBox="0 0 300 300" class="radar-svg">
						<!-- Outer circle -->
						<circle cx="150" cy="150" r="140" fill="none" stroke="currentColor" stroke-width="1" opacity="0.45"/>
						<!-- Middle circles -->
						<circle cx="150" cy="150" r="100" fill="none" stroke="currentColor" stroke-width="1" opacity="0.35" stroke-dasharray="4 4"/>
						<circle cx="150" cy="150" r="60" fill="none" stroke="currentColor" stroke-width="1" opacity="0.25" stroke-dasharray="2 2"/>
						<circle cx="150" cy="150" r="20" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/>

						<!-- Cross lines -->
						<line x1="150" y1="10" x2="150" y2="290" stroke="currentColor" stroke-width="1" opacity="0.2"/>
						<line x1="10" y1="150" x2="290" y2="150" stroke="currentColor" stroke-width="1" opacity="0.2"/>

						<!-- Diagonal lines -->
						<line x1="45" y1="45" x2="255" y2="255" stroke="currentColor" stroke-width="1" opacity="0.12"/>
						<line x1="255" y1="45" x2="45" y2="255" stroke="currentColor" stroke-width="1" opacity="0.12"/>

						<!-- Center crosshair -->
						<line x1="140" y1="150" x2="160" y2="150" stroke="currentColor" stroke-width="2" opacity="0.5"/>
						<line x1="150" y1="140" x2="150" y2="160" stroke="currentColor" stroke-width="2" opacity="0.5"/>

						<!-- Animated Blips orbiting on rings using CSS animations -->
						<g class="orbit-group orbit-outer">
							<circle cx="290" cy="150" r="4" class="radar-blip blip-outer"/>
						</g>
						<g class="orbit-group orbit-middle">
							<circle cx="250" cy="150" r="3" class="radar-blip blip-middle"/>
						</g>
						<g class="orbit-group orbit-inner">
							<circle cx="210" cy="150" r="2.5" class="radar-blip blip-inner"/>
						</g>
					</svg>

					<div class="radar-label radar-label-left">SIGNAL RANGE: 1.000 MHZ — 001.000 MHZ</div>
					<div class="radar-label radar-label-right">SIGNAL RANGE: 1.000 MHZ — 001.000 MHZ</div>
				</div>

				<!-- Status Footer -->
				<div class="status-footer">
					<div class="quote-row">
						<span>{randomQuote}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Experience Section -->
		<div id="experience" class="section-block">
			<div class="section-header">
				<span class="section-label">WORK EXPERIENCE</span>
				<span class="section-label">FIELD HISTORY</span>
			</div>
			<div class="experience-grid">
				{#each experience as job}
					<div class="experience-item">
						<div class="exp-period">{job.period}</div>
						<div class="exp-details">
							<div class="exp-role">{job.role}</div>
							<div class="exp-company">{job.company}</div>
							<div class="exp-desc">{job.description}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Projects Section 
		<div id="projects" class="section-block section-dark">
			<div class="section-header">
				<span class="section-label">SELECTED PROJECTS</span>
				<span class="section-label">DEPLOYED SYSTEMS</span>
			</div>
			<div class="projects-grid">
				{#each projects as project}
					<a href={project.link} class="project-card">
						<div class="project-name">{project.name}</div>
						<div class="project-desc">{project.description}</div>
						<div class="project-tech">
							{#each project.tech as tech}
								<span class="tech-tag">{tech}</span>
							{/each}
						</div>
					</a>
				{/each}
			</div>
		</div> 
		-->
		

		<!-- Contact / Links Section -->
		<div id="contact" class="section-block">
			<div class="section-header">
				<span class="section-label">EXTERNAL LINKS</span>
				<span class="section-label">CONNECT</span>
			</div>
			<div class="links-grid">
				<a href={links.github} target="_blank" rel="noopener noreferrer" class="link-item">
					<span class="link-name">Github</span>
					<span class="link-arrow">→</span>
				</a>
				<a href={links.linkedin} target="_blank" rel="noopener noreferrer" class="link-item">
					<span class="link-name">LinkedIn</span>
					<span class="link-arrow">→</span>
				</a>
				<a 
					href={links.resume} 
					target="_blank" 
					rel="noopener noreferrer" 
					class="link-item link-accent"
					>
					<span class="link-name">Resume</span>
					<span class="link-arrow">→</span>
				</a>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="bottom-bar">
			<span></span>
			<span>You can email me at: alex@alexbhasin.ca</span>
			<span></span>
		</div>

		<!-- Footer -->
		<div class="footer-bar">
			<span>© 2025 {name.toUpperCase()}</span>
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
		position: relative;
	}

	/* Top Bar */
	.top-bar {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 1rem;
		border-bottom: 1px solid var(--color-dark);
		font-family: var(--font-mono);
		font-size: 0.65rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	/* Header Row */
	.header-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		border-bottom: 1px solid var(--color-dark);
	}

	.logo-section {
		padding: 1rem 1.5rem;
		border-right: 1px solid var(--color-dark);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.logo-icon {
		width: 32px;
		height: 32px;
	}

	.logo-text {
		font-family: var(--font-serif);
		font-weight: bold;
		font-size: 3rem;
	}

	.nav-links {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		font-family: var(--font-mono);
		font-size: 1rem;
	}

	.nav-links a {
		opacity: 1;
		transition: opacity 0.2s;
	}

	.nav-links a:hover {
		opacity: 1;
	}

	.status-panel {
		padding: 0.75rem 1rem;
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto 1fr;
		gap: 0.5rem;
	}

	.status-panel-header {
		grid-column: 1 / -1;
		font-family: var(--font-mono);
		font-size: 0.65rem;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--color-dark);
		text-align: center;
	}

	.system-log {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		line-height: 1.4;
	}

	.log-title {
		margin-bottom: 0.25rem;
	}

	.log-line {
		opacity: 0.9;
	}

	.log-cursor {
		animation: blink 1s infinite;
	}

	@keyframes blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0; }
	}

	.freq-display {
		text-align: right;
		font-family: var(--font-mono);
	}

	.freq-label {
		display: block;
		font-size: 0.6rem;
		opacity: 0.6;
	}

	.freq-value {
		display: block;
		font-size: 1.75rem;
		font-weight: 500;
		line-height: 1;
	}

	.freq-unit {
		display: block;
		font-size: 0.6rem;
		opacity: 0.6;
	}

	/* Content Grid */
	.content-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		border-bottom: 1px solid var(--color-dark);
	}

	.left-column {
		padding: 2rem 1.5rem;
		border-right: 1px solid var(--color-dark);
		display: flex;
		flex-direction: column;
	}

	.location-bar {
		font-family: var(--font-mono);
		font-size: 1rem;
		letter-spacing: 0.1em;
		margin-bottom: 1.5rem;
		opacity: 1;
	}

	.separator {
		margin: 0 0.75rem;
	}

	.main-title {
		font-family: var(--font-serif);
		font-size: 4rem;
		line-height: 1;
		margin-bottom: 1.5rem;
	}

	.title-surname {
		display: block;
	}

	.main-description {
		font-size: 0.95rem;
		line-height: 1.6;
		opacity: 0.9;
		margin-bottom: 2rem;
		max-width: 400px;
	}

	.cta-section {
		margin-bottom: 2.5rem;
	}

	.cta-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background-color: var(--color-accent);
		color: var(--color-cream);
		padding: 0.75rem 1.25rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.05em;
		transition: background-color 0.2s;
		position: relative;
	}

	.cta-button::before,
	.cta-button::after {
		content: '';
		position: absolute;
		width: 8px;
		height: 8px;
		border: 1px solid var(--color-dark);
	}

	.cta-button::before {
		top: -4px;
		left: -4px;
		border-right: none;
		border-bottom: none;
	}

	.cta-button::after {
		bottom: -4px;
		right: -4px;
		border-left: none;
		border-top: none;
	}

	.cta-button:hover {
		background-color: var(--color-accent-hover);
	}

	.cta-bracket {
		opacity: 0.6;
	}

	.stats-section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.stat-block {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: auto auto;
		gap: 0.25rem 1rem;
		align-items: baseline;
	}

	.stat-value {
		font-size: 3rem;
		font-weight: 500;
		line-height: 1;
		grid-row: 1 / 3;
	}

	.stat-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.05em;
		align-self: end;
	}

	.stat-divider {
		display: none;
	}

	.stat-desc {
		font-size: 0.8rem;
		opacity: 0.9;
		grid-column: 2;
	}

	/* Right Column - Radar */
	.right-column {
		padding: 1rem;
		display: flex;
		flex-direction: column;
	}

	.radar-container {
		flex: 1;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 300px;
	}

	.radar-svg {
		width: 100%;
		max-width: 300px;
		height: auto;
	}

	.radar-label {
		position: absolute;
		font-family: var(--font-mono);
		font-size: 0.55rem;
		letter-spacing: 0.05em;
		opacity: 0.4;
		writing-mode: vertical-rl;
	}

	.radar-label-left {
		left: 0;
		top: 50%;
		transform: translateY(-50%) rotate(180deg);
	}

	.radar-label-right {
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.status-footer {
		font-family: var(--font-mono);
		font-size: 0.6rem;
		border: 1px solid var(--color-dark);
		padding: 0.5rem;
	}

	.status-footer-row {
		display: flex;
		justify-content: space-between;
		opacity: 0.9;
	}

	.quote-row {
		margin-top: 0.1rem;
		font-style: italic;
		opacity: 0.9;
		font-size: 0.7rem;
		line-height: 1.4;
	}

	/* Radar Blips with CSS Orbit Animation */
	.radar-blip {
		fill: var(--color-accent);
	}

	.blip-outer {
		opacity: 1;
	}

	.blip-middle {
		opacity: 0.85;
	}

	.blip-inner {
		opacity: 0.7;
	}

	.orbit-group {
		transform-origin: 150px 150px;
	}

	.orbit-outer {
		animation: orbit 25s linear infinite;
	}

	.orbit-middle {
		animation: orbit 18s linear infinite reverse;
	}

	.orbit-inner {
		animation: orbit 12s linear infinite;
	}

	@keyframes orbit {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* Waveform Chart */
	.waveform-container {
		margin-top: 1.5rem;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.waveform-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.05em;
		opacity: 0.9;
		margin-bottom: 0.5rem;
	}

	.waveform-current {
		opacity: 0.9;
	}

	.waveform-svg {
		width: 100%;
		flex: 1;
		min-height: 100px;
	}

	.weather-line {
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.axis-label {
		font-family: var(--font-mono);
		font-size: 9px;
		fill: currentColor;
		opacity: 0.9;
	}

	.axis-label-now {
		fill: var(--color-accent);
		opacity: 0.9;
		font-size: 9px;
		font-weight: 500;
	}

	.waveform-footer {
		display: flex;
		justify-content: space-between;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		opacity: 0.9;
		margin-top: 0.35rem;
		letter-spacing: 0.05em;
	}

	/* Section Blocks */
	.section-block {
		border-bottom: 1px solid var(--color-dark);
		padding: 1.5rem;
	}

	.section-dark {
		background-color: var(--color-dark);
		color: var(--color-cream);
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1.5rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		letter-spacing: 0.05em;
	}

	.section-label {
		opacity: 1;
	}

	/* Experience */
	.experience-grid {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.experience-item {
		display: grid;
		grid-template-columns: 150px 1fr;
		gap: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}

	.experience-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.exp-period {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		opacity: 0.9;
	}

	.exp-role {
		font-family: var(--font-serif);
		font-size: 1.4rem;
		font-weight: bold;
		letter-spacing: 0.01em;
		margin-bottom: 0.25rem;
	}

	.exp-company {
		font-family: var(--font-sans);
		font-size: 1.1rem;
		font-weight: bold;
		color: var(--color-accent);
		margin-bottom: 0.5rem;
	}

	.exp-desc {
		font-size: 1rem;
		opacity: 0.9;
	}

	/* Projects */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.project-card {
		border: 1px solid rgba(255,255,255,0.2);
		padding: 1rem;
		transition: border-color 0.2s;
	}

	.project-card:hover {
		border-color: var(--color-accent);
	}

	.project-name {
		font-family: var(--font-serif);
		font-size: 1.35rem;
		font-weight: bold;
		letter-spacing: 0.01em;
		margin-bottom: 0.5rem;
	}

	.project-desc {
		font-size: 0.9rem;
		opacity: 0.9;
		margin-bottom: 0.75rem;
		line-height: 1.4;
	}

	.project-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.tech-tag {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		padding: 0.2rem 0.4rem;
		border: 1px solid rgba(255,255,255,0.3);
	}

	/* Links */
	.links-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.link-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border: 1px solid var(--color-dark);
		font-family: var(--font-mono);
		font-size: 1rem;
		transition: all 0.2s;
	}

	.link-item:hover {
		background-color: var(--color-dark);
		color: var(--color-cream);
	}

	.link-accent {
		background-color: var(--color-accent);
		color: var(--color-cream);
		border-color: var(--color-accent);
	}

	.link-accent:hover {
		background-color: var(--color-accent-hover);
	}

	.link-arrow {
		opacity: 0.6;
	}

	/* Bottom Bar */
	.bottom-bar {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 1rem;
		border-bottom: 1px solid var(--color-dark);
		font-family: var(--font-mono);
		font-size: 0.9rem;
		opacity: 1;
	}

	.footer-bar {
		padding: 0.75rem 1rem;
		text-align: center;
		font-family: var(--font-mono);
		font-size: 0.65rem;
		border: 1px solid var(--color-dark);
		margin: 0.5rem;
	}

	/* Responsive */
	@media (max-width: 900px) {
		.header-row {
			grid-template-columns: 1fr;
		}

		.logo-section {
			border-right: none;
			border-bottom: 1px solid var(--color-dark);
		}

		.content-grid {
			grid-template-columns: 1fr;
		}

		.left-column {
			border-right: none;
			border-bottom: 1px solid var(--color-dark);
		}

		.main-title {
			font-size: 3rem;
		}

		.projects-grid,
		.links-grid {
			grid-template-columns: 1fr;
		}

		.experience-item {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}

		.top-bar,
		.bottom-bar {
			flex-direction: column;
			gap: 0.25rem;
			text-align: center;
		}
	}

	@media (max-width: 600px) {
		.page-container {
			padding: 0.5rem;
		}

		.logo-text {
			font-size: 2rem;
		}

		.nav-links {
			flex-wrap: wrap;
			gap: 0.75rem 1rem;
			justify-content: center;
		}

		.status-panel {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}

		.freq-display {
			text-align: center;
			padding-top: 0.5rem;
			border-top: 1px solid rgba(0,0,0,0.1);
		}

		.freq-value {
			font-size: 1.25rem;
		}

		.system-log {
			font-size: 0.55rem;
		}

		.log-line {
			word-break: break-word;
		}

		.left-column,
		.right-column {
			padding: 1rem;
		}

		.radar-container {
			min-height: 200px;
		}

		.radar-svg {
			max-width: 200px;
		}

		.radar-label {
			display: none;
		}

		.section-block {
			padding: 1rem;
		}

		.section-header {
			flex-direction: column;
			gap: 0.25rem;
		}

		.stat-value {
			font-size: 2rem;
		}

		.status-footer-row {
			flex-direction: column;
			gap: 0.25rem;
		}

		.waveform-container {
			margin-top: 1rem;
		}

		.waveform-svg {
			min-height: 80px;
		}

		.quote-row {
			text-align: center;
		}
	}
</style>
