import type { ThemeConfig, HeadConfig, HeaderConfig, DateConfig, FeedConfig } from '$lib/types/general'

export const theme: ThemeConfig = [
  {
    name: 'light',
    text: 'Lavender'
  },
  {
    name: 'dark',
    text: 'Dusk'
  }
]

export const head: HeadConfig = {}

export const header: HeaderConfig = {
  nav: [
    {
      text: 'About',
      link: '/about'
    },
    {
      text: 'Experience',
      link: '/experience'
    },
    {
      text: 'Projects',
      link: '/projects'
    }
  ]
}

export const date: DateConfig = {
  locales: 'en-US',
  options: {
    year: '2-digit',
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }
}

export const feed: FeedConfig = {}
