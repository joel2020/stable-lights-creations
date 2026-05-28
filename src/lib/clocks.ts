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
import plainPurple from "@/assets/clock-plain-purple.jpg";
import eightBallPurple from "@/assets/clock-8ball-purple.jpg";
import poolBallsGreen from "@/assets/clock-poolballs-green.jpg";
import speedometerRed from "@/assets/clock-speedometer-red.jpg";
import tungOrange from "@/assets/clock-tung-orange.jpg";
import stableBurke from "@/assets/stable-clocks/burke.jpg";
import stableDakuras from "@/assets/stable-clocks/dakuras.jpg";
import stableBeckwith from "@/assets/stable-clocks/beckwith.jpg";
import stableBalmoral from "@/assets/stable-clocks/balmoral-park.jpg";
import stableBartlett from "@/assets/stable-clocks/bartlett.jpg";
import stableTetrick from "@/assets/stable-clocks/tetrick.jpg";
import stableMiller from "@/assets/stable-clocks/david-miller.jpg";
import stableMeadowlands from "@/assets/stable-clocks/meadowlands.jpg";

export const stableClocks = [
  { src: stableBeckwith, alt: "Beckwith Racing Stable custom neon clock with red glow", caption: "Beckwith Racing Stable", color: "red" },
  { src: stableDakuras, alt: "Dakuras Racing Stable custom neon clock with white glow", caption: "Dakuras Racing Stable", color: "white" },
  { src: stableTetrick, alt: "Tetrick Racing Stable custom neon clock with yellow glow", caption: "Tetrick Racing Stable", color: "yellow" },
  { src: stableMiller, alt: "David Miller Racing Stable custom neon clock with purple glow", caption: "David Miller Racing Stable", color: "purple" },
  { src: stableBartlett, alt: "Bartlett Racing Stable custom neon clock with white glow", caption: "Bartlett Racing Stable", color: "white" },
  { src: stableBurke, alt: "Burke Racing Stable custom neon clock with yellow glow", caption: "Burke Racing Stable", color: "yellow" },
  { src: stableMeadowlands, alt: "Meadowlands Racetrack Mecca of Harness Racing custom neon clock with blue glow", caption: "Meadowlands Racetrack", color: "blue" },
  { src: stableBalmoral, alt: "Balmoral Park 1926-2026 commemorative harness racing neon clock with yellow glow", caption: "Balmoral Park · 1926–2026", color: "yellow" },
] as const;

export const galleryClocks = [
  { src: vegas, alt: "Welcome to Las Vegas neon wall clock with blue glow", caption: "Welcome to Las Vegas · Blue", color: "blue" },
  { src: cocacola, alt: "Coca-Cola themed neon clock with green glow", caption: "Coca-Cola · Green", color: "green" },
  { src: ladyluck, alt: "Lady Luck poker themed neon clock with red glow", caption: "Lady Luck · Red", color: "red" },
  { src: pizza, alt: "Pepperoni pizza neon clock with red glow", caption: "Pepperoni Pizza · Red", color: "red" },
  { src: darts, alt: "Dartboard neon clock with green glow", caption: "Dartboard · Green", color: "green" },
  { src: highlife, alt: "High Life themed neon clock with green glow", caption: "High Life · Green", color: "green" },
  { src: eightBallPurple, alt: "8-ball billiards neon clock with purple glow", caption: "8-Ball Billiards · Purple", color: "purple" },
  { src: poolBallsGreen, alt: "Pool balls billiards neon clock with green glow", caption: "Pool Balls · Green", color: "green" },
  { src: speedometerRed, alt: "Speedometer automotive neon clock with red glow", caption: "Speedometer · Red", color: "red" },
  { src: tungOrange, alt: "Custom character neon clock with orange glow", caption: "Custom Character · Orange", color: "orange" },
  { src: plainRed, alt: "Classic neon wall clock with red glow", caption: "Classic · Red Neon", color: "red" },
  { src: plainBlue, alt: "Classic neon wall clock with blue glow", caption: "Classic · Blue Neon", color: "blue" },
  { src: plainGreen, alt: "Classic neon wall clock with green glow", caption: "Classic · Green Neon", color: "green" },
  { src: plainPurple, alt: "Classic neon wall clock with purple glow", caption: "Classic · Purple Neon", color: "purple" },
  { src: plainWhite, alt: "Classic neon wall clock with white glow", caption: "Classic · White Neon", color: "white" },
] as const;

export const heroClocks = [vegas, cocacola, ladyluck, pizza, highlife, eightBallPurple, speedometerRed, plainRed, plainBlue];

export const NEON_COLORS = [
  { name: "Red", value: "red", hex: "#ff2a2a" },
  { name: "Orange", value: "orange", hex: "#ff8a1f" },
  { name: "Yellow", value: "yellow", hex: "#ffd60a" },
  { name: "Green", value: "green", hex: "#34ff7a" },
  { name: "Blue", value: "blue", hex: "#2a8aff" },
  { name: "Purple", value: "purple", hex: "#b14bff" },
  { name: "White", value: "white", hex: "#ffffff" },
] as const;
