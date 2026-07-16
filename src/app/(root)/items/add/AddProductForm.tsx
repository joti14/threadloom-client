"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/config/categories";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { useToast } from "@/store/toast";
import {
  addProductSchema,
  toProductPayload,
  type AddProductValues,
} from "@/lib/validations/product";

const INPUT_CLASS =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive";
const TEXTAREA_CLASS =
  "w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-destructive">{message}</p>;
}

export function AddProductForm() {
  const router = useRouter();
  const createProduct = useCreateProduct();
  const addToast = useToast((s) => s.addToast);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddProductValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: "",
      brand: "",
      shortDescription: "",
      description: "",
      subCategory: "",
      price: "",
      stock: "",
      sizes: "",
      colors: "",
      images: "",
    },
  });

  async function onSubmit(values: AddProductValues) {
    const product = await createProduct.mutateAsync(toProductPayload(values));
    addToast(`"${product.title}" added`);
    router.push("/items/manage");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold">Add a Product</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        List a new item in your Threadloom store.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
        <div>
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            className={cn(INPUT_CLASS, "mt-1.5")}
            aria-invalid={!!errors.title}
            {...register("title")}
          />
          <FieldError message={errors.title?.message} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="brand" className="text-sm font-medium">
              Brand
            </label>
            <input
              id="brand"
              className={cn(INPUT_CLASS, "mt-1.5")}
              aria-invalid={!!errors.brand}
              {...register("brand")}
            />
            <FieldError message={errors.brand?.message} />
          </div>

          <div>
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              className={cn(INPUT_CLASS, "mt-1.5")}
              aria-invalid={!!errors.category}
              defaultValue=""
              {...register("category")}
            >
              <option value="" disabled>
                Select a category
              </option>
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <FieldError message={errors.category?.message} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="price" className="text-sm font-medium">
              Price (USD)
            </label>
            <input
              id="price"
              inputMode="decimal"
              className={cn(INPUT_CLASS, "mt-1.5")}
              aria-invalid={!!errors.price}
              {...register("price")}
            />
            <FieldError message={errors.price?.message} />
          </div>

          <div>
            <label htmlFor="stock" className="text-sm font-medium">
              Stock
            </label>
            <input
              id="stock"
              inputMode="numeric"
              placeholder="0"
              className={cn(INPUT_CLASS, "mt-1.5")}
              aria-invalid={!!errors.stock}
              {...register("stock")}
            />
            <FieldError message={errors.stock?.message} />
          </div>

          <div>
            <label htmlFor="subCategory" className="text-sm font-medium">
              Type <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              id="subCategory"
              placeholder="e.g. jackets"
              className={cn(INPUT_CLASS, "mt-1.5")}
              {...register("subCategory")}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="sizes" className="text-sm font-medium">
              Sizes <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              id="sizes"
              placeholder="S, M, L, XL"
              className={cn(INPUT_CLASS, "mt-1.5")}
              {...register("sizes")}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Comma-separated.
            </p>
          </div>

          <div>
            <label htmlFor="colors" className="text-sm font-medium">
              Colors <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              id="colors"
              placeholder="Black, Olive"
              className={cn(INPUT_CLASS, "mt-1.5")}
              {...register("colors")}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Comma-separated.
            </p>
          </div>
        </div>

        <div>
          <label htmlFor="shortDescription" className="text-sm font-medium">
            Short description
          </label>
          <textarea
            id="shortDescription"
            rows={2}
            className={cn(TEXTAREA_CLASS, "mt-1.5")}
            aria-invalid={!!errors.shortDescription}
            {...register("shortDescription")}
          />
          <FieldError message={errors.shortDescription?.message} />
        </div>

        <div>
          <label htmlFor="description" className="text-sm font-medium">
            Full description
          </label>
          <textarea
            id="description"
            rows={5}
            className={cn(TEXTAREA_CLASS, "mt-1.5")}
            aria-invalid={!!errors.description}
            {...register("description")}
          />
          <FieldError message={errors.description?.message} />
        </div>

        <div>
          <label htmlFor="images" className="text-sm font-medium">
            Image URLs
          </label>
          <textarea
            id="images"
            rows={2}
            placeholder="https://example.com/a.jpg, https://example.com/b.jpg"
            className={cn(TEXTAREA_CLASS, "mt-1.5")}
            aria-invalid={!!errors.images}
            {...register("images")}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Comma-separated. At least one is required.
          </p>
          <FieldError message={errors.images?.message} />
        </div>

        {createProduct.isError && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {isAxiosError(createProduct.error) &&
            createProduct.error.response?.data?.error
              ? createProduct.error.response.data.error
              : "Couldn't add the product. Please try again."}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
        >
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
