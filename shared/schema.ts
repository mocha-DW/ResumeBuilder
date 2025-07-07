import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  personalInfo: jsonb("personal_info").notNull(),
  workExperience: jsonb("work_experience").notNull(),
  education: jsonb("education").notNull(),
  skills: jsonb("skills").notNull(),
  projects: jsonb("projects").notNull(),
  achievements: jsonb("achievements").notNull(),
  certifications: jsonb("certifications").notNull(),
  atsScore: integer("ats_score").default(0),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// Personal Information Schema
export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  professionalTitle: z.string().min(1, "Professional title is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  location: z.string().optional(),
  professionalSummary: z.string().optional(),
});

// Work Experience Schema
export const workExperienceSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  companyName: z.string().min(1, "Company name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isCurrentRole: z.boolean().default(false),
  achievements: z.string().min(1, "Achievements are required"),
});

// Education Schema
export const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  graduationYear: z.string().optional(),
  gpa: z.string().optional(),
});

// Skills Schema
export const skillsSchema = z.object({
  technicalSkills: z.string().min(1, "Technical skills are required"),
  frameworks: z.string().optional(),
  tools: z.string().optional(),
});

// Projects Schema
export const projectSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
  technologiesUsed: z.string().min(1, "Technologies used are required"),
  projectUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  keyFeatures: z.string().optional(),
});

// Achievements Schema
export const achievementSchema = z.object({
  title: z.string().min(1, "Achievement title is required"),
  description: z.string().min(1, "Achievement description is required"),
  date: z.string().optional(),
  issuer: z.string().optional(),
});

// Certifications Schema
export const certificationSchema = z.object({
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string().min(1, "Certification issuer is required"),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().optional().or(z.literal("")),
});

// Resume Schema
export const resumeSchema = z.object({
  personalInfo: personalInfoSchema,
  workExperience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  skills: skillsSchema,
  projects: z.array(projectSchema),
  achievements: z.array(achievementSchema),
  certifications: z.array(certificationSchema),
});

export const insertResumeSchema = createInsertSchema(resumes).pick({
  personalInfo: true,
  workExperience: true,
  education: true,
  skills: true,
  projects: true,
  achievements: true,
  certifications: true,
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type WorkExperience = z.infer<typeof workExperienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Skills = z.infer<typeof skillsSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Achievement = z.infer<typeof achievementSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type ResumeData = z.infer<typeof resumeSchema>;
export type InsertResume = z.infer<typeof insertResumeSchema>;
export type Resume = typeof resumes.$inferSelect;
