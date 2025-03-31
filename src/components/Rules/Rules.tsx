"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Title from "../Common/Title";
import RulesContainer from "./RulesContainer";

interface Rule {
  id: string;
  content: string;
  order_number: number;
}

export default function Rules() {
  const [rules, setRules] = useState<Rule[]>([]);

  useEffect(() => {
    const fetchRules = async () => {
      const { data, error } = await supabase
        .from("rules")
        .select("*")
        .order("order_number", { ascending: true });

      if (!error && data) {
        setRules(data);
      }
    };

    fetchRules();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-[#a17d60] mb-8">Studio Rules</h2>
      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <p className="text-gray-800">{rule.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
