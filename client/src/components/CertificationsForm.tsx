import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Certification } from "@shared/schema";
import { Shield, Plus, X, ExternalLink } from "lucide-react";

interface CertificationsFormProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export default function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const addCertification = () => {
    onChange([...data, {
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      credentialUrl: "",
    }]);
  };

  const removeCertification = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Shield className="text-primary mr-2 h-5 w-5" />
            Certifications & Licenses
          </h3>
          <Button variant="outline" size="sm" onClick={addCertification}>
            <Plus className="mr-1 h-4 w-4" />
            Add Certification
          </Button>
        </div>
        
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No certifications added yet. Click "Add Certification" to showcase your credentials.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((certification, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-sm font-medium text-gray-900">Certification {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCertification(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor={`name-${index}`}>Certification Name *</Label>
                    <Input
                      id={`name-${index}`}
                      value={certification.name}
                      onChange={(e) => updateCertification(index, "name", e.target.value)}
                      placeholder="AWS Certified Solutions Architect"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`issuer-${index}`}>Issuing Organization *</Label>
                    <Input
                      id={`issuer-${index}`}
                      value={certification.issuer}
                      onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                      placeholder="Amazon Web Services"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`issueDate-${index}`}>Issue Date</Label>
                    <Input
                      id={`issueDate-${index}`}
                      type="month"
                      value={certification.issueDate}
                      onChange={(e) => updateCertification(index, "issueDate", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`expiryDate-${index}`}>Expiry Date</Label>
                    <Input
                      id={`expiryDate-${index}`}
                      type="month"
                      value={certification.expiryDate}
                      onChange={(e) => updateCertification(index, "expiryDate", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`credentialId-${index}`}>Credential ID</Label>
                    <Input
                      id={`credentialId-${index}`}
                      value={certification.credentialId}
                      onChange={(e) => updateCertification(index, "credentialId", e.target.value)}
                      placeholder="ABC123456789"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`credentialUrl-${index}`}>Credential URL</Label>
                    <div className="relative">
                      <Input
                        id={`credentialUrl-${index}`}
                        type="url"
                        value={certification.credentialUrl}
                        onChange={(e) => updateCertification(index, "credentialUrl", e.target.value)}
                        placeholder="https://www.credly.com/badges/..."
                      />
                      <ExternalLink className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
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