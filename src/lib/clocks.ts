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

import davidMillerReal from "@/assets/custom-builds/david-miller-real.jpg.asset.json";
import beckwithReal from "@/assets/custom-builds/beckwith-real.jpg.asset.json";
import tungSahur from "@/assets/custom-builds/tung-sahur.jpg.asset.json";
import untouchablesTruck from "@/assets/custom-builds/untouchables-truck.jpg.asset.json";
import hollandReal from "@/assets/custom-builds/holland-real.jpg.asset.json";
import cocaCola from "@/assets/custom-builds/coca-cola.jpg.asset.json";
import mountainDew from "@/assets/custom-builds/mountain-dew.jpg.asset.json";
import kyleBusch from "@/assets/custom-builds/kyle-busch.jpg.asset.json";
import untouchablesClassics from "@/assets/custom-builds/untouchables-classics.jpg.asset.json";
import collectionLineup from "@/assets/custom-builds/collection-lineup.jpg.asset.json";

export const latestBuilds = [
  { src: cocaCola.url, alt: "Enjoy Coca-Cola custom neon clock with red glow", caption: "Enjoy Coca-Cola", color: "red" },
  { src: mountainDew.url, alt: "Mountain Dew custom neon clock with green glow", caption: "Mountain Dew", color: "green" },
  { src: kyleBusch.url, alt: "Kyle Busch #18 tribute custom neon clock with yellow glow", caption: "Kyle Busch · #18 Tribute", color: "yellow" },
  { src: untouchablesTruck.url, alt: "Untouchables Rod & Muscle custom truck neon clock with blue glow", caption: "Untouchables Rod & Muscle", color: "blue" },
  { src: untouchablesClassics.url, alt: "Untouchables Rod & Muscle classic cars custom neon clock with red glow", caption: "Untouchables · Classics", color: "red" },
  { src: tungSahur.url, alt: "Tung Tung Tung Sahur custom character neon clock with yellow glow", caption: "Custom Character Build", color: "yellow" },
  { src: davidMillerReal.url, alt: "David Miller Racing Stable custom neon clock with purple glow", caption: "David Miller Racing Stable", color: "purple" },
  { src: beckwithReal.url, alt: "Beckwith Racing Stable custom neon clock with red glow", caption: "Beckwith Racing Stable", color: "red" },
  { src: hollandReal.url, alt: "Holland Racing Stable custom neon clock with blue glow", caption: "Holland Racing Stable", color: "blue" },
  { src: collectionLineup.url, alt: "Lineup of custom neon clocks in blue, red, yellow, and purple", caption: "Custom Build Lineup", color: "purple" },
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
