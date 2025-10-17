// src/sounds.js
import { Howl } from "howler";

export const placeSound = new Howl({ src: ["/sounds/place.mp3"], volume: 0.5 });
export const winSound   = new Howl({ src: ["/sounds/lose.mp3"], volume: 0.5 });
export const loseSound  = new Howl({ src: ["/sounds/win.mp3"], volume: 0.5 });
export const tieSound   = new Howl({ src: ["/sounds/tie.mp3"], volume: 0.5 });
