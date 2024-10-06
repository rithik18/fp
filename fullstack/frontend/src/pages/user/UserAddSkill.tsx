"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Slider } from "../../components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { Plus, X } from "lucide-react"
import Cookies from "js-cookie";
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import UserNav from "../../components/UserNav"

type Skill = {
  name: string
  score:number
  // userId: string
  // skillId: string
}


const roleBasedSkillOptions = [
  "Project Management",
  "Team Leadership",
  "Agile Methodologies",
  "Risk Management",
  "Stakeholder Communication",
]

const otherSkillOptions = [
  "Public Speaking",
  "Technical Writing",
  "Data Analysis",
  "Graphic Design",
  "Foreign Language",
]
// const getAllData = async () => {
//   const token = await Cookies.get("token");
//   const id= await Cookies.get('role_id')

//   // Create an array of promises for both API calls
//   const requests = [
//     axios.post("http://localhost:3000/user/get_role", { token,id}),
//     // axios.post("http://localhost:3000/admin/view_user", { token }),
//   ];

//   try {
//     // Wait for both requests to resolve
//     const [roleResponse] = await Promise.all(requests);

//     // Check the status of the role response
//     if (roleResponse.status === 200) {
//       console.log(roleResponse.data.data);
//       setDefaultResultOrder()
//     }

  
//   } catch (e) {
//     toast.error(e as string);
//   }
// };
export default function UserAddSkill() {
  const [dept, setdept] = useState(Cookies.get('department'))
  const [role, setRole] = useState(Cookies.get('role_name'))
  const [roleBasedSkills, setRoleBasedSkills] = useState<Skill[]>([])
  const [otherSkills, setOtherSkills] = useState<Skill[]>([])
  const [newCustomSkill, setNewCustomSkill] = useState("")

  const addSkill = (skillList: Skill[], setSkillList: React.Dispatch<React.SetStateAction<Skill[]>>, skillName: string) => {
    if (!skillList.some(skill => skill.name === skillName)) {
      setSkillList([...skillList, { name: skillName, score: 50 }])
    }
  }

  const removeSkill = (skillList: Skill[], setSkillList: React.Dispatch<React.SetStateAction<Skill[]>>, skillName: string) => {
    setSkillList(skillList.filter(skill => skill.name !== skillName))
  }

  const updateSkillScore = (skillList: Skill[], setSkillList: React.Dispatch<React.SetStateAction<Skill[]>>, skillName: string, newScore: number) => {
    setSkillList(skillList.map(skill => 
      skill.name === skillName ? { ...skill, score: newScore } : skill
    ))
  }

  const addCustomSkill = () => {
    if (newCustomSkill.trim() && !otherSkills.some(skill => skill.name === newCustomSkill.trim())) {
      setOtherSkills([...otherSkills, { name: newCustomSkill.trim(), score: 50 }])
      setNewCustomSkill("")
    }
  }

  return (
    <div>
      <UserNav/>
      <ToastContainer />
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Role-Based Skills for {dept} - {role}</h2>
        <div className="space-y-4">
          <Select onValueChange={(value) => addSkill(roleBasedSkills, setRoleBasedSkills, value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a skill" />
            </SelectTrigger>
            <SelectContent>
              {roleBasedSkillOptions.map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {roleBasedSkills.map((skill) => (
            <div key={skill.name} className="flex items-center space-x-2">
              <Label className="w-1/3">{skill.name}</Label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[skill.score]}
                onValueChange={([newScore]) => updateSkillScore(roleBasedSkills, setRoleBasedSkills, skill.name, newScore)}
                className="flex-grow"
              />
              <span className="w-12 text-right">{skill.score}%</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSkill(roleBasedSkills, setRoleBasedSkills, skill.name)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Other Skills</h2>
        <div className="space-y-4">
          <Select onValueChange={(value) => addSkill(otherSkills, setOtherSkills, value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a skill" />
            </SelectTrigger>
            <SelectContent>
              {otherSkillOptions.map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex space-x-2">
            <Input
              placeholder="Add a custom skill"
              value={newCustomSkill}
              onChange={(e) => setNewCustomSkill(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addCustomSkill()}
            />
            <Button onClick={addCustomSkill}>
              <Plus className="h-4 w-4 mr-2" /> Add
            </Button>
          </div>
          {otherSkills.map((skill) => (
            <div key={skill.name} className="flex items-center space-x-2">
              <Label className="w-1/3">{skill.name}</Label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[skill.score]}
                onValueChange={([newScore]) => updateSkillScore(otherSkills, setOtherSkills, skill.name, newScore)}
                className="flex-grow"
              />
              <span className="w-12 text-right">{skill.score}%</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSkill(otherSkills, setOtherSkills, skill.name)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
    </div>
  )
}