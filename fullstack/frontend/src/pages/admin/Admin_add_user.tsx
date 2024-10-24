import { useEffect, useRef, useState } from "react";
import { validate } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../../components/navbar";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  UserRoundCheck,
  FileDown,
} from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Calendar } from "../../components/ui/calendar";
import Cards from "../../components/Cards";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import readXlsxFile from "read-excel-file";
import { H2, H4 } from "../../components/ui/Typography";
import { ScrollArea } from "../../components/ui/scroll-area";
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";

const Admin_add_user = () => {
  const [roleData, setroleData] = useState<any>([]);
  const [userData, setuserData] = useState<any>([]);
  const [searchuserData, setsearchuserData] = useState<any>([]);
  const [date, setDate] = useState<Date>();
  const [data, setData] = useState<any>([]);
  const [header, setHeader] = useState<any>([]);
  useEffect(() => {
    validate();
    // getAllrole();
    // getAllUser();
    getAllData()
    
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
  const [department1, setDepartment1] = useState("OTHER");
  const [role, setrole] = useState("None");
  const [role1, setrole1] = useState("None");
  const [fileName, setFileName] = useState("");
  const [latestFile, setLatestFile] = useState(null);
  const fileInputRef = useRef<any>(null);
  const [a, seta] = useState([]);
  const [b, setb] = useState([]);
  const [c, setc] = useState(6);
  const [p, setp] = useState(1);
  const [pc, setpc] = useState(1);
  const [d, setd] = useState(1);
  useEffect(() => {
    const ini = async () => {
      console.log("first");
      console.log((p - 1) * c, (p - 1) * c + c);
      setb(a.slice((p - 1) * c, (p - 1) * c + c));
    };
    ini();
  }, [p, department1, role1]);
  useEffect(() => {
    const ini = async () => {
      setb(a.slice(0, c));
      setpc(a.length / c);
      setp(1);
    };
    ini();
  }, [c, department1, role1]);

  useEffect(() => {
    const val = roleData.find((e: any) => e.id === role1)?.name;
    // console.log(d)
    if (val == undefined || val == "None" || val == "" || val == null) {
      setsearchuserData(userData);
      seta(userData);
      setb(userData.slice(0, c));
      setpc(Math.ceil(userData.length / c));
      setd(userData.length);
    } else {
      const d = userData
        .filter((e: any) => {
          return e.department === department1;
        })
        .filter((e: any) => {
          return e.role_id === role1;
        });
      setsearchuserData(d);
      seta(d);
      setb(d.slice(0, c));
      setpc(Math.ceil(d.length / c));
      setd(d.length);
    }

    console.log("hellusesetae");
  }, [department1, role1]);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected through input:", file.name);
      setFileName(file.name);
      setLatestFile(file);
      readXlsxFile(file)
        .then((rows: any) => {
          console.log("Rows from input file:", rows);
          setHeader(rows[0]);
          setData(rows.slice(1));
        })
        .catch((error) => {
          console.error("Error reading the file:", error);
        });
    }
  };

  const dropHandler = (ev: any) => {
    console.log("File(s) dropped");
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      [...ev.dataTransfer.items].forEach((item) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file) {
            console.log("File dropped:", file.name);
            setFileName(file.name);
            setLatestFile(file);
            readXlsxFile(file)
              .then((rows: any) => {
                console.log("Rows from dropped file:", rows);
                setHeader(rows[0]);
                setData(rows.slice(1));
              })
              .catch((error) => {
                console.error("Error reading the file:", error);
              });
          }
        }
      });
    }
  };

  const dragOverHandler = (ev: any) => {
    ev.preventDefault();
  };
  const convertExcelDateToFormattedDate = (serialDate: any) => {
    const excelEpoch = new Date(1900, 0, 1) as any; // January 1, 1900
    const jsDate = new Date(
      excelEpoch.getTime() + (serialDate - 1) * 24 * 60 * 60 * 1000
    ); // -1 because Excel starts from 1

    // Format the date as dd-MM-yyyy
    const day = String(jsDate.getDate()).padStart(2, "0");
    const month = String(jsDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const year = jsDate.getFullYear();

    return `${day}-${month}-${year}`; // Return formatted date
  };
  const clearFileInput = () => {
    setFileName(""); // Clear the file name state
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the input value
    }
  };
  const formatDateToYYYYMMDD = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const handleSingleSubmit = async () => {
    console.log(role, department, formatDateToYYYYMMDD(date));
    const nameInpput = document.getElementById("name") as HTMLInputElement;
    if (
      nameInpput.value == "" ||
      nameInpput.value == null ||
      nameInpput.value == undefined
    ) {
      toast.warn("Fill Name");
      return;
    }
    const emailInpput = document.getElementById("email") as HTMLInputElement;
    const email_regex = new RegExp(`/^([a-z0-9@]{8,})$/`);
    if (
      emailInpput.value == "" ||
      emailInpput.value == null ||
      emailInpput.value == undefined ||
      !email_regex.test(emailInpput.value)
    ) {
      toast.warn("Fill Email");
      return;
    }
    const passInpput = document.getElementById("password") as HTMLInputElement;
    const regex = new RegExp(`/^([a-z0-9@#$%&^*!_']{8,})$/`);
    if (
      passInpput.value == "" ||
      passInpput.value == null ||
      passInpput.value == undefined ||
      !regex.test(passInpput.value)
    ) {
      toast.warn("Fill a valid Password");
      return;
    }
    const singleData = {
      name: nameInpput.value,
      role_id: role,
      joining_date: formatDateToYYYYMMDD(date as Date),
      department: department,
      mail: emailInpput.value,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      password: passInpput.value,
    };
    const token = await Cookies.get("token");
    const reqOptions = {
      url: "http://localhost:3000/admin/add_user",
      method: "POST",
      data: { token: token, data: singleData },
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        toast.success("User added");
        // getAllUser();
        getAllData()

      }
    } catch (e:any) {
      if (e!.status == 403) {
        toast.error("USer exsist");
      } else {
        toast.error(`${e}`);
      }
    }
  };
  const handleMultipleSubmit = async () => {
    const jsonArray = data.map((item:any) => {
      return header.reduce(
        (acc: any, key:any, index:any) => {
          if (key === "joining_date") {
            // console.log(key, item[index]);
            acc[key] = convertExcelDateToFormattedDate(item[index]);
          } else if (key === "role_id") {
            // console.log(item[index],"hell")
            const val: any = roleData.find((e: any) => {
              return e.name === item[index];
            });
            // console.log(val)
            acc[key] = val.id;
          } else {
            acc[key] = item[index];
          }
          return acc;
        },
        {
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      );
    });

    console.log(jsonArray);
    const token = await Cookies.get("token");
    const reqOptions = {
      url: "http://localhost:3000/admin/bulk_add_user",
      method: "POST",
      data: { token: token, data: jsonArray },
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        toast.success("User added");
        // getAllUser();
        getAllData()

        setLatestFile(null);
        setFileName("");
        clearFileInput();
      }
    } catch (e:any) {
      console.log(e);
      if (e!.status == 403) {
        toast.error("User exsist");
      } else {
        toast.error(`${e}`);
      }
    }
  };
  const [loading, setloading] = useState(false);

