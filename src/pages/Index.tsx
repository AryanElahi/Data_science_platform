import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Trophy } from "lucide-react";
import Navigation from "@/components/Navigation";
import CompetitionCard from "@/components/CompetitionCard";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const featuredCompetitions = [
    {
      title: "چالش پیش‌بینی قیمت خانه",
      description: "پیش‌بینی قیمت خانه با استفاده از الگوریتم‌های یادگیری ماشین و داده‌های جامع املاک.",
      prize: "۵۰,۰۰۰ دلار",
      participants: 2450,
      daysLeft: 45,
      tags: ["رگرسیون", "املاک", "یادگیری ماشین"],
      difficulty: "Beginner" as const,
    },
    {
      title: "مسابقه طبقه‌بندی تصویر",
      description: "ساخت مدلی برای طبقه‌بندی تصاویر در دسته‌های مختلف با استفاده از تکنیک‌های یادگیری عمیق.",
      prize: "۱۰۰,۰۰۰ دلار",
      participants: 5280,
      daysLeft: 30,
      tags: ["بینایی ماشین", "CNN", "یادگیری عمیق"],
      difficulty: "Intermediate" as const,
    },
    {
      title: "تحلیل احساسات NLP",
      description: "تحلیل احساسات از نظرات مشتریان با استفاده از پردازش زبان طبیعی.",
      prize: "۷۵,۰۰۰ دلار",
      participants: 3120,
      daysLeft: 60,
      tags: ["پردازش زبان طبیعی", "تحلیل متن", "BERT"],
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
              رقابت کن. یاد بگیر. برنده شو.
            </h1>
            <p className="text-xl text-white/90">
              به بزرگ‌ترین جامعه دانشمندان داده و مهندسان یادگیری ماشین جهان بپیوندید.
              در مسابقات شرکت کنید، مجموعه داده‌ها را کاوش کنید و مهارت‌های خود را به نمایش بگذارید.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/competitions">
                <Button size="lg" variant="hero" className="text-lg">
                  کاوش مسابقات
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg bg-white/10 hover:bg-white/20 text-white border-white/30">
                بیشتر بدانید
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
              <div className="text-3xl font-bold text-accent">۲.۵ میلیون+</div>
              <div className="text-muted-foreground">دانشمند داده فعال</div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-bold text-accent">۱,۲۰۰+</div>
              <div className="text-muted-foreground">مسابقه فعال</div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-bold text-accent">۱۲ میلیون+ دلار</div>
              <div className="text-muted-foreground">جوایز</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Competitions */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">مسابقات ویژه</h2>
              <p className="text-muted-foreground">به محبوب‌ترین مسابقاتی که در حال حاضر در جریان هستند بپیوندید</p>
            </div>
            <Link to="/competitions">
              <Button variant="ghost">
                مشاهده همه
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
