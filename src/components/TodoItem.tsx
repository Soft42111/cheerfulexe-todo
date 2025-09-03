import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Check, X, Edit, Trash2 } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div className={`todo-card rounded-lg p-4 animate-slide-in ${todo.completed ? 'todo-completed' : ''}`}>
      <div className="flex items-center gap-3">
        <Button
          variant="icon"
          size="sm"
          onClick={() => onToggle(todo.id)}
          className={`${todo.completed ? 'text-success' : 'text-muted-foreground'}`}
        >
          <Check className={`h-4 w-4 ${todo.completed ? 'opacity-100' : 'opacity-50'}`} />
        </Button>

        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
              autoFocus
            />
            <Button variant="success" size="sm" onClick={handleSave}>
              <Check className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-between">
            <span 
              className={`flex-1 text-left ${todo.completed ? 'text-muted-foreground line-through' : 'text-foreground'} transition-all`}
            >
              {todo.text}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="icon"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="icon"
                size="sm"
                onClick={() => onDelete(todo.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};