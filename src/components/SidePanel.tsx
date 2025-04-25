
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, LayoutGrid, User, CheckSquare, Calendar, LayoutDashboard, DollarSign, Info } from "lucide-react"
import { Link } from "react-router-dom"

export function SidePanel() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="fixed top-4 right-4 z-50">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px] bg-background/80 backdrop-blur-lg">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-6">
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link to="/modal">
              <LayoutGrid className="h-5 w-5" />
              Pop-Up Modal
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link to="/workspace">
              <LayoutGrid className="h-5 w-5" />
              Workspace View
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link to="/person">
              <User className="h-5 w-5" />
              Single Person Page
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link to="/task">
              <CheckSquare className="h-5 w-5" />
              Single Task Page
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link to="/calendar">
              <Calendar className="h-5 w-5" />
              Calendar Page
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link to="/dashboard">
              <LayoutDashboard className="h-5 w-5" />
              Worker/Employee Dashboard
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link to="/pricing">
              <DollarSign className="h-5 w-5" />
              Pricing Page
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link to="/about">
              <Info className="h-5 w-5" />
              About Us Page
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
