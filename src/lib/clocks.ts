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
import tungOrange from "@/assets/clock-tung-orange.jpg";

export const galleryClocks = [
  { src: vegas, alt: "Welcome to Las Vegas neon wall clock with blue glow", caption: "Welcome to Las Vegas · Blue", color: "blue" },
  { src: cocacola, alt: "Coca-Cola themed neon clock with green glow", caption: "Coca-Cola · Green", color: "green" },
  { src: ladyluck, alt: "Lady Luck poker themed neon clock with red glow", caption: "Lady Luck · Red", color: "red" },
  { src: pizza, alt: "Pepperoni pizza neon clock with red glow", caption: "Pepperoni Pizza · Red", color: "red" },
  { src: darts, alt: "Dartboard neon clock with green glow", caption: "Dartboard · Green", color: "green" },
  { src: highlife, alt: "High Life themed neon clock with green glow", caption: "High Life · Green", color: "green" },
  { src: tungOrange, alt: "Custom character neon clock with orange glow", caption: "Custom Character · Orange", color: "orange" },
  { src: plainRed, alt: "Classic neon wall clock with red glow", caption: "Classic · Red Neon", color: "red" },
  { src: plainBlue, alt: "Classic neon wall clock with blue glow", caption: "Classic · Blue Neon", color: "blue" },
  { src: plainGreen, alt: "Classic neon wall clock with green glow", caption: "Classic · Green Neon", color: "green" },
  { src: plainWhite, alt: "Classic neon wall clock with white glow", caption: "Classic · White Neon", color: "white" },
] as const;

export const heroClocks = [vegas, cocacola, ladyluck, pizza, highlife, plainRed, plainBlue];

export const NEON_COLORS = [
  { name: "Red", value: "red", hex: "#ff2a2a" },
  { name: "Orange", value: "orange", hex: "#ff8a1f" },
  { name: "Yellow", value: "yellow", hex: "#ffd60a" },
  { name: "Green", value: "green", hex: "#34ff7a" },
  { name: "Blue", value: "blue", hex: "#2a8aff" },
  { name: "Purple", value: "purple", hex: "#b14bff" },
  { name: "White", value: "white", hex: "#ffffff" },
] as const;
