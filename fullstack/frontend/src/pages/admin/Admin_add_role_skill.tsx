import { useEffect, useState } from "react";
import { validate } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../../components/navbar";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
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
} from "../../components/ui/alert-dialog";
import { ScrollArea } from "../../components/ui/scroll-area";

import { Button } from "../../components/ui/button";
import { H2 } from "../../components/ui/Typography";
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
import { Badge } from "../../components/ui/badge";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Admin_add_role_skill = () => {
  const [department, setDepartment] = useState("OTHER");
  const [department1, setDepartment1] = useState("OTHER");
  const [role, setrole] = useState("None");
  const [role1, setrole1] = useState("None");
  const [roleData, setroleData] = useState<any[]>([]);
  const [skillDataDrop, setskillDataDrop] = useState<any[]>([]);
  const [skillDataDropbool, setskillDataDropbool] = useState<any[]>([]);
  const [skillDataDropbool1, setskillDataDropbool1] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const selectedSkills = skillDataDrop.filter((_, i) => skillDataDropbool[i]);
  const selectedSkills1 = skillDataDrop.filter((_, i) => skillDataDropbool1[i]);

  const [skillData, setskillData] = useState<any[]>([]);
  const [editskill, seteditskill] = useState(true);
  const [editskillsno, seteditskillsno] = useState(-1);

  const [a, seta] = useState([]);
  const [b, setb] = useState([]);
  const [c, setc] = useState(10);
  const [p, setp] = useState(1);
  const [pc, setpc] = useState(1);
  const [d, setd] = useState(1);

  const [loading, setloading] = useState(true)

  const handleAddSkill = async () => {
    console.log(selectedSkills)
    if(selectedSkills.length == 0){
      toast.error("Select Atleast 1 skill")
      return
    }
    console.log(role, department1, selectedSkills);

    const token = await Cookies.get("token");

    var data = {
      RoleId: role,
      department: department,
      skill: selectedSkills,
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
        // getAllRoleSkill();
        fetchAllData();
      }
    } catch (e:any) {
      if (e.status == 403) {
        toast.error("Skill exsist");
      } else {
        toast.error(`${e}`);
      }
    }
  };
  const handleUpdateSkill = async () => {
    const token = await Cookies.get("token");
    var data = {
      RoleId: role1,
      department: department1,
      skill: selectedSkills1,
    };
    const reqOptions = {
      url: "http://localhost:3000/admin/edit_role_skill",
      method: "POST",
      data: { token: token, data: data },
    };
    console.log(selectedSkills1);
    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        toast.success("Skill Edited");
        fetchAllData()
        setskillDataDropbool1([])
        setrole1("None")
        seteditskill(!editskill)
        setDepartment1("OTHER")
      }
    } catch (e:any) {
      if (e.status == 403) {
        console.log(e);
        toast.error("Skill exsist");
      } else {
        toast.error(`${e}`);
      }
    }
  };
  const handleDeleteSkill = async (sno: any) => {
    const token = await Cookies.get("token");
    console.log(skillData[sno],sno,"indelete")
    const reqOptions = {
      url: "http://localhost:3000/admin/delete_role_skill",
      method: "POST",
      data: { token: token, data:skillData[sno] },
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        toast.success("Skill Deleted");
        // getAllRoleSkill();
        fetchAllData()
      }
    } catch (e:any) {
      if (e.status == 403) {
        console.log(e);
        toast.error("Skill exsist");
      } else {
        toast.error(`${e}`);
      }
    }
  };
  
  const clearAll = () => {
    setskillDataDropbool(new Array(skillDataDrop.length).fill(false));
  };
  const clearAll1 = () => {
    setskillDataDropbool1(new Array(skillDataDrop.length).fill(false));
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
  const fetchAllData = async () => {
    const token = Cookies.get("token");
  
    // Prepare requests
    const requests = [
      axios.post("http://localhost:3000/admin/view_role", { token }),
      axios.post("http://localhost:3000/admin/view_skill", { token }),
      axios.post("http://localhost:3000/admin/view_role_skill", { token }),
    ];
  
    try {
      // Execute requests in parallel
      const [roleResponse, skillResponse, roleSkillResponse] = await Promise.all(requests);
  
      // Handle role data
      if (roleResponse.status === 200) {
        console.log(roleResponse.data.data);
        setroleData(roleResponse.data.data);
      }
  
      // Handle skill data
      if (skillResponse.status === 200) {
        console.log(skillResponse.data.data);
        setskillDataDrop(skillResponse.data.data);
        const array = new Array(skillResponse.data.data.length).fill(false);
        setskillDataDropbool(array);
      }
  
      // Handle role skill data
      if (roleSkillResponse.status === 200) {
        console.log(roleSkillResponse.data.data);
        
        const groupedData = roleSkillResponse.data.data.reduce((acc: any, item: any) => {
          const key = `${item.RoleId}-${item.department}`;
          
          // Always initialize acc[key]
          if (!acc[key]) {
            console.log("in get all roles skill3");
            acc[key] = {
              RoleId: item.RoleId,
              RoleName: roleResponse.data.data.find((e:any) => e.id === item.RoleId)?.name,
              department: item.department,
              skills: [],
            };
          }
          
          console.log("in get all roles skill5");
          acc[key].skills.push({
            skillId: item.skillId,
            SkillName: skillResponse.data.data.find((e:any) => e.id === item.skillId)?.name,
          });
          
          return acc;
        }, {});
  
        console.log(Object.values(groupedData));
        const skillDataArray:any = Object.values(groupedData);
        setskillData(skillDataArray);
        seta(skillDataArray);
        setb(skillDataArray.slice(0, c));
        setpc(Math.ceil(skillDataArray.length / c));
        setd(skillDataArray.length);
        console.log("in get all roles skill1");
        setloading(false);
      }
    } catch (e) {
      toast.error(e as String);
    }
  };
  
  // Call this function in your useEffect
  // useEffect(() => {
  //   setloading(true); // Start loading
  //   fetchAllData(); // Fetch all data
  // }, []);
  
  useEffect(() => {
    console.log("in use effect");
    setloading(true);
    // const ini=async()=>{
    //   await getAllrole();
    //   await getAllSkill();
    // }
    // ini();
    // getAllRoleSkill();
    fetchAllData();
    validate();
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
            {/* Dropdown to select skill */}
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
                  seteditskill(!editskill);
                }}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full">
                <Button variant="outline">
                  {roleData.length != 0 && role1 != "None"
                    ? roleData.filter((e: any) => e.id === role1)[0]?.name
                    : role1}
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={role1} onValueChange={setrole1}>
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
                  {department1} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup
                  value={department1}
                  onValueChange={setDepartment1}
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
            {/* Dropdown to edit skill */}
            <DropdownMenu open={open1} onOpenChange={setOpen1}>
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
                      onClick={clearAll1}
                      title="Clear All"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpen1(false)}
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
                      checked={skillDataDropbool1[i]}
                      onCheckedChange={(f) => {
                        const d = [...skillDataDropbool1];
                        d[i] = f;
                        setskillDataDropbool1(d);
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
            {selectedSkills1.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedSkills1.map((skill) => (
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
            
            <Button
              className="hover:bg-red-700 hover:text-white"
              variant={"link"}
              onClick={() => {

                // seteditskillname("");
                // seteditskillmsg("");
                // const skillInput = document.getElementById(
                //   "editskill"
                // ) as HTMLInputElement;
                // skillInput.value = "";
                // const descInput = document.getElementById(
                //   "editmessage"
                // ) as HTMLInputElement;
                // descInput.value = "";
                // seteditskill(!editskill);
              }}
            >
              Cancel
            </Button>
            <Button variant={"default"} onClick={handleUpdateSkill}>
              Update
            </Button>
          </div>
        )}
        {
          loading?
          <ClimbingBoxLoader className="mx-auto col-span-2  my-auto" />
          :
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
                        {e.skills.map((skill: any) => (
                          <Badge
                            key={skill.skillId}
                            className="rounded-full justify-center"
                            variant="secondary"
                          >
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
                          seteditskillsno(sno)
                          setrole1(e.RoleId)
                          setDepartment1(e.department)
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
        }
      </div>
      {/* <Datatable/> */}
    </div>
  );
};

export default Admin_add_role_skill;
