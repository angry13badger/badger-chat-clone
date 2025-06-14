
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  author: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  { id: '1', name: 'Review design mockups for the new landing page', author: 'Alice', completed: false },
  { id: '2', name: 'Implement sidebar functionality with animations', author: 'Bob', completed: true },
];

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskName, setNewTaskName] = useState('');

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskName.trim() === '') return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      name: newTaskName,
      author: 'Mike Badger', // Current user from sidebar
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setNewTaskName('');
  };

  return (
    <div className="h-full flex flex-col">
      <SheetHeader className="p-4 border-b shrink-0">
        <SheetTitle>Todo List</SheetTitle>
      </SheetHeader>
      <div className="p-4 shrink-0">
        <form onSubmit={handleAddTask} className="flex w-full items-center space-x-2">
          <Input 
            type="text" 
            placeholder="What needs to be done?" 
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <Button type="submit" disabled={!newTaskName.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </form>
      </div>
      <div className="flex-grow overflow-auto px-4 pb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Author</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} data-state={task.completed ? 'checked' : 'unchecked'}>
                <TableCell>
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleToggleTask(task.id)}
                    id={`task-${task.id}`}
                  />
                </TableCell>
                <TableCell className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {task.name}
                </TableCell>
                <TableCell className={task.completed ? 'line-through text-muted-foreground' : ''}>
                  {task.author}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
