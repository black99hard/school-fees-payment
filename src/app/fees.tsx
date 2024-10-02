/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Fee {
  id: number
  name: string
  amount: number
  dueDate: string
}

interface FeesComponentProps {
  walletBalance: number
  onPayFee: (amount: number) => void
}

const universities = [
  "SAZU",
  "ATBU",
  "University of Lagos",
  "University of Ibadan",
  "Ahmadu Bello University",
  "University of Nigeria",
  "Obafemi Awolowo University",
  "University of Benin",
  "University of Ilorin",
  "University of Port Harcourt"
]

export default function FeesComponent({ walletBalance, onPayFee }: FeesComponentProps) {
  const [fees, setFees] = useState<Fee[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedUniversity, setSelectedUniversity] = useState<string>(universities[0])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortBy, setSortBy] = useState<'name' | 'amount' | 'dueDate'>('dueDate')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    // Simulated API call to fetch fees based on selected university
    setIsLoading(true)
    setTimeout(() => {
      setFees([
        { id: 1, name: 'Tuition Fee', amount: 5000, dueDate: '2023-09-01' },
        { id: 2, name: 'Library Fee', amount: 100, dueDate: '2023-09-15' },
        { id: 3, name: 'Lab Fee', amount: 200, dueDate: '2023-09-30' },
        { id: 4, name: 'Sports Fee', amount: 150, dueDate: '2023-10-15' },
        { id: 5, name: 'Technology Fee', amount: 300, dueDate: '2023-10-30' },
      ])
      setIsLoading(false)
    }, 1000)
  }, [selectedUniversity])

  const handlePayFee = async (fee: Fee) => {
    if (walletBalance < fee.amount) {
      alert('Insufficient balance. Please top up your wallet.')
      return
    }

    setIsLoading(true)
    // Simulated API call for paying fee
    await new Promise(resolve => setTimeout(resolve, 1000))
    setFees(prevFees => prevFees.filter(f => f.id !== fee.id))
    onPayFee(fee.amount)
    alert(`Successfully paid ${fee.name} (₦${fee.amount.toFixed(2)}) for ${selectedUniversity}`)
    setIsLoading(false)
  }

  const filteredFees = fees.filter(fee =>
    fee.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedFees = [...filteredFees].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1
    if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const toggleSort = (column: 'name' | 'amount' | 'dueDate') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const totalFees = fees.reduce((sum, fee) => sum + fee.amount, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>University Fees</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select onValueChange={setSelectedUniversity} defaultValue={selectedUniversity}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a university" />
          </SelectTrigger>
          <SelectContent>
            {universities.map((uni) => (
              <SelectItem key={uni} value={uni}>{uni}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Search fees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="text-sm text-gray-500">
          Total fees: ₦{totalFees.toFixed(2)}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => toggleSort('name')} className="cursor-pointer">
                Fee Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead onClick={() => toggleSort('amount')} className="cursor-pointer">
                Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead onClick={() => toggleSort('dueDate')} className="cursor-pointer">
                Due Date {sortBy === 'dueDate' && (sortOrder === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">Loading fees...</TableCell>
              </TableRow>
            ) : sortedFees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">No fees found</TableCell>
              </TableRow>
            ) : (
              sortedFees.map(fee => (
                <TableRow key={fee.id}>
                  <TableCell>{fee.name}</TableCell>
                  <TableCell>₦{fee.amount.toFixed(2)}</TableCell>
                  <TableCell>{fee.dueDate}</TableCell>
                  <TableCell>
                    <Button onClick={() => handlePayFee(fee)} disabled={isLoading || walletBalance < fee.amount}>
                      Pay
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}