import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResumeData } from "@shared/schema";
import { Download, FileText, File, FileSpreadsheet, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DownloadOptionsProps {
  resumeData: ResumeData;
}

export default function DownloadOptions({ resumeData }: DownloadOptionsProps) {
  const { toast } = useToast();

  const handleDownload = async (format: string) => {
    try {
      const response = await fetch(`/api/generate/${format}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${resumeData.personalInfo.fullName}_resume.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Download Started",
        description: `Your resume is being downloaded in ${format.toUpperCase()} format.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Download className="text-primary mr-2 h-5 w-5" />
          Download Resume
        </h3>
        
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-between p-4 h-auto"
            onClick={() => handleDownload('pdf')}
          >
            <div className="flex items-center">
              <FileText className="text-red-500 mr-3 h-5 w-5" />
              <div className="text-left">
                <p className="text-sm font-medium">Download PDF</p>
                <p className="text-xs text-gray-500">Best for most ATS systems (99% compatibility)</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Recommended
            </Badge>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-between p-4 h-auto"
            onClick={() => handleDownload('docx')}
          >
            <div className="flex items-center">
              <File className="text-blue-500 mr-3 h-5 w-5" />
              <div className="text-left">
                <p className="text-sm font-medium">Download DOCX</p>
                <p className="text-xs text-gray-500">Perfect for Microsoft-based ATS (97% compatibility)</p>
              </div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-between p-4 h-auto"
            onClick={() => handleDownload('txt')}
          >
            <div className="flex items-center">
              <FileSpreadsheet className="text-gray-500 mr-3 h-5 w-5" />
              <div className="text-left">
                <p className="text-sm font-medium">Download TXT</p>
                <p className="text-xs text-gray-500">Plain text for maximum compatibility (100%)</p>
              </div>
            </div>
          </Button>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            <Info className="inline mr-1 h-3 w-3" />
            All formats are optimized for ATS parsing and include proper formatting for maximum compatibility.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
