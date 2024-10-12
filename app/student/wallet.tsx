/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'

interface WalletComponentProps {
  balance: number
  onTopUp: (amount: number) => void
}

export default function WalletComponent({ balance, onTopUp }: WalletComponentProps) {
  const [topUpAmount, setTopUpAmount] = useState('')

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount)
    if (!isNaN(amount) && amount > 0) {
      onTopUp(amount)
      setTopUpAmount('')
    } else {
      alert('Please enter a valid amount')
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold">Current Balance: ₦{balance.toFixed(2)}</div>
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
      <div className="text-sm text-muted-foreground">
        You can top up your wallet using various payment methods. The balance will be updated instantly.
      </div>
    </div>
  )
}