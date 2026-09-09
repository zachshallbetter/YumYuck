import { neon } from "@neondatabase/serverless";
const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
export const sqlClient = databaseUrl ? neon(databaseUrl) : null;
let databaseInitialized = false;
export async function initNeonDatabase() {
    if (!sqlClient) {
        console.warn("Neon Database is not configured. Environment variables DATABASE_URL or POSTGRES_URL are missing.");
        return;
    }
    if (databaseInitialized)
        return;
    try {
        // Create the yumyuck_events ledger table in Neon
        await sqlClient `
      CREATE TABLE IF NOT EXISTS yumyuck_events (
        id VARCHAR(255) PRIMARY KEY,
        session_id VARCHAR(255) NOT NULL,
        timestamp TIMESTAMPTZ NOT NULL,
        event_type VARCHAR(255) NOT NULL,
        prompt_id VARCHAR(255),
        response VARCHAR(255),
        projection_version VARCHAR(255) NOT NULL,
        opportunity_id VARCHAR(255),
        candidate_set_hash TEXT NOT NULL,
        preference_state_hash TEXT NOT NULL,
        metadata JSONB,
        experiment_condition VARCHAR(255) NOT NULL,
        protocol_version VARCHAR(255) NOT NULL,
        meal_id VARCHAR(255)
      );
    `;
        databaseInitialized = true;
        console.log("[NEON DB] ledger table yumyuck_events initialized successfully.");
    }
    catch (error) {
        console.error("[NEON DB] Failed to initialize ledger table:", error);
        throw error;
    }
}
