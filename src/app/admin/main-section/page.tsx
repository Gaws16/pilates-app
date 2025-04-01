"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface MainSectionContent {
  id: string;
  title: string;
  description: string;
  button_text: string;
}

export default function MainSectionPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mainSectionContent, setMainSectionContent] =
    useState<MainSectionContent | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchMainSectionContent = async () => {
      const { data, error } = await supabase
        .from("main_section")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching main section content:", error);
        return;
      }

      if (data) {
        setMainSectionContent(data);
      }
    };

    if (user) {
      fetchMainSectionContent();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mainSectionContent) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from("main_section")
        .update({
          title: mainSectionContent.title,
          description: mainSectionContent.description,
          button_text: mainSectionContent.button_text,
        })
        .eq("id", mainSectionContent.id);

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Main section content updated successfully!",
      });
    } catch (error) {
      console.error("Error updating main section content:", error);
      setMessage({
        type: "error",
        text: "Error updating main section content. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Edit Main Section</h1>

      {message && (
        <div
          className={`p-4 mb-4 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Main Section Content</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={mainSectionContent?.title || ""}
              onChange={(e) =>
                setMainSectionContent((prev) =>
                  prev ? { ...prev, title: e.target.value } : null
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={mainSectionContent?.description || ""}
              onChange={(e) =>
                setMainSectionContent((prev) =>
                  prev ? { ...prev, description: e.target.value } : null
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60] h-32"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Button Text
            </label>
            <input
              type="text"
              value={mainSectionContent?.button_text || ""}
              onChange={(e) =>
                setMainSectionContent((prev) =>
                  prev ? { ...prev, button_text: e.target.value } : null
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-[#a17d60] text-white rounded-md hover:bg-[#8a6b52] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Main Section"}
          </button>
        </form>
      </div>
    </div>
  );
}
