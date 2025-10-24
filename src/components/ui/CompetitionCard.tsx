import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Calendar, DollarSign } from "lucide-react";

interface CompetitionCardProps {
  title: string;
  description: string;
  prize: string;
  participants: number;
  daysLeft: number;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const CompetitionCard = ({ 
  title, 
  description, 
  prize, 
  participants, 
  daysLeft, 
  tags,
  difficulty 
}: CompetitionCardProps) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/10 text-green-500";
      case "Intermediate": return "bg-yellow-500/10 text-yellow-500";
      case "Advanced": return "bg-red-500/10 text-red-500";
      default: return "bg-muted text-muted-foreground";
    }
  };
  
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge className={getDifficultyColor()}>{difficulty}</Badge>
          <Trophy className="w-5 h-5 text-accent" />
        </div>
        <CardTitle className="text-xl group-hover:text-accent transition-colors">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold text-accent">{prize}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{participants.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{daysLeft} روز باقی مانده</span>
            </div>
          </div>
          
          <Button className="w-full" variant="hero">
            ورود به مسابقه
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitionCard;
