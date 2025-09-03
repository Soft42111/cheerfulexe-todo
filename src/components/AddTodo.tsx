import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-card rounded-lg p-4 mb-6">
      <div className="flex items-center gap-3">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1"
          autoFocus
        />
        <Button type="submit" size="default" disabled={!text.trim()}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
    </form>
  );
};