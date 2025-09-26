// server/routes.ts
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
// ⬇️ statt insertContactMessageSchema den Builder importieren
import { buildInsertContactMessageSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // WICHTIG (falls nicht global gesetzt): JSON-Parser
  // app.use(express.json());

  app.post("/api/contact", async (req, res) => {
    try {
      // Schema mit kürzerer Mindestlänge + (optionalen) i18n-Texten
      const schema = buildInsertContactMessageSchema({
        minMessage: 3, // <-- hier stellst du die gewünschte Mindestlänge ein
        t: (k) =>
          ({
            "validation.name.min": "Name muss mindestens 2 Zeichen lang sein",
            "validation.email": "Bitte gib eine gültige E-Mail-Adresse ein",
            "validation.message.min": "Nachricht muss mindestens 3 Zeichen lang sein",
          }[k] ?? k),
      });

      // Validierung
      const validated = schema.parse(req.body);   

      // Speichern / E-Mail versenden
      const contactMessage = await storage.createContactMessage(validated);

      res.status(201).json({
        success: true,
        message: "Nachricht erfolgreich gesendet!",
        id: contactMessage.id,
      });
    } catch (error) {
      console.error("❌ Fehler beim Verarbeiten der Kontaktanfrage:", error);

      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: "Validierungsfehler",
          issues: error.flatten().fieldErrors, // klar strukturiert fürs Frontend
        });
      }

      res.status(500).json({
        success: false,
        error: "Ein Fehler ist aufgetreten. Bitte versuche es später erneut.",
      });
    }
  });

  app.get("/api/contact", async (_req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json({ success: true, messages });
    } catch (error) {
      console.error("❌ Fehler beim Abrufen der Nachrichten:", error);
      res.status(500).json({ success: false, error: "Fehler beim Abrufen der Nachrichten" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
