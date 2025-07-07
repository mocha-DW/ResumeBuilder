import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ResumeData } from "@shared/schema";
import { Bot, Wand2, Lightbulb, Target, Zap, Sparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AIAssistantProps {
  resumeData: ResumeData;
  onSuggestionApply: (field: string, value: string) => void;
}

interface AISuggestion {
  type: 'content' | 'keyword' | 'structure' | 'achievement';
  field: string;
  original: string;
  suggested: string;
  reason: string;
  impact: 'high' | 'medium' | 'low';
}

export default function AIAssistant({ resumeData, onSuggestionApply }: AIAssistantProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [customPrompt, setCustomPrompt] = useState("");
  const { toast } = useToast();

  const analyzeResume = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic suggestions
    setTimeout(() => {
      const newSuggestions: AISuggestion[] = [];
      
      // Check professional summary
      if (resumeData.personalInfo.professionalSummary) {
        const summary = resumeData.personalInfo.professionalSummary;
        if (summary.length < 100) {
          newSuggestions.push({
            type: 'content',
            field: 'professionalSummary',
            original: summary,
            suggested: `${summary} Experienced in developing scalable applications with modern frameworks, leading cross-functional teams, and implementing best practices for code quality and system architecture.`,
            reason: 'Professional summary too brief - expand with specific skills and achievements',
            impact: 'high'
          });
        }
      }
      
      // Check work experience achievements
      resumeData.workExperience.forEach((exp, index) => {
        if (exp.achievements && !exp.achievements.includes('%') && !exp.achievements.includes('$')) {
          newSuggestions.push({
            type: 'achievement',
            field: `workExperience[${index}].achievements`,
            original: exp.achievements,
            suggested: `${exp.achievements}\n• Improved system performance by 40% through code optimization\n• Led team of 5 engineers resulting in 25% faster delivery times\n• Reduced deployment errors by 60% through automated testing implementation`,
            reason: 'Add quantifiable metrics to demonstrate impact',
            impact: 'high'
          });
        }
      });
      
      // Check technical skills for AI/ML keywords
      if (resumeData.skills.technicalSkills) {
        const skills = resumeData.skills.technicalSkills.toLowerCase();
        if (!skills.includes('ai') && !skills.includes('machine learning') && !skills.includes('tensorflow')) {
          newSuggestions.push({
            type: 'keyword',
            field: 'technicalSkills',
            original: resumeData.skills.technicalSkills,
            suggested: `${resumeData.skills.technicalSkills}, Machine Learning, AI/ML, TensorFlow, PyTorch, Data Science, Natural Language Processing`,
            reason: 'Add trending AI/ML keywords for better ATS matching',
            impact: 'medium'
          });
        }
      }
      
      // Check for cloud technologies
      if (resumeData.skills.technicalSkills) {
        const skills = resumeData.skills.technicalSkills.toLowerCase();
        if (!skills.includes('aws') && !skills.includes('azure') && !skills.includes('gcp')) {
          newSuggestions.push({
            type: 'keyword',
            field: 'technicalSkills',
            original: resumeData.skills.technicalSkills,
            suggested: `${resumeData.skills.technicalSkills}, AWS, Azure, Google Cloud Platform, Docker, Kubernetes, CI/CD, DevOps`,
            reason: 'Add cloud technologies for modern tech stack appeal',
            impact: 'high'
          });
        }
      }
      
      setSuggestions(newSuggestions);
      setIsAnalyzing(false);
      
      toast({
        title: "AI Analysis Complete",
        description: `Found ${newSuggestions.length} optimization opportunities`,
      });
    }, 2000);
  };

  const applySuggestion = (suggestion: AISuggestion) => {
    onSuggestionApply(suggestion.field, suggestion.suggested);
    setSuggestions(suggestions.filter(s => s !== suggestion));
    
    toast({
      title: "Suggestion Applied",
      description: "Resume content has been updated with AI recommendations",
    });
  };

  const generateCustomContent = () => {
    if (!customPrompt.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      const generatedContent = `Based on your request: "${customPrompt}", here's an optimized suggestion:

• Developed and deployed scalable web applications using modern technologies
• Implemented responsive design principles ensuring cross-browser compatibility
• Collaborated with product managers and designers to deliver user-centric solutions
• Optimized application performance resulting in 50% faster load times
• Maintained code quality through unit testing and code reviews`;

      setSuggestions([...suggestions, {
        type: 'content',
        field: 'custom',
        original: customPrompt,
        suggested: generatedContent,
        reason: 'AI-generated content based on your custom prompt',
        impact: 'medium'
      }]);
      
      setIsAnalyzing(false);
      setCustomPrompt("");
      
      toast({
        title: "Content Generated",
        description: "AI has created optimized content based on your request",
      });
    }, 1500);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high': return <Zap className="h-3 w-3" />;
      case 'medium': return <Target className="h-3 w-3" />;
      case 'low': return <Lightbulb className="h-3 w-3" />;
      default: return <Sparkles className="h-3 w-3" />;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Bot className="text-primary mr-2 h-5 w-5" />
            AI Resume Assistant
          </h3>
          <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
            AI-Powered
          </Badge>
        </div>
        
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button 
              onClick={analyzeResume}
              disabled={isAnalyzing}
              className="flex-1"
            >
              {isAnalyzing ? (
                <>
                  <Bot className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Analyze & Optimize
                </>
              )}
            </Button>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Custom AI Content Generation</h4>
            <Textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Describe what you want to improve or generate (e.g., 'Write achievements for a senior developer role at a fintech company')"
              rows={2}
            />
            <Button 
              onClick={generateCustomContent}
              disabled={isAnalyzing || !customPrompt.trim()}
              size="sm"
              className="mt-2"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              Generate Content
            </Button>
          </div>
          
          {suggestions.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">AI Recommendations</h4>
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={`text-xs ${getImpactColor(suggestion.impact)}`}>
                            {getImpactIcon(suggestion.impact)}
                            <span className="ml-1 capitalize">{suggestion.impact} Impact</span>
                          </Badge>
                          <span className="text-xs text-gray-500 capitalize">{suggestion.type}</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => applySuggestion(suggestion)}
                          className="h-7"
                        >
                          Apply
                        </Button>
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-2">{suggestion.reason}</p>
                      
                      <div className="bg-gray-50 rounded p-2 text-xs">
                        <div className="text-gray-500 mb-1">Suggested improvement:</div>
                        <div className="text-gray-900">{suggestion.suggested}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              <Bot className="inline mr-1 h-3 w-3" />
              AI recommendations are based on current industry trends and ATS optimization best practices.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}