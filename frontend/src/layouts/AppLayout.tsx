import type { ReactNode } from "react"

type AppLayoutProps = {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5">
          <p className="text-sm text-muted-foreground">Evidence klientských poznatků</p>
          <h1 className="text-2xl font-semibold tracking-normal">Client Insights Evidence</h1>
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6">{children}</main>
    </div>
  )
}
