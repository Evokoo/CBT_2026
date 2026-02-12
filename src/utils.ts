import type { Entry } from "./types";

/**
 * Creates a new Entry object
 * @param thought - The initial thought text
 * @param response - The processed response text
 * @param distortions - Array representing selected distortions
 * @param id - Unique ID
 * @param created - Date of creation
 * @param edited - Date of last edit
 * @returns Entry object with id, date, and distortions
 */

export function newEntry(
  thought: string,
  response: string,
  distortions: number[],
  id: string = crypto.randomUUID(),
  created: Date = new Date(),
  edited: Date = new Date(),
): Entry {
  return {
    id,
    thought,
    response,
    distortions,
    created,
    edited,
  };
}
