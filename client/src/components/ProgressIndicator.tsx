import { Card, CardContent } from "@/components/ui/card";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export default function ProgressIndicator({ currentStep, totalSteps, steps }: ProgressIndicatorProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Resume Builder Progress</h2>
          <span className="text-sm text-gray-600">Step {currentStep + 1} of {totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          {steps.map((step, index) => (
            <span key={index} className={index <= currentStep ? "text-primary font-medium" : ""}>
              {step}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
