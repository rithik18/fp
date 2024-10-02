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
import axios from "axios";
import { toast } from "react-toastify";

const Admin_add_user = () => {
  const [roleData, setroleData] = useState([]);
  const getAllrole = async () => {
    const token = await Cookies.get("token");
    const reqOptions = {
      url: "http://localhost:3000/admin/view_role",
      method: "POST",
      data: { token: token },
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        console.log(response.data.data);
        setroleData(response.data.data);

        // console.log(response.data.data.length,response.data.data.length/c,c,p,pc,"hell")
      }
    } catch (e) {
      toast.error(e as String);
    }
  };
  useEffect(() => {
    validate();
    getAllrole();
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
  const [role, setrole] = useState("None");
  return (
    <div>
      <Navbar />
      <p className="text-center scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl pb-8 mx-auto">
        Add User
      </p>
      <div>
        <div className="grid grid-cols-2">
          <div className="grid-rows-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
          </div>
          <div className="grid-rows-3">
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
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {roleData.length!=0&&role!="None"?roleData.filter((e: any) => e.id === role)[0]?.name:role}
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuRadioGroup value={role} onValueChange={setrole}>
                  <DropdownMenuRadioItem value="None">
                          None
                        </DropdownMenuRadioItem>
                    {roleData.length!=0&&roleData.map((e: any) => {
                      return (
                        <DropdownMenuRadioItem value={e.id}>
                          {e.name}
                        </DropdownMenuRadioItem>
                      );
                    })}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_add_user;
