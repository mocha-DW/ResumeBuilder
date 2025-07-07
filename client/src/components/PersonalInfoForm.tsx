import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PersonalInfo } from "@shared/schema";
import { User } from "lucide-react";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export default function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <User className="text-primary mr-2 h-5 w-5" />
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="professionalTitle">Professional Title *</Label>
            <Input
              id="professionalTitle"
              value={data.professionalTitle}
              onChange={(e) => handleChange("professionalTitle", e.target.value)}
              placeholder="Software Engineer"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john.doe@email.com"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
            <Input
              id="linkedinUrl"
              type="url"
              value={data.linkedinUrl}
              onChange={(e) => handleChange("linkedinUrl", e.target.value)}
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={data.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="San Francisco, CA"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <Label htmlFor="professionalSummary">Professional Summary</Label>
          <Textarea
            id="professionalSummary"
            value={data.professionalSummary}
            onChange={(e) => handleChange("professionalSummary", e.target.value)}
            placeholder="Enter a brief professional summary highlighting your key achievements and skills..."
            rows={4}
          />
          <p className="text-xs text-gray-500 mt-1">2-3 sentences recommended for ATS optimization</p>
        </div>
      </CardContent>
    </Card>
  );
}
