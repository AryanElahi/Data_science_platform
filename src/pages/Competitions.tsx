import Navigation from "@/components/Navigation";
import CompetitionCard from "@/components/CompetitionCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Competitions = () => {
  const competitions = [
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
    {
      title: "پیش‌بینی سری زمانی",
      description: "پیش‌بینی مقادیر آینده بر اساس الگوهای داده‌های سری زمانی تاریخی.",
      prize: "۶۰,۰۰۰ دلار",
      participants: 1890,
      daysLeft: 25,
      tags: ["سری زمانی", "LSTM", "پیش‌بینی"],
      difficulty: "Intermediate" as const,
    },
    {
      title: "چالش تشخیص اشیاء",
      description: "تشخیص و مکان‌یابی اشیاء متعدد در تصاویر با کادرهای محدودکننده.",
      prize: "۱۲۰,۰۰۰ دلار",
      participants: 4500,
      daysLeft: 40,
      tags: ["YOLO", "تشخیص اشیاء", "بینایی ماشین"],
      difficulty: "Advanced" as const,
    },
    {
      title: "پیش‌بینی ریزش مشتری",
      description: "پیش‌بینی اینکه کدام مشتریان احتمالاً با استفاده از مدل‌های طبقه‌بندی ترک می‌کنند.",
      prize: "۴۵,۰۰۰ دلار",
      participants: 2100,
      daysLeft: 50,
      tags: ["طبقه‌بندی", "کسب‌وکار", "تحلیل داده"],
      difficulty: "Beginner" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">همه مسابقات</h1>
          <p className="text-muted-foreground mb-6">
            مسابقات علم داده را از سراسر جهان کشف کنید و در آنها شرکت کنید
          </p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="جستجوی مسابقات..." 
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
