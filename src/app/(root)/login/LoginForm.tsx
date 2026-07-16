"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { loginSchema, type LoginValues } from "@/lib/validations/auth";
import { DEMO_CREDENTIALS } from "@/config/demo";
import { useToast } from "@/store/toast";
import { GoogleButton } from "@/components/auth/GoogleButton";

const INPUT_CLASS =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const addToast = useToast((s) => s.addToast);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginValues) {
    setServerError(null);
    const { error } = await signIn.email({
      email: values.email,
      password: values.password,
    });
    if (error) {
      setServerError(error.message ?? "Invalid email or password.");
      return;
    }
    addToast("Logged in successfully");
    router.push(redirect);
    router.refresh();
  }

  function fillDemo() {
    setValue("email", DEMO_CREDENTIALS.email, { shouldValidate: true });
    setValue("password", DEMO_CREDENTIALS.password, { shouldValidate: true });
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Log in to your Threadloom account.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={cn(INPUT_CLASS, "mt-1.5")}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              className={cn(INPUT_CLASS, "mt-1.5 pr-10")}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {serverError && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(buttonVariants({ size: "lg" }), "w-full")}
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>

        <button
          type="button"
          onClick={fillDemo}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}
        >
          Fill Demo Credentials
        </button>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <GoogleButton callbackURL={redirect} />
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href={`/register${redirect !== "/" ? `?redirect=${redirect}` : ""}`}
          className="font-medium text-foreground underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
