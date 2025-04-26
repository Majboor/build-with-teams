
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

interface BetaSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BetaSignupDialog({ open, onOpenChange }: BetaSignupDialogProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://beta_list.techrealm.online/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient: email }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Thank you for joining our beta list. We'll be in touch soon!",
        });
        onOpenChange(false);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join TaaS Beta</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="col-span-3"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Get Beta Access"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
