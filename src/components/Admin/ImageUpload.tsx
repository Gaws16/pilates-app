"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = async () => {
    if (!file) return;

    const { data, error } = await supabase.storage
      .from("site-images") // Your bucket name
      .upload(`hero/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return;
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from("site-images")
      .getPublicUrl(data.path);
    setImageUrl(urlData.publicUrl);
  };

  return (
    <div className="space-y-4 p-4">
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <Button onClick={uploadImage}>Upload</Button>
      {imageUrl && (
        <Image src={imageUrl} alt="Uploaded image" className="w-32 h-32 mt-4" />
      )}
    </div>
  );
}
