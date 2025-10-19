import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Trophy } from "lucide-react";
import Navigation from "@/components/Navigation";
import CompetitionCard from "@/components/CompetitionCard";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const featuredCompetitions = [
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
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(26, 59, 132, 0.95), rgba(17, 155, 194, 0.95)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Compete. Learn. Win.
            </h1>
            <p className="text-xl text-white/90">
              Join the world's largest community of data scientists and machine learning engineers. 
              Participate in competitions, explore datasets, and showcase your skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/competitions">
                <Button size="lg" variant="hero" className="text-lg">
                  Explore Competitions
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg bg-white/10 hover:bg-white/20 text-white border-white/30">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-bold text-accent">2.5M+</div>
              <div className="text-muted-foreground">Active Data Scientists</div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-bold text-accent">1,200+</div>
              <div className="text-muted-foreground">Active Competitions</div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-bold text-accent">$12M+</div>
              <div className="text-muted-foreground">In Prizes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Competitions */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Competitions</h2>
              <p className="text-muted-foreground">Join the most popular competitions happening right now</p>
            </div>
            <Link to="/competitions">
              <Button variant="ghost">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCompetitions.map((competition) => (
              <CompetitionCard key={competition.title} {...competition} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
