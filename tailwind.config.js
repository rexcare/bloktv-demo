/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: "#0c0022",
        midnightblue: "#240d50",
        thistle: "#cabae8",
        white: "#fff",
      },
      fontFamily: {
        poppins: "Poppins",
        monasans: "Mona-Sans",
      },
      borderRadius: {
        "12xl": "31px",
        "17xl": "36px",
      },
    },
    fontSize: {
      sm: "14px",
      base: "16px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};

