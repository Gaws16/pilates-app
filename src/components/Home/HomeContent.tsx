"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface HomeContent {
  id: string;
  title: string;
  content: string;
  section: string;
}

export default function HomeContent() {
  const [content, setContent] = useState<HomeContent[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("home_content")
        .select("*")
        .order("section", { ascending: true });

      if (!error && data) {
        setContent(data);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {content.map((section) => (
        <section key={section.id} className="mb-12">
          <h2 className="text-3xl font-bold text-[#a17d60] mb-6">
            {section.title}
          </h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        </section>
      ))}
    </div>
  );
}
