import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import {
  FileBadge,
  GraduationCap,
  TvMinimalPlay,
  CalendarFold,
  CalendarCheck2,
  Shield,
  ShieldAlert,
  UserRoundPen,
  ChevronDown,
  Save,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function MiniUserDashboard({ props, roles,roleData }: any) {
  const [department1, setDepartment1] = useState(props.department);
const [role1, setrole1] = useState(props.role_id);
  const getShortName = (fullName: any) => {
    const nameParts = fullName.split(" ");
    const shortName = nameParts
      .map((part: any) => part.charAt(0).toUpperCase())
      .join("");
    return shortName;
  };

  useEffect(() => {
    console.log(props,roles,"**********************")
    fetchAllData();
  }, [props]);
  const [skills, setskills] = useState<any>([]);
  const [edit,setedit]=useState<Boolean>(true)
  const [allskills, setallskills] = useState<any>([]);
  const [certifications, setcertifications] = useState<any>([]);

  const [coursesCompleted, setcoursesCompleted] = useState<number>(0);
  const [certificationCompleted, setcertificationCompleted] = useState(0);
  const [learningHours, setlearningHours] = useState<number>(0);
  const [loading, setloading] = useState(false);

  const fetchAllData = async () => {
    setloading(true);
    const token = Cookies.get("token");
    const id = props.id;

    // Prepare requests
    const requests = [
      axios.post("http://localhost:3000/admin/get_certification_count", {
        token,
        id,
      }),
      axios.post("http://localhost:3000/admin/get_course_count", { token, id }),
      axios.post("http://localhost:3000/admin/get_certification", {
        token,
        id,
      }),
      axios.post("http://localhost:3000/admin/get_user_skill", {
        token,
        id: id,
      }),
      axios.post("http://localhost:3000/admin/view_skill", { token }),
      axios.post("http://localhost:3000/admin/get_total_duration", {
        token,
        id,
      }),
    ];

    try {
      const [
        get_certification_count_Response,
        get_course_count_Response,
        user_Certification_Response,
        user_skill_Response,
        all_skill_response,
        duration_Response,
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
  const handleSave = async () => {
    console.log("in save")
    const token = Cookies.get("token");
    const data: any = { role_id:roleData,department:department1,id:props.id, updated_at: new Date().toISOString() };
    console.log(data);
    const reqOptions = {
      url: "http://localhost:3000/admin/admin_update_user_data",
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
          "role_id",
          "department",
        ];
        var data_old: any = {};

        keysToStore.forEach((key) => {
          
            data_old[key] = Cookies.get(key);

        })
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
    console.log(data, "in save");
    setedit(false);
    for (const key in data) {
      if (key == "profileImage") {
        localStorage.setItem(key, data[key].toString());
      } else {
        Cookies.set(key, data[key]);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!props) {
    return <div>Error loading user data</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col justify-evenly items-center">
        {/* User Info */}
        <div className="w-full">
          <Card className="w-full max-w-sm mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
            <CardContent className="p-6">
              {edit?<div className='flex justify-end'>
                <UserRoundPen className="h-6 w-6" onClick={()=>setedit(!edit)}/>
              </div>:
              <div  className='flex justify-between '>
                <Save className="h-6 w-6" onClick={()=>{setedit(!edit);handleSave()}} />
                <X className="h-6 w-6" onClick={()=>setedit(!edit)}/>
                  </div>}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="mx-auto w-32 h-32 border-4 border-primary">
                    <AvatarImage
                      src={props.profileImage}
                      alt="Profile picture"
                    />
                    <AvatarFallback className="text-2xl">
                      {getShortName(props.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold">{props.name}</h2>
                {edit?<Badge
                  className="mt-2 mx-auto rounded-full text-center text-xs"
                  variant="outline"
                >
                  {roles}
                </Badge>:
                <div className="flex flex-col gap-2">
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

                </div>
                
                }
                <p className="text-sm">{props.mail}</p>
                <p className="text-sm">{props.joining_date}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Skills */}
        <div className="w-full mt-5">
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <Card>
            <CardContent className="p-4">
              <ScrollArea className="h-40">
                {skills.map((skill: any, index: number) => (
                  <div key={index} className="flex items-center mb-2">
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
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col justify-evenly items-center">
        {/* Learning Progress */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-2">Learning Progress</h3>
          <div className="grid grid-cols-3 gap-2">
            <Card className="bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center">
                  <FileBadge className="mr-2 h-4 w-4" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {certificationCompleted}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{coursesCompleted}</div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center">
                  <TvMinimalPlay className="mr-2 h-4 w-4" />
                  Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{learningHours}</div>
                <p className="text-xs">Hours</p>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Certification */}
        <div className="w-full mt-10">
          <h3 className="text-lg font-semibold mb-2">Latest Certification</h3>
          <Card>
            <CardContent className="p-4">
              {certifications.length > 0 ? (
                <div>
                  <h4 className="font-semibold">
                    {certifications[0].certificationName}
                  </h4>
                  <div className="relative w-11/12 mx-auto h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={certifications[0]?.imageData}
                      alt={certifications[0]?.name}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                  <div className="mt-2 flex justify-center items-center space-x-2">
                    <Badge variant="default" className="rounded-full">
                      {certifications[0].competency}
                    </Badge>
                    {certifications[0].isVerified ? (
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
                        className="text-yellow-500 border-yellow-500 rounded-full"
                      >
                        <ShieldAlert className="w-3 h-3 mr-1" />
                        Pending Verification
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-center mt-2 gap-4">
                    <p className="flex items-center text-xs text-muted-foreground">
                      <CalendarFold className="w-3 h-3 mr-1" />
                      {new Date(
                        certifications[0].started_at
                      ).toLocaleDateString()}
                    </p>
                    <p className="flex items-center text-xs text-muted-foreground">
                      <CalendarCheck2 className="w-3 h-3 mr-1" />
                      {new Date(
                        certifications[0].completed_at
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ) : (
                <p>No certifications</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
