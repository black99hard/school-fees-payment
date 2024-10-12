'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, Users, TrendingUp, Search, FileText, AlertTriangle } from "lucide-react"

// Enhanced mock data
const bursaryData = {
  totalFees: 2500000.00,
  collectedFees: 1750000.00,
  studentCount: 5000,
  recentTransactions: [
    { id: 1, date: "2023-05-15", studentId: "ST12345", name: "Alice Johnson", description: "Tuition Fee Payment", amount: 2000.00, method: "Online Transfer" },
    { id: 2, date: "2023-05-14", studentId: "ST12346", name: "Bob Smith", description: "Library Fee Payment", amount: 50.00, method: "Cash" },
    { id: 3, date: "2023-05-13", studentId: "ST12347", name: "Charlie Brown", description: "Tuition Fee Payment", amount: 2000.00, method: "Credit Card" },
    { id: 4, date: "2023-05-12", studentId: "ST12348", name: "Diana Prince", description: "Lab Fee Payment", amount: 100.00, method: "Debit Card" },
    { id: 5, date: "2023-05-11", studentId: "ST12349", name: "Ethan Hunt", description: "Tuition Fee Payment", amount: 2000.00, method: "Bank Transfer" },
  ],
  studentFeeStatus: [
    { id: "ST12345", name: "Alice Johnson", course: "Computer Science", year: 3, totalFees: 5000.00, paidFees: 3500.00, lastPaymentDate: "2023-05-15" },
    { id: "ST12346", name: "Bob Smith", course: "Mechanical Engineering", year: 2, totalFees: 5000.00, paidFees: 5000.00, lastPaymentDate: "2023-05-01" },
    { id: "ST12347", name: "Charlie Brown", course: "Business Administration", year: 4, totalFees: 5000.00, paidFees: 2000.00, lastPaymentDate: "2023-05-13" },
    { id: "ST12348", name: "Diana Prince", course: "Electrical Engineering", year: 1, totalFees: 5000.00, paidFees: 4000.00, lastPaymentDate: "2023-05-12" },
    { id: "ST12349", name: "Ethan Hunt", course: "Psychology", year: 3, totalFees: 5000.00, paidFees: 1000.00, lastPaymentDate: "2023-05-11" },
  ],
  pendingInvoices: [
    { id: "INV001", studentId: "ST12350", name: "Frank Castle", amount: 2000.00, dueDate: "2023-06-01" },
    { id: "INV002", studentId: "ST12351", name: "Gwen Stacy", amount: 1500.00, dueDate: "2023-06-05" },
    { id: "INV003", studentId: "ST12352", name: "Harry Potter", amount: 1800.00, dueDate: "2023-06-10" },
  ]
}

