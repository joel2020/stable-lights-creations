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
import cocacola from "@/assets/clock-cocacola.jpg";
import darts from "@/assets/clock-darts.jpg";
import highlife from "@/assets/clock-highlife.jpg";
import vegas from "@/assets/clock-vegas.jpg";
import pizza from "@/assets/clock-pizza.jpg";
import ladyluck from "@/assets/clock-ladyluck.jpg";
import plainBlue from "@/assets/clock-plain-blue.jpg";
import plainGreen from "@/assets/clock-plain-green.jpg";
import plainRed from "@/assets/clock-plain-red.jpg";
import plainWhite from "@/assets/clock-plain-white.jpg";

export const galleryClocks = [
  { src: beckwithRed, alt: "Beckwith Racing Stable custom neon clock with red glow", caption: "Beckwith Racing Stable · Red", color: "red" },
  { src: hollandBlue, alt: "Holland Racing Stable custom neon clock with blue glow", caption: "Holland Racing Stable · Blue", color: "blue" },
  { src: tetrickYellow, alt: "Tetrick Racing Stable custom neon clock with yellow glow", caption: "Tetrick Racing Stable · Yellow", color: "yellow" },
  { src: vegas, alt: "Welcome to Las Vegas neon wall clock with blue glow", caption: "Welcome to Las Vegas · Blue", color: "blue" },
  { src: cocacola, alt: "Coca-Cola themed neon clock with green glow", caption: "Coca-Cola · Green", color: "green" },
  { src: ladyluck, alt: "Lady Luck poker themed neon clock with red glow", caption: "Lady Luck · Red", color: "red" },
  { src: pizza, alt: "Pepperoni pizza neon clock with red glow", caption: "Pepperoni Pizza · Red", color: "red" },
  { src: darts, alt: "Dartboard neon clock with green glow", caption: "Dartboard · Green", color: "green" },
  { src: highlife, alt: "High Life themed neon clock with green glow", caption: "High Life · Green", color: "green" },
  { src: myersGreen, alt: "Hunter Myers memorial custom neon clock with green glow", caption: "Hunter Myers · Memorial Green", color: "green" },
  { src: tungOrange, alt: "Custom character neon clock with orange glow", caption: "Custom Character · Orange", color: "orange" },
  { src: dakuras, alt: "Dakuras Racing Stable custom neon clock", caption: "Dakuras Racing Stable", color: "white" },
  { src: plainRed, alt: "Classic neon wall clock with red glow", caption: "Classic · Red Neon", color: "red" },
  { src: plainBlue, alt: "Classic neon wall clock with blue glow", caption: "Classic · Blue Neon", color: "blue" },
  { src: plainGreen, alt: "Classic neon wall clock with green glow", caption: "Classic · Green Neon", color: "green" },
  { src: plainWhite, alt: "Classic neon wall clock with white glow", caption: "Classic · White Neon", color: "white" },
  { src: beckwithWhite, alt: "Beckwith Racing Stable clock unlit", caption: "Beckwith · Unlit", color: "white" },
  { src: hollandWhite, alt: "Holland Racing Stable clock unlit", caption: "Holland · Unlit", color: "white" },
  { src: tetrickWhite, alt: "Tetrick Racing Stable clock unlit", caption: "Tetrick · Unlit", color: "white" },
  { src: myersWhite, alt: "Hunter Myers memorial clock unlit", caption: "Hunter Myers · Unlit", color: "white" },
] as const;

export const heroClocks = [beckwithRed, hollandBlue, tetrickYellow, vegas, cocacola, ladyluck, myersGreen, tungOrange, dakuras];

export const NEON_COLORS = [
  { name: "Red", value: "red", hex: "#ff2a2a" },
  { name: "Orange", value: "orange", hex: "#ff8a1f" },
  { name: "Yellow", value: "yellow", hex: "#ffd60a" },
  { name: "Green", value: "green", hex: "#34ff7a" },
  { name: "Blue", value: "blue", hex: "#2a8aff" },
  { name: "Purple", value: "purple", hex: "#b14bff" },
  { name: "White", value: "white", hex: "#ffffff" },
] as const;
