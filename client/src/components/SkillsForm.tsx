import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skills } from "@shared/schema";
import { Settings } from "lucide-react";

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const handleChange = (field: keyof Skills, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Settings className="text-primary mr-2 h-5 w-5" />
          Skills & Technologies
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="technicalSkills">Technical Skills *</Label>
            <Input
              id="technicalSkills"
              value={data.technicalSkills}
              onChange={(e) => handleChange("technicalSkills", e.target.value)}
              placeholder="JavaScript, Python, React, Node.js, AWS, Docker..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
          </div>
          
          <div>
            <Label htmlFor="frameworks">Frameworks & Libraries</Label>
            <Input
              id="frameworks"
              value={data.frameworks}
              onChange={(e) => handleChange("frameworks", e.target.value)}
              placeholder="React, Angular, Vue.js, Express, Django..."
            />
          </div>
          
          <div>
            <Label htmlFor="tools">Tools & Platforms</Label>
            <Input
              id="tools"
              value={data.tools}
              onChange={(e) => handleChange("tools", e.target.value)}
              placeholder="Git, Jenkins, Kubernetes, MongoDB, PostgreSQL..."
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
