import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Award, Star, TrendingUp, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";

const Profile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('profileImage');
    if (saved) setProfileImage(saved);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImage(result);
        localStorage.setItem('profileImage', result);
      };
      reader.readAsDataURL(file);
    }
  };
  const userStats = {
    name: "الکس علم داده",
    username: "alex_ds_2024",
    tier: "متخصص",
    rank: 156,
    totalCompetitions: 23,
    medalsGold: 3,
    medalsSilver: 5,
    medalsBronze: 7,
    totalSubmissions: 189,
    bestScore: 0.9654,
    joinDate: "ژانویه ۲۰۲۳",
  };

  const recentCompetitions = [
    { name: "پیش‌بینی قیمت خانه", rank: 12, medal: "طلا", score: 0.9654 },
    { name: "طبقه‌بندی تصویر", rank: 45, medal: "نقره", score: 0.9123 },
    { name: "تحلیل احساسات NLP", rank: 89, medal: "برنز", score: 0.8876 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative group">
                  <Avatar className="w-24 h-24">
                    {profileImage && <AvatarImage src={profileImage} alt="Profile" />}
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-accent text-white">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="w-6 h-6 text-white" />
                  </button>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
              <CardTitle className="text-2xl">{userStats.name}</CardTitle>
              <CardDescription>@{userStats.username}</CardDescription>
              <Badge className="mt-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                {userStats.tier}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">رتبه جهانی</span>
                <span className="font-bold text-accent">#{userStats.rank}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">بهترین امتیاز</span>
                <span className="font-mono font-bold">{userStats.bestScore}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">تاریخ عضویت</span>
                <span className="font-medium">{userStats.joinDate}</span>
              </div>
              <Button className="w-full" variant="hero">
                ویرایش پروفایل
              </Button>
            </CardContent>
          </Card>

          {/* Stats and Achievements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>آمار</CardTitle>
                <CardDescription>نمای کلی عملکرد شما</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Trophy className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-bold">{userStats.totalCompetitions}</div>
                    <div className="text-sm text-muted-foreground">مسابقات</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <TrendingUp className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-bold">{userStats.totalSubmissions}</div>
                    <div className="text-sm text-muted-foreground">ارسال‌ها</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Star className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                    <div className="text-2xl font-bold">{userStats.medalsGold}</div>
                    <div className="text-sm text-muted-foreground">مدال‌های طلا</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Award className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                    <div className="text-2xl font-bold">{userStats.medalsSilver}</div>
                    <div className="text-sm text-muted-foreground">مدال‌های نقره</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Competitions */}
            <Card>
              <CardHeader>
                <CardTitle>مسابقات اخیر</CardTitle>
                <CardDescription>آخرین دستاوردهای شما</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCompetitions.map((comp) => (
                    <div 
                      key={comp.name}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Trophy className="w-5 h-5 text-accent" />
                        <div>
                          <div className="font-medium">{comp.name}</div>
                          <div className="text-sm text-muted-foreground">
                            رتبه #{comp.rank} • امتیاز: {comp.score}
                          </div>
                        </div>
                      </div>
                      <Badge 
                        className={
                          comp.medal === "طلا" 
                            ? "bg-yellow-500 text-white" 
                            : comp.medal === "نقره"
                            ? "bg-gray-400 text-white"
                            : "bg-orange-600 text-white"
                        }
                      >
                        {comp.medal}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
