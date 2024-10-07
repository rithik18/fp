import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
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
} from "../../components/ui/alert-dialog"

import { Calendar } from "../../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Pencil, Upload } from "lucide-react"
import UserNav from "../../components/UserNav"
import Cookies from "js-cookie";
import axios from "axios"
import { ToastContainer ,toast} from "react-toastify"
import { cn } from "../../lib/utils"
import { ScrollArea } from "../../components/ui/scroll-area"
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";

type Certification = {
  certificationId: string
  id: string
  name: string
  issued_by:String,
  is_certificate:Boolean
}

type UserCertification = {
  userId:String
  certificationId: string
  certificationName: string
  started_at: String
  completed_at: String 
  competency: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
  imageData: string | null
  isVerified: boolean,
}


export default function UserAddCertification() {
  const [predefinedCertifications,setpredefinedCertifications] = useState<Certification[]>([])
  const [userCertifications, setUserCertifications] = useState<UserCertification[]>([])
  const [selectedCertification, setSelectedCertification] = useState<string>("")
  const [editCertificationname, seteditCertificationname] = useState<string>("")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [startDateedit, setStartDateedit] = useState<Date | undefined>(new Date())
  const [completionDate, setCompletionDate] = useState<Date | undefined>()
  const [completionDateedit, setCompletionDateedit] = useState<Date | undefined>()
  const [competency, setCompetency] = useState<UserCertification['competency']>('BEGINNER')
  const [competencyedit, setCompetencyedit] = useState<UserCertification['competency']>('BEGINNER')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageFileedit, setImageFileedit] = useState<File | null>(null)
  const [loading, setloading] = useState(false)
  

  const fetchUserCertifications = async () => {
    setloading(true)
    const token = await Cookies.get("token");
    const reqOptions = {
      url: "http://localhost:3000/user/get_certification",
      method: "POST",
      data: { token: token,id:Cookies.get('id') },
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        console.log(response.data.data,"data");
        setUserCertifications(response.data.data);
        setloading(false)
        
      }
    } catch (e) {
      setloading(false)
      toast.error(e as String);
    }
    
  }
  const fetchCertifications = async () => {
    setloading(true)
    const token = await Cookies.get("token");
    const reqOptions = {
      url: "http://localhost:3000/user/view_certification",
      method: "POST",
      data: { token: token },
    };
    console.log(reqOptions);

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        console.log(response.data.data);
        setpredefinedCertifications(response.data.data);
        setloading(false)
      }
    } catch (e) {
      setloading(false)
      toast.error(e as String);
      
    }
  }
  useEffect(() => {  
    fetchCertifications()
    fetchUserCertifications()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }
  const handleImageChangeedit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFileedit(e.target.files[0])
    }
  }

  const handleAddCertification = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCertification||!competency || !startDate || !imageFile || !completionDate) {
      console.log(!selectedCertification,"cert")
      console.log(!startDate,"strst" )
      console.log(!imageFile,"img" )
      console.log(!completionDate,"end")
      toast.error(
"Please fill in all required fields and upload an image."

      )
      return
    }
    if (completionDate?.getTime() && startDate.getTime() > completionDate?.getTime()) {
      toast.error(
"Completion date is older than start date"

      )
      return
    }


    // Convert image to byte string
    const imageData = await new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.readAsDataURL(imageFile)
    })
    

    const newCertification: UserCertification = {
      userId:Cookies.get('id')??"",
      certificationId: selectedCertification,
      certificationName: predefinedCertifications.find(c => c.id === selectedCertification)?.name || "",
      started_at: startDate.toISOString(),
      completed_at: completionDate?.toISOString() ?? "",
      competency: competency,
      imageData: imageData,
      isVerified: false
    }
    console.log(newCertification)
    const token = await Cookies.get("token");
    const reqOptions = {
      url: "http://localhost:3000/user/add_certification",
      method: "POST",
      data: { token: token,data: newCertification},
    };
    console.log(reqOptions); 

    try {
      const response = await axios.request(reqOptions);
      if (response.status == 200) {
        console.log(response.data.data);
        toast.success( "Certification added successfully. Awaiting admin verification.")
        fetchUserCertifications()
      }
    } catch (e) {
      toast.error(e as String);
    }
    // toast.success( "Certification added successfully. Awaiting admin verification.")

    // Reset form
    setSelectedCertification("")
    setStartDate(new Date())
    setCompletionDate(undefined)
    setCompetency('BEGINNER')
    setImageFile(null)
  }

  return (
    <div>
      <UserNav/>
      <ToastContainer/>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center backdrop-blur-md z-50">
          <LoadingOverlay
            active={loading}
            spinner={<CircleLoader />}
          ></LoadingOverlay>
        </div>
      )}
      <div className="max-w-4xl mx-auto p-6 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Add New Certification</h2>
        <form onSubmit={handleAddCertification} className="space-y-4">
          <div>
            <Label htmlFor="certification">Certification</Label>
            <Select value={selectedCertification} onValueChange={setSelectedCertification}>
              <SelectTrigger id="certification">
                <SelectValue placeholder="Select a certification" />
              </SelectTrigger>
              <SelectContent>
                {predefinedCertifications.map((cert) => (
                  <SelectItem key={cert.id} value={cert.id}>
                    {cert.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${!startDate && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="completionDate">Completion Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${!completionDate && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {completionDate ? format(completionDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={completionDate}
                  onSelect={setCompletionDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="competency">Competency</Label>
            <Select value={competency} onValueChange={(value) => setCompetency(value as UserCertification['competency'])}>
              <SelectTrigger id="competency">
                <SelectValue placeholder="Select competency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BEGINNER">Beginner</SelectItem>
                <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                <SelectItem value="ADVANCED">Advanced</SelectItem>
                <SelectItem value="EXPERT">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="certificationImage">Certification Image</Label>
            <Input
              id="certificationImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
          </div>
          <Button type="submit">Add Certification</Button>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Your Certifications</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Certification</TableHead>
              <TableHead>Certificate <br />/Course</TableHead>
              <TableHead>Issued By</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Completion Date</TableHead>
              <TableHead>Competency</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Verification Status</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {predefinedCertifications.length >0 &&userCertifications.length>0 && userCertifications.map((cert) => (
              // <TableRow key={cert.id}>
              <TableRow>
                <TableCell>{cert.certificationName}</TableCell>
                <TableCell>
  {predefinedCertifications?.find((e) => e?.id === cert.certificationId)?.is_certificate?.toString() || "false"}
</TableCell>
                <TableCell>
  {predefinedCertifications?.find((e) => e?.id === cert.certificationId)?.issued_by?.toString() || ""}
</TableCell>

                {/* <TableCell>{predefinedCertifications.find((e)=>e?.id===cert.certificationId).is_certificate.toString()??""}</TableCell> */}
                {/* <TableCell>{format(cert.started_at, "PPP")}</TableCell> */}
                <TableCell>{cert.started_at.split('T')[0]}</TableCell>
                {/* <TableCell>{cert.completed_at ? format(cert.completed_at, "PPP") : "In Progress"}</TableCell> */}
                <TableCell>{cert.completed_at?.trim()==""||cert.completed_at==null||cert.completed_at==undefined ? cert.completed_at?.split('T')[0] : "In Progress"}</TableCell>
                <TableCell>{cert.competency}</TableCell>
                <TableCell>
                  {cert.imageData ? (
                    <Dialog>
                    <DialogTrigger> <img
                      src={cert.imageData}
                      alt={`${cert.certificationName} certificate`}
                      width={50}
                      height={50}
                      className="object-cover"
                    /></DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Certificate</DialogTitle>
                        <DialogDescription>
                        <img
                      src={cert.imageData}
                      alt={`${cert.certificationName} certificate`}
                      className="object-cover"
                    />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  
                   
                  ) : (
                    "No image"
                  )}
                </TableCell>
                <TableCell>
                  {cert.isVerified ? (
                    <span className="text-green-600">Verified</span>
                  ) : (
                    <span className="text-yellow-600">Pending Verification</span>
                  )}
                </TableCell>
                <TableCell>
                <AlertDialog>
  <AlertDialogTrigger onClick={()=>{
    setCompetencyedit(cert.competency)
    seteditCertificationname(cert.certificationName)
        // Check if the preset value exists in predefinedCertifications
        const isValidPreset = predefinedCertifications.some(cert => cert.id === cert.certificationId);
        
        if (isValidPreset) {
            seteditCertificationname(cert.certificationId);
        }

    setCompletionDateedit( new Date(cert.completed_at.toString()))
    setStartDateedit(new Date(cert.started_at.toString()))
  }}><Pencil className="w-4 h-4"/></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Edit Details</AlertDialogTitle>
      <AlertDialogDescription>
        <ScrollArea>
      <section className="flex flex-col justify-evenly gap-4 mx-auto w-full">
      <img src={cert.imageData||""} alt="" className={cn(
                      "mx-auto object-cover w-24 h-24 border-2 rounded-full"
                    )}/>
          <div>
            
            <Label htmlFor="certification">Certification</Label>
            <Select value={editCertificationname} onValueChange={seteditCertificationname}>
              <SelectTrigger id="certification">
                <SelectValue placeholder={editCertificationname} />
              </SelectTrigger>
              <SelectContent>
                {predefinedCertifications.map((cert) => (
                  <SelectItem key={cert.id} value={cert.id}>
                    {cert.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${!startDateedit && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDateedit ? format(startDateedit, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDateedit}
                  onSelect={setStartDateedit}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="completionDate">Completion Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${!completionDateedit && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {completionDateedit ? format(completionDateedit, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={completionDateedit}
                  onSelect={setCompletionDateedit}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="competency">Competency</Label>
            <Select value={competencyedit} onValueChange={(value) => setCompetencyedit(value as UserCertification['competency'])}>
              <SelectTrigger id="competency">
                <SelectValue placeholder="Select competency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BEGINNER">Beginner</SelectItem>
                <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                <SelectItem value="ADVANCED">Advanced</SelectItem>
                <SelectItem value="EXPERT">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="certificationImage">Certification Image</Label>
            <Input
              id="certificationImage"
              type="file"
              accept="image/*"
              onChange={handleImageChangeedit}
              className="cursor-pointer"
            />
          </div>
      </section>
      </ScrollArea>
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
    </div>
    
  )
}