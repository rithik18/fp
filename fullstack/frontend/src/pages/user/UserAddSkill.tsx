"use client"

import { useEffect, useState } from "react"
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
import Cookies from "js-cookie";
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import UserNav from "../../components/UserNav"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import {
  Plus,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  PencilLine,
  Trash2,
  UserCog,
  X,
} from "lucide-react";
import { ScrollArea } from "../../components/ui/scroll-area"
import LoadingOverlay from "react-loading-overlay"
import CircleLoader from "react-spinners/CircleLoader"






export default function UserAddSkill() {
  const [roleBasedSkillOptions,setroleBasedSkillOptions] = useState<any[]>([])
  const [otherSkillOptions,setotherSkillOptions] = useState<any[]>([])
  const [dept, setdept] = useState(Cookies.get('department'))
  const [role, setRole] = useState(Cookies.get('role_name'))
  // const [roleBasedSkills, setRoleBasedSkills] = useState<any[]>([])
  const [otherSkills, setOtherSkills] = useState<any[]>([])
  const [newCustomSkill, setNewCustomSkill] = useState("")
  const [skillDataDropbool, setskillDataDropbool] = useState<any[]>([]);
  const [selectedSkills,setselectedSkills]= useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);

  const clearAll = () => {
    setskillDataDropbool(new Array(roleBasedSkillOptions.length).fill(false));
  };

  const addSkill = (skillList: any[], setSkillList: React.Dispatch<React.SetStateAction<any[]>>, skillName: string) => {
    if (!skillList.some(skill => skill.name === skillName)) {
      setSkillList([...skillList, { name: skillName, score: 50 }])
    }
  }

  const removeSkill = (skillList: any[], setSkillList: React.Dispatch<React.SetStateAction<any[]>>, skillName: string,i:number) => {
    console.log(skillList.filter(skill => skill.name !== skillName),i)
    const d = [...skillDataDropbool];
    d[i] = false;
    setskillDataDropbool(d);
    setSkillList(skillList.filter(skill => skill.name !== skillName))
  }

  const updateSkillScore = (skillList: any[], setSkillList: React.Dispatch<React.SetStateAction<any[]>>, skillName: string, newScore: number) => {
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
  const getAllData = async () => {
    setloading(true)
    const token = await Cookies.get("token");
    const role_id=await Cookies.get('role_id')
    console.log(role_id)
  
    const requests = [
      axios.post("http://localhost:3000/user/view_skill", { token }),
      axios.post("http://localhost:3000/user/view_user_role_skill", { token,role_id:role_id,department:dept }),
    ];
  
    try {
      const [skillResponse,roleskillResponse] = await Promise.all(requests);
  
      // Check the status of the role response
      if (roleskillResponse.status === 200 && skillResponse.status==200) {
        const d=roleskillResponse.data.data
        d.map((e:any)=>{
          const matchedSkill=skillResponse.data.data.find((m:any)=>m.id===e.skillId)
          if (matchedSkill) {
            e['name'] = matchedSkill.name;
          } else {
            console.warn(`No matching skill found for id ${e.id}`);
          }
          return e;
        })
        console.log(d)
        setroleBasedSkillOptions(d)
        const array = new Array(d).fill(false);
        setskillDataDropbool(array);
        const arr1=skillResponse.data.data
        const arr2=roleskillResponse.data.data
        const difference1 = arr1.filter(
          (item:any) => !arr2.some((item1:any) => item1.skillId === item.id )
        );
        const difference2 = arr2.filter(
          (item:any) => !arr1.some((item1:any) => item1.id === item.skillId)
        );   
        const uniqueItems = [...difference1, ...difference2];
        console.log(uniqueItems);
        // setRoleBasedSkills(roleBasedSkillOptions.filter((_, i) => skillDataDropbool[i]))
        setotherSkillOptions(uniqueItems)
        setloading(false)
        // console.log(roleBasedSkills)
        
      }
  
    
    } catch (e) {
      setloading(false)
      toast.error(e as string);
    }
  };
  useEffect(() => {
    getAllData();
  }, [])
  useEffect(() => {
    setselectedSkills(roleBasedSkillOptions.filter((_, i) => skillDataDropbool[i]))
  }, [skillDataDropbool])

  

  return (
    <div>
      <UserNav/>
      <ToastContainer />
      {loading && <div className="fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center backdrop-blur-md z-50">

<LoadingOverlay
active={loading}
spinner={<CircleLoader/>}
></LoadingOverlay>
</div>}
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Role-Based Skills for {dept} - {role}</h2>
        <div className="space-y-4">


<DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button className="w-full">Select Skill</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-full"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <div className="flex justify-between items-center mb-2">
                  <DropdownMenuLabel>Skillset</DropdownMenuLabel>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={clearAll}
                      title="Clear All"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpen(false)}
                      title="Close"
                    >
                      <CheckCheck className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                  {roleBasedSkillOptions.map((e:any, i:any) => (
                    <DropdownMenuCheckboxItem
                      key={i}
                      checked={skillDataDropbool[i]}
                      onCheckedChange={(f) => {
                        const d = [...skillDataDropbool];
                        d[i] = f;
                        setskillDataDropbool(d);
                      }}
                      onSelect={(event) => event.preventDefault()}
                    >
                      {e.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* {selectedSkills.length} */}
          {selectedSkills.length >0 && 
          (selectedSkills.map((skill) => (
            // <div key={skill.name} className="flex items-center space-x-2">
            <div  className="flex items-center space-x-2">
              <Label className="w-1/3">{skill.name}</Label>
              <Slider
                min={0}
                max={100}
                step={1}
                defaultValue={[0]}
                onValueChange={([newScore]) => updateSkillScore(selectedSkills, setselectedSkills, skill.name, newScore)}
                className="flex-grow"
              />
              <span className="w-12 text-right">{skill.score}%</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSkill(selectedSkills, setselectedSkills, skill.name,roleBasedSkillOptions.findIndex((e)=>e.id==skill.id))}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )))}
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
              {/* {otherSkillOptions.map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))} */}
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
          {otherSkills.map((skill,i) => (
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
                onClick={() => removeSkill(otherSkills, setOtherSkills, skill.name,i)}
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