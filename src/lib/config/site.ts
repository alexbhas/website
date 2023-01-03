import type { SiteConfig } from '$lib/types/site'

export const site: SiteConfig = {
  protocol: 'https://',
  domain: import.meta.env.URARA_SITE_DOMAIN ?? 'alexbhasin.ca',
  title: 'Alexander Bhasin',
  subtitle: '',
  lang: 'en-US',
  description: '',
  author: {
    name: 'Alexander Bhasin',
    status: '😄',
    bio: 'Software Developer'
  },
  themeColor: '#3D4451'
}
