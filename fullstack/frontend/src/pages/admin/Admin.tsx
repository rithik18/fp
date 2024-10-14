import { useEffect, useState } from "react"
import { CalendarIcon, Users, Briefcase, GraduationCap, Search, AlarmClockCheck } from "lucide-react"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { validate } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Navbar from '../../components/navbar';

import { TrendingUp } from "lucide-react"


import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart"




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
  const [dept_skill_count, setdept_skill_count] = useState([])
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
        profileImage: ""
      });
      const [hours_count, sethours_count] = useState(0)
      const [user_count, setuser_count] = useState(0)
      const [skilled_user_count, setskilled_user_count] = useState(0)
      const [role_count, setrole_count] = useState(0)
      const [skilled_user_dept_count, setskilled_user_dept_count] = useState([])
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  const get_all_stat_data = async () => {
    setloading(true);
    const token = Cookies.get("token");

    // Prepare requests
    const requests = [
      
      axios.post("http://localhost:3000/admin/user_count", { token }),
      axios.post("http://localhost:3000/admin/skilled_user_count", { token }),
      axios.post("http://localhost:3000/admin/hours_count", { token}),
      axios.post("http://localhost:3000/admin/role_count", { token}),
      axios.post("http://localhost:3000/admin/skilled_user_dept_count", { token}),
      axios.post("http://localhost:3000/admin/skilled_user_hour_count", { token}),
    ];

    try {
      const [
        get_user_count_Response,
        get_skilled_user_count_Response,
        user_hours_Response,
        role_count_Response,
        skilled_user_dept_count_Response,
        skilled_user_hour_count_Response
      ] = await Promise.all(requests);

      if (get_user_count_Response.status === 200) {
        console.log(get_user_count_Response.data.data,"1");
        setuser_count(get_user_count_Response.data.data)
      }
      if (get_skilled_user_count_Response.status === 200) {
        console.log(get_skilled_user_count_Response.data.data[0]._count.userId, "2");
        setskilled_user_count(get_skilled_user_count_Response.data.data[0]._count.userId);
      }
      if (user_hours_Response.status === 200) {
        console.log(
          user_hours_Response.data.data,
          "3"
        );
        sethours_count(user_hours_Response.data.data);
      }
      if (role_count_Response.status == 200) {
        console.log(role_count_Response.data.data.length, "4");
        setrole_count(role_count_Response.data.data.length);
      }
      if (skilled_user_dept_count_Response.status == 200) {
        console.log(skilled_user_dept_count_Response.data.data, "5");
        setdept_skill_count(skilled_user_dept_count_Response.data.data);

      }
      if (skilled_user_hour_count_Response.status == 200) {
        console.log(skilled_user_hour_count_Response.data.data, "6");
        setskilled_user_dept_count(skilled_user_hour_count_Response.data.data);

      }
      
      if (
        get_user_count_Response.status === 200 &&
        get_skilled_user_count_Response.status === 200 &&
        user_hours_Response.status == 200 &&
        role_count_Response.status == 200 &&
        skilled_user_dept_count_Response.status==200
      ) {
        setloading(false);
      }
    } catch (e) {
      toast.error(e as String);
      setloading(false);
    }
  };
  const chartConfig = dept_skill_count.reduce((acc:any, item:any) => {
    acc[item.roleName] = { label: item.roleName,fill:`hsl(var(--chart-${dept_skill_count.findIndex(item)}))` }; // Use roleName as the key and set the label
    return acc;
  }, {});
  const chartConfig1 = skilled_user_dept_count.reduce((acc:any, item:any) => {
    acc[item.role] = { label: item.role }; // Use roleName as the key and set the label
    return acc;
  }, {});
  useEffect(() => {
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
      var data: any = {};

      keysToStore.forEach((key) => {
        if (key == "profileImage") {
          data[key] = localStorage.getItem(key);
        } else {
          data[key] = Cookies.get(key);
        }
      });
      setUser(data);
      console.log(data.name)
      console.log(data, "data");
    };
    init();
    validate()
    get_all_stat_data()
    console.log(Cookies.get('role') )
    if (Cookies.get('role')?.toUpperCase() === "ADMIN" && Cookies.get('auth')=='true') {
     n('/admin')
   }else if(Cookies.get('role')?.toUpperCase() !== "ADMIN" && Cookies.get('auth')=='true'){
     n('/user')
   }else{
     n('/')
   }
   }, []);
   const [loading, setloading] = useState(false);
   const n = useNavigate();
   const renderLabel = (value:any) => {
    // Split the label into two lines if it exceeds 15 characters
    const maxChars = 15;
    const lines = value.length > maxChars ? [value.slice(0, maxChars), value.slice(maxChars)] : [value];

    return (
      <text
        style={{
          display: 'block', // Use block display to force new lines
          overflow: 'visible',
          whiteSpace: 'pre-wrap', // Allows for wrapping
        }}
      >
        {lines.map((line, index) => (
          <tspan key={index} dy={index === 0 ? 0 : 15}>{line}</tspan> // Adjust dy to create spacing between lines
        ))}
      </text>
    );
  };

  return (
    <div>
      <Navbar/>
      <ToastContainer />
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center backdrop-blur-md z-50">
          <LoadingOverlay
            active={loading}
            spinner={<CircleLoader />}
          ></LoadingOverlay>
        </div>
      )}
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user_count}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Role Departments</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{role_count}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skilled User</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skilled_user_count}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Spent</CardTitle>
            <AlarmClockCheck className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hours_count}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Department Skill Levels</CardTitle>
          </CardHeader>
          <CardContent>
          <ChartContainer config={chartConfig} className="">
      <BarChart
        accessibilityLayer
        data={dept_skill_count}
        layout="vertical"
        margin={{
          left: 20,
        }}
      >
        <YAxis
        className="line-clamp-2"
          dataKey="roleName" // Use roleName directly
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          label={{
            position: 'insideLeft', // Adjust the label position if necessary
            formatter: renderLabel, // Use custom label renderer
          }}
          tickFormatter={(value) => chartConfig[value]?.label || value} // Use chartConfig to format labels
        />
        <XAxis dataKey="count" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="count" layout="vertical" radius={5} fill="#8884d8" /> {/* Ensure fill color is set */}
      </BarChart>
    </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Department Skill Levels</CardTitle>
          </CardHeader>
          <CardContent>
          <ChartContainer config={chartConfig1} className="">
      <BarChart
        accessibilityLayer
        data={skilled_user_dept_count}
        layout="horizontal"
        margin={{
          left: 20,
        }}
      >
        <XAxis
          dataKey="role" // Use roleName directly
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => chartConfig[value]?.label || value} // Use chartConfig to format labels
        />
        <YAxis dataKey="totalTimeSpent" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="totalTimeSpent" layout="horizontal" radius={5} fill="#8884d8" /> {/* Ensure fill color is set */}
      </BarChart>
    </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Department Skill Levels</CardTitle>
          </CardHeader>
          <CardContent>
          <ChartContainer config={chartConfig} className="">
      <BarChart
        accessibilityLayer
        data={dept_skill_count}
        layout="vertical"
        margin={{
          left: 20,
        }}
      >
        <YAxis
          dataKey="roleName" // Use roleName directly
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => chartConfig[value]?.label || value} // Use chartConfig to format labels
        />
        <XAxis dataKey="count" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="count" layout="vertical" radius={5} fill="#8884d8" /> {/* Ensure fill color is set */}
      </BarChart>
    </ChartContainer>
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
              // index="skill"
              // categories={["users"]}
              // colors={["blue"]}
              layout="vertical"
              // valueFormatter={(value:any) => `${value} users`}
              // yAxisWidth={100}
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
              // index="month"
              // categories={["skillGrowth"]}
              // colors={["green"]}
              // valueFormatter={(value:any) => `${value}%`}
              // yAxisWidth={40}
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

    </div>
    </div>
  )
}