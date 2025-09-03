import { useState } from "react";
import { AddTodo } from "@/components/AddTodo";
import { TodoItem } from "@/components/TodoItem";
import { useToast } from "@/hooks/use-toast";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { toast } = useToast();

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
    toast({
      title: "Todo added!",
      description: "Your new task has been added to the list.",
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
    
    const todo = todos.find(t => t.id === id);
    if (todo) {
      toast({
        title: todo.completed ? "Task incomplete" : "Task completed!",
        description: todo.completed ? "Task marked as incomplete." : "Great job on completing this task!",
      });
    }
  };

  const deleteTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    setTodos(todos.filter(todo => todo.id !== id));
    if (todo) {
      toast({
        title: "Todo deleted",
        description: `"${todo.text}" has been removed from your list.`,
        variant: "destructive",
      });
    }
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, text: newText }
        : todo
    ));
    toast({
      title: "Todo updated",
      description: "Your task has been successfully updated.",
    });
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Todo App
          </h1>
          <p className="text-muted-foreground">
            Stay organized and get things done
          </p>
          
          {/* Progress indicator */}
          {totalCount > 0 && (
            <div className="mt-4 p-3 todo-card rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">
                Progress: {completedCount} of {totalCount} completed
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
                    background: 'var(--gradient-success)'
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Add Todo */}
        <AddTodo onAdd={addTodo} />

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No todos yet. Add one above to get started!
              </p>
            </div>
          ) : (
            todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>

        {/* Stats */}
        {totalCount > 0 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            {completedCount === totalCount 
              ? "🎉 All tasks completed! Great job!" 
              : `${totalCount - completedCount} task${totalCount - completedCount !== 1 ? 's' : ''} remaining`
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;