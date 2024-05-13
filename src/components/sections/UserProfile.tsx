import { request, setAuthHeader } from "@/api/axios"
import { AuthContext } from "@/context/AuthProvider"
import { CircleUser } from "lucide-react"
import { useContext } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"

export function UserProfile(){
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