
import { Toaster } from "@/components/ui/toaster"
import { Banknote, CircleUser, FileInput, Menu, Search, Users } from 'lucide-react';

import SideNavbar from "@/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/themeToggle";
import { Outlet } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { request, setAuthHeader } from "@/api/axios";


const layout = [
                  
    {
      title: "Employee",
      href : "/admin/employee",
      icon: Users,
      variant: "ghost",
    }, {
      title: "Payroll",
      href : "/admin/payroll",
      icon: Banknote,
      variant: "ghost",
    }, {
      title: "Leave Management",
      href : "/admin/leave",
      icon: FileInput,
      variant: "ghost",
    }, {
      title: "Signatory",
      href : "/admin/signatory",
      icon: Users,
      variant: "ghost",
    }        
  ]
export function AdminLayout() {
    return(
        <div className="w-full h-screen flex">
            <SideNavbar layout={layout}/>
            <div className="flex flex-col w-full">
                <header className="flex h-14 sticky items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[51px] lg:px-6">
                    <button className="flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 shrink-0 md:hidden">
                        <Menu />
                    </button>
                    <div className="w-full flex-1">
                      <form>
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Search"
                            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                          />
                        </div>
                      </form>
                    </div>
                    
                    <UserProfile/>
                </header>
                <ScrollArea className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <Outlet/>   
                </ScrollArea>
            </div>
            <Toaster />
            <div className=" absolute bottom-0 right-0 mr-6 mb-4 p-2">
                <ModeToggle/>
            </div>
        </div>
    )
}

function UserProfile(){
  const {auth} = useContext(AuthContext)
  const handleOnclick = async () => {
    setAuthHeader(null)
    localStorage.removeItem("auth")
    await request("POST","/auth/logout")
    window.location.reload();
  }
  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 w-10 rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{auth.id}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleOnclick}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}