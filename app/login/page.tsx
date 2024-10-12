'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GraduationCap, Wallet, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

type Role = 'Student' | 'Bursary' | 'HOD';

const roles: { name: Role; icon: React.ElementType; description: string }[] = [
  { name: 'Student', icon: GraduationCap, description: 'Access fee payment and wallet' },
  { name: 'Bursary', icon: Wallet, description: 'Manage financial records' },
  { name: 'HOD', icon: Users, description: 'Oversee department activities' },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<Role>('Student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        role: selectedRole,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        console.error(result.error);
      } else if (result?.ok) {
        // Redirect based on user role
        switch (selectedRole) {
          case 'Student':
            router.push('/student/dashboard');
            break;
          case 'Bursary':
            router.push('/bursary/dashboard');
            break;
          case 'HOD':
            router.push('/department-head/dashboard');
            break;
          default:
            router.push('/');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-emerald-600 p-4">
      <Card className="w-full max-w-lg bg-white/90 backdrop-blur-sm shadow-2xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold mb-2 text-emerald-700">Welcome Back</CardTitle>
          <CardDescription className="text-emerald-600">Sign in to access the School Management System</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="role-select" className="text-emerald-700 font-semibold">Select your role</Label>
              <RadioGroup
                defaultValue="Student"
                onValueChange={(value) => setSelectedRole(value as Role)}
                className="grid grid-cols-3 gap-4"
              >
                {roles.map((role) => (
                  <Label
                    key={role.name}
                    htmlFor={role.name}
                    className="flex flex-col items-center space-y-2 cursor-pointer"
                  >
                    <RadioGroupItem value={role.name} id={role.name} className="sr-only" />
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-lg ${
                        selectedRole === role.name
                          ? 'bg-emerald-100 border-2 border-emerald-500'
                          : 'bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <role.icon className={`h-8 w-8 mb-2 ${selectedRole === role.name ? 'text-emerald-500' : 'text-emerald-400'}`} />
                      <span className="font-medium text-sm text-emerald-700">{role.name}</span>
                      <p className="text-xs text-emerald-600 mt-1">{role.description}</p>
                    </motion.div>
                  </Label>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-emerald-700">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-emerald-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
              Sign In
            </Button>
          </form>
          <p className="text-center text-sm text-emerald-600 mt-6">
            Need help? Contact the IT support team.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}