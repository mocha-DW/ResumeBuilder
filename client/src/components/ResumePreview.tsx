import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResumeData } from "@shared/schema";
import { FileText } from "lucide-react";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
  const { personalInfo, workExperience, education, skills, projects, achievements, certifications } = resumeData;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <FileText className="text-primary mr-2 h-5 w-5" />
            Resume Preview
          </h3>
          <Select defaultValue="ats">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ats">ATS Format</SelectItem>
              <SelectItem value="professional">Professional Format</SelectItem>
              <SelectItem value="minimal">Minimal Format</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-96">
          <div className="bg-white p-6 rounded shadow-sm text-sm leading-relaxed">
            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="text-xl font-bold mb-1 uppercase">
                {personalInfo.fullName || "YOUR NAME"}
              </h1>
              <p className="text-sm">{personalInfo.professionalTitle || "Professional Title"}</p>
              <p className="text-xs mt-1">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.email && personalInfo.phone && <span> • </span>}
                {personalInfo.phone && <span>{personalInfo.phone}</span>}
                {(personalInfo.email || personalInfo.phone) && personalInfo.location && <span> • </span>}
                {personalInfo.location && <span>{personalInfo.location}</span>}
              </p>
            </div>
            
            {/* Professional Summary */}
            {personalInfo.professionalSummary && (
              <div className="mb-4">
                <h2 className="text-sm font-bold border-b border-gray-300 mb-2">PROFESSIONAL SUMMARY</h2>
                <p className="text-xs">{personalInfo.professionalSummary}</p>
              </div>
            )}
            
            {/* Work Experience */}
            {workExperience.length > 0 && (
              <div className="mb-4">
                <h2 className="text-sm font-bold border-b border-gray-300 mb-2">WORK EXPERIENCE</h2>
                {workExperience.map((exp, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-semibold">{exp.jobTitle}</h3>
                      <span className="text-xs">
                        {exp.startDate} - {exp.isCurrentRole ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-medium">{exp.companyName}</p>
                    <div className="text-xs mt-1">
                      {exp.achievements.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Education */}
            {education.length > 0 && (
              <div className="mb-4">
                <h2 className="text-sm font-bold border-b border-gray-300 mb-2">EDUCATION</h2>
                {education.map((edu, index) => (
                  <div key={index} className="flex justify-between items-baseline mb-2">
                    <div>
                      <h3 className="text-sm font-medium">{edu.degree}</h3>
                      <p className="text-xs">{edu.institution}</p>
                    </div>
                    <span className="text-xs">{edu.graduationYear}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Projects */}
            {projects && projects.length > 0 && (
              <div className="mb-4">
                <h2 className="text-sm font-bold border-b border-gray-300 mb-2">PROJECTS</h2>
                {projects.map((project, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-semibold">{project.projectName}</h3>
                      <span className="text-xs">
                        {project.startDate && project.endDate ? `${project.startDate} - ${project.endDate}` : ''}
                      </span>
                    </div>
                    <p className="text-xs font-medium">{project.technologiesUsed}</p>
                    <p className="text-xs mt-1">{project.description}</p>
                    {project.keyFeatures && (
                      <div className="text-xs mt-1">
                        {project.keyFeatures.split('\n').map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {skills.technicalSkills && (
              <div className="mb-4">
                <h2 className="text-sm font-bold border-b border-gray-300 mb-2">TECHNICAL SKILLS</h2>
                <p className="text-xs">{skills.technicalSkills}</p>
                {skills.frameworks && (
                  <p className="text-xs mt-1">
                    <span className="font-medium">Frameworks:</span> {skills.frameworks}
                  </p>
                )}
                {skills.tools && (
                  <p className="text-xs mt-1">
                    <span className="font-medium">Tools:</span> {skills.tools}
                  </p>
                )}
              </div>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <div className="mb-4">
                <h2 className="text-sm font-bold border-b border-gray-300 mb-2">CERTIFICATIONS</h2>
                {certifications.map((cert, index) => (
                  <div key={index} className="flex justify-between items-baseline mb-2">
                    <div>
                      <h3 className="text-sm font-medium">{cert.name}</h3>
                      <p className="text-xs">{cert.issuer}</p>
                    </div>
                    <span className="text-xs">{cert.issueDate}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Achievements */}
            {achievements && achievements.length > 0 && (
              <div>
                <h2 className="text-sm font-bold border-b border-gray-300 mb-2">ACHIEVEMENTS & AWARDS</h2>
                {achievements.map((achievement, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-medium">{achievement.title}</h3>
                      <span className="text-xs">{achievement.date}</span>
                    </div>
                    {achievement.issuer && (
                      <p className="text-xs font-medium">{achievement.issuer}</p>
                    )}
                    <p className="text-xs mt-1">{achievement.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
