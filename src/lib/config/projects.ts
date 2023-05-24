export type Project = {
    id: string
    name: string
    tags?: string[]
    feature?: string
    description?: string
    img: string
    link?: string
}

export const projects: Project[] = [
    {
        id: 'moodymix',
        name: 'MoodyMix',
        tags: ['Svelte', 'Flask', 'Python'],
        description:
            "A Svelte/Flask web application that allows the user to get song recommendations based off emotions.",
        feature: 'Svelte',
        img: '/assets/moody.webp',
        link: 'https://github.com/alexbhas/moodymix'
    },

    {
        id: 'larry-david-talkabot',
        name: 'Larry David Talkabot',
        tags: ['Python', 'AI'],
        description:
            "A Python project that generates audio files of Larry David’s voice. Makes use of GPT for generating text as well as TorToiSe TTS for the audio.",
        feature: 'Python',
        img: '/assets/larrydavid.webp',
        link: 'https://github.com/alexbhas/larrydavid-talkabot'
    },
    {
        id: 'mp3-to-wav-tortoise',
        name: 'MP3 to WAV TorToiSe',
        tags: ['Python'],
        description:
            "A Python application that batch converts MP3 files into the required WAV format for TorToiSe TTS.",
        feature: 'Python',
        img: '/assets/mp3-to-wav.webp',
        link: 'https://github.com/alexbhas/mp3towav-tortoise'
    },
    {
        id: 'dark-mode-colors-tool',
        name: 'Dark Mode Colours Tool',
        tags: ['JavaScript', 'HTML/CSS', 'Accessibility'],
        description:
            "A web application that allows the user to enter a background colour for a light and dark mode, and calculate which HTML colours meet the WCAG AA contrast minimum for both background colours.",
        feature: 'JavaScript',
        img: '/dark-mode-tool/dark-mode.webp',
        link: 'https://github.com/alexbhas/dark-mode-colours-tool'
    },
    {
        id: 'rfid-binary-tree-collision-avoidance',
        name: 'RFID Binary Tree Collision Avoidance',
        tags: ['Python'],
        description:
            "A Python simulation that re-creates the work of an RFID anti-collision algorithms research paper.",
        feature: 'Python',
        img: '/assets/rfid.webp',
        link: 'https://github.com/alexbhas/RFID-Binary-Tree-Collision-Avoidance'
    },
    {
        id: 'accessible-tts',
        name: 'Accessible TTS',
        tags: ['Python', 'Accessibility'],
        description:
            "A Python application that allows the user to input text or pdf/docx files and get a text to speech version of the text.",
        feature: 'Python',
        img: '/assets/Text-To-Speech.webp',
        link: 'https://github.com/alexbhas/accessible-tts'
    },
    {
        id: 'pyhouse',
        name: 'Pyhouse',
        tags: ['Python', 'Accessibility'],
        description:
            "A Python web scraper that analyzes the accessibility of websites.",
        feature: 'Python',
        img: '/assets/lighthouse.webp',
        link: 'https://github.com/alexbhas/pyhouse'
    },
    {
        id: 'concurrent-fitness-centre',
        name: 'Concurrent Fitness Centre',
        tags: ['C', 'JavaScript', 'HTML/CSS', 'QNX Neutrino', 'Embedded Software'],
        description:
            "Software that runs on an RTOS to deliver a monitoring system for a fitness centre. Also included is a front-end web application that displays statistics for the data generated by the software.",
        feature: 'RTOS',
        img: '/assets/fitness.webp',
        link: 'https://github.com/alexbhas/RTOS-Fitness-Centre'
    },
    {
        id: 'oasis-pro-medical-device-simulator',
        name: 'OASIS Pro Medical Device Simulator',
        tags: ['C++', 'SQLite', 'Qt'],
        description:
            "Software that runs a comprehensive simulation of the OASIS Pro CES medical device. Multiple object oriented design patterns were used to accurately represent the device in the software. Repository private for academic purposes.",
        feature: 'C++',
        img: '/oasis/oasis-pro.webp',
        link: 'https://mindalive.com/products/oasis-pro'
    },
    {
        id: 'game-of-life',
        name: 'Game of Life',
        tags: ['JavaScript', 'HTML/CSS'],
        description:
            "A simple JavaScript implementation of Conway’s Game of Life.",
        feature: 'JavaScript',
        img: '/life/game-of-life.webp',
        link: 'https://github.com/alexbhas/game-of-life'
    }
]