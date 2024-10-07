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
  const [userCertifications, setUserCertifications] = useState<
    UserCertification[]
  >([]);
  const [predefinedCertifications, setpredefinedCertifications] = useState<
    Certification[]
  >([]);
  const [loading, setloading] = useState(false);
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
  useEffect(() => {
    validate();
    setloading(true);
    fetchCertifications();
    fetchUserCertifications();
    setloading(false);
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
        fetchUserCertifications()
        fetchCertifications()
      }
    } catch (e) {
      toast.error(e as String);
      fetchUserCertifications()
        fetchCertifications()
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
        fetchUserCertifications()
        fetchCertifications()
      }
    } catch (e) {
      toast.error(e as String);
      fetchUserCertifications()
      fetchCertifications()
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
            userCertifications.length > 0 &&
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
                <TableCell>{cert.userId}</TableCell>

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
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Admin_verify_certification;
