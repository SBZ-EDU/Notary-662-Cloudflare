import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  // Initialize Gemini
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY environment variable is not set. Go to Settings > Secrets to add it.");
  }
  
  const ai = new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Endpoints
  app.post("/api/generate", async (req, res) => {
    try {
      const { model, stream, contents, config } = req.body;
      
      // Determine the best model to use
      let targetModel = "gemini-3.5-flash"; // Default
      if (model && typeof model === 'string') {
          if (model.includes('pro')) {
              targetModel = 'gemini-3.1-pro-preview';
          } else if (model.includes('flash')) {
              targetModel = 'gemini-3.5-flash';
          }
      }

      if (stream) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        try {
            const responseStream = await ai.models.generateContentStream({
              model: targetModel,
              contents: contents,
              config: config
            });

            for await (const chunk of responseStream) {
              res.write(`data: ${JSON.stringify(chunk)}\n\n`);
            }
            res.end();
        } catch (streamError: any) {
            console.error("Gemini Streaming Error:", streamError);
            res.write(`data: ${JSON.stringify({ error: { message: streamError.message } })}\n\n`);
            res.end();
        }
      } else {
        const response = await ai.models.generateContent({
          model: targetModel,
          contents: contents,
          config: config
        });
        
        // Support both direct SDK response structure and extended text for convenience
        res.json({
          text: response.text,
          candidates: response.candidates,
          usageMetadata: response.usageMetadata
        });
      }
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: { message: error.message } });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

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
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
