import { Link, useLocation, useNavigate } from "react-router-dom";
import { Database, Trophy, Users, BarChart3, Upload, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "خروج موفق",
      description: "شما از حساب خود خارج شدید.",
    });
    navigate("/");
  };
  
  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              DataCompete
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/competitions" 
              className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-accent ${
                isActive("/competitions") ? "text-accent" : "text-foreground"
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>مسابقات</span>
            </Link>
            <Link 
              to="/datasets" 
              className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-accent ${
                isActive("/datasets") ? "text-accent" : "text-foreground"
              }`}
            >
              <Database className="w-4 h-4" />
              <span>مجموعه داده‌ها</span>
            </Link>
            <Link 
              to="/upload-dataset" 
              className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-accent ${
                isActive("/upload-dataset") ? "text-accent" : "text-foreground"
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>آپلود</span>
            </Link>
            <Link 
              to="/leaderboard" 
              className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-accent ${
                isActive("/leaderboard") ? "text-accent" : "text-foreground"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>جدول امتیازات</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    پروفایل
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  خروج
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="hero" size="sm">
                  ورود / ثبت‌نام
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
