'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'

interface LoginComponentProps {
  onLogin: (username: string) => void
}

// Simulated login function
const loginUser = async (username: string, password: string): Promise<boolean> => {
  // In a real application, this would be an API call to authenticate the user
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, we'll consider any non-empty username and password as valid
      resolve(username.length > 0 && password.length > 0)
    }, 1000)
  })
}

export default function LoginComponent({ onLogin }: LoginComponentProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the credentials
    if (username && password) {
      // Save login info to localStorage
      localStorage.setItem('username', username)
      localStorage.setItem('isLoggedIn', 'true')
      console.log('Login info saved to localStorage')
      onLogin(username)
    } else {
      alert('Please enter both username and password')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Student Login</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}