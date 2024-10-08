import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../../components/navbar";
import { validate } from "../../utils/validation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Check, Pencil, X } from "lucide-react";
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";

type Certification = {
  certificationId: string;
  id: string;
  name: string;
  issued_by: String;
  is_certificate: Boolean;
};

type UserCertification = {
  userId: String;
  certificationId: string;
  certificationName: string;
  started_at: String;
  completed_at: String;
  competency: Competency;
  imageData: string | null;
  isVerified: boolean;
};

enum Competency {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
}
const Admin_verify_certification = () => {
  const [userData, setuserData] = useState<any>([])
  const [userCertifications, setUserCertifications] = useState<
    UserCertification[]
  >([]);
  const [predefinedCertifications, setpredefinedCertifications] = useState<
    Certification[]
  >([]);
  const [loading, setloading] = useState(false);
  const getAllData = async () => {
    setloading(true)
    const token = await Cookies.get("token");
  
    // Create an array of promises for both API calls
    const requests = [
      axios.post("http://localhost:3000/admin/view_user", { token }),
    ];
  
    try {
      // Wait for both requests to resolve
      const [userResponse] = await Promise.all(requests);
  
  
      // Check the status of the user response
      if (userResponse.status === 200) {
        console.log(userResponse.data.data, "alluser");
        setuserData(userResponse.data.data);
        setloading(false)
        
      }
    } catch (e) {
      toast.error(e as string);
      setloading(false)
    }
  };
  
  const fetchUserCertifications = async () => {
    setloading(true);
    const token = await Cookies.get("token");
    const reqOptions = {
      url: "http://localhost:3000/admin/get_admin_certification",
      method: "POST",
      data: { token: token, id: Cookies.get("id") },
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        console.log(response.data.data, "data");
        setUserCertifications(response.data.data);
        setloading(false);
      }
    } catch (e) {
      setloading(false);
      toast.error(e as String);
    }
  };
  const fetchCertifications = async () => {
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
        setpredefinedCertifications(response.data.data);
      }
    } catch (e) {
      toast.error(e as String);
    }
  };
  const fetchAllData = async () => {
    // setloading(true);
    console.log("in fetch data")
    const token = await Cookies.get("token");
  
    // Create an array of all the API requests
    const requests = [
      axios.post("http://localhost:3000/admin/view_user", { token:token }), // getAllData
      axios.post("http://localhost:3000/admin/get_admin_certification", { token:token, id: Cookies.get("id") }), // fetchUserCertifications
      axios.post("http://localhost:3000/admin/view_certification", { token:token }) // fetchCertifications
    ];
    console.log("axios")
  
    try {
      // Await for all requests to resolve
      console.log("try")
      const [userResponse, userCertificationsResponse, predefinedCertificationsResponse] = await Promise.all(requests);
      console.log("data")
      // Check the status of each response
      if (userResponse.status === 200) {
        console.log(userResponse.data.data, "alluser");
        setuserData(userResponse.data.data);
      }
  
      if (userCertificationsResponse.status === 200) {
        console.log(userCertificationsResponse.data.data, "user certifications");
        setUserCertifications(userCertificationsResponse.data.data);
      }
  
      if (predefinedCertificationsResponse.status === 200) {
        console.log(predefinedCertificationsResponse.data.data, "predefined certifications");
        setpredefinedCertifications(predefinedCertificationsResponse.data.data);
      }
      if(predefinedCertificationsResponse.status === 200 && userCertificationsResponse.status === 200 && userResponse.status === 200){
        console.log("get_all_data")
        setloading(false);
      }
    } catch (e) {
      toast.error(e as string);
      setloading(false);
    }
  };
  
  useEffect(() => {
    validate();
    fetchAllData()
    console.log(Cookies.get("role"));
    if (
      Cookies.get("role")?.toUpperCase() === "ADMIN" &&
      Cookies.get("auth") == "true"
    ) {
      n("/verify_certification");
    } else if (
      Cookies.get("role")?.toUpperCase() !== "ADMIN" &&
      Cookies.get("auth") == "true"
    ) {
      n("/user");
    } else {
      n("/");
    }
  }, []);
  const onVerify=async(data:any)=>{
    const token = await Cookies.get("token");
    const reqOptions = {
      url: "http://localhost:3000/admin/verify",
      method: "POST",
      data: { token: token,data:data},
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        console.log(response.data.data);
        fetchAllData()
      }
    } catch (e) {
      toast.error(e as String);
      fetchAllData()
    }
  };
  const onReject=async(data:any)=>{
    const token = await Cookies.get("token");
    const reqOptions = {
      url: "http://localhost:3000/admin/reject",
      method: "POST",
      data: { token: token,data:data},
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        console.log(response.data.data);
        fetchAllData()
      }
    } catch (e) {
      toast.error(e as String);
      fetchAllData()
    }
  };
  

  const n = useNavigate();
  return (
    <div>
      <Navbar />
      {/* <div>Admin_verify_certification</div> */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center backdrop-blur-md z-50">
          <LoadingOverlay
            active={loading}
            spinner={<CircleLoader />}
          ></LoadingOverlay>
        </div>
      )}
      <Table className="max-w-7xl mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Certification</TableHead>
            <TableHead>
              Certificate <br />
              /Course
            </TableHead>
            <TableHead>Issued By</TableHead>
            <TableHead>UserId</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Completion Date</TableHead>
            <TableHead>Competency</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Verification Status</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {predefinedCertifications.length > 0 &&
            userCertifications.length > 0 && userData.length >0 &&
            userCertifications.map((cert) => (
              // <TableRow key={cert.id}>
              <TableRow>
                <TableCell>{cert.certificationName}</TableCell>
                <TableCell>
                  {predefinedCertifications
                    ?.find((e) => e?.id === cert.certificationId)
                    ?.is_certificate?.toString() || "false"}
                </TableCell>
                <TableCell>
                  {predefinedCertifications
                    ?.find((e) => e?.id === cert.certificationId)
                    ?.issued_by?.toString() || ""}
                </TableCell>
                <TableCell>{userData.find((e:any)=>e.id===cert.userId)?.name}</TableCell>

                {/* <TableCell>{predefinedCertifications.find((e)=>e?.id===cert.certificationId).is_certificate.toString()??""}</TableCell> */}
                {/* <TableCell>{format(cert.started_at, "PPP")}</TableCell> */}
                <TableCell>{cert.started_at.split("T")[0]}</TableCell>
                {/* <TableCell>{cert.completed_at ? format(cert.completed_at, "PPP") : "In Progress"}</TableCell> */}
                <TableCell>{cert.completed_at?.split("T")[0]}</TableCell>
                <TableCell>{cert.competency}</TableCell>
                <TableCell>
                  {cert.imageData ? (
                    <Dialog>
                      <DialogTrigger>
                        {" "}
                        <img
                          src={cert.imageData}
                          alt={`${cert.certificationName} certificate`}
                          width={50}
                          height={50}
                          className="object-cover"
                        />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Certificate</DialogTitle>
                          <DialogDescription>
                            <img
                              src={cert.imageData}
                              alt={`${cert.certificationName} certificate`}
                              className="object-cover"
                            />
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    "No image"
                  )}
                </TableCell>
                <TableCell>
                  {cert.isVerified ? (
                    <span className="text-green-600">Verified</span>
                  ) : (
                    <span className="text-yellow-600">
                      Pending Verification
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-10 h-10 rounded-full border-2 border-green-500 hover:bg-green-100"
                      onClick={()=>onVerify(cert)}
                    >
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="sr-only">Verify</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-10 h-10 rounded-full border-2 border-red-500 hover:bg-red-100"
                      onClick={()=>onReject(cert)}
                    >
                      <X className="h-5 w-5 text-red-500" />
                      <span className="sr-only">Reject</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
            }
        </TableBody>
      </Table>
    </div>
  );
};

export default Admin_verify_certification;
