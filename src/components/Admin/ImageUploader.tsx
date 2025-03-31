"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import type { Database } from "@/lib/database.types";

interface ImageUploaderProps {
  onUploadComplete?: (url: string) => void;
}

export default function ImageUploader({
  onUploadComplete,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const supabase = createClientComponentClient<Database>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      setPreview(null);
      return;
    }

    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // Create unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2, 15)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      // Add record to gallery table
      const { error: dbError } = await supabase
        .from("gallery")
        .insert([{ url: publicUrl, title: file.name }]);

      if (dbError) throw dbError;

      if (onUploadComplete) {
        onUploadComplete(publicUrl);
      }

      // Reset form
      setFile(null);
      setPreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-md">
      <h3 className="mb-4 text-lg font-medium">Upload Image</h3>

      {error && (
        <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#a17d60] file:text-white hover:file:bg-[#8a6b52]"
        />
      </div>

      {preview && (
        <div className="mb-4">
          <p className="mb-2 text-sm font-medium text-gray-700">Preview:</p>
          <div className="relative h-40 w-40">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="rounded-md object-cover"
            />
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="px-4 py-2 text-white bg-[#a17d60] rounded-md hover:bg-[#8a6b52] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
