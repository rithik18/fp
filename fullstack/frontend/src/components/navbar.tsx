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

const navbar = () => {
  const n=useNavigate()
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <ToastContainer/>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
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
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
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
            <li className="px-16">
              {/* <p onClick={()=>{}}>Logout</p> */}
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
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
