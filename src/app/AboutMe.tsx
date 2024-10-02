import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AboutMeModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">About Me</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>About Me</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 pt-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/avatar-placeholder.png" alt="Student" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Student Name</h2>
            <p className="text-gray-500">Final Year Student at SAZU University</p>
          </div>
          <div className="w-full space-y-2">
            <p><strong>Department:</strong> Computer Science</p>
            <p><strong>Student ID:</strong> #########</p>
            <p><strong>Expected Graduation:</strong> Oct 2024</p>
            <p><strong>Final Year Project:</strong> Development of a Student Fee Management System</p>
            <p className="mt-4">
              As a final year student at SAZU University, I'm passionate about leveraging technology 
              to solve real-world problems. My project aims to streamline the fee payment process 
              for students, making it more efficient and user-friendly.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}