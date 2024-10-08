// import { useEffect, useState } from 'react'
// import { validate } from '../../utils/validation';
// import { useNavigate } from 'react-router-dom';
// import Cookies from "js-cookie";
// import Navbar from '../../components/navbar';

// import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line } from "recharts"
// import { CalendarIcon, Users, Briefcase, GraduationCap, Search, ChevronDown } from "lucide-react"
// import { addDays, format } from "date-fns"
// import { DateRange } from "react-day-picker"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/ui/chart"
// import { Button } from "../../components/ui/button"
// import { Calendar } from "../../components/ui/calendar"
// import { Input } from "../../components/ui/input"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "../../components/ui/popover"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../components/ui/select"

// // Sample data
// const departmentSkillData = [
//   { department: "Engineering", averageSkillLevel: 7.5, headcount: 150 },
//   { department: "Marketing", averageSkillLevel: 6.8, headcount: 50 },
//   { department: "Sales", averageSkillLevel: 7.2, headcount: 75 },
//   { department: "HR", averageSkillLevel: 6.5, headcount: 25 },
//   { department: "Finance", averageSkillLevel: 7.8, headcount: 40 },
// ]

// const roleSkillDistribution = [
//   { name: "Junior", value: 30 },
//   { name: "Mid-level", value: 45 },
//   { name: "Senior", value: 25 },
// ]

// const topSkills = [
//   { skill: "JavaScript", users: 120 },
//   { skill: "Project Management", users: 95 },
//   { skill: "Data Analysis", users: 80 },
//   { skill: "UX Design", users: 65 },
//   { skill: "Machine Learning", users: 50 },
// ]

// const skillGrowthData = [
//   { month: "Jan", skillGrowth: 5 },
//   { month: "Feb", skillGrowth: 8 },
//   { month: "Mar", skillGrowth: 12 },
//   { month: "Apr", skillGrowth: 15 },
//   { month: "May", skillGrowth: 20 },
//   { month: "Jun", skillGrowth: 18 },
// ]

// const recentSkillUpdates = [
//   { user: "John Doe", skill: "React", level: 8, date: "2023-06-15" },
//   { user: "Jane Smith", skill: "Python", level: 7, date: "2023-06-14" },
//   { user: "Mike Johnson", skill: "UI/UX Design", level: 9, date: "2023-06-13" },
//   { user: "Emily Brown", skill: "Data Analysis", level: 6, date: "2023-06-12" },
//   { user: "Chris Lee", skill: "Project Management", level: 8, date: "2023-06-11" },
// ]

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

// export default function Admin() {
//   const [user, setUser] = useState({
//     id: "",
//     name: "",
//     role_id: "",
//     joining_date: "",
//     department: "",
//     mail: "",
//     created_at: "",
//     updated_at: "",
//     password: "",
//     profileImage: ""
//   });
//   const [dept, setdept] = useState(Cookies.get('department'))
//   const [role, setRole] = useState(Cookies.get('role_name'))
//   useEffect(() => {
//     const init = async () => {
//       // const token=await Cookies.get('token')
//       const keysToStore = [
//         "id",
//         "name",
//         "role_id",
//         "joining_date",
//         "department",
//         "mail",
//         "profileImage",
//         "updated_at",
//         "created_at",
//         "password",
//       ];
//       var data: any = {};

//       keysToStore.forEach((key) => {
//         if (key == "profileImage") {
//           data[key] = localStorage.getItem(key);
//         } else {
//           data[key] = Cookies.get(key);
//         }
//       });
//       setUser(data);
//       console.log(data.name)
//       console.log(data, "data");
//     };
//     init();
//     validate()
//     console.log(Cookies.get('role') )
//     if (Cookies.get('role')?.toUpperCase() === "ADMIN" && Cookies.get('auth')=='true') {
//      n('/admin')
//    }else if(Cookies.get('role')?.toUpperCase() !== "ADMIN" && Cookies.get('auth')=='true'){
//      n('/user')
//    }else{
//      n('/')
//    }
//    }, []);
 
//    const n = useNavigate();
//   const [date, setDate] = useState<DateRange | undefined>({
//     from: addDays(new Date(), -30),
//     to: new Date(),
//   })

