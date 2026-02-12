import { openDB } from "idb";
import type { Entry } from "../types";

const DB_NAME = "CBT-JOURNAL";
const STORE_NAME = "entries";

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
}

export async function saveEntry(entry: any) {
  const db = await getDB();
  await db.put(STORE_NAME, entry);
}

export async function deleteEntryDB(id: string) {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}

export async function loadEntries(): Promise<any[]> {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function getEntry(id: string): Promise<Entry | undefined> {
  const db = await getDB();
  return db.get(STORE_NAME, id);
}
