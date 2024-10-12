'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, BookOpen, GraduationCap, Search, FileText, AlertTriangle, Award } from "lucide-react"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Enhanced mock data
const hodData = {
  departmentName: "Computer Science",
  totalStudents: 500,
  totalStaff: 25,
  totalCourses: 30,
  staffList: [
    { id: 1, name: "Dr. John Doe", position: "Professor", courses: ["CS101", "CS301"], email: "john.doe@university.edu", phone: "+1234567890", officeHours: "Mon, Wed 10-12" },
    { id: 2, name: "Dr. Jane Smith", position: "Associate Professor", courses: ["CS201", "CS401"], email: "jane.smith@university.edu", phone: "+1234567891", officeHours: "Tue, Thu 14-16" },
    { id: 3, name: "Prof. Alice Johnson", position: "Assistant Professor", courses: ["CS102", "CS302"], email: "alice.johnson@university.edu", phone: "+1234567892", officeHours: "Wed, Fri 11-13" },
    { id: 4, name: "Dr. Bob Brown", position: "Lecturer", courses: ["CS202", "CS402"], email: "bob.brown@university.edu", phone: "+1234567893", officeHours: "Mon, Thu 13-15" },
    { id: 5, name: "Dr. Charlie Davis", position: "Lecturer", courses: ["CS103", "CS303"], email: "charlie.davis@university.edu", phone: "+1234567894", officeHours: "Tue, Fri 9-11" },
  ],
  courseStatistics: [
    { id: "CS101", name: "Introduction to Programming", students: 150, averageGrade: 85, passingRate: 92 },
    { id: "CS201", name: "Data Structures", students: 120, averageGrade: 78, passingRate: 88 },
    { id: "CS301", name: "Algorithms", students: 100, averageGrade: 82, passingRate: 90 },
    { id: "CS401", name: "Artificial Intelligence", students: 80, averageGrade: 88, passingRate: 95 },
    { id: "CS501", name: "Machine Learning", students: 60, averageGrade: 90, passingRate: 97 },
  ],
  studentList: [
    { id: "ST1001", name: "Emma Wilson", year: 2, gpa: 3.8, advisor: "Dr. John Doe", courses: ["CS201", "CS301"] },
    { id: "ST1002", name: "Liam Johnson", year: 3, gpa: 3.5, advisor: "Dr. Jane Smith", courses: ["CS301", "CS401"] },
    { id: "ST1003", name: "Olivia Davis", year: 1, gpa: 4.0, advisor: "Prof. Alice Johnson", courses: ["CS101", "CS102"] },
    { id: "ST1004", name: "Noah Brown", year: 4, gpa: 3.2, advisor: "Dr. Bob Brown", courses: ["CS401", "CS501"] },
    { id: "ST1005", name: "Ava Miller", year: 2, gpa: 3.7, advisor: "Dr. Charlie Davis", courses: ["CS201", "CS202"] },
  ],
  studentDistribution: [
    { name: "Year 1", value: 150 },
    { name: "Year 2", value: 130 },
    { name: "Year 3", value: 120 },
    { name: "Year 4", value: 100 },
  ],
  staffWorkload: [
    { name: "Dr. John Doe", courses: 2, students: 250, research: 3 },
    { name: "Dr. Jane Smith", courses: 2, students: 200, research: 2 },
    { name: "Prof. Alice Johnson", courses: 2, students: 220, research: 1 },
    { name: "Dr. Bob Brown", courses: 2, students: 180, research: 1 },
    { name: "Dr. Charlie Davis", courses: 2, students: 150, research: 2 },
  ],
  departmentPerformance: [
    { year: 2019, avgGPA: 3.2, researchPapers: 45, fundingReceived: 1000000 },
    { year: 2020, avgGPA: 3.3, researchPapers: 50, fundingReceived: 1200000 },
    { year: 2021, avgGPA: 3.4, researchPapers: 55, fundingReceived: 1500000 },
    { year: 2022, avgGPA: 3.5, researchPapers: 60, fundingReceived: 1800000 },
    { year: 2023, avgGPA: 3.6, researchPapers: 65, fundingReceived: 2000000 },
  ],
}

