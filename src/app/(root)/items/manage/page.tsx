import type { Metadata } from "next";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ManageItems } from "./ManageItems";

export const metadata: Metadata = {
  title: "Manage Items",
};

export default function ManageItemsPage() {
  return (
    <ProtectedRoute>
      <ManageItems />
    </ProtectedRoute>
  );
}
