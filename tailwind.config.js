module.exports = {
    mode: "jit",
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    purge: [
        // ...
        "./node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}", // path to vechaiui
    ],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@vechaiui/core"),
    ],
};