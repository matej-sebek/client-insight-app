import { AppLayout } from "@/layouts/AppLayout"
import { ClientDetailPage } from "@/pages/ClientDetailPage"
import { ClientsPage } from "@/pages/ClientsPage"
import { CreateClientPage } from "@/pages/CreateClientPage"
import { CreateInsightPage } from "@/pages/CreateInsightPage"

function App() {
  return (
    <AppLayout>
      <ClientsPage />
      <ClientDetailPage />
      <div className="grid gap-6 lg:grid-cols-2">
        <CreateClientPage />
        <CreateInsightPage />
      </div>
    </AppLayout>
  )
}

export default App
