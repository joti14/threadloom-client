const STATS = [
  { value: "8", label: "Independent Brands" },
  { value: "5", label: "Product Categories" },
  { value: "4.7★", label: "Average Customer Rating" },
  { value: "30-Day", label: "Hassle-Free Returns" },
] as const;

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-8 rounded-2xl bg-primary px-6 py-10 text-primary-foreground sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-semibold sm:text-4xl">{stat.value}</div>
            <div className="mt-1 text-sm text-primary-foreground/80">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
