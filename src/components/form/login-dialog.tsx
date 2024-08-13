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
import Link from "next/link";
import { SignUpDialog } from "./sign-up-dialog";
import { Icons } from "../icons";

interface LoginDialogProps {
  children: React.ReactNode
}

export const LoginDialog: React.FC<LoginDialogProps> = ({
  children
}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const { login } = useAuth();

  const submit = async () => {
    await login(name, password);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Login</DialogTitle>
          <DialogDescription>
            Enter your email below to login to your account
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-5">
          <div>
            <Label htmlFor="Name" className="pb-2">
              Name
            </Label>
            <Input
              id="Name"
              type="Name"
              placeholder="m@example.com"
              required
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <div className="flex items-center pb-2">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              className="col-span-3"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="grid grid-cols-1 gap-5">
          <Button type="submit" className="w-full" onClick={submit}>
            Login
          </Button>
          <Button variant="outline" className="w-full">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              <SignUpDialog>
                <span>Sign up</span>
              </SignUpDialog>
            </Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
