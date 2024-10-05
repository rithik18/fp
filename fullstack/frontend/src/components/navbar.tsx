import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";
import Cookies from "js-cookie";
import { toast,ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import image from '../assets/logo_jman.png'
import { SquareMenu } from "lucide-react";
import { cn } from "../lib/utils";
import defaultimg from '../assets/react.svg'
import { useEffect, useState } from "react";
const navbar = () => {
  const [img, setimg] = useState<any>("")
  const [name, setname] = useState<any>("")
  useEffect(() => {
    
  
    const init= () => {
      setimg(localStorage.getItem('profileImage'))
      setname(Cookies.get('name'))
    }
    init()
  }, [])
  
  const n=useNavigate()
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <ToastContainer/>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/admin" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={image}
            className="h-8"
            alt="Flowbite Logo"
          />
          
        </a>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <SquareMenu />
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to='/admin'
              >
                Home
              </Link>
            </li>
            <li>
            <Link to={'/add_user'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">User</Link>
            </li>
            <li>
            <Link to='/add_skill'
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Skills
              </Link>
            </li>
            <li>
            <DropdownMenu>
                <DropdownMenuTrigger>Certification</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Certification Details</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Link to='/add_certification'>Add Certification</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link to='/verify_certification'>Verify Certification</Link></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
            <DropdownMenu>
                <DropdownMenuTrigger>Roles</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Roles Details</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Link to='/add_role'>Add Role</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link to='/add_role_skill'>Assign Skills for Roles</Link></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li className="relative w-12 h-12">
  <DropdownMenu>
    <DropdownMenuTrigger>
      <img
        src={img ?? defaultimg}
        alt="Profile"
        className={cn("object-cover w-full h-full border-2 rounded-full")}
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Welcome {name}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>  {/* Prevent default close */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="bg-red-700 w-full mx-auto"
            >
              Logout
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Do You want to Logout
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  Cookies.remove('auth');
                  Cookies.remove('role');
                  Cookies.remove('token');
                  Cookies.remove('data');
                  toast.success("Logged Out Successfully");

    // Navigate to the login page after a slight delay (to let the toast message show)
    setTimeout(() => {
      n('/');  // Use navigate to redirect to the login page
    }, 500);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</li>
            {/* <li className="">
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant="destructive" className="bg-red-700">
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Do You want to Logout
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={async()=>{
                      Cookies.remove('auth')
                      Cookies.remove('role')
                      Cookies.remove('token')
                      Cookies.remove('data')
                      toast.success("Logged Out Successfully")
                      n('/')
                    }}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
