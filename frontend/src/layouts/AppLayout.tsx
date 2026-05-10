import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"

type AppLayoutProps = {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Evidence klientskych poznatku</p>
            <h1 className="text-2xl font-semibold tracking-normal">Client Insights Evidence</h1>
          </div>
          <nav className="flex flex-wrap gap-2" aria-label="Hlavni navigace">
            <Button variant="outline">Klienti</Button>
            <Button>Novy klient</Button>
          </nav>
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6">{children}</main>
    </div>
  )
}
