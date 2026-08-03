import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, resolving conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number between a lower and upper bound. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  if (inMax - inMin === 0) return outMin;
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

/** Format a number as a 2-digit string, e.g. 3 -> "03". Used for section indices. */
export function pad(value: number, length = 2) {
  return String(value).padStart(length, "0");
}

/** Split a string into an array of characters, preserving spaces as non-breaking. */
export function splitChars(text: string) {
  return Array.from(text).map((char) => (char === " " ? " " : char));
}
