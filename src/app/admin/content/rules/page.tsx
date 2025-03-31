"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableRule } from "@/components/Admin/SortableRule";

interface Rule {
  id: string;
  content: string;
  order_number: number;
}

export default function RulesManagement() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newRule, setNewRule] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("rules")
        .select("*")
        .order("order_number", { ascending: true });

      if (error) throw error;
      setRules(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleAddRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRule.trim()) return;

    try {
      const maxOrder = Math.max(...rules.map((r) => r.order_number), 0);
      const { error } = await supabase.from("rules").insert([
        {
          content: newRule,
          order_number: maxOrder + 1,
        },
      ]);

      if (error) throw error;
      fetchRules();
      setNewRule("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleDeleteRule = async (id: string) => {
    try {
      const { error } = await supabase.from("rules").delete().eq("id", id);
      if (error) throw error;
      setRules(rules.filter((rule) => rule.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = rules.findIndex(
      (rule) => rule.id === active.id.toString()
    );
    const newIndex = rules.findIndex((rule) => rule.id === over.id.toString());

    const newRules = arrayMove(rules, oldIndex, newIndex);
    setRules(newRules);

    // Update order numbers in the database
    try {
      const updates = newRules.map((rule: Rule, index: number) => ({
        id: rule.id,
        order_number: index + 1,
      }));

      const { error } = await supabase.from("rules").upsert(updates);
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      fetchRules(); // Reload the original order if update fails
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#a17d60]">Rules Management</h1>

      {error && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md">{error}</div>
      )}

      <form onSubmit={handleAddRule} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Rule
          </label>
          <textarea
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            required
            rows={3}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#a17d60] focus:border-[#a17d60]"
            placeholder="Enter a new rule..."
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-[#a17d60] rounded-md hover:bg-[#8a6b52]"
        >
          Add Rule
        </button>
      </form>

      {loading ? (
        <p>Loading rules...</p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={rules.map((rule) => rule.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {rules.map((rule) => (
                <SortableRule
                  key={rule.id}
                  rule={rule}
                  onDelete={() => handleDeleteRule(rule.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
