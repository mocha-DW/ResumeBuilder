import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { atsAnalyzer } from "./services/ats-analyzer";
import { resumeGenerator } from "./services/resume-generator";
import { resumeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all resumes
  app.get("/api/resumes", async (req, res) => {
    try {
      const resumes = await storage.getAllResumes();
      res.json(resumes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resumes" });
    }
  });

  // Get specific resume
  app.get("/api/resumes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const resume = await storage.getResume(id);
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      res.json(resume);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resume" });
    }
  });

  // Create new resume
  app.post("/api/resumes", async (req, res) => {
    try {
      const validatedData = resumeSchema.parse(req.body);
      const resume = await storage.createResume(validatedData);
      res.status(201).json(resume);
    } catch (error) {
      res.status(400).json({ message: "Invalid resume data" });
    }
  });

  // Update resume
  app.put("/api/resumes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = resumeSchema.parse(req.body);
      const resume = await storage.updateResume(id, validatedData);
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      res.json(resume);
    } catch (error) {
      res.status(400).json({ message: "Invalid resume data" });
    }
  });

  // Analyze ATS score
  app.post("/api/analyze-ats", async (req, res) => {
    try {
      const validatedData = resumeSchema.parse(req.body);
      const analysis = atsAnalyzer.analyzeResume(validatedData);
      res.json(analysis);
    } catch (error) {
      res.status(400).json({ message: "Invalid resume data for analysis" });
    }
  });

  // Generate resume files
  app.post("/api/generate/:format", async (req, res) => {
    try {
      const format = req.params.format;
      const validatedData = resumeSchema.parse(req.body);
      
      let result: string;
      let contentType: string;
      let filename: string;
      
      switch (format) {
        case 'pdf':
          result = resumeGenerator.generatePDF(validatedData);
          contentType = 'application/pdf';
          filename = `${validatedData.personalInfo.fullName}_resume.pdf`;
          break;
        case 'docx':
          result = resumeGenerator.generateDOCX(validatedData);
          contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          filename = `${validatedData.personalInfo.fullName}_resume.docx`;
          break;
        case 'txt':
          result = resumeGenerator.generateTXT(validatedData);
          contentType = 'text/plain';
          filename = `${validatedData.personalInfo.fullName}_resume.txt`;
          break;
        default:
          return res.status(400).json({ message: "Invalid format" });
      }
      
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.send(result);
    } catch (error) {
      res.status(400).json({ message: "Failed to generate resume" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
