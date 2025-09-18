import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Store the contact message
      const contactMessage = await storage.createContactMessage(validatedData);
      
      // Log the message for the portfolio owner
      console.log("📧 Neue Kontaktanfrage erhalten:", {
        name: contactMessage.name,
        email: contactMessage.email,
        message: contactMessage.message,
        timestamp: contactMessage.createdAt
      });

      res.status(201).json({ 
        success: true, 
        message: "Nachricht erfolgreich gesendet!",
        id: contactMessage.id 
      });
    } catch (error) {
      console.error("❌ Fehler beim Verarbeiten der Kontaktanfrage:", error);
      
      if (error && typeof error === 'object' && 'issues' in error) {
        const validationError = fromZodError(error as any);
        return res.status(400).json({ 
          success: false, 
          error: "Validierungsfehler",
          details: validationError.message 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." 
      });
    }
  });

  // Get contact messages (for potential admin dashboard later)
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json({ success: true, messages });
    } catch (error) {
      console.error("❌ Fehler beim Abrufen der Nachrichten:", error);
      res.status(500).json({ 
        success: false, 
        error: "Fehler beim Abrufen der Nachrichten" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
