import * as React from "react"
import { cn } from "@/lib/utils"

function Dialog({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function DialogTrigger({ className, ...props }: React.ComponentProps<"button">) {
  return <button type="button" className={cn(className)} {...props} />
}

function DialogContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-content"
      className={cn("rounded-lg border bg-background p-5 shadow-sm", className)}
      {...props}
    />
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={cn("grid gap-1", className)} {...props} />
}

function DialogTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 data-slot="dialog-title" className={cn("text-lg font-semibold", className)} {...props} />
}

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger }
