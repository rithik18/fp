import { useEffect } from "react";
import { validate } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../components/navbar";
import Datatable from "../components/datatable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea"
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { H1, H2} from '../components/ui/Typography';

const Admin_add_skill = () => {
  useEffect(() => {
    validate();
    console.log(Cookies.get("role"));
    if (Cookies.get("role")?.toUpperCase() === "ADMIN" && Cookies.get("auth") == "true") {
      n("/add_skill");
    } else if (
      Cookies.get("role")?.toUpperCase() !== "ADMIN" &&
      Cookies.get("auth") == "true"
    ) {
      n("/user");
    } else {
      n("/");
    }
  }, []);

  const n = useNavigate();
  return (
    <div>
      <Navbar />
      <H1 className="text-center pb-8 mx-auto">Skills Section</H1>
      <div className="grid grid-cols-3 gap-4 mx-auto px-4">
          <div className="grid w-full max-w-sm items-center gap-4 p-4">
            <H2>Add Skills</H2>
            <Label htmlFor="skill">Skill Name</Label>
            <Input type="skill" id="skill" placeholder="Skill Name" />
          
            <Label htmlFor="message">Skill Description</Label>
            <Textarea placeholder="Type your description here." id="message" />
            <Button variant={"default"}>Submit</Button>
            
          </div>

        <div className="col-span-2">
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Sno</TableHead>
                <TableHead>Skill ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      {/* <Datatable/> */}
    </div>
  );
};

export default Admin_add_skill;
