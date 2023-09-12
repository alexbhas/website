import { theme } from './src/lib/config/general'
// @ts-ignore Could not find a declaration file for module '@tailwindcss/typography'.
import typography from '@tailwindcss/typography'
// @ts-ignore Could not find a declaration file for module 'daisyui'.
import daisyui from 'daisyui'

export default {
  content: ['./src/**/*.{html,md,js,svelte,ts}'],
  theme: { extend: {} },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#F10E72',
          secondary: '#E810F1',
          accent: '#EA0C68',
          neutral: '#2A122B',
          'base-100': '#E8D1FF',
          'base-200': '#F5EBFF',
          'base-content': '#000000',
          '--rounded-box': '0.5rem',
          '--rounded-btn': '0.5rem'
        }
      },
      {
        dark: {
          primary: '#F10E72',
          secondary: '#E810F1',
          accent: '#EA0C68',
          neutral: '#2A122B',
          'base-100': '#454545',
          'base-200': '#202020',
          'base-content': '#FFFFFF',
          '--rounded-box': '0.5rem',
          '--rounded-btn': '0.5rem'
        }
      }
    ],
    darkTheme: 'dark'
  }
}
