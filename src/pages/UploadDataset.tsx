import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, FileText } from "lucide-react";

const UploadDataset = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !title) {
      toast({
        title: "خطا",
        description: "لطفاً تمام فیلدهای ضروری را پر کنید",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "نیاز به احراز هویت",
          description: "لطفاً برای آپلود مجموعه داده وارد شوید",
          variant: "destructive",
        });
        return;
      }

      // Upload file to storage
      const filePath = `${user.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("datasets")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save metadata to database
      const { error: dbError } = await supabase
        .from("datasets")
        .insert({
          user_id: user.id,
          title,
          description,
          file_name: file.name,
          file_size: file.size,
          file_path: filePath,
          category: category || null,
          tags: tags ? tags.split(",").map(t => t.trim()) : [],
        });

      if (dbError) throw dbError;

      toast({
        title: "موفقیت!",
        description: "مجموعه داده با موفقیت آپلود شد",
      });

      navigate("/datasets");
    } catch (error: any) {
      toast({
        title: "آپلود ناموفق بود",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Upload className="w-8 h-8 text-accent" />
              آپلود مجموعه داده
            </CardTitle>
            <CardDescription>
              مجموعه داده خود را با جامعه به اشتراک بگذارید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="عنوان مجموعه داده"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">توضیحات</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="مجموعه داده خود را توضیح دهید"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">دسته‌بندی</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="مثلاً: بهداشت و درمان، مالی، ورزش"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">برچسب‌ها</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="یادگیری ماشین، طبقه‌بندی، داده تصویر (با کاما جدا شود)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">فایل مجموعه داده *</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    accept=".csv,.json,.zip,.xlsx,.parquet"
                    required
                  />
                  {file && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={uploading}
                variant="hero"
              >
                {uploading ? "در حال آپلود..." : "آپلود مجموعه داده"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadDataset;
