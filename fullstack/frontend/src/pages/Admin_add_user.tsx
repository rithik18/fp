import { useEffect, useRef, useState } from "react";
import { validate } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../components/navbar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Table,
  TableBody,

  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../lib/utils";
import { Calendar } from "../components/ui/calendar";
import Cards from "../components/Cards";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import readXlsxFile from "read-excel-file";
import { H2, H4 } from "../components/ui/Typography";
import { ScrollArea } from "../components/ui/scroll-area";

const Admin_add_user = () => {
  const [roleData, setroleData] = useState([]);
  const [userData, setuserData] = useState([])
  const [date, setDate] = useState<Date>();
  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);
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
    getAllUser();
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
  const [fileName, setFileName] = useState("");
  const [latestFile, setLatestFile] = useState(null);
  const fileInputRef = useRef(null);

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
  const formatDateToYYYYMMDD = (date:Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
const handleSingleSubmit=async()=>{
  console.log(role,department,formatDateToYYYYMMDD(date))
  const nameInpput=document.getElementById('name') as HTMLInputElement
  if(nameInpput.value==""||nameInpput.value==null||nameInpput.value==undefined){
    toast.warn("Fill Name")
    return
  }
  const emailInpput=document.getElementById('email') as HTMLInputElement
  if(emailInpput.value==""||emailInpput.value==null||emailInpput.value==undefined){
    toast.warn("Fill Email")
    return
  }
  const passInpput=document.getElementById('password') as HTMLInputElement
  if(passInpput.value==""||passInpput.value==null||passInpput.value==undefined){
    toast.warn("Fill Password")
    return
  }
  const singleData={
  "name":nameInpput.value,
  "role_id":role,
  "joining_date":formatDateToYYYYMMDD(date as Date),
  "department":department,
  "mail":emailInpput.value,
  "created_at" : new Date().toISOString(),
  "updated_at" : new Date().toISOString(),
  "password" :passInpput.value
  }
  const token=await Cookies.get('token')
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
      getAllUser()

    }
  } catch (e) {
    if (e!.status == 403) {
      toast.error("USer exsist");
    } else {
      toast.error(`${e}`);
    }
  }
}
const getAllUser=async()=>{
  const token = await Cookies.get("token");
  const reqOptions = {
    url: "http://localhost:3000/admin/view_user",
    method: "POST",
    data: { token: token },
  };
  console.log(reqOptions);

  try {
    const response = await axios.request(reqOptions);
    if (response.status == 200) {
      console.log(response.data.data,"alluser");
      setuserData(response.data.data)


      // console.log(response.data.data.length,response.data.data.length/c,c,p,pc,"hell")
    }
  } catch (e) {
    toast.error(e as String);
  }
}

  return (
    <div>
      <Navbar />
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
                  <DropdownMenu id="dept">
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
                  <DropdownMenu id="role">
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
                  <Popover id="join">
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
            <Button variant={"default"} className="w-2/3 mx-auto my-auto"
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
              className="hover:bg-blue-700 hover:text-white w-2/5"
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
            <div className="grid grid-cols-3 gap-3">
              <div className="grid grid-rows-3 gap-3">
                <Cards />
                <Cards />
                <Cards />
              </div>
              <div className="grid grid-rows-3 gap-3">
                <Cards />
                <Cards />
                <Cards />
              </div>
              <div className="grid grid-rows-3 gap-3">
                <Cards />
                <Cards />
                <Cards />
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
                  {data.map((e: any, sno) => {
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
              <div>
                <Button>Submit</Button>
                <Button
                  className="hover:bg-blue-700 hover:text-white"
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
