"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import dynamic from "next/dynamic";

// Import rich text editor with client-side rendering only
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface ContentEditorProps {
  tableName: string;
  contentId: string;
  contentField: string;
  initialContent?: string;
}

export default function ContentEditor({
  tableName,
  contentId,
  contentField,
  initialContent = "",
}: ContentEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      if (initialContent) return;

      try {
        const { data, error } = await supabase
          .from(tableName)
          .select(contentField)
          .eq("id", contentId)
          .single();

        if (error) throw error;
        if (data) setContent(data[contentField] || "");
      } catch (err: any) {
        console.error("Error fetching content:", err);
        setError(err.message);
      }
    };

    fetchContent();
  }, [tableName, contentId, contentField, initialContent]);

  const saveContent = async () => {
    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { error } = await supabase
        .from(tableName)
        .update({ [contentField]: content, updated_at: new Date() })
        .eq("id", contentId);

      if (error) throw error;
      setSuccessMessage("Content saved successfully!");

      // Hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Error saving content:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 text-red-700 bg-red-100 rounded-md">{error}</div>
      )}
      {successMessage && (
        <div className="p-3 text-green-700 bg-green-100 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="min-h-[300px] border border-gray-300 rounded-md">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="h-64"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={saveContent}
          disabled={saving}
          className="px-4 py-2 text-white bg-[#a17d60] rounded-md hover:bg-[#8a6b52] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
