import { useEffect, useState } from "react";
import { validate } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../../components/navbar";
import { Switch } from "../../components/ui/switch"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
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

import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { H2 } from "../../components/ui/Typography";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ChevronLeft, ChevronRight, PencilLine, ShieldCheck, Trash2, UserCog, X,BookOpenCheck} from "lucide-react";
const Admin_add_certification = () => {
    const [certificationData, setcertificationData] = useState<any[]>([]);
    const [editcertification, seteditcertification] = useState(true);
    const [editcertificationname, seteditcertificationname] = useState("");
    const [editcertificationmsg, seteditcertificationmsg] = useState("");
    const [editiscertification, seteditiscertification] = useState(false);
    const [editcertificationsno, seteditcertificationsno] = useState(-1);
    const [is_certificate,setis_certificate]=useState(true)
  
    const [a, seta] = useState([]);
    const [b, setb] = useState([]);
    const [c, setc] = useState(10);
    const [p, setp] = useState(1);
    const [pc, setpc] = useState(1);
    const [d, setd] = useState(1);
  
    const handleAddcertification = async () => {
      const token = await Cookies.get("token");
      const certificationInput = document.getElementById("certification") as HTMLInputElement;
      const certification = certificationInput.value;
      const issued_byInput = document.getElementById("issued_by") as HTMLInputElement;
      const issued_by = issued_byInput.value;
      var data = {
        name: certification,
        issued_by:issued_by,
        is_certificate:is_certificate
      };
      const reqOptions = {
        url: "http://localhost:3000/admin/add_certification",
        method: "POST",
        data: { token: token, data: data },
      };
      console.log(reqOptions);
  
      try {
        const response = await axios.request(reqOptions);
        if (response.status == 200) {
          toast.success("certification added");
          getAllcertification();
        }
      } catch (e) {
        if (e!.status == 403) {
          toast.error("certification exsist");
        } else {
          toast.error(`${e}`);
        }
      }
    };
    const handleUpdatecertification = async () => {
      const token = await Cookies.get("token");
      var data = {
        name: editcertificationname,
        is_certificate: editiscertification,
        issued_by:editcertificationmsg
      };
      const reqOptions = {
        url: "http://localhost:3000/admin/edit_certification",
        method: "POST",
        data: { token: token, data: data, id: certificationData[editcertificationsno].id },
      };
      console.log(reqOptions);
  
      try {
        const response = await axios.request(reqOptions);
        if (response.status == 200) {
          toast.success("certification Edited");
          getAllcertification();
          seteditcertificationname("");
          seteditcertificationmsg("");
          seteditiscertification(false)
          const certificationInput = document.getElementById(
            "editcertification"
          ) as HTMLInputElement;
          certificationInput.value = "";
          const descInput = document.getElementById(
            "edit_issued_by"
          ) as HTMLInputElement;
          descInput.value = "";
          seteditcertification(!editcertification);
        }
      } catch (e) {
        if (e!.status == 403) {
          console.log(e);
          toast.error("certification exsist");
        } else {
          toast.error(`${e}`);
        }
      }
    };
    const handleDeletecertification = async (sno:any) => {
      const token = await Cookies.get("token");
      const reqOptions = {
        url: "http://localhost:3000/admin/delete_certification",
        method: "POST",
        data: { token: token, id: certificationData[sno].id },
      };
      console.log(reqOptions);
  
      try {
        const response = await axios.request(reqOptions);
        if (response.status == 200) {
          toast.success("certification Deleted");
          getAllcertification();
        }
      } catch (e) {
        if (e!.status == 403) {
          console.log(e);
          toast.error("certification exsist");
        } else {
          toast.error(`${e}`);
        }
      }
    };
    const getAllcertification = async () => {
      const token = await Cookies.get("token");
      const reqOptions = {
        url: "http://localhost:3000/admin/view_certification",
        method: "POST",
        data: { token: token },
      };
      console.log(reqOptions);
  
      try {
        const response = await axios.request(reqOptions);
        if (response.status == 200) {
          console.log(response.data.data);
          setcertificationData(response.data.data);
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
       getAllcertification();
        console.log(Cookies.get("role"));
        if (
          Cookies.get("role")?.toUpperCase() === "ADMIN" &&
          Cookies.get("auth") == "true"
        ) {
          n("/add_certification");
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
          <p className="text-center scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl pb-8 mx-auto">Certifications Section</p>
          <div className="grid grid-cols-3 gap-4 mx-auto px-4">
            {editcertification ? (
              <div className="grid w-full max-w-sm items-center h-1/2 gap-4 p-4">
                <H2>Add Certifications</H2>
                <Label htmlFor="certification">Certification Name</Label>
                <Input type="certification" id="certification" placeholder="certification Name" />
    
                <Label htmlFor="issued_by">Certification Issuer</Label>
                <Input type="issued_by" id="issued_by" placeholder="Issued By" />

                <div className="flex justify-around items-center">
                <Label htmlFor="certificate">Is it a Certification course</Label> <Switch id="certificate" onClick={()=>{setis_certificate(!is_certificate)}} checked={is_certificate} />
                </div>
                <Button variant={"default"} onClick={handleAddcertification}>
                  Submit
                </Button>
              </div>
            ) : (
              <div className="grid w-full max-w-sm items-center h-1/2 gap-4 p-4">
                <div className="flex justify-between items-center">
                  <H2 className="max-w-full">Edit Certifications</H2>
                  <X
                    size={20}
                    onClick={() => {
                      // toast.warning("hell")
                      seteditcertificationname("");
                      seteditcertificationmsg("");
                      seteditiscertification(false);
                      const certificationInput = document.getElementById(
                        "editcertification"
                      ) as HTMLInputElement;
                      certificationInput.value = "";
                      const descInput = document.getElementById(
                        "edit_issued_by"
                      ) as HTMLInputElement;
                      descInput.value = "";
                      seteditcertification(!editcertification);
                    }}
                  />
                </div>
                <Label htmlFor="editcertification">Certification Name</Label>
                <Input
                  type="editcertification"
                  id="editcertification"
                  placeholder="edit certification Name"
                  value={editcertificationname}
                  onChange={(e: any) => {
                    seteditcertificationname(e.target.value);
                  }}
                />
    
                <Label htmlFor="edit_issued_by">Certification Description</Label>
                <Input
                  type="edit_issued_by" id="edit_issued_by" placeholder="Issued By"
                  value={editcertificationmsg}
                  onChange={(e: any) => {
                    seteditcertificationmsg(e.target.value);
                  }}
                />
                <div className="flex justify-around items-center">
                <Label htmlFor="certificate">Is it a Certification course</Label> <Switch id="certificate" onClick={()=>{seteditiscertification(!editiscertification)}} checked={editiscertification} />
                </div>
                <Button className="hover:bg-red-700 hover:text-white" variant={"link"} onClick={() => {
                      // toast.warning("hell")
                      seteditcertificationname("");
                      seteditcertificationmsg("");
                      seteditiscertification(false);
                      const certificationInput = document.getElementById(
                        "editcertification"
                      ) as HTMLInputElement;
                      certificationInput.value = "";
                      const descInput = document.getElementById(
                        "edit_issued_by"
                      ) as HTMLInputElement;
                      descInput.value = "";
                      seteditcertification(!editcertification);
                    }}>
                  Cancel
                </Button>
                <Button variant={"default"} onClick={handleUpdatecertification}>
                  Update
                </Button>
              </div>
            )}
    
            <div className="col-span-2 overflow-auto">
              <p className="flex justify-self-start  text-lg font-bold">{d} Results &nbsp;&nbsp;&nbsp; <UserCog /></p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Sno</TableHead>
                    <TableHead>Certification ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Issuer</TableHead>
                    <TableHead>Is Certification</TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {b.map((e: any, sno) => {
                    console.log(e[0])
                    return (
                      <TableRow key={e.id}>
                        <TableCell className="font-medium">{sno + 1}</TableCell>
                        <TableCell>{e.id}</TableCell>
                        <TableCell>{e.name}</TableCell>
                        <TableCell>{e.issued_by}</TableCell>
                        <TableCell>{`${e.is_certificate}`}</TableCell>
                        <TableCell>{e.is_certificate?<ShieldCheck />:<BookOpenCheck />}</TableCell>
                        <TableCell>
                          <PencilLine
                            size={20}
                            onClick={() => {
                              if (editcertification) {
                                seteditcertification(false);
                              }
                              seteditcertificationname(certificationData[sno].name);
                              seteditcertificationmsg(certificationData[sno].issued_by);
                              seteditiscertification(certificationData[sno].is_certificate);
                              seteditcertificationsno(sno);
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
                                  permanently delete certification.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    // setdeletecertificationsno(sno);
                                    // console.log(sno);
                                    handleDeletecertification(sno);
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
}

export default Admin_add_certification