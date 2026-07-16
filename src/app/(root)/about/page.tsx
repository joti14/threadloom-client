import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">About Threadloom</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          We are redefining the fashion marketplace, bringing together style, sustainability, and seamless shopping experiences.
        </p>
      </div>

      <div className="mt-16 grid gap-12 sm:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            At Threadloom, our mission is to empower both buyers and sellers by creating a platform that is intuitive, secure, and inspiring. We believe fashion should be accessible, diverse, and sustainable.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Our Vision</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We envision a world where anyone can effortlessly discover unique fashion pieces, support independent creators, and contribute to a more sustainable, circular economy.
          </p>
        </div>
      </div>

      <div className="mt-16 rounded-3xl bg-muted p-8 sm:p-12 text-center">
        <h2 className="text-2xl font-semibold">Join the Community</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Whether you&apos;re here to find your next favorite outfit or to share your own creations with the world, Threadloom is your destination.
        </p>
      </div>
    </div>
  );
}
