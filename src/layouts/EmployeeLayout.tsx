
import { Toaster } from "@/components/ui/toaster"
import { FileInput, Menu, Search, Users } from 'lucide-react';

import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/themeToggle";
import { Outlet } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { UserProfile } from "@/components/sections/UserProfile";
import EmployeeDataProvider, { EmployeeDataContext } from "@/context/EmployeeProvider";
import EmployeeSideBar from "@/components/EmployeeSideBar";
import PayrollDataProvider from "@/context/PayrollProvider";
import { useContext } from "react";

const layout = [        
    {
    title: "Attendance",
    href : "/attendance",
    icon: Users,
    variant: "ghost",
    },{
      title: "Leave Request",
      href : "/leave",
      icon: FileInput,
      variant: "ghost",
    },      
  ]

export function EmployeeLayout() {
    return(
        <div className="w-full h-screen flex">
            <EmployeeDataProvider>
               
                <SidebarComponent/>
            </EmployeeDataProvider>
           <Toaster />
            <div className=" absolute bottom-0 right-0 mr-6 mb-4 p-2">
                <ModeToggle/>
            </div>
        </div>
    )
}

export function SidebarComponent(){
    const {employee} =useContext(EmployeeDataContext)
    return(
         <PayrollDataProvider employee={employee}>
            <EmployeeSideBar layout={layout}/>
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
        </PayrollDataProvider>
    )
}