export default function HODDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStaff, setSelectedStaff] = useState<{ id: number; name: string; position: string; courses: string[]; email: string; phone: string; officeHours: string } | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<{ id: string; name: string; students: number; averageGrade: number; passingRate: number } | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<{ id: string; name: string; year: number; gpa: number; advisor: string; courses: string[] } | null>(null)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    // In a real app, this would trigger an API call to search for students, staff, or courses
  }

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-teal-400 to-emerald-600 min-h-screen">
      <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold text-emerald-700">HOD Dashboard - {hodData.departmentName}</CardTitle>
            <Button variant="outline" className="bg-emerald-500 text-white hover:bg-emerald-600" onClick={() => alert('Logout functionality to be implemented')}>Logout</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-700">{hodData.totalStudents}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                <GraduationCap className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-700">{hodData.totalStaff}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-700">{hodData.totalCourses}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Students",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={hodData.studentDistribution}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="var(--color-value)"
                        label
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Course Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    averageGrade: {
                      label: "Average Grade",
                      color: "hsl(var(--chart-1))",
                    },
                    passingRate: {
                      label: "Passing Rate",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hodData.courseStatistics}>
                      <XAxis dataKey="id" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="averageGrade" fill="var(--color-averageGrade)" />
                      <Bar dataKey="passingRate" fill="var(--color-passingRate)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Staff Workload</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    courses: {
                      label: "Courses",
                      color: "hsl(var(--chart-1))",
                    },
                    students: {
                      label: "Students",
                      color: "hsl(var(--chart-2))",
                    },
                    research: {
                      label: "Research Projects",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hodData.staffWorkload} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="courses" fill="var(--color-courses)" />
                      <Bar dataKey="students" fill="var(--color-students)" />
                      <Bar dataKey="research" fill="var(--color-research)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    avgGPA: {
                      label: "Average GPA",
                      color: "hsl(var(--chart-1))",
                    },
                    researchPapers: {
                      label: "Research Papers",
                      color: "hsl(var(--chart-2))",
                    },
                    fundingReceived: {
                      label: "Funding Received ($)",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hodData.departmentPerformance}>
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="avgGPA" stroke="var(--color-avgGPA)" />
                      <Line yAxisId="left" type="monotone" dataKey="researchPapers" stroke="var(--color-researchPapers)" />
                      <Line yAxisId="right" type="monotone" dataKey="fundingReceived" stroke="var(--color-fundingReceived)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-emerald-500" />
              <Input 
                placeholder="Search students, staff, or courses..." 
                value={searchTerm} 
                onChange={(e) => handleSearch(e.target.value)}
                className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button  className="bg-emerald-500 text-white hover:bg-emerald-600">Generate Report</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Generate Department Report</DialogTitle>
                  <DialogDescription>
                    Select the type of report you want to generate.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button className="w-full justify-start" onClick={() => alert('Generating Staff Performance Report...')}>
                    <FileText className="mr-2 h-4 w-4" />
                    Staff Performance Report
                  </Button>
                  <Button className="w-full justify-start" onClick={() => alert('Generating Course Evaluation Report...')}>
                    <FileText className="mr-2 h-4 w-4" />
                    Course Evaluation Report
                  </Button>
                  <Button className="w-full justify-start" onClick={() => alert('Generating Student Progress Report...')}>
                    <FileText className="mr-2 h-4 w-4" />
                    Student Progress Report
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="staff" className="space-y-4">
            <TabsList className="bg-emerald-100">
              <TabsTrigger value="staff" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">Staff</TabsTrigger>
              <TabsTrigger value="courses" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">Courses</TabsTrigger>
              <TabsTrigger value="students" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">Students</TabsTrigger>
            </TabsList>
            <TabsContent value="staff">
              <Card>
                <CardHeader>
                  <CardTitle>Department Staff</CardTitle>
                  <CardDescription>Overview of faculty members</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Courses</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hodData.staffList.map(staff => (
                        <TableRow key={staff.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${staff.name}`} alt={staff.name} />
                                <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <span>{staff.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{staff.position}</TableCell>
                          <TableCell>{staff.courses.join(', ')}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  className="bg-emerald-500 text-white hover:bg-emerald-600"
                                  onClick={() => setSelectedStaff(staff)}
                                >
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>{selectedStaff?.name}</DialogTitle>
                                  <DialogDescription>
                                    Staff member details
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Position</Label>
                                    <span className="col-span-3">{selectedStaff?.position}</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Email</Label>
                                    <span className="col-span-3">{selectedStaff?.email}</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Phone</Label>
                                    <span className="col-span-3">{selectedStaff?.phone}</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Office Hours</Label>
                                    <span className="col-span-3">{selectedStaff?.officeHours}</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Courses</Label>
                                    <span className="col-span-3">{selectedStaff?.courses.join(', ')}</span>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle>Course Statistics</CardTitle>
                  <CardDescription>Overview of course performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Students Enrolled</TableHead>
                        <TableHead>Average Grade</TableHead>
                        <TableHead>Passing Rate</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hodData.courseStatistics.map(course => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.id}</TableCell>
                          <TableCell>{course.name}</TableCell>
                          <TableCell>{course.students}</TableCell>
                          <TableCell>{course.averageGrade}%</TableCell>
                          <TableCell>{course.passingRate}%</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  className="bg-emerald-500 text-white hover:bg-emerald-600"
                                  onClick={() => setSelectedCourse(course)}
                                >
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>{selectedCourse?.name}</DialogTitle>
                                  <DialogDescription>
                                    Course performance details
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Course Code</Label>
                                    <span className="col-span-3">{selectedCourse?.id}</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Students Enrolled</Label>
                                    <span className="col-span-3">{selectedCourse?.students}</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Average Grade</Label>
                                    <span className="col-span-3">{selectedCourse?.averageGrade}%</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Passing Rate</Label>
                                    <span className="col-span-3">{selectedCourse?.passingRate}%</span>
                                  </div>
                                  <div className="col-span-4">
                                    <Progress value={selectedCourse?.passingRate} className="w-full" />
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle>Student List</CardTitle>
                  <CardDescription>Overview of students in the department</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>GPA</TableHead>
                        <TableHead>Advisor</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hodData.studentList.map(student => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.year}</TableCell>
                          <TableCell>{student.gpa}</TableCell>
                          <TableCell>{student.advisor}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  className="bg-emerald-500 text-white hover:bg-emerald-600"
                                  onClick={() => setSelectedStudent(student)}
                                >
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>{selectedStudent?.name}</DialogTitle>
                                  <DialogDescription>
                                    Student details
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Student ID</Label>
                                    <span className="col-span-3">{selectedStudent?.id}</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Year</Label>
                                    <span className="col-span-3">{selectedStudent?.year}</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">GPA</Label>
                                    <span className="col-span-3">{selectedStudent?.gpa}</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Advisor</Label>
                                    <span className="col-span-3">{selectedStudent?.advisor}</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Courses</Label>
                                    <span className="col-span-3">{selectedStudent?.courses.join(', ')}</span>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}