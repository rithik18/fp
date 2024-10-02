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
} from "@/components/ui/table";
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
} from "@/components/ui/alert-dialog"

import { Textarea } from "@/components/ui/textarea";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { H1, H2 } from "../components/ui/Typography";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { PencilLine, Trash2, X } from "lucide-react";

const Admin_add_skill = () => {
  const [skillData, setskillData] = useState<any[]>([]);
  const [editskill, seteditskill] = useState(true);
  const [editskillname, seteditskillname] = useState("");
  const [editskillmsg, seteditskillmsg] = useState("");
  const [editskillsno, seteditskillsno] = useState(-1);
  const [deleteskillsno, setdeleteskillsno] = useState(-1);

  const[a,seta]=useState([])
  const[b,setb]=useState([])
  const[c,setc]=useState(10)
  const[p,setp]=useState(1)
  const[pc,setpc]=useState(1)
  const handleAddSkill = async () => {
    const token = await Cookies.get("token");
    const skillInput = document.getElementById("skill") as HTMLInputElement;
    const skill = skillInput.value;
    const descInput = document.getElementById("message") as HTMLInputElement;
    const desc = descInput.value;
    var data = {
      name: skill,
      desc: desc,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const reqOptions = {
      url: "http://localhost:3000/admin/add_skill",
      method: "POST",
      data: { token: token, data: data },
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        toast.success("Skill added");
        getAllSkill()
      }
    } catch (e) {
      if (e!.status == 403) {
        toast.error("Skill exsist");
      }
else{
  toast.error(`${e}`);
}
    }
  };
  const handleUpdateSkill=async()=>{
    const token = await Cookies.get("token");
    var data = {
      name: editskillname,
      desc: editskillmsg,
      updated_at: new Date().toISOString(),
    };
    const reqOptions = {
      url: "http://localhost:3000/admin/edit_skill",
      method: "POST",
      data: { token: token, data: data,id:skillData[editskillsno].id},
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        toast.success("Skill Edited");
        getAllSkill()
        seteditskillname("")
        seteditskillmsg("")
        const skillInput = document.getElementById("editskill") as HTMLInputElement;
        skillInput.value="";
        const descInput = document.getElementById("editmessage") as HTMLInputElement;
        descInput.value="";
        seteditskill(!editskill);
      }
    } catch (e) {
      if (e!.status == 403) {
        console.log(e)
        toast.error("Skill exsist");
      }
else{
  toast.error(`${e}`);
}
    
  }
}
const handleDeleteSkill=async()=>{
  const token = await Cookies.get("token");
    const reqOptions = {
      url: "http://localhost:3000/admin/delete_skill",
      method: "POST",
      data: { token: token,id:skillData[deleteskillsno].id},
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        toast.success("Skill Deleted");
        getAllSkill()
      }
    } catch (e) {
      if (e!.status == 403) {
        console.log(e)
        toast.error("Skill exsist");
      }
else{
  toast.error(`${e}`);
}
    
}

}
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
        setskillData(response.data.data);
        seta(response.data.data)
        setb(response.data.data.slice(0,c))
        setpc(Math.ceil(response.data.data.length/c))
        // console.log(response.data.data.length,response.data.data.length/c,c,p,pc,"hell")
      }
    } catch (e) {
      toast.error(e as String);
    }
  };
  useEffect(() => {
    const ini= async() => {
      console.log("first")
      console.log((p-1)*c,(p-1)*c+c)
      setb(a.slice((p-1)*c,(p-1)*c+c))
      
      
    }
    ini()
  }, [p])
  useEffect(() => {
  
    const ini = async () => {
      
      setb(a.slice(0,c))
      setpc(a.length/c)
      setp(1)
  
    }
    ini()
  }, [c])
  useEffect(() => {
    validate();
    getAllSkill();
    console.log(Cookies.get("role"));
    if (
      Cookies.get("role")?.toUpperCase() === "ADMIN" &&
      Cookies.get("auth") == "true"
    ) {
      n("/add_skill");
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
      <H1 className="text-center pb-8 mx-auto">Skills Section</H1>
      <div className="grid grid-cols-3 gap-4 mx-auto px-4">
      
        {editskill ? (
          <div className="grid w-full max-w-sm items-center gap-4 p-4">
            <H2>Add Skills</H2>
            <Label htmlFor="skill">Skill Name</Label>
            <Input type="skill" id="skill" placeholder="Skill Name" />

            <Label htmlFor="message">Skill Description</Label>
            <Textarea placeholder="Type your description here." id="message" />
            <Button variant={"default"} onClick={handleAddSkill}>
              Submit
            </Button>
          </div>
        ) : (
          <div className="grid w-full max-w-sm items-center gap-4 p-4">
            <div className="flex justify-between items-center">
              <H2 className="max-w-full">Edit Skills</H2>
              <X
                size={20}
                onClick={() => {
                  // toast.warning("hell")
                  seteditskillname("")
                  seteditskillmsg("")
                  const skillInput = document.getElementById("editskill") as HTMLInputElement;
                  skillInput.value="";
                  const descInput = document.getElementById("editmessage") as HTMLInputElement;
                  descInput.value="";
                  seteditskill(!editskill);
                }}
              />
            </div>
            <Label htmlFor="editskill">Skill Name</Label>
            <Input type="editskill" id="editskill" placeholder="edit Skill Name" value={editskillname} onChange={(e:any)=>{seteditskillname(e.target.value)}} />

            <Label htmlFor="editmessage">Skill Description</Label>
            <Textarea placeholder="Type your description here." id="editmessage" value={editskillmsg}  onChange={(e:any)=>{seteditskillmsg(e.target.value)}}/>
            <Button variant={"default"} onClick={handleUpdateSkill}>
              Update
            </Button>
          </div>
        )
      }

        <div className="col-span-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Sno</TableHead>
                <TableHead>Skill ID</TableHead>
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
                          if(editskill){
                            seteditskill(false)
                          }
                          seteditskillname(skillData[sno].name)
                          seteditskillmsg(skillData[sno].desc)
                          seteditskillsno(sno)
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      
                      <AlertDialog>
  <AlertDialogTrigger><Trash2 size={20} className="text-red-600" /></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete skill.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>{setdeleteskillsno(sno);console.log(sno);handleDeleteSkill()}}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {p}/{pc}
          <div>
          
        <button onClick={()=>{console.log(p);if(p-1>0)setp(p-1)}}>Previous</button>
        {p}
        <button onClick={()=>{if(p+1<=pc)setp(p+1)}}>Next</button>
      </div>
        </div>
      </div>
      {/* <Datatable/> */}
    </div>
  );
};

export default Admin_add_skill;
