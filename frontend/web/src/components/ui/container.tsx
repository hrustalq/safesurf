import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-xl px-4", className)}
      {...props}
    />
  );
} 