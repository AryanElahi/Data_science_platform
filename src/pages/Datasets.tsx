import Navigation from "@/components/Navigation";
import DatasetCard from "@/components/DatasetCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Datasets = () => {
  const datasets = [
    {
      title: "داده‌های دمای جهانی",
      description: "سوابق تاریخی دما از ایستگاه‌های هواشناسی در سراسر جهان (۱۹۰۰-۲۰۲۳)",
      size: "1.2 GB",
      downloads: 15420,
      views: 48230,
      likes: 2340,
      tags: ["آب‌وهوا", "سری زمانی", "هواشناسی"],
      fileType: "CSV",
    },
    {
      title: "نظرات مشتریان تجارت الکترونیک",
      description: "نظرات محصولات با رتبه‌بندی و برچسب‌های احساسی از خرده‌فروشان آنلاین بزرگ",
      size: "850 MB",
      downloads: 28900,
      views: 72100,
      likes: 4120,
      tags: ["پردازش زبان طبیعی", "احساسات", "متن"],
      fileType: "JSON",
    },
    {
      title: "مجموعه داده تصاویر پزشکی",
      description: "تصاویر اشعه ایکس و MRI با حاشیه‌نویسی برای تحقیقات طبقه‌بندی بیماری",
      size: "5.4 GB",
      downloads: 9200,
      views: 34500,
      likes: 1890,
      tags: ["بهداشت و درمان", "تصاویر", "طبقه‌بندی"],
      fileType: "DICOM",
    },
    {
      title: "داده‌های تاریخی بازار سهام",
      description: "قیمت‌های روزانه سهام و حجم معاملات برای شرکت‌های S&P 500 (۲۰۰۰-۲۰۲۳)",
      size: "620 MB",
      downloads: 21300,
      views: 58900,
      likes: 3210,
      tags: ["مالی", "سری زمانی", "معاملات"],
      fileType: "CSV",
    },
    {
      title: "تحلیل شبکه‌های اجتماعی",
      description: "معیارهای تعامل کاربران و داده‌های عملکرد محتوا از پلتفرم‌های اجتماعی",
      size: "2.1 GB",
      downloads: 12800,
      views: 41200,
      likes: 1760,
      tags: ["شبکه‌های اجتماعی", "تحلیل", "بازاریابی"],
      fileType: "Parquet",
    },
    {
      title: "تصاویر تشخیص وسایل نقلیه",
      description: "تصاویر برچسب‌گذاری شده انواع وسایل نقلیه برای آموزش تشخیص اشیاء",
      size: "3.8 GB",
      downloads: 18700,
      views: 52300,
      likes: 2890,
      tags: ["بینایی ماشین", "تشخیص", "خودران"],
      fileType: "JPEG",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">مجموعه داده‌ها</h1>
          <p className="text-muted-foreground mb-6">
            هزاران مجموعه داده را برای پروژه‌های یادگیری ماشین خود کاوش کنید
          </p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="جستجوی مجموعه داده‌ها..." 
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
