import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Education } from "@shared/schema";
import { GraduationCap, Plus, X } from "lucide-react";

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const addEducation = () => {
    onChange([...data, {
      degree: "",
      institution: "",
      graduationYear: "",
      gpa: "",
    }]);
  };

  const removeEducation = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <GraduationCap className="text-primary mr-2 h-5 w-5" />
            Education
          </h3>
          <Button variant="outline" size="sm" onClick={addEducation}>
            <Plus className="mr-1 h-4 w-4" />
            Add Education
          </Button>
        </div>
        
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No education added yet. Click "Add Education" to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((education, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-sm font-medium text-gray-900">Education {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`degree-${index}`}>Degree *</Label>
                    <Input
                      id={`degree-${index}`}
                      value={education.degree}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      placeholder="Bachelor of Science in Computer Science"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`institution-${index}`}>Institution *</Label>
                    <Input
                      id={`institution-${index}`}
                      value={education.institution}
                      onChange={(e) => updateEducation(index, "institution", e.target.value)}
                      placeholder="Stanford University"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`graduationYear-${index}`}>Graduation Year</Label>
                    <Input
                      id={`graduationYear-${index}`}
                      type="number"
                      value={education.graduationYear}
                      onChange={(e) => updateEducation(index, "graduationYear", e.target.value)}
                      placeholder="2020"
                      min="1950"
                      max="2030"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`gpa-${index}`}>GPA (Optional)</Label>
                    <Input
                      id={`gpa-${index}`}
                      value={education.gpa}
                      onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                      placeholder="3.8"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
