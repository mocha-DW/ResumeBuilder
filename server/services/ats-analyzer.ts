import { ResumeData } from "@shared/schema";

export interface ATSAnalysis {
  overallScore: number;
  formatCompatibility: number;
  keywordOptimization: number;
  sectionStructure: number;
  contactInformation: number;
  suggestions: Array<{
    type: 'warning' | 'success' | 'info';
    title: string;
    description: string;
  }>;
}

export class ATSAnalyzer {
  private techKeywords = [
    'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node.js', 'express',
    'mongodb', 'postgresql', 'mysql', 'aws', 'azure', 'docker', 'kubernetes',
    'microservices', 'api', 'rest', 'graphql', 'git', 'jenkins', 'ci/cd',
    'machine learning', 'cloud architecture', 'devops', 'agile', 'scrum'
  ];

  analyzeResume(resumeData: ResumeData): ATSAnalysis {
    const formatScore = this.analyzeFormat(resumeData);
    const keywordScore = this.analyzeKeywords(resumeData);
    const structureScore = this.analyzeStructure(resumeData);
    const contactScore = this.analyzeContactInfo(resumeData);

    const overallScore = Math.round(
      (formatScore + keywordScore + structureScore + contactScore) / 4
    );

    const suggestions = this.generateSuggestions(resumeData, {
      formatScore,
      keywordScore,
      structureScore,
      contactScore
    });

    return {
      overallScore,
      formatCompatibility: formatScore,
      keywordOptimization: keywordScore,
      sectionStructure: structureScore,
      contactInformation: contactScore,
      suggestions
    };
  }

  private analyzeFormat(resumeData: ResumeData): number {
    // ATS-friendly format analysis
    let score = 95; // Base score for simple format
    
    // Check for proper section structure
    if (resumeData.personalInfo.fullName && resumeData.personalInfo.professionalTitle) {
      score += 3;
    }
    
    return Math.min(score, 100);
  }

  private analyzeKeywords(resumeData: ResumeData): number {
    const allText = this.getAllText(resumeData).toLowerCase();
    const foundKeywords = this.techKeywords.filter(keyword => 
      allText.includes(keyword.toLowerCase())
    );
    
    const keywordDensity = foundKeywords.length / this.techKeywords.length;
    return Math.round(keywordDensity * 100);
  }

  private analyzeStructure(resumeData: ResumeData): number {
    let score = 0;
    
    // Check required sections
    if (resumeData.personalInfo.fullName) score += 20;
    if (resumeData.workExperience.length > 0) score += 30;
    if (resumeData.education.length > 0) score += 20;
    if (resumeData.skills.technicalSkills) score += 30;
    
    return Math.min(score, 100);
  }

  private analyzeContactInfo(resumeData: ResumeData): number {
    let score = 0;
    const { personalInfo } = resumeData;
    
    if (personalInfo.fullName) score += 25;
    if (personalInfo.email) score += 25;
    if (personalInfo.phone) score += 25;
    if (personalInfo.location) score += 25;
    
    return score;
  }

  private getAllText(resumeData: ResumeData): string {
    const texts = [
      resumeData.personalInfo.professionalSummary || '',
      resumeData.skills.technicalSkills || '',
      resumeData.skills.frameworks || '',
      resumeData.skills.tools || '',
      ...resumeData.workExperience.map(exp => exp.achievements || ''),
      ...resumeData.education.map(edu => edu.degree || ''),
      ...resumeData.projects.map(proj => `${proj.projectName} ${proj.description} ${proj.technologiesUsed} ${proj.keyFeatures || ''}`),
      ...resumeData.achievements.map(ach => `${ach.title} ${ach.description}`),
      ...resumeData.certifications.map(cert => `${cert.name} ${cert.issuer}`)
    ];
    
    return texts.join(' ');
  }

  private generateSuggestions(resumeData: ResumeData, scores: any): Array<{
    type: 'warning' | 'success' | 'info';
    title: string;
    description: string;
  }> {
    const suggestions = [];
    
    if (scores.keywordScore < 85) {
      suggestions.push({
        type: 'warning' as const,
        title: 'Add more tech keywords',
        description: 'Include "machine learning", "cloud architecture", "microservices" for better matching'
      });
    }
    
    if (scores.structureScore >= 95) {
      suggestions.push({
        type: 'success' as const,
        title: 'Great format structure',
        description: 'Your resume uses ATS-friendly formatting with clear sections'
      });
    }
    
    if (!resumeData.personalInfo.linkedinUrl) {
      suggestions.push({
        type: 'info' as const,
        title: 'Consider adding LinkedIn profile',
        description: 'LinkedIn profiles help ATS systems verify your professional background'
      });
    }
    
    return suggestions;
  }
}

export const atsAnalyzer = new ATSAnalyzer();
