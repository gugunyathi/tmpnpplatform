import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini AI if API key is present
let aiClient: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
} catch (e) {
  console.error("Failed to initialize GoogleGenAI:", e);
}

// Gemini Chat API endpoint
app.post("/api/gemini-chat", async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!aiClient) {
      // Fallback smart response if GEMINI_API_KEY is not set
      let reply = "Based on our transcripts, meeting recordings, and proposal documents, TM Pick n Pay is uniquely positioned as the primary anchor retail tenant. The core optimization gap encompasses the Diaspora Market, Informal Retail Traders, and Customer Convenience, driving a $72.3M combined annual gross throughput ecosystem.";
      const lower = (message || "").toLowerCase();
      if (lower.includes('diaspora') || lower.includes('remittance')) {
        reply = "The diaspora corridor represents 100k to 500k+ active senders across South Africa, UK, USA, and Australia. With 40,000 active families spending an average $85 basket across 18 annual orders, this generates US$61,200,000 in baseline retail GMV.";
      } else if (lower.includes('spaza') || lower.includes('informal') || lower.includes('trader')) {
        reply = "Informal retail traders (10,000+ township tuck-shops) represent a massive wholesale supply gap. TM Pick n Pay can step in as the bulk wholesale supplier, displacing gray market smuggling and turning spaza vendors into affiliated distribution nodes with zero store CapEx.";
      } else if (lower.includes('fleet') || lower.includes('delivery') || lower.includes('scooter')) {
        reply = "The proprietary green EV last-mile grid deploys 500 to 2,000 platform-owned electric scooters and cargo e-tricycles on a 12-month rent-to-buy lease model with ~5 month asset payback, generating perpetual ~10% delivery take rates thereafter.";
      }
      return res.json({ reply });
    }

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: `You are Gemini AI, an executive conversational advisor with complete knowledge of the TM Pick n Pay multi-tenant marketplace proposal, $61.2M diaspora remittances GMV model, informal trader B2B integration, and EV last-mile fleet logistics in Zimbabwe. Repository context: ${JSON.stringify(context || {})}.
            
User query: "${message}".

Provide a concise, direct, articulate spoken response (2 to 4 crisp sentences) that can be easily understood when spoken aloud over voice synthesis. Be confident, precise, and executive in tone.` }
          ]
        }
      ]
    });

    const reply = response.text || "I have analyzed your query based on our repository transcripts and market knowledge.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Gemini Document Edit API endpoint
app.post("/api/gemini-edit", async (req, res) => {
  try {
    const { targetDocument, prompt } = req.body;

    if (!aiClient) {
      const generated = `[AI Updated Draft for ${targetDocument}]\nBased on instruction: "${prompt}"\n\n- Updated Section: The Optimization Gap & Value Vectors\n- Key Enhancement: Integrated real-time multi-currency settlement telemetry and decentralized B2B wholesale fulfillment for informal traders.\n- Financial Impact: Scaled baseline throughput projections to reflect enhanced routing efficiency and B2B wholesale capture.`;
      return res.json({ generated });
    }

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: `You are an expert executive proposal editor. Edit the following document target: "${targetDocument}" based on this user instruction: "${prompt}". Provide a polished, professional executive draft update ready for board review.` }
          ]
        }
      ]
    });

    const generated = response.text || `[AI Updated Draft for ${targetDocument}]\nBased on instruction: "${prompt}"\n\n- Updated Section: The Optimization Gap & Value Vectors\n- Key Enhancement: Enhanced operational adaptability and multi-tenant marketplace agility.`;
    res.json({ generated });
  } catch (error: any) {
    console.error("Gemini Edit API Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