export default function BursaryDashboard() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedStudent, setSelectedStudent] = useState<{ id: string; name: string; course: string; year: number; totalFees: number; paidFees: number; lastPaymentDate: string } | null>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false)
  const [paymentAmount, setPaymentAmount] = useState<string>('')

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    // In a real app, this would trigger an API call to search for students
  }

  const handlePayment = () => {
    // In a real app, this would process the payment and update the database
    if (selectedStudent) {
        alert(`Payment of ₦₦{paymentAmount} processed for ₦{selectedStudent.name}`)
    } else {
        alert('No student selected for payment.')
    }
    setIsPaymentModalOpen(false)
    setPaymentAmount('')
  }

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-teal-400 to-emerald-600 min-h-screen">
      <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold text-emerald-700">Bursary Dashboard</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Fees Collected</CardTitle>
                <DollarSign className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-700">₦{bursaryData.collectedFees.toFixed(2)}</div>
                <Progress className="mt-2" value={(bursaryData.collectedFees / bursaryData.totalFees) * 100} />
                <p className="text-xs text-emerald-600 mt-2">
                  ₦{bursaryData.collectedFees.toFixed(2)} of ₦{bursaryData.totalFees.toFixed(2)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-700">{bursaryData.studentCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Fee Collection</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-700">
                  ₦{(bursaryData.collectedFees / bursaryData.studentCount).toFixed(2)}
                </div>
                <p className="text-xs text-emerald-600 mt-2">Per student</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-emerald-500" />
            <Input 
              placeholder="Search students..." 
              value={searchTerm} 
              onChange={(e) => handleSearch(e.target.value)}
              className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-emerald-500 text-white hover:bg-emerald-600">Generate Report</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Generate Financial Report</DialogTitle>
                  <DialogDescription>
                    Select the type of report you want to generate.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button className="w-full justify-start" onClick={() => alert('Generating Daily Report...')}>
                    <FileText className="mr-2 h-4 w-4" />
                    Daily Report
                  </Button>
                  <Button className="w-full justify-start" onClick={() => alert('Generating Weekly Report...')}>
                    <FileText className="mr-2 h-4 w-4" />
                    Weekly Report
                  </Button>
                  <Button className="w-full justify-start" onClick={() => alert('Generating Monthly Report...')}>
                    <FileText className="mr-2 h-4 w-4" />
                    Monthly Report
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="transactions" className="space-y-4">
            <TabsList className="bg-emerald-100">
              <TabsTrigger value="transactions" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">Recent Transactions</TabsTrigger>
              <TabsTrigger value="studentStatus" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">Student Fee Status</TabsTrigger>
              <TabsTrigger value="pendingInvoices" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">Pending Invoices</TabsTrigger>
            </TabsList>
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest fee payments received</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bursaryData.recentTransactions.map(transaction => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.studentId}</TableCell>
                          <TableCell>{transaction.name}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{transaction.method}</TableCell>
                          <TableCell className="text-right font-medium text-emerald-700">₦{transaction.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="studentStatus">
              <Card>
                <CardHeader>
                  <CardTitle>Student Fee Status</CardTitle>
                  <CardDescription>Overview of student fee payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Total Fees</TableHead>
                        <TableHead>Paid Fees</TableHead>
                        <TableHead>Last Payment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bursaryData.studentFeeStatus.map(student => (
                        <TableRow key={student.id}>
                          <TableCell>{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.course}</TableCell>
                          <TableCell>{student.year}</TableCell>
                          <TableCell>₦{student.totalFees.toFixed(2)}</TableCell>
                          <TableCell>₦{student.paidFees.toFixed(2)}</TableCell>
                          <TableCell>{student.lastPaymentDate}</TableCell>
                          <TableCell>
                            <span className={student.paidFees >= student.totalFees ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                              {student.paidFees >= student.totalFees ? "Paid" : "Pending"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  className="bg-emerald-500 text-white hover:bg-emerald-600"
                                  onClick={() => setSelectedStudent(student)}
                                >
                                  Record Payment
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Record Payment for {selectedStudent?.name}</DialogTitle>
                                  <DialogDescription>
                                    Enter the payment amount for this student.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="amount" className="text-right">
                                      Amount
                                    </Label>
                                    <Input
                                      id="amount"
                                      type="number"
                                      value={paymentAmount}
                                      onChange={(e) => setPaymentAmount(e.target.value)}
                                      className="col-span-3"
                                    />
                                  </div>
                                </div>
                                <Button onClick={handlePayment} className="bg-emerald-500 text-white hover:bg-emerald-600">
                                  Process Payment
                                </Button>
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
            <TabsContent  value="pendingInvoices">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Invoices</CardTitle>
                  <CardDescription>Invoices that are due for payment</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bursaryData.pendingInvoices.map(invoice => (
                        <TableRow key={invoice.id}>
                          <TableCell>{invoice.id}</TableCell>
                          <TableCell>{invoice.studentId}</TableCell>
                          <TableCell>{invoice.name}</TableCell>
                          <TableCell>₦{invoice.amount.toFixed(2)}</TableCell>
                          <TableCell>{invoice.dueDate}</TableCell>
                          <TableCell>
                            <span className="text-yellow-500 font-medium flex items-center">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              Pending
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button 
                              className="bg-emerald-500 text-white hover:bg-emerald-600"
                              onClick={() => alert(`Sending reminder for invoice ₦{invoice.id}`)}
                            >
                              Send Reminder
                            </Button>
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