"use client"

import { useEffect, useState } from "react"
// import Image from "next/image"
import image from '../assets/react.svg'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import { cn } from '../lib/utils'; 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Pencil, Check, X, MapPin, Briefcase } from "lucide-react"
import axios from "axios";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [isEditing, setIsEditing] = useState(false)
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
    profileImage: "/placeholder.svg",
  })
useEffect(() => {
  const init= async() => {
    const token=await Cookies.get('token')
    const data:any=await JSON.parse(Cookies.get('data')??"")
    setUser(data)
    console.log(data)
    
  }
  init()
}, [])

  const [editedUser, setEditedUser] = useState(user)

  const handleEdit = () => {
    setIsEditing(true)
    setEditedUser(user)
  }

  const handleSave = () => {
    setUser(editedUser)
    console.log(editedUser)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value })
    // console.log(editedUser)
  }
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleFileChange = (event:any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const reader :any= new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = async () => {
      const base64String = reader.result.split(',')[1]; // Get the base64 part
      const mimeType = selectedFile.type;

      try {
        const response = await axios.post('http://localhost:5000/upload', {
          image: base64String,
          mimeType,
        });
        console.log('Image uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
          <CardDescription>View and edit your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32">
                <img
        src={image}
        alt="Profile"
        className={cn("object-cover w-full h-full border-2 rounded-full")}
      />
                </div>
                {isEditing && (
                  <Input
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
            </div>
            <div className="md:col-span-2 space-y-4">
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
                  value={isEditing ? editedUser.mail : user.mail}
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
                    value={isEditing ? editedUser.role_id : user.role_id}
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
                    value={isEditing ? editedUser.department : user.department}
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
                  value={isEditing ? editedUser.joining_date : user.joining_date}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Insights</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Certifications Completed</span>
                    <span className="text-sm font-medium">3/5</span>
                  </div>
                  <Progress value={60} className="w-full" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Skill Match</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="w-full" />
                </div>
              </div>
            </div>
            {/* <div>
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div> */}
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