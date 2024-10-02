/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import WalletComponent from './wallet'
import FeesComponent from './fees'
import LoginComponent from './login'
import TransactionHistoryComponent from './transaction-history'
import { BookOpen, GraduationCap, User } from 'lucide-react'
import AboutMeModal from './AboutMe'
export default function DashboardPage() {
  const [walletBalance, setWalletBalance] = useState(1000)
  const [topUpAmount, setTopUpAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('opay')
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [accountNumber, setAccountNumber] = useState('')

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (loggedIn) {
      setIsLoggedIn(loggedIn)
    } else {
      setIsLoggedIn(false)
    }

    // Fetch initial wallet balance if logged in
  }, [])

  const generateAccountNumber = () => {
    const randomNum = Math.floor(1000000000 + Math.random() * 9000000000)
    return randomNum.toString()
  }

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const method = e.target.value
    setPaymentMethod(method)
    if (method === 'bankTransfer') {
      setAccountNumber(generateAccountNumber())
    } else {
      setAccountNumber('')
    }
  }

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount)
    if (!isNaN(amount) && amount > 0) {
      setWalletBalance(prevBalance => prevBalance + amount)
      setTopUpAmount('')
      if (paymentMethod === 'bankTransfer') {
        alert(`Please transfer ₦${amount} to account number: ${accountNumber}`)
      } else {
        alert(`Successfully topped up ₦${amount} using ${paymentMethod}`)
      }
    } else {
      alert('Please enter a valid amount')
    }
  }

  const handleLogin = () => {
    // Set logged in state in local storage
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
    console.log('Login handled, localStorage updated')
  }

  const handleLogout = () => {
    // Remove logged in state from local storage
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
    setWalletBalance(0)
    console.log('Logout handled, localStorage updated')
  }

  const handlePayFee = (amount: number) => {
    if (amount <= walletBalance) {
      setWalletBalance(prevBalance => prevBalance - amount);
    } else {
      alert("Insufficient balance. Please top up your wallet.");
    }
  };

  if (!isLoggedIn) {
    return <LoginComponent onLogin={handleLogin} />
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <div className="space-x-2">
          <AboutMeModal />
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Welcome, Student</CardTitle>
            <CardDescription>Student Dashboard</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" alt="Student" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Student ID: 12345678</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Course: Computer Science</span>
              </div>
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4" />
                <span>Level: 3rd Year</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Wallet Balance</CardTitle>
            <CardDescription>Top up your wallet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold">₦{walletBalance.toFixed(2)}</div>
            <div className="space-y-2">
              <Label htmlFor="topup">Top Up Amount</Label>
              <div className="flex space-x-2">
                <Input
                  id="topup"
                  placeholder="Enter amount"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                />
                <Button onClick={handleTopUp}>Top Up</Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <select
                id="paymentMethod"
                className="w-full p-2 border rounded"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <option value="opay">OPay</option>
                <option value="chipperCash">Chipper Cash</option>
                <option value="bankTransfer">Bank Transfer</option>
              </select>
            </div>
            {paymentMethod === 'bankTransfer' && accountNumber && (
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number for Transfer</Label>
                <Input
                  id="accountNumber"
                  value={accountNumber}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="fees" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fees">Outstanding Fees</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="wallet">Wallet Details</TabsTrigger>
        </TabsList>
        <TabsContent value="fees">
          <Card>
            <CardHeader>
              <CardTitle>Outstanding Fees</CardTitle>
              <CardDescription>View and pay your school fees</CardDescription>
            </CardHeader>
            <CardContent>
              <FeesComponent walletBalance={walletBalance} onPayFee={handlePayFee} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View your recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionHistoryComponent />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="wallet">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Details</CardTitle>
              <CardDescription>Manage your school fees wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <WalletComponent balance={walletBalance} onTopUp={handleTopUp} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

