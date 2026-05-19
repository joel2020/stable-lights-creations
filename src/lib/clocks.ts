import dakuras from "@/assets/clock-dakuras.jpg";
import myersWhite from "@/assets/clock-myers-white.jpg";
import myersGreen from "@/assets/clock-myers-green.jpg";
import tetrickWhite from "@/assets/clock-tetrick-white.jpg";
import tetrickYellow from "@/assets/clock-tetrick-yellow.jpg";
import hollandWhite from "@/assets/clock-holland-white.jpg";
import hollandBlue from "@/assets/clock-holland-blue.jpg";
import beckwithWhite from "@/assets/clock-beckwith-white.jpg";
import beckwithRed from "@/assets/clock-beckwith-red.jpg";
import tungOrange from "@/assets/clock-tung-orange.jpg";

export const galleryClocks = [
  { src: beckwithRed, alt: "Beckwith Racing Stable custom neon clock with red glow", caption: "Beckwith Racing Stable · Red", color: "red" },
  { src: hollandBlue, alt: "Holland Racing Stable custom neon clock with blue glow", caption: "Holland Racing Stable · Blue", color: "blue" },
  { src: tetrickYellow, alt: "Tetrick Racing Stable custom neon clock with yellow glow", caption: "Tetrick Racing Stable · Yellow", color: "yellow" },
  { src: myersGreen, alt: "Hunter Myers memorial custom neon clock with green glow", caption: "Hunter Myers · Memorial Green", color: "green" },
  { src: tungOrange, alt: "Tung Tung Sahur custom neon clock with orange glow", caption: "Custom Character · Orange", color: "orange" },
  { src: dakuras, alt: "Dakuras Racing Stable custom neon clock", caption: "Dakuras Racing Stable", color: "white" },
  { src: beckwithWhite, alt: "Beckwith Racing Stable clock unlit", caption: "Beckwith · Unlit", color: "white" },
  { src: hollandWhite, alt: "Holland Racing Stable clock unlit", caption: "Holland · Unlit", color: "white" },
  { src: tetrickWhite, alt: "Tetrick Racing Stable clock unlit", caption: "Tetrick · Unlit", color: "white" },
  { src: myersWhite, alt: "Hunter Myers memorial clock unlit", caption: "Hunter Myers · Unlit", color: "white" },
] as const;

export const heroClocks = [beckwithRed, hollandBlue, tetrickYellow, myersGreen, tungOrange, dakuras];

export const NEON_COLORS = [
  { name: "Red", value: "red", hex: "#ff2a2a" },
  { name: "Orange", value: "orange", hex: "#ff8a1f" },
  { name: "Yellow", value: "yellow", hex: "#ffd60a" },
  { name: "Green", value: "green", hex: "#34ff7a" },
  { name: "Blue", value: "blue", hex: "#2a8aff" },
  { name: "Purple", value: "purple", hex: "#b14bff" },
  { name: "White", value: "white", hex: "#ffffff" },
] as const;
