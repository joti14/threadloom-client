"use client";

import { useForm } from "react-hook-form";
import { Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/store/toast";

const INPUT_CLASS =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

export default function ContactPage() {
  const { register, handleSubmit, reset } = useForm();
  const addToast = useToast((s) => s.addToast);

  const onSubmit = () => {
    addToast("Your message has been sent successfully!");
    reset();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We&apos;d love to hear from you. Reach out with any questions or feedback.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="mt-4 text-muted-foreground">
            Our support team is available to assist you during business hours. Drop us a message, and we&apos;ll get back to you within 24 hours.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="size-5" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">support@threadloom.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Phone className="size-5" />
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </div>
              <div>
                <p className="font-medium">Office</p>
                <p className="text-sm text-muted-foreground">123 Fashion Ave, NY 10012</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input
                id="name"
                required
                className={cn(INPUT_CLASS, "mt-1.5")}
                {...register("name")}
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                required
                className={cn(INPUT_CLASS, "mt-1.5")}
                {...register("email")}
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea
                id="message"
                required
                rows={4}
                className={cn(INPUT_CLASS, "mt-1.5 min-h-[100px] py-3")}
                {...register("message")}
              />
            </div>
            <button type="submit" className={cn(buttonVariants({ size: "lg" }), "w-full mt-2")}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