//   return (
//     <div>
//       <Navbar/>
//       <h2 className="text-2xl font-bold mb-4">Welcome for {dept} - {role}</h2>
//       <div className="p-8 space-y-8">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Enhanced Skill Management Dashboard</h1>
//         <div className="flex items-center space-x-4">
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 variant={"outline"}
//                 className={`w-[240px] justify-start text-left font-normal`}
//               >
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {date?.from ? (
//                   date.to ? (
//                     <>
//                       {format(date.from, "LLL dd, y")} -{" "}
//                       {format(date.to, "LLL dd, y")}
//                     </>
//                   ) : (
//                     format(date.from, "LLL dd, y")
//                   )
//                 ) : (
//                   <span>Pick a date</span>
//                 )}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0">
//               <Calendar
//                 initialFocus
//                 mode="range"
//                 defaultMonth={date?.from}
//                 selected={date}
//                 onSelect={setDate}
//                 numberOfMonths={2}
//               />
//             </PopoverContent>
//           </Popover>
//           <Select>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select Department" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Departments</SelectItem>
//               <SelectItem value="engineering">Engineering</SelectItem>
//               <SelectItem value="marketing">Marketing</SelectItem>
//               <SelectItem value="sales">Sales</SelectItem>
//               <SelectItem value="hr">HR</SelectItem>
//               <SelectItem value="finance">Finance</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">1,234</div>
//             <p className="text-xs text-muted-foreground">+10.1% from last month</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
//             <Briefcase className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">12</div>
//             <p className="text-xs text-muted-foreground">+2 from last quarter</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
//             <GraduationCap className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">256</div>
//             <p className="text-xs text-muted-foreground">+15 from last month</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Average Skill Level</CardTitle>
//             <GraduationCap className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">7.2</div>
//             <p className="text-xs text-muted-foreground">+0.3 from last quarter</p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
//         <Card className="col-span-4">
//           <CardHeader>
//             <CardTitle>Department Skill Levels</CardTitle>
//           </CardHeader>
//           <CardContent className="pl-2">
//             <ChartContainer
//               config={{
//                 averageSkillLevel: {
//                   label: "Average Skill Level",
//                   color: "hsl(var(--chart-1))",
//                 },
//                 headcount: {
//                   label: "Headcount",
//                   color: "hsl(var(--chart-2))",
//                 },
//               }}
//               className="h-[300px]"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={departmentSkillData}>
//                   <XAxis dataKey="department" />
//                   <YAxis yAxisId="left" />
//                   <YAxis yAxisId="right" orientation="right" />
//                   <Tooltip content={<ChartTooltipContent />} />
//                   <Bar yAxisId="left" dataKey="averageSkillLevel" fill="var(--color-averageSkillLevel)" />
//                   <Bar yAxisId="right" dataKey="headcount" fill="var(--color-headcount)" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </CardContent>
//         </Card>
//         <Card className="col-span-3">
//           <CardHeader>
//             <CardTitle>Role Skill Distribution</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer
//               config={{
//                 value: {
//                   label: "Percentage",
//                   color: "hsl(var(--chart-3))",
//                 },
//               }}
//               className="h-[300px]"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={roleSkillDistribution}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                   >
//                     {roleSkillDistribution.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip content={<ChartTooltipContent />} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-8 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Top Skills</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer
//               config={{
//                 users: {
//                   label: "Users",
//                   color: "hsl(var(--chart-4))",
//                 },
//               }}
//               className="h-[300px]"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={topSkills} layout="vertical">
//                   <XAxis type="number" />
//                   <YAxis dataKey="skill" type="category" width={100} />
//                   <Tooltip content={<ChartTooltipContent />} />
//                   <Bar dataKey="users" fill="var(--color-users)" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Skill Growth Over Time</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer
//               config={{
//                 skillGrowth: {
//                   label: "Skill Growth",
//                   color: "hsl(var(--chart-5))",
//                 },
//               }}
//               className="h-[300px]"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={skillGrowthData}>
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip content={<ChartTooltipContent />} />
//                   <Line type="monotone" dataKey="skillGrowth" stroke="var(--color-skillGrowth)" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Skill Updates</CardTitle>
//           <CardDescription>Latest skill level changes across the organization</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>User</TableHead>
//                 <TableHead>Skill</TableHead>
//                 <TableHead>Level</TableHead>
//                 <TableHead>Date</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {recentSkillUpdates.map((update, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{update.user}</TableCell>
//                   <TableCell>{update.skill}</TableCell>
//                   <TableCell>{update.level}</TableCell>
//                   <TableCell>{update.date}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Skill Search</CardTitle>
//           <CardDescription>Find users by skill or department</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex space-x-2">
//             <Input type="text" placeholder="Search skills or departments" className="flex-grow" />
//             <Button>Search</Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//     </div>
    
//   )
// }


"use client"

import { useState } from "react"
import { CalendarIcon, Users, Briefcase, GraduationCap, Search } from "lucide-react"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Calendar } from "../../components/ui/calendar"
import { Input } from "../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

// Sample data
const departmentSkillData = [
  { department: "Engineering", averageSkillLevel: 7.5, headcount: 150 },
  { department: "Marketing", averageSkillLevel: 6.8, headcount: 50 },
  { department: "Sales", averageSkillLevel: 7.2, headcount: 75 },
  { department: "HR", averageSkillLevel: 6.5, headcount: 25 },
  { department: "Finance", averageSkillLevel: 7.8, headcount: 40 },
]

const roleSkillDistribution = [
  { name: "Junior", value: 30 },
  { name: "Mid-level", value: 45 },
  { name: "Senior", value: 25 },
]

const topSkills = [
  { skill: "JavaScript", users: 120 },
  { skill: "Project Management", users: 95 },
  { skill: "Data Analysis", users: 80 },
  { skill: "UX Design", users: 65 },
  { skill: "Machine Learning", users: 50 },
]

const skillGrowthData = [
  { month: "Jan", skillGrowth: 5 },
  { month: "Feb", skillGrowth: 8 },
  { month: "Mar", skillGrowth: 12 },
  { month: "Apr", skillGrowth: 15 },
  { month: "May", skillGrowth: 20 },
  { month: "Jun", skillGrowth: 18 },
]

const recentSkillUpdates = [
  { user: "John Doe", skill: "React", level: 8, date: "2023-06-15" },
  { user: "Jane Smith", skill: "Python", level: 7, date: "2023-06-14" },
  { user: "Mike Johnson", skill: "UI/UX Design", level: 9, date: "2023-06-13" },
  { user: "Emily Brown", skill: "Data Analysis", level: 6, date: "2023-06-12" },
  { user: "Chris Lee", skill: "Project Management", level: 8, date: "2023-06-11" },
]

export default function EnhancedSkillManagementDashboard() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Enhanced Skill Management Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-[240px] justify-start text-left font-normal`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+10.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">256</div>
            <p className="text-xs text-muted-foreground">+15 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Skill Level</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2</div>
            <p className="text-xs text-muted-foreground">+0.3 from last quarter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Department Skill Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={departmentSkillData}
              index="department"
              categories={["averageSkillLevel", "headcount"]}
              colors={["sky", "indigo"]}
              valueFormatter={(value) => `${value}`}
              yAxisWidth={48}
              className="h-[300px]"
            />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Role Skill Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={roleSkillDistribution}
              category="value"
              index="name"
              valueFormatter={(value) => `${value}%`}
              colors={["sky", "violet", "indigo"]}
              className="h-[300px]"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={topSkills}
              index="skill"
              categories={["users"]}
              colors={["blue"]}
              layout="vertical"
              valueFormatter={(value) => `${value} users`}
              yAxisWidth={100}
              className="h-[300px]"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Skill Growth Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={skillGrowthData}
              index="month"
              categories={["skillGrowth"]}
              colors={["green"]}
              valueFormatter={(value) => `${value}%`}
              yAxisWidth={40}
              className="h-[300px]"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Skill Updates</CardTitle>
          <CardDescription>Latest skill level changes across the organization</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Skill</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSkillUpdates.map((update, index) => (
                <TableRow key={index}>
                  <TableCell>{update.user}</TableCell>
                  <TableCell>{update.skill}</TableCell>
                  <TableCell>{update.level}</TableCell>
                  <TableCell>{update.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skill Search</CardTitle>
          <CardDescription>Find users by skill or department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input type="text" placeholder="Search skills or departments" className="flex-grow" />
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}