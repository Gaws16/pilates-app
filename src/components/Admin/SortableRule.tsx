import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

interface Rule {
  id: string;
  content: string;
  order_number: number;
}

interface Props {
  rule: Rule;
  onDelete: () => void;
}

export function SortableRule({ rule, onDelete }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: rule.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-4 p-4 bg-white rounded-lg border ${
        isDragging ? "shadow-lg" : ""
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
      >
        <GripVertical size={20} />
      </button>
      <p className="flex-1">{rule.content}</p>
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700"
        title="Delete rule"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}
