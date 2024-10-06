"use client";

import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Slider } from "../../components/ui/slider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import UserNav from "../../components/UserNav";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
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
import { ScrollArea } from "../../components/ui/scroll-area";
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import Cookies from "js-cookie";

export default function UserAddSkill() {
  const [roleBasedSkillOptions, setroleBasedSkillOptions] = useState<any[]>([]);
  const [otherSkillOptions, setotherSkillOptions] = useState<any[]>([]);
  const [dept, setdept] = useState(Cookies.get("department"));
  const [role, setRole] = useState(Cookies.get("role_name"));
  // const [roleBasedSkills, setRoleBasedSkills] = useState<any[]>([])
  const [otherSkills, setOtherSkills] = useState<any[]>([]);
  const [newCustomSkill, setNewCustomSkill] = useState("");
  const [skillDataDropbool, setskillDataDropbool] = useState<any[]>([]);
  const [skillDataDropbool1, setskillDataDropbool1] = useState<any[]>([]);
  const [selectedSkills, setselectedSkills] = useState<any[]>([]);
  const [selectedSkills1, setselectedSkills1] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [loading, setloading] = useState(false);

  const clearAll = () => {
    setskillDataDropbool(new Array(roleBasedSkillOptions.length).fill(false));
  };
  const clearAll1 = () => {
    setskillDataDropbool1(new Array(roleBasedSkillOptions.length).fill(false));
  };

  const removeSkill = (
    skillList: any[],
    setSkillList: React.Dispatch<React.SetStateAction<any[]>>,
    skillName: string,
    i: number
  ) => {
    // console.log(skillList.filter(skill => skill.name !== skillName),i)
    const d = [...skillDataDropbool];
    d[i] = false;
    setskillDataDropbool(d);
    // console.log(
    //   skillList.filter((skill) => skill.name !== skillName),
    //   "list"
    // );
    setSkillList(skillList.filter((skill) => skill.name !== skillName));
  };
  const removeSkill1 = (
    skillList: any[],
    setSkillList: React.Dispatch<React.SetStateAction<any[]>>,
    skillName: string,
    i: number
  ) => {
    // console.log(skillList.filter(skill => skill.name !== skillName),i)
    const d = [...skillDataDropbool1];
    d[i] = false;
    setskillDataDropbool1(d);
    // console.log(
    //   skillList.filter((skill) => skill.name !== skillName),
    //   "list"
    // );
    setSkillList(skillList.filter((skill) => skill.name !== skillName));
  };

  const updateSkillScore = (
    skillList: any[],
    setSkillList: React.Dispatch<React.SetStateAction<any[]>>,
    skillName: string,
    newScore: number
  ) => {
    setSkillList(
      skillList.map((skill) =>
        skill.name === skillName ? { ...skill, score: newScore } : skill
      )
    );
    // console.log(
    //   skillList.map((skill) =>
    //     skill.name === skillName ? { ...skill, score: newScore } : skill
    //   )
    // );
  };

  const getAllData = async () => {
    setloading(true);
    const token = await Cookies.get("token");
    const role_id = await Cookies.get("role_id");
    // console.log(role_id);

    const requests = [
      axios.post("http://localhost:3000/user/view_skill", { token }),
      axios.post("http://localhost:3000/user/view_user_role_skill", {
        token,
        role_id: role_id,
        department: dept,
      }),
      axios.post("http://localhost:3000/user/get_user_skill", {
        token,
        id: Cookies.get("id"),
      }),
    ];

    try {
      const [skillResponse, roleskillResponse, userskillResponse] =
        await Promise.all(requests);

      // Check the status of the role response
      if (
        roleskillResponse.status === 200 &&
        skillResponse.status === 200 &&
        userskillResponse.status === 200
      ) {
        const d = roleskillResponse.data.data;
        d.map((e: any) => {
          const matchedSkill = skillResponse.data.data.find(
            (m: any) => m.id === e.skillId
          );
          if (matchedSkill) {
            e["name"] = matchedSkill.name;
          } else {
            console.warn(`No matching skill found for id ${e.id}`);
          }
          return e;
        });
        // console.log(d);
        setroleBasedSkillOptions(d);
        const array = new Array(d).fill(false);
        setskillDataDropbool(array);
        const arr1 = skillResponse.data.data;
        const arr2 = roleskillResponse.data.data;
        const difference1 = arr1.filter(
          (item: any) => !arr2.some((item1: any) => item1.skillId === item.id)
        );
        const difference2 = arr2.filter(
          (item: any) => !arr1.some((item1: any) => item1.id === item.skillId)
        );
        const uniqueItems = [...difference1, ...difference2];
        uniqueItems.map((e, i) => (uniqueItems[i]["skillId"] = e.id));
        // console.log(uniqueItems,"unique");
        // setRoleBasedSkills(roleBasedSkillOptions.filter((_, i) => skillDataDropbool[i]))
        setotherSkillOptions(uniqueItems);

        const user_skill_data: any = [];
        const user_skill_data1: any = [];
        userskillResponse.data.data.map((e: any) => {
          const d: any = {};
          const matchedSkill = skillResponse.data.data.find(
            (m: any) => m.id === e.skillId
          );
          if (matchedSkill) {
            d["skillId"] = e.skillId;
            d["name"] = matchedSkill.name;
            d["score"] = e.score;
            // console.log(roleskillResponse.data.data)
            // console.log(userskillResponse.data.data)
            skillDataDropbool[
              roleskillResponse.data.data.findIndex(
                (f: any) => f.skillId == e.skillId
              )
            ] = true;
            user_skill_data.push(d);
          }
        });
        userskillResponse.data.data.map((e: any) => {
          const d: any = {};
          const matchedSkill = skillResponse.data.data.find(
            (m: any) => m.id === e.skillId
          );
          if (matchedSkill) {
            d["skillId"] = e.skillId;
            d["name"] = matchedSkill.name;
            d["score"] = e.score;
            // console.log(roleskillResponse.data.data)
            // console.log(userskillResponse.data.data)
            skillDataDropbool1[
              roleskillResponse.data.data.findIndex(
                (f: any) => f.skillId == e.skillId
              )
            ] = true;
            user_skill_data1.push(d);
          }
        });
        setskillDataDropbool(skillDataDropbool);
        setskillDataDropbool1(skillDataDropbool1);
        setselectedSkills(user_skill_data);
        setselectedSkills1(user_skill_data1);
        setloading(false);
        // console.log(roleBasedSkills)
      }
    } catch (e) {
      setloading(false);
      toast.error(e as string);
    }
  };
  const handlesubmit = async () => {
    const token = await Cookies.get("token");
    const reqOptions = {
      url: "http://localhost:3000/user/add_user_skill",
      method: "POST",
      data: {
        token: token,
        data: selectedSkills.concat(selectedSkills1),
        id: Cookies.get("id"),
      },
    };
    // console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        toast.success("Skill added");
        getAllData();
      }
    } catch (e: any) {
      if (e.status == 403) {
        toast.error("Skill exsist");
      } else {
        toast.error(`${e}`);
      }
    }
  };
  useEffect(() => {
    getAllData();
  }, []);
  useEffect(() => {
    const updatedSelectedSkills = roleBasedSkillOptions
      .filter((_, i) => skillDataDropbool[i]) // Only selected skills
      .map((skill) => {
        // Check if the skill already exists in selectedSkills
        const existingSkill = selectedSkills.find((s) => s.name === skill.name);

        // If the skill exists, keep its current score, otherwise initialize it with default score
        return existingSkill ? existingSkill : { ...skill, score: 0 }; // Use default score (can be 0 if preferred)
      });

    setselectedSkills(updatedSelectedSkills);
  }, [skillDataDropbool, roleBasedSkillOptions]);
  useEffect(() => {
    const updatedSelectedSkills1 = otherSkillOptions
      .filter((_, i) => skillDataDropbool1[i]) // Only selected other skills
      .map((skill) => {
        // Check if the skill already exists in selectedSkills1
        const existingSkill = selectedSkills1.find(
          (s) => s.name === skill.name
        );

        // If the skill exists, keep its current score, otherwise initialize it with default score
        return existingSkill ? existingSkill : { ...skill, score: 0 }; // Use default score (can be 0 if preferred)
      });

    setselectedSkills1(updatedSelectedSkills1);
  }, [skillDataDropbool1, otherSkillOptions]);

  return (
    <div>
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
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        {/* Select Skill */}
        <section>
          <h2 className="text-2xl  font-bold mb-4">
            Role-Based Skills for {dept} - {role}
          </h2>
          <h2 className="text-2xl mt-10 font-bold mb-4">Role-Based Skills</h2>
          <div className=" space-y-4">
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
                  {roleBasedSkillOptions.map((e: any, i: any) => (
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
            {selectedSkills.map((skill) => (
              <div key={skill.name} className="flex items-center space-x-2">
                <Label className="w-1/3">{skill.name}</Label>

                {/* Use the value prop to bind the slider to the current score */}
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[skill.score]} // Bind to the dynamic score from selectedSkills
                  onValueChange={([newScore]) =>
                    updateSkillScore(
                      selectedSkills,
                      setselectedSkills,
                      skill.name,
                      newScore
                    )
                  }
                  className="flex-grow"
                />

                <span className="w-12 text-right">{skill.score}%</span>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    removeSkill(
                      selectedSkills,
                      setselectedSkills,
                      skill.name,
                      roleBasedSkillOptions.findIndex((e) => e.id === skill.id)
                    )
                  }
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-end w-full">
            <Button
              variant={"default"}
              className="flex justify-end  mt-4"
              onClick={handlesubmit}
            >
              Update
            </Button>
          </div>
        </section>
        {/* Other Skill */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Other Skills</h2>
          <div className="space-y-4">
            <DropdownMenu open={open1} onOpenChange={setOpen1}>
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
                      onClick={clearAll1}
                      title="Clear All"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpen1(false)}
                      title="Close"
                    >
                      <CheckCheck className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                  {otherSkillOptions.map((e: any, i: any) => (
                    <DropdownMenuCheckboxItem
                      key={i}
                      checked={skillDataDropbool1[i]}
                      onCheckedChange={(f) => {
                        const d = [...skillDataDropbool1];
                        d[i] = f;
                        setskillDataDropbool1(d);
                      }}
                      onSelect={(event) => event.preventDefault()}
                    >
                      {e.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
            {selectedSkills1.map((skill) => (
              <div key={skill.name} className="flex items-center space-x-2">
                <Label className="w-1/3">{skill.name}</Label>

                {/* Use the value prop to bind the slider to the current score */}
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[skill.score]} // Bind to the dynamic score from selectedSkills
                  onValueChange={([newScore]) =>
                    updateSkillScore(
                      selectedSkills1,
                      setselectedSkills1,
                      skill.name,
                      newScore
                    )
                  }
                  className="flex-grow"
                />

                <span className="w-12 text-right">{skill.score}%</span>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    removeSkill1(
                      selectedSkills1,
                      setselectedSkills1,
                      skill.name,
                      otherSkillOptions.findIndex((e) => e.id === skill.id)
                    )
                  }
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-end w-full">
            <Button
              variant={"default"}
              className="flex justify-end  my-4"
              onClick={handlesubmit}
            >
              Update
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
