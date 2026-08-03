import { cn } from "@/lib/utils";

/** Page gutter and max-width wrapper. Every section should sit inside one. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("container-gcb", className)}>{children}</div>;
}
