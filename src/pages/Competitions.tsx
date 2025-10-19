import Navigation from "@/components/Navigation";
import CompetitionCard from "@/components/CompetitionCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Competitions = () => {
  const competitions = [
    {
      title: "House Price Prediction Challenge",
      description: "Predict house prices using machine learning algorithms with comprehensive real estate data.",
      prize: "$50,000",
      participants: 2450,
      daysLeft: 45,
      tags: ["Regression", "Real Estate", "ML"],
      difficulty: "Beginner" as const,
    },
    {
      title: "Image Classification Competition",
      description: "Build a model to classify images into multiple categories using deep learning techniques.",
      prize: "$100,000",
      participants: 5280,
      daysLeft: 30,
      tags: ["Computer Vision", "CNN", "Deep Learning"],
      difficulty: "Intermediate" as const,
    },
    {
      title: "NLP Sentiment Analysis",
      description: "Analyze sentiment from customer reviews using natural language processing.",
      prize: "$75,000",
      participants: 3120,
      daysLeft: 60,
      tags: ["NLP", "Text Analysis", "BERT"],
      difficulty: "Advanced" as const,
    },
    {
      title: "Time Series Forecasting",
      description: "Forecast future values based on historical time series data patterns.",
      prize: "$60,000",
      participants: 1890,
      daysLeft: 25,
      tags: ["Time Series", "LSTM", "Forecasting"],
      difficulty: "Intermediate" as const,
    },
    {
      title: "Object Detection Challenge",
      description: "Detect and localize multiple objects in images with bounding boxes.",
      prize: "$120,000",
      participants: 4500,
      daysLeft: 40,
      tags: ["YOLO", "Object Detection", "Computer Vision"],
      difficulty: "Advanced" as const,
    },
    {
      title: "Customer Churn Prediction",
      description: "Predict which customers are likely to leave using classification models.",
      prize: "$45,000",
      participants: 2100,
      daysLeft: 50,
      tags: ["Classification", "Business", "Analytics"],
      difficulty: "Beginner" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Competitions</h1>
          <p className="text-muted-foreground mb-6">
            Discover and participate in data science competitions from around the world
          </p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Search competitions..." 
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map((competition) => (
            <CompetitionCard key={competition.title} {...competition} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Competitions;
