/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // ক্লাস দ্বারা ডার্ক মোড কন্ট্রোল
  theme: {
    extend: {
      colors: {
        darkBg: "#121212", // ডার্ক ব্যাকগ্রাউন্ড
        lightBg: "#ffffff", // লাইট ব্যাকগ্রাউন্ড
        darkText: "#e5e5e5", // ডার্ক টেক্সট
        lightText: "#121212", // লাইট টেক্সট
      },
    },
  },
  plugins: [require("daisyui")],
};
