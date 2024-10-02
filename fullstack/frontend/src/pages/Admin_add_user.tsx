import { useEffect, useState } from "react";
import { validate } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../components/navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Admin_add_user = () => {
  useEffect(() => {
    validate();
    console.log(Cookies.get("role"));
    if (
      Cookies.get("role")?.toUpperCase() === "ADMIN" &&
      Cookies.get("auth") == "true"
    ) {
      n("/add_user");
    } else if (
      Cookies.get("role")?.toUpperCase() !== "ADMIN" &&
      Cookies.get("auth") == "true"
    ) {
      n("/user");
    } else {
      n("/");
    }
  }, []);

  const n = useNavigate();
  const [department, setDepartment] = useState("OTHER");
  return (
    <div>
      <Navbar />
      <p className="text-center scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl pb-8 mx-auto">
        Add User
      </p>
      <div>
        <div className="grid grid-cols-2">
          <div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {department} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup
                  value={department}
                  onValueChange={setDepartment}
                >
                  <DropdownMenuRadioItem value="ADMIN">
                    ADMIN
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="FULL_STACK">
                    FULL_STACK
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="DATA_ANALYTICS">
                    DATA_ANALYTICS
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="DATA_ENGINEERING">
                    DATA_ENGINEERING
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="DEVOPS">
                    DEVOPS
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="OTHER">
                    OTHER
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {department} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup
                  value={department}
                  onValueChange={setDepartment}
                >
                  <DropdownMenuRadioItem value="ADMIN">
                    ADMIN
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="FULL_STACK">
                    FULL_STACK
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="DATA_ANALYTICS">
                    DATA_ANALYTICS
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="DATA_ENGINEERING">
                    DATA_ENGINEERING
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="DEVOPS">
                    DEVOPS
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="OTHER">
                    OTHER
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_add_user;
