import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx,astro}",
		"./components/**/*.{ts,tsx,astro}",
		"./app/**/*.{ts,tsx,astro}",
		"./src/**/*.{ts,tsx,astro}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			screens: {
				...defaultTheme.screens,
				xs: "475px",
				"3xl": "1600px",
				"4xl": "1800px",
				"5xl": "1900px",
			},
			fontFamily: {
				...defaultTheme.fontFamily,
				sans: ["'Open Sans Variable'", ...defaultTheme.fontFamily.sans],
				serif: ["'Source Serif 4 Variable'", ...defaultTheme.fontFamily.serif],
			},
			fontSize: {
				...defaultTheme.fontSize,
				xxs: ["0.5rem", "1rem"],
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},

				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},

				successive: {
					DEFAULT: "hsl(var(--successive))",
					foreground: "hsl(var(--successive-foreground))",
				},

				warning: {
					DEFAULT: "hsl(var(--warning))",
					foreground: "hsl(var(--warning-foreground))",
				},

				informative: {
					DEFAULT: "hsl(var(--informative))",
					foreground: "hsl(var(--informative-foreground))",
				},

				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				wiggle: {
					"0%, 100%": { transform: "rotate(-3deg)" },
					"50%": { transform: "rotate(3deg)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				wiggle: "wiggle 1s ease-in-out infinite",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		plugin(({ addUtilities }) => {
			addUtilities({
				".scrollbar-hidden": {
					"-ms-overflow-style": "none",
					"scrollbar-width": "none",
				},

				".scrollbar-hidden::-webkit-scrollbar": {
					display: "none",
				},
			});
		}),
	],
};
