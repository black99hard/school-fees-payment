/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Transaction {
  id: number
  type: 'topup' | 'payment'
  amount: number
  date: string
  description: string
}

export default function TransactionHistoryComponent() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Simulated API call to fetch transaction history
    setTransactions([
      { id: 1, type: 'topup', amount: 1000, date: '2023-08-01', description: 'Wallet top-up' },
      { id: 2, type: 'payment', amount: 5000, date: '2023-08-15', description: 'Tuition Fee payment' },
      { id: 3, type: 'payment', amount: 100, date: '2023-08-20', description: 'Library Fee payment' },
      { id: 4, type: 'topup', amount: 500, date: '2023-08-25', description: 'Wallet top-up' },
    ])
  }, [])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map(transaction => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.type === 'topup' ? 'Top-up' : 'Payment'}</TableCell>
            <TableCell>₦{transaction.amount.toFixed(2)}</TableCell>
            <TableCell>{transaction.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}