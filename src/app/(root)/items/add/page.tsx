import type { Metadata } from "next";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AddProductForm } from "./AddProductForm";

export const metadata: Metadata = {
  title: "Add Item",
};

export default function AddItemPage() {
  return (
    <ProtectedRoute>
      <AddProductForm />
    </ProtectedRoute>
  );
}
