/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./server/views/**/*.hbs",
        "./server/views/*.hbs",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./index.html"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('daisyui')
    ],
    daisyui: {
        themes: ["light", "dark"],
    },
}