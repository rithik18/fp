import { useEffect } from 'react'
import { validate } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import UserNav from '../../components/UserNav';

import { useState } from "react"
import image from '../../assets/react.svg'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { cn } from '../../lib/utils'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Pencil, Check, X, MapPin, Briefcase, Award, Book, Zap, ChevronLeft, ChevronRight, FileBadge, GraduationCap, TvMinimalPlay, IdCard, CalendarFold, ContactRound, Mail, ALargeSmall } from "lucide-react"
import { Progress } from "../../components/ui/progress"
import { H3,H4,P } from '../../components/ui/Typography';

const User = () => {

  const [isEditing, setIsEditing] = useState(false)
  const [currentCertIndex, setCurrentCertIndex] = useState(0)
  const [user, setUser] = useState({
    id: "66fe81770b5205e064c2aed5",
    name: "emp1",
    role_id: "66fd540a30450c2a76ac020f",
    joining_date: "11-01-2023",
    department: "FULL_STACK",
    mail: "emp1@gmail.com",
    created_at: "2024-10-03T11:35:19.205Z",
    updated_at: "2024-10-03T11:35:19.205Z",
    password: "Abcd@1234",
profileImage: "",
})
  const [skills, setskills] = useState([
    { name: "React", score: 90 },
    { name: "Node.js", score: 80 },
    { name: "Python", score: 75 },
    { name: "TypeScript", score: 85 },
  ])
  const [certifications, setcertifications] = useState([
    { name: "AWS Certified Developer", date: "2023-05-15" },
    { name: "Google Cloud Professional Developer", date: "2022-11-30" },
    { name: "Microsoft Certified: Azure Developer Associate", date: "2023-02-10" },
  ])

  const [projectsCompleted, setprojectsCompleted] = useState<number>(12)
  const [learningHours, setlearningHours] = useState<number>(120)
  const [editedUser, setEditedUser] = useState(user)

  const handleEdit = () => {
    setIsEditing(true)
    setEditedUser(user)
  }

  const handleSave = () => {
    setUser(editedUser)
    console.log(editedUser,"in save")
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value })
  }

  const nextCertification = () => {
    setCurrentCertIndex((prevIndex) => (prevIndex + 1) % certifications.length)
  }

  const prevCertification = () => {
    setCurrentCertIndex((prevIndex) => (prevIndex - 1 + certifications.length) % certifications.length)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextCertification()
    }, 3000) // Change certification every 3 seconds

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    validate()
    const init= async() => {
      // const token=await Cookies.get('token')
      const keysToStore = [
        "id",
        "name",
        "role_id",
        "joining_date",
        "department",
        "mail",
        "profileImage",
        'updated_at',
        'created_at',
        "password"
      ];
      var data:any={}
    
      keysToStore.forEach((key) => {
        if(key=='profileImage'){
          data[key]=localStorage.getItem(key);
        }else{
            data[key]=Cookies.get(key);
        }
      });
      // const data:any=await JSON.parse(Cookies.get('data')??"")
      setUser(data)
      console.log(data,"in user data use useEffect")
      
    }
    init()
    console.log(Cookies.get('role'),"hell")
    if (Cookies.get('role')?.toUpperCase() === "ADMIN" && Cookies.get('auth')=='true') {
     n('/admin')
   }else if(Cookies.get('role')?.toUpperCase() !== "ADMIN" && Cookies.get('auth')=='true'){
     n('/user')
   }else{
     n('/')
   }
   }, []);
 
   const n = useNavigate();
  return (
    <div className='w-full'>
      <UserNav/>
    
    <div className="container mx-auto p-4 ">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader> 
          <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
          <CardDescription>View and edit your profile information</CardDescription> 
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative w-24 h-24">
                  <img
                    src={isEditing ? editedUser.profileImage : user.profileImage}
                    alt="Profile"
                    className={cn("object-cover w-full h-full border-2 rounded-full")}
                  />
                </div>
                {isEditing && (
                  <Input
                  className="w-1/2 justify-center"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                          if (event.target) {
                            setEditedUser({
                              ...editedUser,
                              profileImage: event.target.result as string,
                            })
                          }
                        }
                        reader.readAsDataURL(e.target.files[0])
                      }
                    }}
                  />
                )}
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <div className="flex items-center md:w-2/3">
                <ALargeSmall className="w-4 h-4 mr-2 text-muted-foreground"/>
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
                <Mail className="w-4 h-4 mr-2 text-muted-foreground"/>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={isEditing ? editedUser.mail : user.mail}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                </div>
              </div>
              <div>
                <Label htmlFor="location" className='scroll-m-20 border-b pb-2 text-base font-semibold tracking-tight first:mt-0 text-gray-500'>COE</Label>
                <div className="flex items-center">
                  <ContactRound className="w-4 h-4 mr-2 text-muted-foreground" />
                  <p className='scroll-m-20 text-sm font-semibold tracking-tight'>{isEditing ? editedUser.department : user.department}</p>
                </div>
              </div>
              <div>
                <Label htmlFor="jobTitle"  className='scroll-m-20 border-b pb-2 text-base font-semibold tracking-tight first:mt-0 text-gray-500'>Job Title</Label>
                <div className="flex items-center">
                  <IdCard  className="w-4 h-4 mr-2 text-muted-foreground" />
                  <p className='scroll-m-20 text-sm font-semibold tracking-tight'>{isEditing ? editedUser.role_id : user.role_id}</p>
                </div>
              </div>
              <div>
                <Label htmlFor="Joining_Date"  className='scroll-m-20 border-b pb-2 text-base font-semibold tracking-tight first:mt-0 text-gray-500'>Joining Date</Label>
                <div className="flex items-center">
                <CalendarFold className="w-4 h-4 mr-2 text-muted-foreground"/>
                <p className='scroll-m-20 text-sm font-semibold tracking-tight'>{isEditing ? editedUser.joining_date : user.joining_date}</p>
                </div>
              </div>
            </div>

            {/* Insights Section */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <div className='flex justify-around items-center'>
                      <FileBadge className='mr-2 h-5 w-5' /> 
                      <div className='text-ellipsis overflow-hidden'>
                      Certifications
                      </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{certifications.length}</div>
                    <p className="text-sm text-muted-foreground">Achieved</p>
                  </CardContent>
                </Card>
                <Card className="bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <div className='flex justify-around items-center '>
                      <GraduationCap  className="mr-2 h-5 w-5" /> 
                      <div>
                      Courses
                      </div>
                      </div>  
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{projectsCompleted}</div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </CardContent>
                </Card>
                <Card className="bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                    <div className='flex justify-around items-center '>
                      <TvMinimalPlay  className="mr-2 h-5 w-5" /> 
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
              {/* Circular Progress Indicator */}
              {/* <div>
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="grid grid-cols-2 gap-4">
                  {user.skills.map((skill, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="relative w-20 h-20">
                        <svg className="w-20 h-20" viewBox="0 0 100 100">
                          <circle
                            className="text-muted stroke-current"
                            strokeWidth="10"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                          ></circle>
                          <circle
                            className="text-primary stroke-current"
                            strokeWidth="10"
                            strokeLinecap="round"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            strokeDasharray={`${skill.score * 2.51327}, 251.327`}
                            transform="rotate(-90 50 50)"
                          ></circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-semibold">{skill.score}%</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="mt-2">
                        {skill.name}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div> */}
              {/*Certification Carousel*/}
              <div>
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="grid grid-cols-1 gap-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <Badge variant="outline" className="mr-2 w-24 justify-center">
                        {skill.name}
                      </Badge>
                      <Progress value={skill.score} className="flex-grow" />
                      <span className="ml-2 text-sm font-medium">{skill.score}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="icon" onClick={prevCertification}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="text-center">
                        <h4 className="font-semibold">{certifications[currentCertIndex].name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(certifications[currentCertIndex].date).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="icon" onClick={nextCertification}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-start space-x-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Save
              </Button>
              <Button onClick={handleCancel} variant="outline" className="flex items-center">
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
            </>
          ) : (
            <Button onClick={handleEdit} className="flex items-center">
              <Pencil className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
    </div>
  )
}

export default User