

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
import { ScrollArea } from "../../components/ui/scroll-area"
import { toast } from "../../components/ui/use-toast"
import { Calendar } from "../../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
// import Image from "next/image"

type Certification = {
  id: string
  name: string
}

type UserCertification = {
  id: string
  certificationId: string
  certificationName: string
  started_at: Date
  completed_at: Date | null
  competency: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
  imageData: string | null
  isVerified: boolean
}

const predefinedCertifications: Certification[] = [
  { id: "1", name: "AWS Certified Solutions Architect" },
  { id: "2", name: "Certified Information Systems Security Professional (CISSP)" },
  { id: "3", name: "Project Management Professional (PMP)" },
  { id: "4", name: "Certified Information Systems Auditor (CISA)" },
]

export default function CertificationManager() {
  const [userCertifications, setUserCertifications] = useState<UserCertification[]>([])
  const [selectedCertification, setSelectedCertification] = useState<string>("")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [completionDate, setCompletionDate] = useState<Date | undefined>()
  const [competency, setCompetency] = useState<UserCertification['competency']>('BEGINNER')
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchUserCertifications = async () => {
      // Simulating API call with mock data
      const mockUserCertifications: UserCertification[] = [
        {
          id: "uc1",
          certificationId: "1",
          certificationName: "AWS Certified Solutions Architect",
          started_at: new Date(2023, 0, 15),
          completed_at: new Date(2023, 6, 30),
          competency: 'INTERMEDIATE',
          imageData: null,
          isVerified: false
        },
        // Adding more mock data to demonstrate scrolling
        ...Array(20).fill(null).map((_, index) => ({
          id: `uc${index + 2}`,
          certificationId: `${(index % 4) + 1}`,
          certificationName: predefinedCertifications[index % 4].name,
          started_at: new Date(2023, index % 12, 1),
          completed_at: index % 2 === 0 ? new Date(2023, (index + 3) % 12, 1) : null,
          competency: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'][index % 4] as UserCertification['competency'],
          imageData: null,
          isVerified: index % 3 === 0
        }))
      ]
      setUserCertifications(mockUserCertifications)
    }

    fetchUserCertifications()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleAddCertification = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCertification || !startDate || !imageFile) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and upload an image.",
        variant: "destructive",
      })
      return
    }

    const imageData = await new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.readAsDataURL(imageFile)
    })

    const newCertification: UserCertification = {
      id: `uc${userCertifications.length + 1}`,
      certificationId: selectedCertification,
      certificationName: predefinedCertifications.find(c => c.id === selectedCertification)?.name || "",
      started_at: startDate,
      completed_at: completionDate || null,
      competency: competency,
      imageData: imageData,
      isVerified: false
    }

    setUserCertifications([...userCertifications, newCertification])
    toast({
      title: "Success",
      description: "Certification added successfully. Awaiting admin verification.",
    })

    setSelectedCertification("")
    setStartDate(new Date())
    setCompletionDate(undefined)
    setCompetency('BEGINNER')
    setImageFile(null)
  }

  return (
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
            <Label htmlFor="completionDate">Completion Date (Optional)</Label>
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
        <div className="border rounded-md">
          <ScrollArea className="h-[400px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky top-0 bg-background z-10">Certification</TableHead>
                  <TableHead className="sticky top-0 bg-background z-10">Start Date</TableHead>
                  <TableHead className="sticky top-0 bg-background z-10">Completion Date</TableHead>
                  <TableHead className="sticky top-0 bg-background z-10">Competency</TableHead>
                  <TableHead className="sticky top-0 bg-background z-10">Image</TableHead>
                  <TableHead className="sticky top-0 bg-background z-10">Verification Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userCertifications.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell>{cert.certificationName}</TableCell>
                    <TableCell>{format(cert.started_at, "PPP")}</TableCell>
                    <TableCell>{cert.completed_at ? format(cert.completed_at, "PPP") : "In Progress"}</TableCell>
                    <TableCell>{cert.competency.charAt(0) + cert.competency.slice(1).toLowerCase()}</TableCell>
                    <TableCell>
                      {cert.imageData ? (
                        <img
                          src={cert.imageData}
                          alt={`${cert.certificationName} certificate`}
                          width={50}
                          height={50}
                          className="object-cover"
                        />
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </section>
    </div>
  )
}