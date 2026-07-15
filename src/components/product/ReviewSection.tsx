"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { isAxiosError } from "axios";
import { Star } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useReviews, useCreateReview } from "@/hooks/useReviews";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-brand">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("size-4", i < rating ? "fill-brand" : "fill-none")} />
      ))}
    </div>
  );
}

export function ReviewSection({ productId }: { productId: string }) {
  const { data: session } = useSession();
  const { data: reviews, isLoading } = useReviews(productId);
  const createReview = useCreateReview(productId);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    createReview.mutate(
      { rating, comment },
      { onSuccess: () => setComment("") }
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Reviews</h2>

      {isLoading ? (
        <p className="mt-4 text-sm text-muted-foreground">Loading reviews...</p>
      ) : reviews && reviews.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {reviews.map((r) => (
            <li key={r._id} className="rounded-xl border border-border p-4">
              <div className="flex items-center gap-2">
                <Stars rating={r.rating} />
                <span className="text-sm font-medium">{r.userName}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          No reviews yet. Be the first to review this product.
        </p>
      )}

      <div className="mt-6 border-t border-border pt-6">
        {session ? (
          <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-3">
            <label htmlFor="review-rating" className="text-sm font-medium">
              Your rating
            </label>
            <select
              id="review-rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="h-10 w-32 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} Star{n === 1 ? "" : "s"}
                </option>
              ))}
            </select>

            <label htmlFor="review-comment" className="text-sm font-medium">
              Your review
            </label>
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts on this product..."
              required
              rows={3}
              className="rounded-lg border border-input bg-background p-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            />

            <button
              type="submit"
              disabled={createReview.isPending}
              className={cn(buttonVariants({ size: "sm" }), "self-start")}
            >
              {createReview.isPending ? "Submitting..." : "Submit Review"}
            </button>

            {createReview.isError && (
              <p className="text-sm text-destructive">
                {isAxiosError(createReview.error) && createReview.error.response?.data?.error
                  ? createReview.error.response.data.error
                  : "Couldn't submit your review. Please try again."}
              </p>
            )}
          </form>
        ) : (
          <p className="text-sm text-muted-foreground">
            <Link href="/login" className="font-medium text-foreground underline">
              Log in
            </Link>{" "}
            to leave a review.
          </p>
        )}
      </div>
    </div>
  );
}
