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
          primary: '#A209F4',
          secondary: '#E810F1',
          accent: '#EA0C68',
          neutral: '#2A122B',
          'base-100': '#EFD1F4',
          '--rounded-box': '0.5rem',
          '--rounded-btn': '0.5rem'
        }
      },
      {
        dark: {
          primary: '#CBB3F3',
          secondary: '#DC77F4',
          accent: '#F11281',
          neutral: '#2A122B',
          'base-100': '#38044E',
          '--rounded-box': '0.5rem',
          '--rounded-btn': '0.5rem'
        }
      }
    ],
    darkTheme: 'dark'
  }
}
