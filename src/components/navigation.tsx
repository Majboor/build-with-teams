
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-lg font-bold">TaaS</span>
        </Link>
        <nav className="ml-auto flex items-center space-x-1 md:space-x-4">
          <Link to="/" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link to="/workspace" className="text-sm font-medium hover:underline">
            Product
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:underline">
            Pricing
          </Link>
          <Link to="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="text-sm font-medium">
                Careers
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/careers">All Positions</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/career/apply">Apply Now</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild size="sm">
            <Link to="/careers">Join Our Team</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
