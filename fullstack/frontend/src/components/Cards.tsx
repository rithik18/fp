import { Card, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Eye, Trash2 } from "lucide-react"

export default function Cards() {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-sm text-muted-foreground">Software Developer</p>
            <p className="text-sm">john.doe@example.com</p>
            <p className="text-sm">+1 (555) 123-4567</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="w-2/3 mx-auto">
          <Eye className="mr-2 h-4 w-4 mx-a" />
          View
        </Button>
        
      </CardFooter>
    </Card>
  )
}