import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Project } from "@shared/schema";
import { FolderOpen, Plus, X, ExternalLink, Github } from "lucide-react";

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export default function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const addProject = () => {
    onChange([...data, {
      projectName: "",
      description: "",
      technologiesUsed: "",
      projectUrl: "",
      githubUrl: "",
      startDate: "",
      endDate: "",
      keyFeatures: "",
    }]);
  };

  const removeProject = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <FolderOpen className="text-primary mr-2 h-5 w-5" />
            Projects
          </h3>
          <Button variant="outline" size="sm" onClick={addProject}>
            <Plus className="mr-1 h-4 w-4" />
            Add Project
          </Button>
        </div>
        
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No projects added yet. Click "Add Project" to showcase your work.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-sm font-medium text-gray-900">Project {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProject(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor={`projectName-${index}`}>Project Name *</Label>
                    <Input
                      id={`projectName-${index}`}
                      value={project.projectName}
                      onChange={(e) => updateProject(index, "projectName", e.target.value)}
                      placeholder="E-commerce Platform"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`technologiesUsed-${index}`}>Technologies Used *</Label>
                    <Input
                      id={`technologiesUsed-${index}`}
                      value={project.technologiesUsed}
                      onChange={(e) => updateProject(index, "technologiesUsed", e.target.value)}
                      placeholder="React, Node.js, PostgreSQL, AWS"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                    <Input
                      id={`startDate-${index}`}
                      type="month"
                      value={project.startDate}
                      onChange={(e) => updateProject(index, "startDate", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`endDate-${index}`}>End Date</Label>
                    <Input
                      id={`endDate-${index}`}
                      type="month"
                      value={project.endDate}
                      onChange={(e) => updateProject(index, "endDate", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`projectUrl-${index}`}>Project URL</Label>
                    <div className="relative">
                      <Input
                        id={`projectUrl-${index}`}
                        type="url"
                        value={project.projectUrl}
                        onChange={(e) => updateProject(index, "projectUrl", e.target.value)}
                        placeholder="https://myproject.com"
                      />
                      <ExternalLink className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor={`githubUrl-${index}`}>GitHub URL</Label>
                    <div className="relative">
                      <Input
                        id={`githubUrl-${index}`}
                        type="url"
                        value={project.githubUrl}
                        onChange={(e) => updateProject(index, "githubUrl", e.target.value)}
                        placeholder="https://github.com/username/project"
                      />
                      <Github className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`description-${index}`}>Project Description *</Label>
                    <Textarea
                      id={`description-${index}`}
                      value={project.description}
                      onChange={(e) => updateProject(index, "description", e.target.value)}
                      placeholder="Built a full-stack e-commerce platform with secure payment processing, inventory management, and real-time order tracking..."
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`keyFeatures-${index}`}>Key Features & Achievements</Label>
                    <Textarea
                      id={`keyFeatures-${index}`}
                      value={project.keyFeatures}
                      onChange={(e) => updateProject(index, "keyFeatures", e.target.value)}
                      placeholder="• Implemented secure payment gateway with 99.9% uptime&#10;• Built responsive UI supporting 50+ concurrent users&#10;• Integrated with third-party APIs for real-time data"
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">Use bullet points and quantify achievements when possible</p>
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