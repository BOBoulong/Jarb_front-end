'use client'
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { LoginDialog } from "./login-dialog";
import { useAuth } from "@/api";

interface SignUpDialogProps {
  children: React.ReactNode
  email?: string
}

export const SignUpDialog: React.FC<SignUpDialogProps> = ({
  children,
  email
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('')
  const [emailToSend, setEmailToSend] = useState('')
  const [password, setPassword] = useState('')

  const { login, apiClient } = useAuth();

  const submit = async () => {
    await apiClient.post('/auth/register', {
        name, gmail: emailToSend, password
    })

    await login(name, password)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="text-2xl">Sign Up</DialogTitle>
            <DialogDescription>
            Enter your information to create an account
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                type="name"
                placeholder="test you jonh"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                defaultValue={email}
                onChange={(event) => setEmailToSend(event.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" onChange={(event) => setPassword(event.target.value)} />
            </div>

          </div>

          <DialogFooter className="grid grid-cols-1 gap-5 relative">
            <Button type="submit" className="w-full" onClick={submit}>
              Create an account
            </Button>
            <Button variant="outline" className="w-full" type="button">
              Sign up with Google
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="#" className="underline">
                <LoginDialog>
                  <span>Sign in</span>
                </LoginDialog>
              </Link>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
