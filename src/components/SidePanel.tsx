
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Bubbles } from "./Bubbles";

export function SidePanel() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-hidden">
        <div className="relative h-full">
          <Bubbles />
          <div className="relative z-10 space-y-6 p-6">
            <h2 className="text-2xl font-bold tracking-tight">Menu</h2>
            <nav className="space-y-4">
              <a href="#features" className="block hover:text-primary transition-colors">Features</a>
              <a href="#pricing" className="block hover:text-primary transition-colors">Pricing</a>
              <a href="#about" className="block hover:text-primary transition-colors">About Us</a>
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
