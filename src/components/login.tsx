import VantaBirdBackground from "./vanta-bird-background";
import Link from "next/link";
import { UserAuthForm } from "./form/user-auth-form";
import { LoginDialog } from "./form/login-dialog";
import { Button } from "./ui/button";

const Login = () => {
  return (
    <div className="grid grid-cols-2">
      <VantaBirdBackground className="flex justify-center items-center">
        <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M22 3L12 13M22 3L15 21L11 15L5 11L22 3Z" />
              <path d="M2 21L5 11" />
            </svg>
            Jarb Team
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;A great hotel management system is like a bird in
                graceful flight. It requires skill, flexibility, and a
                bird's-eye view to make guests' stays smooth and
                memorable.&rdquo;
              </p>
              <footer className="text-sm">- Jarb Team</footer>
            </blockquote>
          </div>
        </div>
      </VantaBirdBackground>

      <div className="mx-auto bg-white flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className={"absolute right-4 top-4 md:right-8 md:top-8"}>
          <LoginDialog>
            <Button>Log In</Button>
          </LoginDialog>
        </div>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
