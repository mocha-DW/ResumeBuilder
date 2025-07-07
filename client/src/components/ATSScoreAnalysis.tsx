import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";

interface ATSAnalysisData {
  overallScore: number;
  formatCompatibility: number;
  keywordOptimization: number;
  sectionStructure: number;
  contactInformation: number;
}

interface ATSScoreAnalysisProps {
  analysis?: ATSAnalysisData;
}

export default function ATSScoreAnalysis({ analysis }: ATSScoreAnalysisProps) {
  const defaultAnalysis = {
    overallScore: 0,
    formatCompatibility: 0,
    keywordOptimization: 0,
    sectionStructure: 0,
    contactInformation: 0,
  };

  const data = analysis || defaultAnalysis;
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return "Excellent compatibility with most ATS systems";
    if (score >= 70) return "Good compatibility with most ATS systems";
    return "Needs improvement for better ATS compatibility";
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <TrendingUp className="text-primary mr-2 h-5 w-5" />
          ATS Compatibility Analysis
        </h3>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall ATS Score</span>
            <span className="text-2xl font-bold text-green-600">{data.overallScore}%</span>
          </div>
          <Progress value={data.overallScore} className="h-3" />
          <p className="text-xs text-gray-500 mt-1">{getScoreText(data.overallScore)}</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Format Compatibility</span>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${getScoreColor(data.formatCompatibility)}`} />
              <span className="text-sm font-medium">{data.formatCompatibility}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Keyword Optimization</span>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${getScoreColor(data.keywordOptimization)}`} />
              <span className="text-sm font-medium">{data.keywordOptimization}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Section Structure</span>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${getScoreColor(data.sectionStructure)}`} />
              <span className="text-sm font-medium">{data.sectionStructure}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Contact Information</span>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${getScoreColor(data.contactInformation)}`} />
              <span className="text-sm font-medium">{data.contactInformation}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
