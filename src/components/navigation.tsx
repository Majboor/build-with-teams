
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidePanel } from "@/components/SidePanel";

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="font-bold text-xl">TaaS</a>
          <div className="hidden md:flex gap-6">
            <a href="#features" className="text-sm hover:text-primary">Features</a>
            <a href="#pricing" className="text-sm hover:text-primary">Pricing</a>
            <a href="#about" className="text-sm hover:text-primary">About Us</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <SidePanel />
          <ThemeToggle />
          <div className="hidden sm:flex gap-4">
            <Button variant="ghost" className="text-sm">Login</Button>
            <Button className="text-sm">Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
