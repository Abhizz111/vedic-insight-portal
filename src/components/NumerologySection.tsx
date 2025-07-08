
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface NumerologySectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  comingSoon?: boolean;
}

const NumerologySection = ({ title, description, icon, gradient, comingSoon = false }: NumerologySectionProps) => {
  const handleClick = () => {
    if (comingSoon) {
      // For now, just show a placeholder message
      alert(`${title} section is coming soon! We'll add detailed information here.`);
    }
  };

  return (
    <Card className={`${gradient} backdrop-blur-lg border-white/20 hover:scale-105 transition-transform duration-300 cursor-pointer`} onClick={handleClick}>
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-3">
          {icon}
        </div>
        <CardTitle className="text-white text-xl">{title}</CardTitle>
        <CardDescription className="text-gray-200 text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {comingSoon ? (
          <div className="space-y-2">
            <p className="text-gray-200 text-sm">Click to explore</p>
            <ExternalLink className="h-4 w-4 text-white/70 mx-auto" />
          </div>
        ) : (
          <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30">
            Explore Now
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default NumerologySection;
