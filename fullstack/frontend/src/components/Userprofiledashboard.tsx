import { useState } from "react"
import image from '../assets/react.svg'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Badge } from "../components/ui/badge"
import { cn } from '../lib/utils'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Pencil, Check, X, MapPin, Briefcase, Award, Book, Zap, ChevronLeft, ChevronRight } from "lucide-react"
import { Progress } from "./ui/progress"

export default function UserProfileDashboard() {
  const [isEditing, setIsEditing] = useState(false)
  const [currentCertIndex, setCurrentCertIndex] = useState(0)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Passionate developer always learning new technologies",
    location: "San Francisco, CA",
    jobTitle: "Senior Frontend Developer",
    skills: [
      { name: "React", score: 90 },
      { name: "Node.js", score: 80 },
      { name: "Python", score: 75 },
      { name: "TypeScript", score: 85 },
    ],
    certifications: [
      { name: "AWS Certified Developer", date: "2023-05-15" },
      { name: "Google Cloud Professional Developer", date: "2022-11-30" },
      { name: "Microsoft Certified: Azure Developer Associate", date: "2023-02-10" },
    ],
    projectsCompleted: 12,
    learningHours: 120,
    profileImage: "/placeholder.svg",
  })

  const [editedUser, setEditedUser] = useState(user)

  const handleEdit = () => {
    setIsEditing(true)
    setEditedUser(user)
  }

  const handleSave = () => {
    setUser(editedUser)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value })
  }

  const nextCertification = () => {
    setCurrentCertIndex((prevIndex) => (prevIndex + 1) % user.certifications.length)
  }

  const prevCertification = () => {
    setCurrentCertIndex((prevIndex) => (prevIndex - 1 + user.certifications.length) % user.certifications.length)
  }

  return (
    <div className="container mx-auto p-4">
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
                    src={image}
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
                <Input
                  id="name"
                  name="name"
                  value={isEditing ? editedUser.name : user.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={isEditing ? editedUser.email : user.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                  <Input
                    id="location"
                    name="location"
                    value={isEditing ? editedUser.location : user.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-muted-foreground" />
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    value={isEditing ? editedUser.jobTitle : user.jobTitle}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  value={isEditing ? editedUser.bio : user.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Insights Section */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Award className="mr-2 h-5 w-5" /> Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{user.certifications.length}</div>
                    <p className="text-sm text-muted-foreground">Achieved</p>
                  </CardContent>
                </Card>
                <Card className="bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Book className="mr-2 h-5 w-5" /> Courses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{user.projectsCompleted}</div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </CardContent>
                </Card>
                <Card className="bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Zap className="mr-2 h-5 w-5" /> Learning
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{user.learningHours}</div>
                    <p className="text-sm text-muted-foreground">Hours</p>
                  </CardContent>
                </Card>
              </div>
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
              <div>
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="grid grid-cols-1 gap-4">
                  {user.skills.map((skill, index) => (
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
                        <h4 className="font-semibold">{user.certifications[currentCertIndex].name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(user.certifications[currentCertIndex].date).toLocaleDateString()}
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
        <CardFooter className="flex justify-end space-x-2">
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
  )
}