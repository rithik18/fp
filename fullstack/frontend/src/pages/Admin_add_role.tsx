import { useEffect, useState } from "react";
import { validate } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../components/navbar";
import Datatable from "../components/datatable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
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

import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { H2 } from "../components/ui/Typography";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ChevronLeft, ChevronRight, PencilLine, Trash2, BriefcaseBusiness, X } from "lucide-react";

const Admin_add_role = () => {
  const [roleData, setroleData] = useState<any[]>([]);
  const [editrole, seteditrole] = useState(true);
  const [editrolename, seteditrolename] = useState("");
  const [editrolemsg, seteditrolemsg] = useState("");
  const [editrolesno, seteditrolesno] = useState(-1);
  const [deleterolesno, setdeleterolesno] = useState(-1);

  const [a, seta] = useState([]);
  const [b, setb] = useState([]);
  const [c, setc] = useState(10);
  const [p, setp] = useState(1);
  const [pc, setpc] = useState(1);
  const [d, setd] = useState(1);

  const handleAddrole = async () => {
    const token = await Cookies.get("token");
    const roleInput = document.getElementById("role") as HTMLInputElement;
    const role = roleInput.value;
    const descInput = document.getElementById("message") as HTMLInputElement;
    const desc = descInput.value;
    var data = {
      name: role,
      desc: desc,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const reqOptions = {
      url: "http://localhost:3000/admin/add_role",
      method: "POST",
      data: { token: token, data: data },
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        toast.success("role added");
        getAllrole();
      }
    } catch (e) {
      if (e!.status == 403) {
        toast.error("role exsist");
      } else {
        toast.error(`${e}`);
      }
    }
  };
  const handleUpdaterole = async () => {
    const token = await Cookies.get("token");
    var data = {
      name: editrolename,
      desc: editrolemsg,
      updated_at: new Date().toISOString(),
    };
    const reqOptions = {
      url: "http://localhost:3000/admin/edit_role",
      method: "POST",
      data: { token: token, data: data, id: roleData[editrolesno].id },
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        toast.success("role Edited");
        getAllrole();
        seteditrolename("");
        seteditrolemsg("");
        const roleInput = document.getElementById(
          "editrole"
        ) as HTMLInputElement;
        roleInput.value = "";
        const descInput = document.getElementById(
          "editmessage"
        ) as HTMLInputElement;
        descInput.value = "";
        seteditrole(!editrole);
      }
    } catch (e) {
      if (e!.status == 403) {
        console.log(e);
        toast.error("role exsist");
      } else {
        toast.error(`${e}`);
      }
    }
  };
  const handleDeleterole = async (sno :any) => {
    const token = await Cookies.get("token");
    console.log(deleterolesno)
    const reqOptions = {
      url: "http://localhost:3000/admin/delete_role",
      method: "POST",
      data: { token: token, id: roleData[sno].id },
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        toast.success("role Deleted");
        getAllrole();
      }
    } catch (e) {
      if (e!.status == 403) {
        console.log(e);
        toast.error("role exsist");
      } else {
        toast.error(`${e}`);
      }
    }
  };
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
        seta(response.data.data);
        setb(response.data.data.slice(0, c));
        setpc(Math.ceil(response.data.data.length / c));
        setd(response.data.data.length);
        // console.log(response.data.data.length,response.data.data.length/c,c,p,pc,"hell")
      }
    } catch (e) {
      toast.error(e as String);
    }
  };
  useEffect(() => {
    const ini = async () => {
      console.log("first");
      console.log((p - 1) * c, (p - 1) * c + c);
      setb(a.slice((p - 1) * c, (p - 1) * c + c));
    };
    ini();
  }, [p]);
  useEffect(() => {
    const ini = async () => {
      setb(a.slice(0, c));
      setpc(a.length / c);
      setp(1);
    };
    ini();
  }, [c]);
  useEffect(() => {
    validate();
    getAllrole();
    console.log(Cookies.get("role"));
    if (
      Cookies.get("role")?.toUpperCase() === "ADMIN" &&
      Cookies.get("auth") == "true"
    ) {
      // alert("hell")
      n("/add_role");
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
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <p className="text-center scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl pb-8 mx-auto">Roles Section</p>
      <div className="grid grid-cols-3 gap-4 mx-auto px-4">
        {editrole ? (
          <div className="grid w-full max-w-sm items-center h-1/2 gap-4 p-4">
            <H2>Add Roles</H2>
            <Label htmlFor="role">Role Name</Label>
            <Input type="role" id="role" placeholder="Role Name" />

            <Label htmlFor="message">Role Description</Label>
            <Textarea placeholder="Type your description here." id="message" />
            <Button variant={"default"} onClick={handleAddrole}>
              Submit
            </Button>
          </div>
        ) : (
          <div className="grid w-full max-w-sm items-center h-1/2 gap-4 p-4">
            <div className="flex justify-between items-center">
              <H2 className="max-w-full">Edit Roles</H2>
              <X
                size={20}
                onClick={() => {
                  // toast.warning("hell")
                  seteditrolename("");
                  seteditrolemsg("");
                  const roleInput = document.getElementById(
                    "editrole"
                  ) as HTMLInputElement;
                  roleInput.value = "";
                  const descInput = document.getElementById(
                    "editmessage"
                  ) as HTMLInputElement;
                  descInput.value = "";
                  seteditrole(!editrole);
                }}
              />
            </div>
            <Label htmlFor="editrole">Role Name</Label>
            <Input
              type="editrole"
              id="editrole"
              placeholder="Edit Role Name"
              value={editrolename}
              onChange={(e: any) => {
                seteditrolename(e.target.value);
              }}
            />

            <Label htmlFor="editmessage">Role Description</Label>
            <Textarea
              placeholder="Type your description here."
              id="editmessage"
              value={editrolemsg}
              onChange={(e: any) => {
                seteditrolemsg(e.target.value);
              }}
            />
            <Button className="hover:bg-blue-700 hover:text-white" variant={"link"} onClick={() => {
                  // toast.warning("hell")
                  seteditrolename("");
                  seteditrolemsg("");
                  const roleInput = document.getElementById(
                    "editrole"
                  ) as HTMLInputElement;
                  roleInput.value = "";
                  const descInput = document.getElementById(
                    "editmessage"
                  ) as HTMLInputElement;
                  descInput.value = "";
                  seteditrole(!editrole);
                }}>
              Cancel
            </Button>
            <Button variant={"default"} onClick={handleUpdaterole}>
              Update
            </Button>
          </div>
        )}

        <div className="col-span-2 overflow-auto">
        <p className="flex justify-self-start  text-lg font-bold">{d} Results &nbsp;&nbsp;&nbsp; <BriefcaseBusiness /></p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Sno</TableHead>
                <TableHead>Role ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {b.map((e: any, sno) => {
                return (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{sno + 1}</TableCell>
                    <TableCell>{e.id}</TableCell>
                    <TableCell>{e.name}</TableCell>
                    <TableCell>{e.desc}</TableCell>
                    <TableCell>
                      <PencilLine
                        size={20}
                        onClick={() => {
                          if (editrole) {
                            seteditrole(false);
                          }
                          seteditrolename(roleData[sno].name);
                          seteditrolemsg(roleData[sno].desc);
                          seteditrolesno(sno);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Trash2 size={20} className="text-red-600" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete role.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                handleDeleterole(sno)
                                // setdeleterolesno(sno);
                                // console.log(sno);
                                // setTimeout(()=>{handleDeleterole();},1000)
                                
                              }}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          
          <div className="flex items-center justify-evenly">
            <Button variant={"link"} className="hover:text-blue-700 flex justify-around items-center"
              onClick={() => {
                console.log(p);
                if (p - 1 > 0) setp(p - 1);
              }}
            >
              <ChevronLeft />
              <p>Previous</p>
            </Button>
            <p className="font-bold"><span className="text-blue-600">{p}</span>/{pc}</p>
            
            <Button variant={"link"} className="hover:text-blue-700 flex justify-around items-center"
              onClick={() => {
                if (p + 1 <= pc) setp(p + 1);
              }}
            >
              <p>Next</p><ChevronRight/>
            </Button>
          </div>
        </div>
      </div>
      {/* <Datatable/> */}
    </div>
  );
};

export default Admin_add_role;
