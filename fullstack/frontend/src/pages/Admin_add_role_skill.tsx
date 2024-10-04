import { useEffect, useState } from "react";
import { validate } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../components/navbar";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
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
import { ScrollArea } from "../components/ui/scroll-area";

import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { H2 } from "../components/ui/Typography";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  PencilLine,
  Trash2,
  UserCog,
  X,
} from "lucide-react";
import { Badge } from "../components/ui/badge";

const Admin_add_role_skill = () => {
  const [department, setDepartment] = useState("OTHER");
  const [role, setrole] = useState("None");
  const [roleData, setroleData] = useState<any[]>([]);
  const [skillDataDrop, setskillDataDrop] = useState<any[]>([]);
  const [skillDataDropbool, setskillDataDropbool] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const selectedSkills = skillDataDrop.filter((_, i) => skillDataDropbool[i]);

  const [skillData, setskillData] = useState<any[]>([]);
  const [editskill, seteditskill] = useState(true);
  const [editskillname, seteditskillname] = useState("");
  const [editskillmsg, seteditskillmsg] = useState("");
  const [editskillsno, seteditskillsno] = useState(-1);

  const [a, seta] = useState([]);
  const [b, setb] = useState([]);
  const [c, setc] = useState(10);
  const [p, setp] = useState(1);
  const [pc, setpc] = useState(1);
  const [d, setd] = useState(1);

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
  const getAllSkill = async () => {
    const token = await Cookies.get("token");
    const reqOptions = {
      url: "http://localhost:3000/admin/view_skill",
      method: "POST",
      data: { token: token },
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        console.log(response.data.data);
        setskillDataDrop(response.data.data);
        const array = new Array(response.data.data.length).fill(false);
        setskillDataDropbool(array);
        // console.log(array)
      }
    } catch (e) {
      toast.error(e as String);
    }
  };
  const handleAddSkill = async () => {
    console.log(role,department,selectedSkills)
 
    const token = await Cookies.get("token");
    
    var data = {
      RoleId: role,
      department: department,
      skill:selectedSkills
    };
    const reqOptions = {
      url: "http://localhost:3000/admin/add_role_skill",
      method: "POST",
      data: { token: token, data: data },
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        toast.success("Skill added");
        getAllRoleSkill();
      }
    } catch (e) {
      if (e!.status == 403) {
        toast.error("Skill exsist");
      } else {
        toast.error(`${e}`);
      }
    }
  };
  const handleUpdateSkill = async () => {
    const token = await Cookies.get("token");
    var data = {
      name: editskillname,
      desc: editskillmsg,
      updated_at: new Date().toISOString(),
    };
    const reqOptions = {
      url: "http://localhost:3000/admin/edit_role_skill",
      method: "POST",
      data: { token: token, data: data, id: skillData[editskillsno].id },
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        toast.success("Skill Edited");
        getAllRoleSkill();
        seteditskillname("");
        seteditskillmsg("");
        const skillInput = document.getElementById(
          "editskill"
        ) as HTMLInputElement;
        skillInput.value = "";
        const descInput = document.getElementById(
          "editmessage"
        ) as HTMLInputElement;
        descInput.value = "";
        seteditskill(!editskill);
      }
    } catch (e) {
      if (e!.status == 403) {
        console.log(e);
        toast.error("Skill exsist");
      } else {
        toast.error(`${e}`);
      }
    }
  };
  const handleDeleteSkill = async (sno: any) => {
    const token = await Cookies.get("token");
    const reqOptions = {
      url: "http://localhost:3000/admin/delete_role_skill",
      method: "POST",
      data: { token: token, id: skillData[sno].id },
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        toast.success("Skill Deleted");
        getAllRoleSkill();
      }
    } catch (e) {
      if (e!.status == 403) {
        console.log(e);
        toast.error("Skill exsist");
      } else {
        toast.error(`${e}`);
      }
    }
  };
  const getAllRoleSkill = async () => {
    const token = await Cookies.get("token");
    const reqOptions = {
      url: "http://localhost:3000/admin/view_role_skill",
      method: "POST",
      data: { token: token },
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        console.log(response.data.data);
        var groupedData = response.data.data.reduce((acc:any, item:any) => {
          const key = `${item.RoleId}-${item.department}`;
          if (!acc[key]) {
              acc[key] = {
                  RoleId: item.RoleId,
                  RoleName:roleData.find((e)=>e.id===item.RoleId).name,
                  department: item.department,
                  skills: []
              };
          }
          acc[key].skills.push({
              skillId: item.skillId,
              SkillName:skillDataDrop.find((e)=>e.id===item.skillId).name
              // item.skillId
          });
          return acc;
      }, {});
      
      console.log(Object.values(groupedData));
      groupedData=Object.values(groupedData)

        setskillData(groupedData);
        seta(groupedData);
        setb(groupedData.slice(0, c));
        setpc(Math.ceil(groupedData.length / c));
        setd(groupedData.length);

      }
    } catch (e) {
      toast.error(e as String);
    }
  };
  const clearAll = () => {
    setskillDataDropbool(new Array(skillDataDrop.length).fill(false));
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
    getAllRoleSkill();
    getAllrole();
    getAllSkill();
    console.log(Cookies.get("role"));
    if (
      Cookies.get("role")?.toUpperCase() === "ADMIN" &&
      Cookies.get("auth") == "true"
    ) {
      n("/add_role_skill");
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
      <p className="text-center scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl pb-8 mx-auto">
        Role Skills Section
      </p>
      <div className="grid grid-cols-3 gap-4 mx-auto px-4">
        {editskill ? (
          <div className="grid w-full max-w-sm items-center h-1/2 gap-4 p-4">
            <H2>Add Skills</H2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full">
                <Button variant="outline">
                  {roleData.length != 0 && role != "None"
                    ? roleData.filter((e: any) => e.id === role)[0]?.name
                    : role}
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={role} onValueChange={setrole}>
                  <DropdownMenuRadioItem value="None">
                    None
                  </DropdownMenuRadioItem>
                  {roleData.length != 0 &&
                    roleData.map((e: any) => {
                      // console.log(role1,"jjjj")
                      return (
                        <DropdownMenuRadioItem value={e.id}>
                          {e.name}
                        </DropdownMenuRadioItem>
                      );
                    })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full">
                <Button variant="outline">
                  {department} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
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
            {/* Dropdown to selet skill */}
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button>Select Skill</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-full"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <div className="flex justify-between items-center mb-2">
                  <DropdownMenuLabel>Skillset</DropdownMenuLabel>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={clearAll}
                      title="Clear All"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpen(false)}
                      title="Close"
                    >
                      <CheckCheck className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                  {skillDataDrop.map((e, i) => (
                    <DropdownMenuCheckboxItem
                      key={i}
                      checked={skillDataDropbool[i]}
                      onCheckedChange={(f) => {
                        const d = [...skillDataDropbool];
                        d[i] = f;
                        setskillDataDropbool(d);
                      }}
                      onSelect={(event) => event.preventDefault()}
                    >
                      {e.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Badge to display selected skill */}
            {selectedSkills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant={"secondary"}
                    className="bg-gray-100 rounded-full"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            )}
            <Button variant={"default"} onClick={handleAddSkill}>
              Submit
            </Button>
          </div>
        ) : (
          <div className="grid w-full max-w-sm items-center h-1/2 gap-4 p-4">
            <div className="flex justify-between items-center">
              <H2 className="max-w-full">Edit Skills</H2>
              <X
                size={20}
                onClick={() => {
                  // toast.warning("hell")
                  seteditskillname("");
                  seteditskillmsg("");
                  const skillInput = document.getElementById(
                    "editskill"
                  ) as HTMLInputElement;
                  skillInput.value = "";
                  const descInput = document.getElementById(
                    "editmessage"
                  ) as HTMLInputElement;
                  descInput.value = "";
                  seteditskill(!editskill);
                }}
              />
            </div>
            <Label htmlFor="editskill">Skill Name</Label>
            <Input
              type="editskill"
              id="editskill"
              placeholder="edit Skill Name"
              value={editskillname}
              onChange={(e: any) => {
                seteditskillname(e.target.value);
              }}
            />

            <Label htmlFor="editmessage">Skill Description</Label>
            <Textarea
              placeholder="Type your description here."
              id="editmessage"
              value={editskillmsg}
              onChange={(e: any) => {
                seteditskillmsg(e.target.value);
              }}
            />
            <Button
              className="hover:bg-blue-700 hover:text-white"
              variant={"link"}
              onClick={() => {
                // toast.warning("hell")
                seteditskillname("");
                seteditskillmsg("");
                const skillInput = document.getElementById(
                  "editskill"
                ) as HTMLInputElement;
                skillInput.value = "";
                const descInput = document.getElementById(
                  "editmessage"
                ) as HTMLInputElement;
                descInput.value = "";
                seteditskill(!editskill);
              }}
            >
              Cancel
            </Button>
            <Button variant={"default"} onClick={handleUpdateSkill}>
              Update
            </Button>
          </div>
        )}

        <div className="col-span-2 overflow-auto">
          <p className="flex justify-self-start  text-lg font-bold">
            {d} Results &nbsp;&nbsp;&nbsp; <UserCog />
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Sno</TableHead>
                <TableHead>Role Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {b.map((e: any, sno) => {
                return (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{sno + 1}</TableCell>
                    <TableCell>{e.RoleName}</TableCell>
                    <TableCell>{e.department}</TableCell>
                    <TableCell>
                    <div className="grid grid-cols-3 gap-2">
                    {e.skills.map((skill:any) => (
                    <Badge key={skill.skillId} className="rounded-full justify-center"variant="secondary">
                      {skill.SkillName}
                    </Badge>
                  ))}
                  </div>
                    </TableCell>
                    <TableCell>
                      <PencilLine
                        size={20}
                        onClick={() => {
                          if (editskill) {
                            seteditskill(false);
                          }
                          seteditskillname(skillData[sno].name);
                          seteditskillmsg(skillData[sno].desc);
                          seteditskillsno(sno);
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
                              permanently delete skill.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                // setdeleteskillsno(sno);
                                // console.log(sno);
                                handleDeleteSkill(sno);
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
            <Button
              variant={"link"}
              className="hover:text-blue-700 flex justify-around items-center"
              onClick={() => {
                console.log(p);
                if (p - 1 > 0) setp(p - 1);
              }}
            >
              <ChevronLeft />
              <p>Previous</p>
            </Button>
            <p className="font-bold">
              <span className="text-blue-600">{p}</span>/{pc}
            </p>

            <Button
              variant={"link"}
              className="hover:text-blue-700 flex justify-around items-center"
              onClick={() => {
                if (p + 1 <= pc) setp(p + 1);
              }}
            >
              <p>Next</p>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
      {/* <Datatable/> */}
    </div>
  );
};

export default Admin_add_role_skill;
