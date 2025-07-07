import { resumes, type Resume, type InsertResume } from "@shared/schema";

export interface IStorage {
  getResume(id: number): Promise<Resume | undefined>;
  createResume(resume: InsertResume): Promise<Resume>;
  updateResume(id: number, resume: Partial<InsertResume>): Promise<Resume | undefined>;
  deleteResume(id: number): Promise<boolean>;
  getAllResumes(): Promise<Resume[]>;
}

export class MemStorage implements IStorage {
  private resumes: Map<number, Resume>;
  private currentId: number;

  constructor() {
    this.resumes = new Map();
    this.currentId = 1;
  }

  async getResume(id: number): Promise<Resume | undefined> {
    return this.resumes.get(id);
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const id = this.currentId++;
    const now = new Date().toISOString();
    const resume: Resume = {
      ...insertResume,
      id,
      atsScore: 0,
      createdAt: now,
      updatedAt: now,
      projects: insertResume.projects || [],
      achievements: insertResume.achievements || [],
      certifications: insertResume.certifications || [],
    };
    this.resumes.set(id, resume);
    return resume;
  }

  async updateResume(id: number, updateData: Partial<InsertResume>): Promise<Resume | undefined> {
    const existing = this.resumes.get(id);
    if (!existing) return undefined;

    const updated: Resume = {
      ...existing,
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    this.resumes.set(id, updated);
    return updated;
  }

  async deleteResume(id: number): Promise<boolean> {
    return this.resumes.delete(id);
  }

  async getAllResumes(): Promise<Resume[]> {
    return Array.from(this.resumes.values());
  }
}

export const storage = new MemStorage();
