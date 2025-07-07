import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { WorkExperience } from "@shared/schema";
import { Briefcase, Plus, X } from "lucide-react";

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

export default function WorkExperienceForm({ data, onChange }: WorkExperienceFormProps) {
  const addExperience = () => {
    onChange([...data, {
      jobTitle: "",
      companyName: "",
      startDate: "",
      endDate: "",
      isCurrentRole: false,
      achievements: "",
    }]);
  };

  const removeExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: keyof WorkExperience, value: string | boolean) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Briefcase className="text-primary mr-2 h-5 w-5" />
            Work Experience
          </h3>
          <Button variant="outline" size="sm" onClick={addExperience}>
            <Plus className="mr-1 h-4 w-4" />
            Add Experience
          </Button>
        </div>
        
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No work experience added yet. Click "Add Experience" to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((experience, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-sm font-medium text-gray-900">Experience {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor={`jobTitle-${index}`}>Job Title *</Label>
                    <Input
                      id={`jobTitle-${index}`}
                      value={experience.jobTitle}
                      onChange={(e) => updateExperience(index, "jobTitle", e.target.value)}
                      placeholder="Senior Software Engineer"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`companyName-${index}`}>Company Name *</Label>
                    <Input
                      id={`companyName-${index}`}
                      value={experience.companyName}
                      onChange={(e) => updateExperience(index, "companyName", e.target.value)}
                      placeholder="Google"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`startDate-${index}`}>Start Date *</Label>
                    <Input
                      id={`startDate-${index}`}
                      type="month"
                      value={experience.startDate}
                      onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`endDate-${index}`}>End Date</Label>
                    <Input
                      id={`endDate-${index}`}
                      type="month"
                      value={experience.endDate}
                      onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                      disabled={experience.isCurrentRole}
                    />
                    <div className="flex items-center mt-2">
                      <Checkbox
                        id={`isCurrentRole-${index}`}
                        checked={experience.isCurrentRole}
                        onCheckedChange={(checked) => {
                          updateExperience(index, "isCurrentRole", checked as boolean);
                          if (checked) {
                            updateExperience(index, "endDate", "");
                          }
                        }}
                      />
                      <Label htmlFor={`isCurrentRole-${index}`} className="ml-2 text-sm">
                        Currently employed here
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor={`achievements-${index}`}>Key Achievements & Responsibilities</Label>
                  <Textarea
                    id={`achievements-${index}`}
                    value={experience.achievements}
                    onChange={(e) => updateExperience(index, "achievements", e.target.value)}
                    placeholder="• Developed scalable microservices architecture serving 10M+ users daily&#10;• Led team of 5 engineers in implementing CI/CD pipeline reducing deployment time by 60%&#10;• Optimized database queries resulting in 40% performance improvement"
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">Use bullet points and quantify achievements when possible</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
