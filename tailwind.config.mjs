/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            fontFamily: {
                // Sans por defecto (Regular y Bold funcionan automático)
                sans: ['"NB International Pro"', 'sans-serif'],
                
                // Nueva clase font-mono
                mono: ['"NB International Pro Mono"', 'monospace'],
            },
            colors: {
                brand: {
                    orange: '#FF5C35',
                    dark: '#383838'
                }
            }
        },
	},
	plugins: [],
}