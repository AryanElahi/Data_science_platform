import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Download, Eye, ThumbsUp } from "lucide-react";

interface DatasetCardProps {
  title: string;
  description: string;
  size: string;
  downloads: number;
  views: number;
  likes: number;
  tags: string[];
  fileType: string;
}

const DatasetCard = ({ 
  title, 
  description, 
  size, 
  downloads, 
  views, 
  likes,
  tags,
  fileType 
}: DatasetCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary">{fileType}</Badge>
          <Database className="w-5 h-5 text-accent" />
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
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Download className="w-4 h-4" />
              <span>{downloads.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{views.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{likes.toLocaleString()}</span>
            </div>
            <span className="font-semibold">{size}</span>
          </div>
          
          <div className="flex space-x-2">
            <Button className="flex-1" variant="hero">
              دانلود
            </Button>
            <Button variant="outline">
              مشاهده
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatasetCard;
