import { useEffect, useState } from "react";
import { Users, Briefcase, GraduationCap, AlarmClockCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";



import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  LabelList,
} from "recharts";
import { validate } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../../components/navbar";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";


export default function Admin() {
  const [dept_skill_count, setdept_skill_count] = useState([]);
  const [_, setUser] = useState({
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
  const [hours_count, sethours_count] = useState(0);
  const [user_count, setuser_count] = useState(0);
  const [skilled_user_count, setskilled_user_count] = useState(0);
  const [role_count, setrole_count] = useState(0);
  const [skill_user_count, setskill_user_count] = useState([]);
  const [user_skill_level_distribution, setuser_skill_level_distribution] =useState([]);
  const [cert_updated_trend, setcert_updated_trend] =useState([]);
  const [skilled_user_dept_count, setskilled_user_dept_count] = useState([
    //   {
    //       "role": "Solution Enabler",
    //       "totalTimeSpent": 169.37055305555555
    //   },
    //   {
    //       "role": "Senior Software Engineer",
    //       "totalTimeSpent": 411.91777444444443
    //   }
  ]);

  const get_all_stat_data = async () => {
    setloading(true);
    const token = Cookies.get("token");

    // Prepare requests
    const requests = [
      axios.post("http://localhost:3000/admin/user_count", { token }),
      axios.post("http://localhost:3000/admin/skilled_user_count", { token }),
      axios.post("http://localhost:3000/admin/role_count", { token }),
      axios.post("http://localhost:3000/admin/skilled_user_dept_count", {token,}),
      axios.post("http://localhost:3000/admin/skilled_user_hour_count", {token,}),
      axios.post("http://localhost:3000/admin/skill_user_count", { token }),
      axios.post("http://localhost:3000/admin/user_skill_level_distribution", {token,}),
      axios.post("http://localhost:3000/admin/cert_updated_trend", {token,}),
    ];
    try {
      const [
        get_user_count_Response,
        get_skilled_user_count_Response,
        role_count_Response,
        skilled_user_dept_count_Response,
        skilled_user_hour_count_Response,
        skill_user_count_Response,
        user_skill_level_distribution_Response,
        cert_updated_trend_Response
      ] = await Promise.all(requests);
      console.log("promise done");
      if (get_user_count_Response.status === 200) {
        // console.log(get_user_count_Response.data.data, "1");
        setuser_count(get_user_count_Response.data.data);
      }
      if (get_skilled_user_count_Response.status === 200) {
        // console.log(
        //   get_skilled_user_count_Response.data.data[0]._count.userId,
        //   "2"
        // );
        setskilled_user_count(
          get_skilled_user_count_Response.data.data[0]._count.userId
        );
      }
      if (role_count_Response.status == 200) {
        // console.log(role_count_Response.data.data.length, "4");
        setrole_count(role_count_Response.data.data.length);
      }
      if (skilled_user_dept_count_Response.status == 200) {
        // console.log(skilled_user_dept_count_Response.data.data, "5");
        skilled_user_dept_count_Response.data.data.map(
          (e: any, i: any) => {
            e.fill = `hsl(var(--chart-${(i+1)%5}))`;
          }
        );
        setdept_skill_count(skilled_user_dept_count_Response.data.data);
      }
      if (skilled_user_hour_count_Response.status == 200) {
        // console.log(skilled_user_hour_count_Response.data.data, "6");
        var time = 0;
        skilled_user_hour_count_Response.data.data.map((e: any,i:any) => {
          time += e.totalTimeSpent;
          e.fill = `hsl(var(--chart-${(i+1)%5}))`;
        });
        sethours_count(Math.round(time));
        setskilled_user_dept_count(skilled_user_hour_count_Response.data.data);
      }
      if (skill_user_count_Response.status == 200) {
        // console.log(skill_user_count_Response.data.data, "7");
        skill_user_count_Response.data.data.map(
          (e: any, i: any) => {
            e.fill = `hsl(var(--chart-${(i+1)%5}))`;
          }
        );
        setskill_user_count(skill_user_count_Response.data.data);
      }
      if (user_skill_level_distribution_Response.status == 200) {
        // console.log(user_skill_level_distribution_Response.data.data, "9");
        user_skill_level_distribution_Response.data.data.map(
          (e: any, i: any) => {
            e.fill = `hsl(var(--chart-${(i+1)%5}))`;
          }
        );
        setuser_skill_level_distribution(
          user_skill_level_distribution_Response.data.data
        );
      }
      if (cert_updated_trend_Response.status == 200) {
        console.log(cert_updated_trend_Response.data.data, "10");
        cert_updated_trend_Response.data.data.map(
          (e: any, i: any) => {
            e.fill = `hsl(var(--chart-${(i+1)%5}))`;
          }
        );
        setcert_updated_trend(cert_updated_trend_Response.data.data)
      }

      if (
        get_user_count_Response.status==200&&
        get_skilled_user_count_Response.status==200&&
        role_count_Response.status==200&&
        skilled_user_dept_count_Response.status==200&&
        skilled_user_hour_count_Response.status==200&&
        skill_user_count_Response.status==200&&
        user_skill_level_distribution_Response.status==200&&
        cert_updated_trend_Response.status==200
      ) {
        setloading(false);
      }
    } catch (e) {
      toast.error(e as String);
      setloading(false);
    }
  };
  const chartConfig = skilled_user_dept_count.reduce(
    (acc: any, item: any) => {
      acc[item.role] = { label: item.role };
      return acc;
    },
    {}
  );
  const chartConfig1 = dept_skill_count.reduce(
    (acc: any, item: any) => {
      acc[item.roleName] = {
        label: item.roleName,
      };

      return acc;
    },
    {}
  );
  const chartConfig2 = skill_user_count.reduce(
    (acc: any, item: any) => {
      acc[item.skillName] = {
        label: item.skillName,
      };

      return acc;
    },
    {}
  );
  const chartConfig3 = cert_updated_trend.reduce(
    (acc: any, item: any) => {
      acc[item.month] = {
        label: item.month,
      };

      return acc;
    },
    {}
  );

  const chartConfig4 = user_skill_level_distribution.reduce(
    (acc: any, item: any) => {
      acc[item.competency] = {
        lable: item.competency,
      };

      return acc;
    },
    {}
  );

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
      console.log(data.name);
      console.log(data, "data");
    };
    init();
    validate();
    get_all_stat_data();
    console.log(Cookies.get("role"));
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

  const [loading, setloading] = useState(false);
  const n = useNavigate();
  const renderLabel = (value: any) => {
    // Split the label into two lines if it exceeds 15 characters
    const maxChars = 15;
    const lines =
      value.length > maxChars
        ? [value.slice(0, maxChars), value.slice(maxChars)]
        : [value];

    return (
      <text
        style={{
          display: "block", // Use block display to force new lines
          overflow: "visible",
          whiteSpace: "pre-wrap", // Allows for wrapping
        }}
      >
        {lines.map((line, index) => (
          <tspan key={index} dy={index === 0 ? 0 : 15}>
            {line}
          </tspan> // Adjust dy to create spacing between lines
        ))}
      </text>
    );
  };

  return (
    <div>
      <Navbar />
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
          {/* Stats section */}
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
              <CardTitle className="text-sm font-medium">
                Role Departments
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{role_count}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Skilled User
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{skilled_user_count}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours Spent</CardTitle>
              <AlarmClockCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hours_count}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {/* Chart section */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Department wise Skilled User Count</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="">
                <BarChart
                  accessibilityLayer
                  data={dept_skill_count}
                  layout="vertical"
                  margin={{
                    left: 5,
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
                      position: "insideLeft", // Adjust the label position if necessary
                      formatter: renderLabel, // Use custom label renderer
                    }}
                    tickFormatter={(value) =>
                      chartConfig[value]?.label || value
                    } // Use chartConfig to format labels
                  />
                  <XAxis dataKey="count" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="count"
                    layout="vertical"
                    radius={5}
                    fill="#8884d8"
                  />{" "}
                  {/* Ensure fill color is set */}
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Department wise Time Spent on Certification</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig1} className="">
                <BarChart
                  accessibilityLayer
                  data={skilled_user_dept_count}
                  layout="horizontal"
                  margin={{
                    left: 0,
                  }}
                >
                  <XAxis
                    dataKey="role" // Use roleName directly
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) =>
                      chartConfig[value]?.label || value
                    } // Use chartConfig to format labels
                  />
                  <YAxis dataKey="totalTimeSpent" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="totalTimeSpent"
                    layout="horizontal"
                    radius={5}
                    fill="#8884d8"
                  />{" "}
                  {/* Ensure fill color is set */}
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>User Competency Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig4} className="">
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent  />}
                  />
                  <Pie
                    data={user_skill_level_distribution}
                    dataKey="count"
                    nameKey="competency"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          const totalVisitors =
                            user_skill_level_distribution.reduce(
                              (sum, data:any) => sum + data.count,
                              0
                            );
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalVisitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Skilled Users
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
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
              <ChartContainer config={chartConfig2} className="">
                <BarChart
                  accessibilityLayer
                  margin={{ bottom: 50 }}
                  data={skill_user_count}
                  layout="horizontal"
                >
                  <XAxis
                    className="mt-10"
                    dataKey="skillName" // Use roleName directly
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    angle={90}
                    textAnchor="start"
                    tickFormatter={(value) => value} // Use chartConfig to format labels
                  />
                  <YAxis dataKey="userCount" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="userCount"
                    layout="horizontal"
                    radius={5}
                    fill="#8884d8"
                  />{" "}
                  {/* Ensure fill color is set */}
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
      <CardHeader>
        <CardTitle>LTM certification done</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig3}>
          <LineChart
            accessibilityLayer
            data={cert_updated_trend}
            margin={{
              bottom:30,
              left:12,
              right:12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              angle={90}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              textAnchor="start"
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="count"
              type="natural"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={{
                fill: "hsl(var(--chart-2))",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
        </div>

        {/* <Card>
          <CardHeader>
            <CardTitle>Recent Skill Updates</CardTitle>
            <CardDescription>
              Latest skill level changes across the organization
            </CardDescription>
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
        </Card> */}
      </div>
    </div>
  );
}
