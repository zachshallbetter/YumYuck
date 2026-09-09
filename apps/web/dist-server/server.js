import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { initNeonDatabase, sqlClient } from "./src/db/neonDb.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, ".env.local") });
const app = express();
app.use(cors());
app.use(express.json());
// Initialize database
initNeonDatabase().catch((err) => {
    console.error("Neon DB Init failed:", err);
});
// POST /api/gemini
app.post("/api/gemini", async (req, res) => {
    try {
        const { prompt, systemInstruction, schema } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "Gemini API key is not configured" });
        }
        const modelName = "gemini-2.5-flash";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
        const requestBody = {
            contents: [
                {
                    parts: [{ text: prompt }]
                }
            ]
        };
        if (systemInstruction) {
            requestBody.systemInstruction = {
                parts: [{ text: systemInstruction }]
            };
        }
        const generationConfig = {
            responseMimeType: "application/json"
        };
        if (schema) {
            generationConfig.responseSchema = schema;
        }
        requestBody.generationConfig = generationConfig;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error("[GEMINI API ERROR]: Status:", response.status, "Details:", errorText);
            return res.status(response.status).json({ error: "Gemini API error", details: errorText });
        }
        const data = await response.json();
        const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!textOutput) {
            console.error("[GEMINI API ERROR]: Empty candidates or malformed data:", JSON.stringify(data));
            return res.status(500).json({ error: "Empty model output" });
        }
        const parsedData = JSON.parse(textOutput);
        return res.json(parsedData);
    }
    catch (error) {
        console.error("[GEMINI API EXCEPTION]:", error);
        return res.status(500).json({ error: "Gemini execution failed", details: error.message });
    }
});
// POST /api/log
app.post("/api/log", async (req, res) => {
    const event = req.body;
    const eventId = event.id;
    try {
        if (!sqlClient) {
            console.log(`[RESEARCH LEDGER] Neon DB unconfigured. Event ID: ${eventId} logged to console:`, JSON.stringify(event, null, 2));
            return res.json({ status: "success", info: "logged to console" });
        }
        await sqlClient `
      INSERT INTO yumyuck_events (
        id, session_id, timestamp, event_type, prompt_id, response,
        projection_version, opportunity_id, candidate_set_hash,
        preference_state_hash, metadata, experiment_condition,
        protocol_version, meal_id
      ) VALUES (
        ${event.id}, ${event.sessionId}, ${event.timestamp}, ${event.eventType},
        ${event.promptId || null}, ${event.response || null}, ${event.projectionVersion},
        ${event.opportunityId || null}, ${event.candidateSetHash}, ${event.preferenceStateHash},
        ${JSON.stringify(event.metadata)}, ${event.experimentCondition},
        ${event.protocolVersion}, ${event.mealId || null}
      )
    `;
        console.log(`[NEON DB] Logged Event ID: ${eventId} to cloud database.`);
        return res.json({ status: "success", info: "logged to cloud DB" });
    }
    catch (error) {
        console.error(`[NEON DB] Failed to save Event ID: ${eventId}:`, error);
        // Return 200 to client to avoid crashing flow, matching Next.js route behavior
        return res.json({ status: "error", error: error.message });
    }
});
// Serve static assets in production
const distPath = path.resolve(__dirname, "dist");
app.use(express.static(distPath));
app.get("*", (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    res.sendFile(indexPath);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`[API SERVER] Express server listening on port ${PORT}`);
});
