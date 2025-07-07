import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface Suggestion {
  type: 'warning' | 'success' | 'info';
  title: string;
  description: string;
}

interface OptimizationSuggestionsProps {
  suggestions: Suggestion[];
}

export default function OptimizationSuggestions({ suggestions }: OptimizationSuggestionsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="text-yellow-500 mt-1 h-4 w-4" />;
      case 'success':
        return <CheckCircle className="text-green-500 mt-1 h-4 w-4" />;
      case 'info':
        return <Info className="text-blue-500 mt-1 h-4 w-4" />;
      default:
        return <Info className="text-blue-500 mt-1 h-4 w-4" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50';
      case 'success':
        return 'bg-green-50';
      case 'info':
        return 'bg-blue-50';
      default:
        return 'bg-blue-50';
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Lightbulb className="text-yellow-500 mr-2 h-5 w-5" />
          Optimization Suggestions
        </h3>
        
        {suggestions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No suggestions available. Add more information to get personalized recommendations.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${getBgColor(suggestion.type)}`}>
                {getIcon(suggestion.type)}
                <div>
                  <p className="text-sm font-medium text-gray-900">{suggestion.title}</p>
                  <p className="text-xs text-gray-600">{suggestion.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
