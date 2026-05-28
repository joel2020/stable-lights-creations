import stableHolland from "@/assets/stable-clocks/holland-ai.png";
import stableMeadowlands from "@/assets/stable-clocks/meadowlands-ai.png";
import stableBalmoral from "@/assets/stable-clocks/balmoral-park-ai.png";
import stableBartlett from "@/assets/stable-clocks/bartlett-ai.png";
import stableBeckwith from "@/assets/stable-clocks/beckwith-ai.png";
import stableMiller from "@/assets/stable-clocks/david-miller-ai.png";
import stableTetrick from "@/assets/stable-clocks/tetrick-ai.png";
import stableBurke from "@/assets/stable-clocks/burke-ai.png";
import stableDakuras from "@/assets/stable-clocks/dakuras-ai.png";
import stableBurkeRoom from "@/assets/stable-clocks/burke-room-ai.png";

export const stableClocks = [
  { src: stableHolland, alt: "Holland Racing Stable custom neon clock with blue glow", caption: "Holland Racing Stable", color: "blue" },
  { src: stableMeadowlands, alt: "Meadowlands Racetrack custom neon clock with blue glow", caption: "Meadowlands Racetrack", color: "blue" },
  { src: stableBalmoral, alt: "Balmoral Park commemorative neon clock with yellow glow", caption: "Balmoral Park · 1926–2026", color: "yellow" },
  { src: stableBartlett, alt: "Bartlett Racing Stable custom neon clock with white glow", caption: "Bartlett Racing Stable", color: "white" },
  { src: stableBeckwith, alt: "Beckwith Racing Stable custom neon clock with red glow", caption: "Beckwith Racing Stable", color: "red" },
  { src: stableMiller, alt: "David Miller Racing Stable custom neon clock with purple glow", caption: "David Miller Racing Stable", color: "purple" },
  { src: stableTetrick, alt: "Tetrick Racing Stable custom neon clock with yellow glow", caption: "Tetrick Racing Stable", color: "yellow" },
  { src: stableBurke, alt: "Burke Racing Stable custom neon clock with yellow glow", caption: "Burke Racing Stable", color: "yellow" },
  { src: stableDakuras, alt: "Dakuras Racing Stable custom neon clock with white glow", caption: "Dakuras Racing Stable", color: "white" },
  { src: stableBurkeRoom, alt: "Burke Racing Stable neon clock installed on a tack room wall", caption: "Burke Racing Stable · Installed", color: "yellow" },
] as const;

export const galleryClocks = stableClocks;

export const heroClocks = [
  stableHolland,
  stableMeadowlands,
  stableBalmoral,
  stableBartlett,
  stableBeckwith,
  stableMiller,
  stableTetrick,
  stableBurke,
  stableDakuras,
];


export const NEON_COLORS = [
  { name: "Red", value: "red", hex: "#ff2a2a" },
  { name: "Orange", value: "orange", hex: "#ff8a1f" },
  { name: "Yellow", value: "yellow", hex: "#ffd60a" },
  { name: "Green", value: "green", hex: "#34ff7a" },
  { name: "Blue", value: "blue", hex: "#2a8aff" },
  { name: "Purple", value: "purple", hex: "#b14bff" },
  { name: "White", value: "white", hex: "#ffffff" },
] as const;
