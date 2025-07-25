/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                shake: {
                    '0%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-6px)' },
                    '50%': { transform: 'translateX(6px)' },
                    '75%': { transform: 'translateX(-6px)' },
                    '100%': { transform: 'translateX(0)' },
                },
            },
            animation: {
                shake: 'shake 0.4s ease-in-out',
            },
            fontFamily: {
                courier: ['"Courier New"', 'Courier', 'monospace'],
            },
        },
    },
    plugins: [],
};
