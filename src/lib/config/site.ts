import type { SiteConfig } from '$lib/types/site'

export const site: SiteConfig = {
  protocol: 'https://',
  domain: import.meta.env.URARA_SITE_DOMAIN ?? 'alexbhasin.ca',
  title: 'Alexander Bhasin',
  subtitle: '',
  lang: 'en-US',
  description: 'Alexander Bhasin\'s personal website',
  author: {
    avatar: '/assets/maskable@512.png',
    name: 'Alexander Bhasin',
    status: '🎓',
    bio: 'Recently graduated software developer from Ottawa, Canada',
    metadata: [
      {
        text: 'CV',
        link: 'assets/AlexanderBhasinResume.pdf'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/alexbhas'
      },
      {
        text: 'LinkedIn',
        link: 'https://www.linkedin.com/in/alexander-bhasin/'
      },
    ]
  },
  themeColor: '#3D4451'
}
