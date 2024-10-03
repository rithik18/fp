import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Eye, Trash2 } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

export default function Cards({ props, roles }: any) {
  const getShortName = (fullName: any) => {
    const nameParts = fullName.split(" ");
    const shortName = nameParts
      .map((part: any) => part.charAt(0).toUpperCase())
      .join("");
    return shortName;
  };
  const handleUserDelete = async () => {
    const token = Cookies.get("token");
    const reqOptions = {
      url: "http://localhost:3000/admin/delete_user",
      method: "POST",
      data: { token: token, id: props.id },
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        toast.success("Skill Deleted");
      }
    } catch (e) {
      if (e!.status == 403) {
        console.log(e);
        toast.error("Skill exsist");
      } else {
        toast.error(`${e}`);
      }
    }
  };
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src="/placeholder.svg?height=96&width=96"
              alt="Profile picture"
            />
            <AvatarFallback>{getShortName(props.name)}</AvatarFallback>
          </Avatar>
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold">{props.name}</h2>
            <p className="text-sm text-muted-foreground">{roles}</p>
            <p className="text-sm">{props.mail}</p>
            <p className="text-sm">{props.joining_date}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button variant="outline" className="w-2/3 mx-auto">
          <Eye className="mr-2 h-4 w-4 mx-a" />
          View
        </Button>
        <div className="w-2/3 mx-auto">

        <AlertDialog>
          <AlertDialogTrigger className="w-full">
            <Button variant="outline" className="w-full">
              <Trash2 className="mr-2 h-4 w-4  text-red-700" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                User.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleUserDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
