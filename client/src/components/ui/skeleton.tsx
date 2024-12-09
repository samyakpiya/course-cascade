import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-primary/10",
        "bg-gray-700",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
