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
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/logo_jman.png";
import { IdCard, SquareMenu } from "lucide-react";
import { cn } from "../lib/utils";
import defaultimg from "../assets/react.svg";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import axios from "axios";
const navbar = () => {
  const [img, setimg] = useState<any>("");
  const [name, setname] = useState<any>("");
  const [mail, setmail] = useState<any>("");
  const [password, setpassword] = useState<any>("");
  const [dept, setdept] = useState(Cookies.get("department"));
  const [role, setRole] = useState(Cookies.get("role_name"));
  const handleSave = async () => {
    const token = Cookies.get("token");
    const id = Cookies.get("id");
    const email = document.getElementById("mail") as HTMLInputElement;
    const mail = email.value;
    const pass = document.getElementById("password") as HTMLInputElement;
    const password = pass.value;
    const data: any = {
      id,
      mail,
      password,
      updated_at: new Date().toISOString(),
    };
    console.log(data);
    // return
    const reqOptions = {
      url: "http://localhost:3000/admin/admin_update_admin_data",
      method: "POST",
      data: { token, data },
    };
    try {
      await axios.request(reqOptions).then((e) => {
        console.log(e);
        if (e.status == 200) {
          toast.success("Details Updated Successfully");
          for (const key in data) {
            Cookies.set(key, data[key]);
          }
          setmail(Cookies.get("mail"));
          setpassword(Cookies.get("password"));
        }
      });
    } catch (e: any) {
      const init = async () => {
        const keysToStore = [
          "id",
          "name",
          "role_id",
          "joining_date",
          "department",
          "mail",
          "profileImage",
          "updated_at",
          "created_at",
          "password",
        ];
        var data_old: any = {};

        keysToStore.forEach((key) => {
          data_old[key] = Cookies.get(key);
        });

        console.log(data, "data");
      };
      if (e.status == 403) {
        toast.error("Error");
        init();
        return;
      } else {
        toast.error(e);
        init();
        return;
      }
    }
  };
  useEffect(() => {
    const init = () => {
      setimg(localStorage.getItem("profileImage"));
      setname(Cookies.get("name"));
      setmail(Cookies.get("mail"));
      setpassword(Cookies.get("password"));
    };
    init();
  }, []);

  const n = useNavigate();
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <ToastContainer />
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/admin"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={image} className="h-8" alt="Flowbite Logo" />
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
              <Link to="/admin">Home</Link>
            </li>
            <li>
              <Link
                to={"/add_user"}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                User
              </Link>
            </li>
            <li>
              <Link
                to="/add_skill"
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
                  <DropdownMenuItem>
                    <Link to="/add_certification">Add Certification</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/verify_certification">Verify Certification</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger>Roles</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Roles Details</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/add_role">Add Role</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/add_role_skill">Assign Skills for Roles</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li className="relative flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <img
                    src={img ?? defaultimg}
                    alt="Profile"
                    className={cn(
                      "object-cover w-12 h-12 border-2 rounded-full"
                    )}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px] flex flex-col justify-evenly items-start">
                  <DropdownMenuLabel className="flex gap-2 items-center scroll-m-20  pb-2 tracking-tight first:mt-0">
                    Welcome {name}
                  </DropdownMenuLabel>

                  <DropdownMenuLabel
                    id="role"
                    className=" flex gap-2 items-center scroll-m-20  pb-2 text-xs font-semibold tracking-tight first:mt-0"
                  >
                    <IdCard className="w-4 h-4 mr-2 text-muted-foreground" />
                    {role}
                  </DropdownMenuLabel>
                  {/* <Label
                    htmlFor="dept"
                    className="scroll-m-20  px-2 text-sm font-semibold tracking-tight first:mt-0 text-gray-500"
                  >
                    Department
                  </Label>
                  <DropdownMenuLabel className="scroll-m-20  pb-2 text-xs font-semibold tracking-tight first:mt-0">
                    {dept}
                  </DropdownMenuLabel> */}
                  <DropdownMenuSeparator className="mx-auto w-full bg-gray-300" />
                  <Sheet>
                    <SheetTrigger className="mx-auto">
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="scroll-m-20 mx-auto  pb-2 text-base font-semibold tracking-tight first:mt-0"
                      >
                        Edit Profile
                      </DropdownMenuItem>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="mail" className="text-right">
                            Mail
                          </Label>
                          <Input
                            id="mail"
                            defaultValue={mail}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <Input
                            id="password"
                            defaultValue={password}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type="submit" onClick={handleSave}>
                            Save changes
                          </Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>

                  {/* <DropdownMenuItem className="scroll-m-20 mx-auto  pb-2 text-base font-semibold tracking-tight first:mt-0">Edit Profile</DropdownMenuItem> */}
                  <DropdownMenuItem
                    className="mx-auto"
                    onSelect={(e) => e.preventDefault()}
                  >
                    {" "}
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
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Do You want to Logout
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={async () => {
                              Cookies.remove("auth");
                              Cookies.remove("role");
                              Cookies.remove("token");
                              Cookies.remove("data");
                              toast.success("Logged Out Successfully");
                              setTimeout(() => {
                                n("/"); // Use navigate to redirect to the login page
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
