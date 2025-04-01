"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Title from "../Common/Title";
import RuleItem from "./RuleItem";
import Image from "next/image";

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
    <>
      <Title title="Правила" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">
        <Image
          src="/rules-pic.svg"
          alt="rules"
          width={1000}
          height={600}
          className="mt-5"
        />
        <div className="space-y-4">
          {rules.map((rule) => (
            <RuleItem key={rule.id} rule={rule.content} />
          ))}
        </div>
      </div>
    </>
  );
}
