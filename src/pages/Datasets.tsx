import Navigation from "@/components/Navigation";
import DatasetCard from "@/components/DatasetCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Datasets = () => {
  const datasets = [
    {
      title: "Global Temperature Data",
      description: "Historical temperature records from weather stations worldwide (1900-2023)",
      size: "1.2 GB",
      downloads: 15420,
      views: 48230,
      likes: 2340,
      tags: ["Climate", "Time Series", "Weather"],
      fileType: "CSV",
    },
    {
      title: "E-commerce Customer Reviews",
      description: "Product reviews with ratings and sentiment labels from major online retailers",
      size: "850 MB",
      downloads: 28900,
      views: 72100,
      likes: 4120,
      tags: ["NLP", "Sentiment", "Text"],
      fileType: "JSON",
    },
    {
      title: "Medical Imaging Dataset",
      description: "Annotated X-ray and MRI images for disease classification research",
      size: "5.4 GB",
      downloads: 9200,
      views: 34500,
      likes: 1890,
      tags: ["Healthcare", "Images", "Classification"],
      fileType: "DICOM",
    },
    {
      title: "Stock Market Historical Data",
      description: "Daily stock prices and trading volumes for S&P 500 companies (2000-2023)",
      size: "620 MB",
      downloads: 21300,
      views: 58900,
      likes: 3210,
      tags: ["Finance", "Time Series", "Trading"],
      fileType: "CSV",
    },
    {
      title: "Social Media Analytics",
      description: "User engagement metrics and content performance data from social platforms",
      size: "2.1 GB",
      downloads: 12800,
      views: 41200,
      likes: 1760,
      tags: ["Social Media", "Analytics", "Marketing"],
      fileType: "Parquet",
    },
    {
      title: "Vehicle Detection Images",
      description: "Labeled images of various vehicle types for object detection training",
      size: "3.8 GB",
      downloads: 18700,
      views: 52300,
      likes: 2890,
      tags: ["Computer Vision", "Detection", "Autonomous"],
      fileType: "JPEG",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Datasets</h1>
          <p className="text-muted-foreground mb-6">
            Explore thousands of datasets for your machine learning projects
          </p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Search datasets..." 
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {datasets.map((dataset) => (
            <DatasetCard key={dataset.title} {...dataset} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Datasets;
