import { palette, rounded, shade, components, animations } from '@tailus/themer'
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tailus/themer/dist/components/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        grid: 'url(/grid.svg)',
        'gradient-round':
          'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 45%, rgba(255,255,255,0.4766281512605042) 85%, rgba(0,212,255,0) 100%)',
      },
      rotate: {
        '-100': '-1',
      },
      fontFamily: {
        sans: ['Instrument Sans', 'Work Sans'],
        mono: ['JetBrains Mono'],
        serif: ['Instrument Serif'],
      },
    },
  },
  plugins: [palette, rounded, shade, components, animations],
}
export default config