const getAllData = async () => {
  setloading(true)
  const token = await Cookies.get("token");

  // Create an array of promises for both API calls
  const requests = [
    axios.post("http://localhost:3000/admin/view_role", { token }),
    axios.post("http://localhost:3000/admin/view_user", { token }),
  ];

  try {
    // Wait for both requests to resolve
    const [roleResponse, userResponse] = await Promise.all(requests);

    // Check the status of the role response
    if (roleResponse.status === 200) {
      console.log(roleResponse.data.data);
      setroleData(roleResponse.data.data);
    }

    // Check the status of the user response
    if (userResponse.status === 200) {
      console.log(userResponse.data.data, "alluser");
      setloading(false)
      setuserData(userResponse.data.data);
      setsearchuserData(userResponse.data.data);
      seta(userResponse.data.data);
      setb(userResponse.data.data.slice(0, c));
      setpc(Math.ceil(userResponse.data.data.length / c));
      setd(userResponse.data.data.length);
    }
  } catch (e) {
    toast.error(e as string);
    setloading(false)
  }
};

  return (
    <div className="px-2">
      <Navbar />
      <ToastContainer />
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center backdrop-blur-md z-50">
          <LoadingOverlay
            active={loading}
            spinner={<CircleLoader />}
          ></LoadingOverlay>
        </div>
      )}
      <p className="text-center text-3xl font-extrabold tracking-tight lg:text-4xl pb-8 mx-auto">
        User Section
      </p>
      <div className="grid grid-cols-3 gap-2">
        <div className={`grid grid-rows-2 gap-4`}>
          <div className="flex flex-col gap-4 justify-around px-8 py-4 border-black border-2 rounded-lg border-solid">
            <H2>Add User</H2>

            <div className="grid grid-cols-2">
              <div className="grid-rows-3 px-4">
                <div className="grid w-full max-w-sm items-center gap-3 py-2">
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" id="name" placeholder="Name" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="Email" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input type="text" id="password" placeholder="" />
                </div>
              </div>
              <div className="grid-rows-3 px-4">
                <div className="grid w-full max-w-sm items-center gap-3 py-2">
                  <Label htmlFor="dept">Department</Label>
                  {/* id="dept" */}
                  <DropdownMenu >
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
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 py-2">
                  <Label htmlFor="role">Role</Label>
                  <DropdownMenu >
                    <DropdownMenuTrigger asChild className="w-full">
                      <Button variant="outline">
                        {roleData.length != 0 && role != "None"
                          ? roleData.filter((e: any) => e.id === role)[0]?.name
                          : role}
                        <ChevronDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuRadioGroup
                        value={role}
                        onValueChange={setrole}
                      >
                        <DropdownMenuRadioItem value="None">
                          None
                        </DropdownMenuRadioItem>
                        {roleData.length != 0 &&
                          roleData.map((e: any) => {
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
                <div className="grid w-full max-w-sm items-center gap-3 py-2">
                  <Label htmlFor="join">Joining Date</Label>
                  {/* id="join" */}
                  <Popover >
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            <Button
              variant={"default"}
              className="w-2/3 mx-auto my-auto"
              onClick={handleSingleSubmit}
            >
              Submit
            </Button>
          </div>

          <div
            className="flex flex-col justify-around items-center border-black border-2 rounded-lg border-solid w-full"
            id="drop_zone"
            onDrop={(event) => {
              dropHandler(event);
            }}
            onDragOver={(event) => {
              dragOverHandler(event);
            }}
          >
            <H2>Excel File</H2>
            <Button>
              <a className="w-full flex" target="_blank" href="https://docs.google.com/spreadsheets/d/1WtEafoU-nYl9ib0jTmh4Yn6wd2UYO1Mu/edit?usp=sharing&ouid=100236932522550611267&rtpof=true&sd=true">
            <FileDown  className="relative left-0 top-0 mr-2 items-center" />
            Download Template Excel
              </a>
            </Button>
            <H4>Drag And Drop File / Click Below</H4>
            <Input
              className="w-2/5"
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              onClick={() => setFileName("")}
              ref={fileInputRef}
            />
            <Button
              className="hover:bg-red-700 hover:text-white w-2/5"
              variant={"link"}
              onClick={() => {
                setLatestFile(null);
                setFileName("");
                clearFileInput();
              }}
            >
              Cancel
            </Button>
            {latestFile == null ? (
              <p>Latest file selected: No File Chosen</p>
            ) : (
              <p>Latest file selected: {fileName}</p>
            )}
          </div>
        </div>
        <div className="px-4 col-span-2">
          {latestFile == null ? (
            <div>
              {/* Search bar with dropdown,usercount */}
              <div className="grid grid-cols-4 gap-4 content-center justify-items-center">
                <Input
                  type="text"
                  placeholder={"Search User"}
                  className="p-4 mb-8 rounded-full"
                  onChange={(e) => {
                    console.log(e.target.value.toLowerCase(),userData.length,"1111");
                    if (e.target.value.toLowerCase() == "") {
                      setsearchuserData(userData);
                      seta(userData);
                      setb(userData.slice(0, c));
                      setpc(Math.ceil(userData.length / c));
                      setd(userData.length);
                    } else {
                      var d: any = searchuserData.filter((item: any) =>
                        item.name
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase())
                      );
                      setsearchuserData(d);
                      seta(d);
                      setb(d.slice(0, c));
                      setpc(Math.ceil(d.length / c));
                      setd(d.length);
                    }
                  }}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="w-full rounded-full">
                    <Button variant="outline">
                      {roleData.length != 0 && role1 != "None"
                        ? roleData.filter((e: any) => e.id === role1)[0]?.name
                        : role1}
                      <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuRadioGroup
                      value={role1}
                      onValueChange={setrole1}
                    >
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
                  <DropdownMenuTrigger asChild className="w-full rounded-full">
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
                <div className="flex justify-evenly gap-4">
                <p><span className="text-center text-lg font-extrabold tracking-tight lg:text-xl pb-8 mx-auto">{d}</span><span>&nbsp;&nbsp;-&nbsp;&nbsp;User</span></p>
                <div><UserRoundCheck/></div>
                </div>

              </div>
              {/* Profile Card */}
              <div className="grid grid-cols-3 gap-4">
                {b.map((card: any, index) => {
                  const roles: any = roleData.find((e: any) => {
                    return e.id == card.role_id;
                  });
                  console.log(card, "first");
                  return <Cards props={card} roles={roles.name} roleData={roleData} />;
                })}
              </div>
              {/* Pagination */}
              <div className="flex items-center mt-8 justify-evenly">
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
          ) : (
            <ScrollArea className="h-lvh w-full rounded-md border p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Sno</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Joining Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((e: any, sno:number) => {
                    console.log(e);
                    return (
                      <TableRow key={e[0]}>
                        <TableCell className="font-medium">{sno + 1}</TableCell>
                        <TableCell>{e[0]}</TableCell>
                        <TableCell>{e[1]}</TableCell>
                        <TableCell>{e[2]}</TableCell>
                        <TableCell>{e[3]}</TableCell>
                        <TableCell>{e[4]}</TableCell>
                        <TableCell>
                          {convertExcelDateToFormattedDate(e[5])}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="mt-20 flex gap-4">
                <Button onClick={handleMultipleSubmit}>Submit</Button>
                <Button
                  className="hover:bg-red-700 hover:text-white"
                  variant={"link"}
                  onClick={() => {
                    setLatestFile(null);
                    setFileName("");
                    clearFileInput();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin_add_user;
