
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PromptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (prompt: string) => void;
}

export function PromptModal({ open, onOpenChange, onSubmit }: PromptModalProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSubmit(prompt);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tell us about your project</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your idea or prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="h-12 text-lg"
            autoFocus
          />
          <Button 
            onClick={handleSubmit}
            className="w-full h-12 text-lg"
            size="lg"
          >
            Get Started
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
