import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const signUpForm = z.object({
  email: z.string().email(),
  companyName: z.string(),
  managerName: z.string(),
  phone: z.string(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  async function handleSignUp(data: SignUpForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("New company register successfully", {
        action: {
          label: "Sign in",
          onClick: () => navigate("/signin"),
        },
      });
    } catch (error) {
      toast.error("An error occurred, please try again later");
    }
  }

  return (
    <>
      <Helmet title="Sign Up" />
      <div className="p-8">
        <Button variant={"ghost"} asChild className="absolute right-8 top-8">
          <Link to="/signin">Already have account? Sign In</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create account
            </h1>
            <p className="text-sm text-muted-foreground">
              Become a partner and follow up your orders
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                type="text"
                {...register("companyName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Manager Name">Manager Name</Label>
              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" {...register("phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Your email</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Complete registration
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              By creating an account, you are agreeing to our{" "}
              <Link className="underline underline-offset-4" to="/terms">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="underline underline-offset-4" to="/privacy">
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
