/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    screens: {
      'xzz': '350px',
      'xss': '358px',
      'xsss': '370px',
      'xxss': '389px',
      'etc': '385px',
      'xs': '400px',
      'xxq': '410px',
      'xxj': '430px',
      'mmu': '450px',
      'mmp': '470px',
      'xr': '500px',
      'ttr': '520px',
      'xrc': '500px',
      'xrp': '530px',
      'xru': '550px',
      'xrw': '570px',
      'smd': '600px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'smm': '660px',
      'smx': '705px',
      'smxe': '715px',
      'smxq': '735px',
      'smxy': '745px',
      'md': '766px',
      'mda': '775px',
      'mfg': '800px',
      'mdw': '815px',
      'mdd': '817px',
      // => @media (min-width: 768px) { ... }
      'mdxw': '840px',
      'mdx': '880px',
      'mdxx': '888px',
      'mdf': '900px',
      'lmd': '920px',
      'lmt': '940px',
      'lmu': '980px',
      // => @media (min-width: 768px) { ... }

      'xll': '1350px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'ipad': '1070px',
      'lge': '1090px',
      'lget': '1110px',
      'lgex': '1150px',
      'ipada': '1170px',
      'air': '1175px',
      'airx': '1200px',
      'xl': '1280px',
      'xlq': '1284px',
      'xcx': '1298px',
      // => @media (min-width: 1280px) { ... }
      'xlx': '1330px',
      'xlu': '1350px',
      'xlr': '1358px',
      'zzz': '1380px',
      'xln': '1270px',
      'uuu': '1400px',
      'uur': '1430px',
      'uux': '1450px',
      '2xl': '1500px',
      'rxl': '1530px',
      '3xl': '1600px',
      'uxl': '1655px',
      '4xl': '1700px',
      'pxl': '1750px',
      '5xl': '1800px',
      'bxl': '1850px',
      'yxl': '1900px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
      'mono': ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"]
      
    },
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite', // Adjust the duration as needed
        'spin-fast': 'spin 8s linear infinite', // Adjust the duration as needed
      },
      colors: {
        // light mode
        tremor: {
          brand: {
            faint: "#eff6ff", // blue-50
            muted: "#bfdbfe", // blue-200
            subtle: "#60a5fa", // blue-400
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#1d4ed8", // blue-700
            inverted: "#ffffff", // white
          },
          background: {
            muted: "#f9fafb", // gray-50
            subtle: "#f3f4f6", // gray-100
            DEFAULT: "#ffffff", // white
            emphasis: "#374151", // gray-700
          },
          border: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          ring: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          content: {
            subtle: "#9ca3af", // gray-400
            DEFAULT: "#6b7280", // gray-500
            emphasis: "#374151", // gray-700
            strong: "#111827", // gray-900
            inverted: "#ffffff", // white
          },
        },
        // dark mode
        "dark-tremor": {
          brand: {
            faint: "#0B1229", // custom
            muted: "#172554", // blue-950
            subtle: "#1e40af", // blue-800
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#60a5fa", // blue-400
            inverted: "#030712", // gray-950
          },
          background: {
            muted: "#131A2B", // custom
            subtle: "#1f2937", // gray-800
            DEFAULT: "#111827", // gray-900
            emphasis: "#d1d5db", // gray-300
          },
          border: {
            DEFAULT: "#1f2937", // gray-800
          },
          ring: {
            DEFAULT: "#1f2937", // gray-800
          },
          content: {
            subtle: "#4b5563", // gray-600
            DEFAULT: "#6b7280", // gray-600
            emphasis: "#e5e7eb", // gray-200
            strong: "#f9fafb", // gray-50
            inverted: "#000000", // black
          },
        },
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem"],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/aspect-ratio'),
    require("@headlessui/tailwindcss")
  ],
}
