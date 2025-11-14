import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Award, Star, TrendingUp, Camera, Edit2, Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "نیاز به احراز هویت",
          description: "لطفاً برای مشاهده پروفایل وارد شوید",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;
      
      setProfile(data);
      setDisplayName(data.display_name || "");
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      toast({
        title: "خطا",
        description: "بارگذاری پروفایل با مشکل مواجه شد",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    setUploading(true);

    try {
      // Delete old avatar if exists
      if (profile.avatar_url) {
        const oldPath = profile.avatar_url.split('/').slice(-2).join('/');
        await supabase.storage.from("avatars").remove([oldPath]);
      }

      // Upload new avatar
      const fileExt = file.name.split('.').pop();
      const filePath = `${profile.id}/avatar.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // Update profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", profile.id);

      if (updateError) throw updateError;

      toast({
        title: "موفقیت",
        description: "تصویر پروفایل به‌روزرسانی شد",
      });

      await fetchProfile();
    } catch (error: any) {
      toast({
        title: "خطا",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;

    setSaving(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ display_name: displayName })
        .eq("id", profile.id);

      if (error) throw error;

      toast({
        title: "موفقیت",
        description: "پروفایل به‌روزرسانی شد",
      });

      setIsEditing(false);
      await fetchProfile();
    } catch (error: any) {
      toast({
        title: "خطا",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  const userStats = {
    name: profile.display_name || "کاربر",
    tier: "متخصص",
    rank: 156,
    totalCompetitions: 23,
    medalsGold: 3,
    medalsSilver: 5,
    medalsBronze: 7,
    totalSubmissions: 189,
    bestScore: 0.9654,
    joinDate: new Date(profile.created_at).toLocaleDateString("fa-IR"),
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
                    {profile.avatar_url && <AvatarImage src={profile.avatar_url} alt="Profile" />}
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-accent text-white">
                      {profile.display_name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  >
                    <Camera className="w-6 h-6 text-white" />
                  </button>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-2">
                  <Label htmlFor="displayName">نام نمایشی</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="نام نمایشی"
                  />
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={handleSaveProfile}
                      disabled={saving}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {saving ? "در حال ذخیره..." : "ذخیره"}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false);
                        setDisplayName(profile.display_name || "");
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <CardTitle className="text-2xl">{userStats.name}</CardTitle>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setIsEditing(true)}
                    className="mt-2"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    ویرایش نام
                  </Button>
                </>
              )}
              
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
