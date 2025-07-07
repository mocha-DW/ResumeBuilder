import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Achievement } from "@shared/schema";
import { Award, Plus, X } from "lucide-react";

interface AchievementsFormProps {
  data: Achievement[];
  onChange: (data: Achievement[]) => void;
}

export default function AchievementsForm({ data, onChange }: AchievementsFormProps) {
  const addAchievement = () => {
    onChange([...data, {
      title: "",
      description: "",
      date: "",
      issuer: "",
    }]);
  };

  const removeAchievement = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateAchievement = (index: number, field: keyof Achievement, value: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Award className="text-primary mr-2 h-5 w-5" />
            Achievements & Awards
          </h3>
          <Button variant="outline" size="sm" onClick={addAchievement}>
            <Plus className="mr-1 h-4 w-4" />
            Add Achievement
          </Button>
        </div>
        
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No achievements added yet. Click "Add Achievement" to highlight your accomplishments.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((achievement, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-sm font-medium text-gray-900">Achievement {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAchievement(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor={`title-${index}`}>Achievement Title *</Label>
                    <Input
                      id={`title-${index}`}
                      value={achievement.title}
                      onChange={(e) => updateAchievement(index, "title", e.target.value)}
                      placeholder="Employee of the Year"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`issuer-${index}`}>Issuer/Organization</Label>
                    <Input
                      id={`issuer-${index}`}
                      value={achievement.issuer}
                      onChange={(e) => updateAchievement(index, "issuer", e.target.value)}
                      placeholder="Google Inc."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`date-${index}`}>Date</Label>
                    <Input
                      id={`date-${index}`}
                      type="month"
                      value={achievement.date}
                      onChange={(e) => updateAchievement(index, "date", e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor={`description-${index}`}>Description *</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={achievement.description}
                    onChange={(e) => updateAchievement(index, "description", e.target.value)}
                    placeholder="Recognized for outstanding performance in leading a team of 10 engineers to deliver a critical project 3 weeks ahead of schedule, resulting in $2M cost savings..."
                    rows={3}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Include specific metrics and impact when possible</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}