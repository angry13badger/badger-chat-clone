
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2 } from 'lucide-react';
import { type CustomCommand } from '@/pages/Index';

interface AIAssistantPanelProps {
  commands: CustomCommand[];
  setCommands: React.Dispatch<React.SetStateAction<CustomCommand[]>>;
}

export function AIAssistantPanel({ commands, setCommands }: AIAssistantPanelProps) {
  const [newCommand, setNewCommand] = useState({ name: '', description: '', response: '', createsTask: false });

  const handleAddCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommand.name && newCommand.description && newCommand.response) {
      if (!newCommand.name.startsWith('/')) {
        alert('Command name must start with "/"');
        return;
      }
      setCommands(prev => [...prev, { ...newCommand, id: crypto.randomUUID() }]);
      setNewCommand({ name: '', description: '', response: '', createsTask: false });
    }
  };

  const handleDeleteCommand = (id: string) => {
    setCommands(prev => prev.filter(command => command.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">AI Assistant Commands</h2>
        <p className="text-sm text-muted-foreground">Manage custom commands for the AI assistant.</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {commands.map(command => (
            <Card key={command.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-lg">
                  <span>{command.name}</span>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteCommand(command.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">{command.description}</p>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">AI Response:</p>
                  <p className="text-sm italic">"{command.response}"</p>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id={`createsTask-${command.id}`} checked={command.createsTask} disabled />
                  <Label htmlFor={`createsTask-${command.id}`}>Creates a task in Todo list</Label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-muted/40">
        <h3 className="text-lg font-semibold mb-2">Add New Command</h3>
        <form onSubmit={handleAddCommand} className="space-y-3">
          <Input
            placeholder="Command Name (e.g., /idea)"
            value={newCommand.name}
            onChange={e => setNewCommand(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          <Input
            placeholder="Description"
            value={newCommand.description}
            onChange={e => setNewCommand(prev => ({ ...prev, description: e.target.value }))}
            required
          />
          <Input
            placeholder="AI Response"
            value={newCommand.response}
            onChange={e => setNewCommand(prev => ({ ...prev, response: e.target.value }))}
            required
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="new-createsTask"
              checked={newCommand.createsTask}
              onCheckedChange={checked => setNewCommand(prev => ({ ...prev, createsTask: !!checked }))}
            />
            <Label htmlFor="new-createsTask">Creates a task in Todo list</Label>
          </div>
          <Button type="submit" className="w-full">Add Command</Button>
        </form>
      </div>
    </div>
  );
}
