import { useEffect } from "react";
import { validate } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserNav from "../../components/UserNav";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
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

import {
  Pencil,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  FileBadge,
  GraduationCap,
  TvMinimalPlay,
  IdCard,
  CalendarFold,
  ContactRound,
  Mail,
  ALargeSmall,
  CalendarCheck2,
  Shield,
  ShieldAlert,
  Award,
} from "lucide-react";
import { Progress } from "../../components/ui/progress";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import { ScrollArea } from "../../components/ui/scroll-area";

const User = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const [user, setUser] = useState({
    id: "",
    name: "",
    role_id: "",
    joining_date: "",
    department: "",
    mail: "",
    created_at: "",
    updated_at: "",
    password: "",
    profileImage: "",
  });
  const [skills, setskills] = useState<any>([]);
  const [allskills, setallskills] = useState<any>([]);
  const [certifications, setcertifications] = useState<any>([]);

  const [coursesCompleted, setcoursesCompleted] = useState<number>(0);
  const [certificationCompleted, setcertificationCompleted] = useState(0);
  const [learningHours, setlearningHours] = useState<number>(0);
  const [editedUser, setEditedUser] = useState(user);
  const [loading, setloading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSave = async () => {
    const token = Cookies.get("token");
    const data: any = { ...editedUser, updated_at: new Date().toISOString() };
    console.log(data);
    const reqOptions = {
      url: "http://localhost:3000/user/update_user_data",
      method: "POST",
      data: { token, data },
    };
    try {
      await axios.request(reqOptions).then((e) => {
        console.log(e);
        if (e.status == 200) {
          toast.success("Details Updated Successfully");
        }
      });
    } catch (e: any) {
      const init = async () => {
        const keysToStore = [
          "id",
          "name",
          "role_id",
          "joining_date",
          "department",
          "mail",
          "profileImage",
          "updated_at",
          "created_at",
          "password",
        ];
        var data_old: any = {};

        keysToStore.forEach((key) => {
          if (key == "profileImage") {
            data_old[key] = localStorage.getItem(key);
          } else {
            data_old[key] = Cookies.get(key);
          }
        });
        setUser(data);
        console.log(data, "data");
      };
      if (e.status == 403) {
        toast.error("Error");
        init();
        return;
      } else {
        toast.error(e);
        init();
        return;
      }
    }
    setUser(data);
    console.log(data, "in save");
    setIsEditing(false);
    for (const key in data) {
      if (key == "profileImage") {
        localStorage.setItem(key, data[key].toString());
      } else {
        Cookies.set(key, data[key]);
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.value);
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const nextCertification = () => {
    setCurrentCertIndex((prevIndex) => (prevIndex + 1) % certifications.length);
  };

  const prevCertification = () => {
    setCurrentCertIndex(
      (prevIndex) =>
        (prevIndex - 1 + certifications.length) % certifications.length
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (certifications.length > 0) {
        nextCertification();
      }
    }, 3000); // Change certification every 3 seconds

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    validate();
    fetchAllData();
    const init = async () => {
      // const token=await Cookies.get('token')
      const keysToStore = [
        "id",
        "name",
        "role_id",
        "joining_date",
        "department",
        "mail",
        "profileImage",
        "updated_at",
        "created_at",
        "password",
      ];
      var data: any = {};

      keysToStore.forEach((key) => {
        if (key == "profileImage") {
          data[key] = localStorage.getItem(key);
        } else {
          data[key] = Cookies.get(key);
        }
      });
      setUser(data);
      console.log(data, "data");
    };
    init();
    console.log(Cookies.get("role"), "hell");
    if (
      Cookies.get("role")?.toUpperCase() === "ADMIN" &&
      Cookies.get("auth") == "true"
    ) {
      n("/admin");
    } else if (
      Cookies.get("role")?.toUpperCase() !== "ADMIN" &&
      Cookies.get("auth") == "true"
    ) {
      n("/user");
    } else {
      n("/");
    }
  }, []);

  const fetchAllData = async () => {
    setloading(true);
    const token = Cookies.get("token");
    const id = Cookies.get("id");

    // Prepare requests
    const requests = [
      axios.post("http://localhost:3000/user/get_certification_count", {
        token,
        id,
      }),
      axios.post("http://localhost:3000/user/get_course_count", { token, id }),
      axios.post("http://localhost:3000/user/get_certification", { token, id }),
      axios.post("http://localhost:3000/user/get_user_skill", {
        token,
        id: id,
      }),
      axios.post("http://localhost:3000/user/view_skill", { token }),
      axios.post("http://localhost:3000/user/get_total_duration", { token,id }),
    ];

    try {
      const [
        get_certification_count_Response,
        get_course_count_Response,
        user_Certification_Response,
        user_skill_Response,
        all_skill_response,
        duration_Response
      ] = await Promise.all(requests);

      if (get_certification_count_Response.status === 200) {
        console.log(get_certification_count_Response.data.data);
      }
      if (get_course_count_Response.status === 200) {
        console.log(get_course_count_Response.data.data, "course");
        setcoursesCompleted(get_course_count_Response.data.data);
      }
      if (get_certification_count_Response.status === 200) {
        console.log(
          get_certification_count_Response.data.data,
          "certification"
        );
        setcertificationCompleted(get_certification_count_Response.data.data);
      }
      if (user_Certification_Response.status == 200) {
        console.log(user_Certification_Response.data.data, "data1");
        setcertifications(user_Certification_Response.data.data);
      }
      if (duration_Response.status == 200) {
        console.log(duration_Response.data.data, "data1");
        setlearningHours(duration_Response.data.data);
      }
      if (all_skill_response.status == 200) {
        console.log(all_skill_response.data.data, "data3");
        setallskills(all_skill_response.data.data);
      }
      if (user_skill_Response.status == 200) {
        console.log(user_skill_Response.data.data, "data2");
        setskills(
          user_skill_Response.data.data.map((e: any) => {
            const matchedSkill = all_skill_response.data.data.find(
              (m: any) => m.id === e.skillId
            );
            if (matchedSkill) {
              e["name"] = matchedSkill.name;
            } else {
              console.warn(`No matching skill found for id ${e.id}`);
            }
            return e;
          })
        );
        // setskills(user_skill_Response.data.data);
      }
      if (
        get_certification_count_Response.status === 200 &&
        get_course_count_Response.status === 200 &&
        user_Certification_Response.status == 200 &&
        user_skill_Response.status == 200 &&
        all_skill_response.status == 200
      ) {
        setloading(false);
      }
    } catch (e) {
      toast.error(e as String);
      setloading(false);
    }
  };
  const n = useNavigate();
  return (
    <div className="w-full">
      <UserNav />
      <ToastContainer />
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center backdrop-blur-md z-50">
          <LoadingOverlay
            active={loading}
            spinner={<CircleLoader />}
          ></LoadingOverlay>
        </div>
      )}
      <div className="container mx-auto p-4 ">
        <Card className="w-full max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
            <CardDescription>
              View and edit your profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative w-24 h-24">
                    <img
                      src={
                        isEditing ? editedUser.profileImage : user.profileImage
                      }
                      alt="Profile"
                      className={cn(
                        "object-cover w-full h-full border-2 rounded-full"
                      )}
                    />
                  </div>
                  {isEditing && (
                    <Input
                      className="w-1/2 justify-center"
                      type="file"
                      accept="image/*"
                      onChange={(e: any) => {
                        if (e.target.files[0].size > 5 * 1024 * 1024) {
                          toast.error("File Size must be less than 5 MB");
                          return;
                        }
                        const validImageTypes = [
                          "image/jpeg",
                          "image/png",
                          "image/gif",
                          "image/svg",
                        ];
                        if (!validImageTypes.includes(e.target.files[0].type)) {
                          toast.error(
                            "Select image other files will not be supported"
                          );
                          return;
                        }
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            if (event.target) {
                              setEditedUser({
                                ...editedUser,
                                profileImage: event.target.result as string,
                              });
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  )}
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <div className="flex items-center md:w-2/3">
                    <ALargeSmall className="w-4 h-4 mr-2 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      value={isEditing ? editedUser.name : user.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center md:w-2/3">
                    <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      name="mail"
                      value={isEditing ? editedUser.mail : user.mail}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="location"
                    className="scroll-m-20  pb-2 text-base font-semibold tracking-tight first:mt-0 text-gray-500"
                  >
                    COE
                  </Label>
                  <div className="flex items-center">
                    <ContactRound className="w-4 h-4 mr-2 text-muted-foreground" />
                    <p className="scroll-m-20 text-sm font-semibold tracking-tight">
                      {isEditing ? editedUser.department : user.department}
                    </p>
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="jobTitle"
                    className="scroll-m-20  pb-2 text-base font-semibold tracking-tight first:mt-0 text-gray-500"
                  >
                    Job Title
                  </Label>
                  <div className="flex items-center">
                    <IdCard className="w-4 h-4 mr-2 text-muted-foreground" />
                    <p className="scroll-m-20 text-sm font-semibold tracking-tight">
                      {Cookies.get("role_name")}
                    </p>
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="Joining_Date"
                    className="scroll-m-20  pb-2 text-base font-semibold tracking-tight first:mt-0 text-gray-500"
                  >
                    Joining Date
                  </Label>
                  <div className="flex items-center">
                    <CalendarFold className="w-4 h-4 mr-2 text-muted-foreground" />
                    <p className="scroll-m-20 text-sm font-semibold tracking-tight">
                      {isEditing ? editedUser.joining_date : user.joining_date}
                    </p>
                  </div>
                  <div className="mt-10 flex justify-start space-x-2">
                    {isEditing ? (
                      <>
                        <Button
                          onClick={handleSave}
                          className="flex items-center"
                        >
                          <Check className="mr-2 h-4 w-4" /> Save
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          className="flex items-center"
                        >
                          <X className="mr-2 h-4 w-4" /> Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={handleEdit}
                        className="flex items-center"
                      >
                        <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Insights Section */}
              <div className="space-y-6">
                {/* Cards section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <div className="flex justify-around items-center">
                          <FileBadge className="mr-2 h-5 w-5" />
                          <div className="text-ellipsis overflow-hidden">
                            Certifications
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {certificationCompleted}
                      </div>
                      <p className="text-sm text-muted-foreground">Achieved</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <div className="flex justify-around items-center ">
                          <GraduationCap className="mr-2 h-5 w-5" />
                          <div>Courses</div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {coursesCompleted}
                      </div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <div className="flex justify-around items-center ">
                          <TvMinimalPlay className="mr-2 h-5 w-5" />
                          <div>Learning</div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{learningHours}</div>
                      <p className="text-sm text-muted-foreground">Hours</p>
                    </CardContent>
                  </Card>
                </div>
                {/*Skill Carousel*/}
                <AlertDialog>
                  <AlertDialogTrigger className="w-full">
                    <Button variant={"default"} className="w-full">
                      View Skill
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Skills</AlertDialogTitle>
                      <AlertDialogDescription>
                        <ScrollArea>
                          <h3 className="text-lg font-semibold mb-2">Skills</h3>
                          <div className="grid grid-cols-1 gap-4">
                            {skills.map((skill: any, index: number) => (
                              <div key={index} className="flex items-center">
                                <Badge
                                  variant="outline"
                                  className="mr-2 line-clamp-1 w-1/3 text-center justify-center rounded-full"
                                >
                                  {skill.name}
                                </Badge>
                                <Progress
                                  value={skill.score}
                                  className="flex-grow"
                                />
                                <span className="ml-2 text-sm font-medium">
                                  {skill.score}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* <div>
                  <h3 className="text-lg font-semibold mb-2">Skills</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {skills.map((skill:any, index:number) => (
                      <div key={index} className="flex items-center">
                        <Badge
                          variant="outline"
                          className="mr-2 w-24 justify-center"
                        >
                          {skill.name}
                        </Badge>
                        <Progress value={skill.score} className="flex-grow" />
                        <span className="ml-2 text-sm font-medium">
                          {skill.score}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div> */}
                {/*Certification Carousel*/}
                {certifications.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Certifications
                    </h3>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={prevCertification}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <div className="text-center w-full">
                            <div className="relative w-11/12 mx-auto h-48 bg-gray-100 rounded-lg overflow-hidden">
                              <img
                                src={
                                  certifications[currentCertIndex]?.imageData
                                }
                                alt={certifications[currentCertIndex]?.name}
                                className="absolute inset-0 w-full h-full object-contain"
                              />
                            </div>
                            <h4 className="font-semibold mt-10">
                              {
                                certifications[currentCertIndex]
                                  ?.certificationName
                              }
                            </h4>
                            <div className="mt-2 flex items-center justify-center space-x-2">
                              <Badge
                                variant="secondary"
                                className="rounded-full"
                              >
                                {certifications[currentCertIndex].competency}
                              </Badge>
                              {certifications[currentCertIndex].isVerified ? (
                                <Badge
                                  variant="default"
                                  className="bg-green-500 rounded-full"
                                >
                                  <Shield className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="text-yellow-500 border-yellow-500  rounded-full"
                                >
                                  <ShieldAlert className="w-3 h-3 mr-1" />
                                  Pending Verification
                                </Badge>
                              )}
                            </div>
                            {/* <img src={certifications[currentCertIndex]?.imageData} alt="" className="w-64 h-32"/> */}
                            <div className="flex items-center justify-center gap-8 mt-5">
                              <p className="flex text-sm text-muted-foreground">
                                <CalendarFold className="w-4 h-4" />
                                {new Date(
                                  certifications[currentCertIndex]?.started_at
                                ).toLocaleDateString()}
                              </p>
                              <p className="flex text-sm text-muted-foreground">
                                <CalendarCheck2 className="w-4 h-4" />
                                {new Date(
                                  certifications[currentCertIndex]?.completed_at
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={nextCertification}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <p className="text-2xl font-bold flex justify-evenly items-center">
                    <Award />
                    No certifications
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          {/* <CardFooter className="flex justify-start space-x-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="flex items-center">
                  <Check className="mr-2 h-4 w-4" /> Save
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex items-center"
                >
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit} className="flex items-center">
                <Pencil className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            )}
          </CardFooter> */}
        </Card>
      </div>
    </div>
  );
};

export default User;
