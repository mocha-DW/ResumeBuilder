import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import WorkExperienceForm from "@/components/WorkExperienceForm";
import EducationForm from "@/components/EducationForm";
import SkillsForm from "@/components/SkillsForm";
import ProjectsForm from "@/components/ProjectsForm";
import AchievementsForm from "@/components/AchievementsForm";
import CertificationsForm from "@/components/CertificationsForm";
import AIAssistant from "@/components/AIAssistant";
import ATSScoreAnalysis from "@/components/ATSScoreAnalysis";
import OptimizationSuggestions from "@/components/OptimizationSuggestions";
import ResumePreview from "@/components/ResumePreview";
import DownloadOptions from "@/components/DownloadOptions";
import ProgressIndicator from "@/components/ProgressIndicator";
import { ResumeData, PersonalInfo, WorkExperience, Education, Skills, Project, Achievement, Certification } from "@shared/schema";
import { FileText, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const defaultPersonalInfo: PersonalInfo = {
  fullName: "",
  professionalTitle: "",
  email: "",
  phone: "",
  linkedinUrl: "",
  location: "",
  professionalSummary: "",
};

const defaultSkills: Skills = {
  technicalSkills: "",
  frameworks: "",
  tools: "",
};

export default function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(defaultPersonalInfo);
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skills>(defaultSkills);
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [atsScore, setAtsScore] = useState(92);

  const resumeData: ResumeData = {
    personalInfo,
    workExperience,
    education,
    skills,
    projects,
    achievements,
    certifications,
  };

  const { data: atsAnalysis, refetch: refetchAnalysis } = useQuery({
    queryKey: ["/api/analyze-ats"],
    queryFn: async () => {
      const response = await fetch("/api/analyze-ats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
      });
      if (!response.ok) throw new Error("Failed to analyze ATS");
      return response.json();
    },
    enabled: personalInfo.fullName.length > 0,
  });

  const handleSaveDraft = async () => {
    try {
      await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
      });
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
  };

  const handleAISuggestion = (field: string, value: string) => {
    if (field === 'professionalSummary') {
      setPersonalInfo({ ...personalInfo, professionalSummary: value });
    } else if (field === 'technicalSkills') {
      setSkills({ ...skills, technicalSkills: value });
    } else if (field.startsWith('workExperience[')) {
      const match = field.match(/workExperience\[(\d+)\]\.achievements/);
      if (match) {
        const index = parseInt(match[1]);
        const updated = [...workExperience];
        updated[index] = { ...updated[index], achievements: value };
        setWorkExperience(updated);
      }
    }
  };

  const steps = [
    { label: "Personal", component: <PersonalInfoForm data={personalInfo} onChange={setPersonalInfo} /> },
    { label: "Experience", component: <WorkExperienceForm data={workExperience} onChange={setWorkExperience} /> },
    { label: "Education", component: <EducationForm data={education} onChange={setEducation} /> },
    { label: "Skills", component: <SkillsForm data={skills} onChange={setSkills} /> },
    { label: "Projects", component: <ProjectsForm data={projects} onChange={setProjects} /> },
    { label: "Achievements", component: <AchievementsForm data={achievements} onChange={setAchievements} /> },
    { label: "Certifications", component: <CertificationsForm data={certifications} onChange={setCertifications} /> },
    { label: "Review", component: <div>Review your resume</div> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">ATS Resume Builder</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-gray-600">AI-Enhanced</span>
              </div>
              <div className="text-sm text-gray-600">ATS Compatibility</div>
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {atsAnalysis?.overallScore || atsScore}%
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            <ProgressIndicator 
              currentStep={currentStep} 
              totalSteps={steps.length}
              steps={steps.map(step => step.label)}
            />
            
            {steps[currentStep].component}

            <div className="flex space-x-2">
              <Button 
                onClick={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
                variant="outline"
                disabled={currentStep === 0}
                className="flex-1"
              >
                Previous
              </Button>
              <Button 
                onClick={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}
                className="flex-1"
                disabled={currentStep === steps.length - 1}
              >
                {currentStep === steps.length - 1 ? "Review" : "Next"}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSaveDraft}
              >
                Save Draft
              </Button>
            </div>
          </div>

          {/* Right Panel - Preview & Analysis */}
          <div className="space-y-6">
            <AIAssistant 
              resumeData={resumeData} 
              onSuggestionApply={handleAISuggestion} 
            />
            <ATSScoreAnalysis analysis={atsAnalysis} />
            <OptimizationSuggestions suggestions={atsAnalysis?.suggestions || []} />
            <ResumePreview resumeData={resumeData} />
            <DownloadOptions resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
