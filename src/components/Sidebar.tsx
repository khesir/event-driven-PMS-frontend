
import {
  Banknote,
  Bell,
  } from "lucide-react"
import { Nav } from './ui/nav'
import { Button } from "./ui/button"
import { request, setAuthHeader } from "@/api/axios"
import { Link, useNavigate } from "react-router-dom"


type Props = {
  layout : any
}

export default function SideNavbar({layout}: Props) {
  const navigate = useNavigate();

  
// relative min-w-[280px] border-r px-3 h-full fmax-h-screen lex flex-col gap-2 bg-muted/40 
  return (
    <div className='hidden border-r bg-muted/40 md:block h-full'>
      <div className="flex h-full max-h-screen flex-col gap-2 w-[300px]">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Banknote className="h-6 w-6" />
              <span className="">EDP</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>

        <div className="flex flex-col justify-between h-full">
          <div className="flex-1">
            {/* User Profile */}
            
            <Nav
                links={layout}
              />
          </div>

        </div>
      </div>
    </div>
  )
}