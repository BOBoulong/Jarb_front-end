import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/api";
import { useState } from "react";

interface SignInDialogProps {
  email: string;
}

export function SignInDialog({ email }: SignInDialogProps) {

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
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign In with Email</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="emil" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue={email}
              className="col-span-3"
              onChange={(event) => setEmailToSend(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="col-span-3"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={submit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
