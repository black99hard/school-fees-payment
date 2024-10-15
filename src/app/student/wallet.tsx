/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

interface WalletComponentProps {
  balance: number
  onTopUp: (amount: number) => void
}

export default function WalletComponent({ balance, onTopUp }: WalletComponentProps) {
  const [topUpAmount, setTopUpAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleTopUp = async () => {
    const amount = parseFloat(topUpAmount)
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage('Please enter a valid amount')
      return
    }

    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      onTopUp(amount)
      setTopUpAmount('')
      setSuccessMessage(`Successfully topped up ₦${amount.toFixed(2)}`)
    } catch (error) {
      setErrorMessage('An error occurred during top-up. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg">
      <div className="text-3xl font-bold text-center mb-6">Wallet Balance</div>
      <div className="text-4xl font-bold text-center text-primary mb-8">₦{balance.toFixed(2)}</div>
      <div className="space-y-2">
        <Label htmlFor="topup">Top Up Amount</Label>
        <div className="flex space-x-2">
          <Input
            id="topup"
            placeholder="Enter amount"
            value={topUpAmount}
            onChange={(e) => setTopUpAmount(e.target.value)}
            disabled={isLoading}
            className="text-lg"
          />
          <Button onClick={handleTopUp} disabled={isLoading} className="w-24">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Top Up"}
          </Button>
        </div>
      </div>
      {successMessage && (
        <Alert className="bg-green-100 border-green-400 text-green-700">
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <div className="text-sm text-muted-foreground mt-4">
        You can top up your wallet using various payment methods. The balance will be updated after processing.
      </div>
    </div>
  )
}