import { openDB, IDBPDatabase } from "idb";
import { DinnerInteractionContract, YumyuckEvent, PreferenceSignal, MealVariant } from "./schema";

const DB_NAME = "yumyuck_db";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

export function getDb(): Promise<IDBPDatabase> {
  if (typeof window === "undefined") {
    // Return a dummy promise during server-side builds or rendering
    return new Promise(() => {});
  }
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("catalog")) {
          db.createObjectStore("catalog", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("sessions")) {
          db.createObjectStore("sessions", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("events")) {
          const eventStore = db.createObjectStore("events", { keyPath: "id" });
          eventStore.createIndex("sessionId", "sessionId", { unique: false });
        }
        if (!db.objectStoreNames.contains("preference_signals")) {
          const prefStore = db.createObjectStore("preference_signals", { keyPath: "id" });
          prefStore.createIndex("userId", "userId", { unique: false });
        }
      },
    });
  }
  return dbPromise;
}

// Catalog Cache helpers
export async function cacheMealCatalog(meals: MealVariant[]): Promise<void> {
  const db = await getDb();
  const tx = db.transaction("catalog", "readwrite");
  const store = tx.objectStore("catalog");
  for (const meal of meals) {
    await store.put(meal);
  }
  await tx.done;
}

export async function getCachedMealCatalog(): Promise<MealVariant[]> {
  const db = await getDb();
  return db.getAll("catalog");
}

// Session helpers
export async function saveSessionContract(session: DinnerInteractionContract): Promise<void> {
  const db = await getDb();
  await db.put("sessions", session);
}

export async function getSessionContract(id: string): Promise<DinnerInteractionContract | undefined> {
  const db = await getDb();
  return db.get("sessions", id);
}

// Research Event Ledger helpers (Immutable, Append-Only)
export async function appendLedgerEvent(event: YumyuckEvent): Promise<void> {
  const db = await getDb();
  await db.put("events", event);
  
  // Try to sync with server ledger in background
  try {
    fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    }).catch(() => {
      // Fail silently, preserving it in IndexedDB for subsequent batch syncing
    });
  } catch {
    // Network offline
  }
}

export async function getLedgerEvents(sessionId: string): Promise<YumyuckEvent[]> {
  const db = await getDb();
  const tx = db.transaction("events", "readonly");
  const index = tx.store.index("sessionId");
  return index.getAll(sessionId);
}

// Preference Signal helpers (Reversible)
export async function savePreferenceSignal(signal: PreferenceSignal): Promise<void> {
  const db = await getDb();
  await db.put("preference_signals", signal);
}

export async function getPreferenceSignals(userId: string): Promise<PreferenceSignal[]> {
  const db = await getDb();
  const tx = db.transaction("preference_signals", "readonly");
  const index = tx.store.index("userId");
  const all = await index.getAll(userId);
  
  // Filter out expired signals
  const now = new Date().toISOString();
  return all.filter(s => !s.expiresAt || s.expiresAt > now);
}

export async function deletePreferenceSignal(id: string): Promise<void> {
  const db = await getDb();
  await db.delete("preference_signals", id);
}

export async function clearSessionPreferenceSignals(): Promise<void> {
  const db = await getDb();
  const tx = db.transaction("preference_signals", "readwrite");
  const store = tx.objectStore("preference_signals");
  const all = await store.getAll();
  for (const sig of all) {
    if (sig.scope === "session") {
      await store.delete(sig.id);
    }
  }
}

export async function clearMealCatalog(): Promise<void> {
  const db = await getDb();
  const tx = db.transaction("catalog", "readwrite");
  await tx.objectStore("catalog").clear();
  await tx.done;
}
