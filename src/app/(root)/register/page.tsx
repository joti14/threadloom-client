import { Suspense } from "react";
import type { Metadata } from "next";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <RegisterForm />
    </Suspense>
  );
}
