import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBeige: {
          100: "#F8F4F0",
          500: "#98908B",
        },
        primaryGrey: {
          100: "#F2F2F2",
          300: "#B3B3B3",
          500: "#696868",
          900: "#201F24",
        },
        secondary: {
          green: "#277C78",
          yellow: "#F2CDAC",
          cyan: "#82C9D7",
          navy: "#626070",
          red: "#C94736",
          purple: "#826CB0",
        },
        other: {
          purple: "#AF81BA",
          Turquoise: "#597C7C",
          brown: "#93674F",
          magenta: "#934F6F",
          blue: "#3F82B2",
          navyGrey: "#97A0AC",
          armyGreen: "#7F9161",
          gold: "#CAB361",
          orange: "#BE6C49",
        },
      },
      fontSize: {
        textPreset1: ["32px", { lineHeight: "120%", letterSpacing: "0px" }],
        textPreset2: ["20px", { lineHeight: "120%", letterSpacing: "0px" }],
        textPreset3: ["16px", { lineHeight: "150%", letterSpacing: "0px" }],
        textPreset4: ["14px", { lineHeight: "120%", letterSpacing: "0px" }],
        textPreset5: ["12px", { lineHeight: "120%", letterSpacing: "0px" }],
        textPreset5Bold: ["12px", { lineHeight: "150%", letterSpacing: "0px" }],
      },
    },
  },
  plugins: [],
};
export default config;
