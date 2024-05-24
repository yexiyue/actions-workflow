import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

type MySkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  loading?: boolean;
};

export const MySkeleton = ({
  loading,
  className,
  children,
  ...props
}: MySkeletonProps) => {
  return loading ? (
    <Skeleton className={cn("w-full h-6", className)} {...props} />
  ) : (
    children
  );
};
