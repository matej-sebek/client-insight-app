import * as React from "react"
import { cn } from "@/lib/utils"

function Select({ children }: { children: React.ReactNode }) {
  return <div data-slot="select">{children}</div>
}

function SelectTrigger({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      data-slot="select-trigger"
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
        className
      )}
      {...props}
    />
  )
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  return (
    <option value="" disabled>
      {placeholder}
    </option>
  )
}

function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <option value={value}>{children}</option>
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
