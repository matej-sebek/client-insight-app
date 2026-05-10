/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useMemo, useState } from "react"
import type { FormEvent } from "react"
import { createClient, deleteClient, getClients } from "@/api/clientApi"
import { createInsight, deleteInsight, getInsightsByClient } from "@/api/insightApi"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { AppLayout } from "@/layouts/AppLayout"
import type { Client, ClientDtoIn } from "@/types/client"
import type { Insight, InsightDtoIn } from "@/types/insight"

const emptyClientForm: ClientDtoIn = {
  name: "",
  industry: "",
  web: "",
  note: "",
}

const emptyInsightForm: InsightDtoIn = {
  title: "",
  description: "",
  category: "",
}

const insightCategories = ["Produkt", "Obchod", "Podpora", "Cena", "Marketing", "Konkurence"]

function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null) {
    const responseError = error as { message?: unknown; details?: unknown; unsupportedKeyList?: unknown }

    if (Array.isArray(responseError.details) && responseError.details.length > 0) {
      return responseError.details.join(" ")
    }

    if (
      Array.isArray(responseError.unsupportedKeyList) &&
      responseError.unsupportedKeyList.length > 0
    ) {
      return `Nepodporované položky: ${responseError.unsupportedKeyList.join(", ")}`
    }

    if (responseError.message) {
      return String(responseError.message)
    }
  }

  return "Akci se nepodařilo dokončit."
}

function App() {
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClientId, setSelectedClientId] = useState("")
  const [insights, setInsights] = useState<Insight[]>([])
  const [clientForm, setClientForm] = useState<ClientDtoIn>(emptyClientForm)
  const [insightForm, setInsightForm] = useState<InsightDtoIn>(emptyInsightForm)
  const [categoryFilter, setCategoryFilter] = useState("")
  const [searchFilter, setSearchFilter] = useState("")
  const [isLoadingClients, setIsLoadingClients] = useState(false)
  const [isLoadingInsights, setIsLoadingInsights] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const selectedClient = useMemo(
    () => clients.find((client) => client.id === selectedClientId) || null,
    [clients, selectedClientId]
  )

  const categoryTabs = ["", ...insightCategories]

  const loadClients = useCallback(async function loadClients() {
    setIsLoadingClients(true)
    setErrorMessage("")

    try {
      const loadedClients = await getClients()
      setClients(loadedClients)
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    } finally {
      setIsLoadingClients(false)
    }
  }, [])

  const loadInsights = useCallback(async function loadInsights(clientId: string) {
    setIsLoadingInsights(true)
    setErrorMessage("")

    try {
      const loadedInsights = await getInsightsByClient(clientId, {
        category: categoryFilter.trim() || undefined,
        search: searchFilter.trim() || undefined,
      })
      setInsights(loadedInsights)
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    } finally {
      setIsLoadingInsights(false)
    }
  }, [categoryFilter, searchFilter])

  useEffect(() => {
    void loadClients()
  }, [loadClients])

  useEffect(() => {
    if (!selectedClientId) {
      return
    }

    void loadInsights(selectedClientId)
  }, [selectedClientId, loadInsights])

  async function handleCreateClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage("")

    try {
      const createdClient = await createClient(clientForm)
      setClients((currentClients) => [...currentClients, createdClient])
      setSelectedClientId(createdClient.id)
      setClientForm(emptyClientForm)
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    }
  }

  async function handleDeleteClient(id: string) {
    setErrorMessage("")

    try {
      await deleteClient(id)
      const remainingClients = clients.filter((client) => client.id !== id)
      setClients(remainingClients)
      if (selectedClientId === id) {
        setSelectedClientId("")
        setInsights([])
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    }
  }

  async function handleCreateInsight(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!selectedClientId) {
      setErrorMessage("Nejprve vyberte klienta.")
      return
    }

    setErrorMessage("")

    try {
      const createdInsight = await createInsight(selectedClientId, insightForm)
      setInsights((currentInsights) => [createdInsight, ...currentInsights])
      setInsightForm(emptyInsightForm)
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    }
  }

  async function handleDeleteInsight(id: string) {
    setErrorMessage("")

    try {
      await deleteInsight(id)
      setInsights((currentInsights) => currentInsights.filter((insight) => insight.id !== id))
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    }
  }

  return (
    <AppLayout>
      {errorMessage ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errorMessage}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <section className="grid gap-6" aria-labelledby="clients-title">
          <Card>
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle id="clients-title">Klienti</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Seznam klientů uložených v backendu.
                </p>
              </div>
              <Button type="button" variant="outline" onClick={() => void loadClients()}>
                Obnovit
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Název</TableHead>
                    <TableHead>Obor</TableHead>
                    <TableHead>Web</TableHead>
                    <TableHead>Akce</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow
                      key={client.id}
                      className={client.id === selectedClientId ? "bg-muted/70" : undefined}
                    >
                      <TableCell>
                        <button
                          type="button"
                          className="text-left font-medium hover:underline"
                          onClick={() => {
                            setSelectedClientId(client.id)
                            setInsightForm(emptyInsightForm)
                          }}
                        >
                          {client.name}
                        </button>
                      </TableCell>
                      <TableCell>{client.industry || "Neuvedeno"}</TableCell>
                      <TableCell>
                        {client.web ? (
                          <a
                            className="text-primary hover:underline"
                            href={client.web}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {client.web}
                          </a>
                        ) : (
                          "Neuvedeno"
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => void handleDeleteClient(client.id)}
                        >
                          Smazat
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {!clients.length ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-muted-foreground">
                        {isLoadingClients ? "Načítám klienty..." : "Zatím není uložený žádný klient."}
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detail klienta</CardTitle>
              <p className="text-sm text-muted-foreground">
                Vybraný klient a jeho poznatky.
              </p>
            </CardHeader>
            <CardContent className="grid gap-4">
              {selectedClient ? (
                <>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium" htmlFor="client-select">
                        Vybraný klient
                      </label>
                      <Select>
                        <SelectTrigger
                          id="client-select"
                          value={selectedClientId}
                          onChange={(event) => {
                            setSelectedClientId(event.target.value)
                            setInsightForm(emptyInsightForm)
                          }}
                        >
                          <SelectValue placeholder="Vyberte klienta" />
                          <SelectContent>
                            {clients.map((client) => (
                              <SelectItem key={client.id} value={client.id}>
                                {client.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectTrigger>
                      </Select>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-semibold tracking-normal">{selectedClient.name}</h2>
                        {selectedClient.industry ? (
                          <Badge variant="secondary">{selectedClient.industry}</Badge>
                        ) : null}
                      </div>
                      {selectedClient.note ? (
                        <p className="mt-2 text-sm text-muted-foreground">{selectedClient.note}</p>
                      ) : null}
                    </div>

                    <div className="grid gap-3">
                      <Input
                        value={searchFilter}
                        onChange={(event) => setSearchFilter(event.target.value)}
                        placeholder="Hledat v poznatcích"
                      />
                      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Kategorie poznatků">
                        {categoryTabs.map((category) => (
                          <Button
                            key={category || "all"}
                            type="button"
                            size="sm"
                            variant={categoryFilter === category ? "default" : "outline"}
                            onClick={() => setCategoryFilter(category)}
                          >
                            {category || "Všechny"}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Název</TableHead>
                          <TableHead>Kategorie</TableHead>
                          <TableHead>Popis</TableHead>
                          <TableHead>Akce</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {insights.map((insight) => (
                          <TableRow key={insight.id}>
                            <TableCell className="font-medium">{insight.title}</TableCell>
                            <TableCell>
                              <Badge>{insight.category}</Badge>
                            </TableCell>
                            <TableCell>{insight.description}</TableCell>
                            <TableCell>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => void handleDeleteInsight(insight.id)}
                              >
                                Smazat
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        {!insights.length ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-muted-foreground">
                              {isLoadingInsights
                                ? "Načítám poznatky..."
                                : "Pro vybraného klienta zatím nejsou uložené žádné poznatky."}
                            </TableCell>
                          </TableRow>
                        ) : null}
                      </TableBody>
                    </Table>
                  </div>
                </>
              ) : (
                <div className="grid gap-3">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="client-select-empty">
                      Vyberte klienta
                    </label>
                    <Select>
                      <SelectTrigger
                        id="client-select-empty"
                        value={selectedClientId}
                        onChange={(event) => setSelectedClientId(event.target.value)}
                        disabled={!clients.length}
                      >
                        <SelectValue placeholder="Vyberte klienta" />
                        <SelectContent>
                          {clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                  </div>
                  <p className="rounded-lg border p-4 text-sm text-muted-foreground">
                    {clients.length
                      ? "Vyberte klienta ze seznamu."
                      : "Nejprve vytvořte klienta."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <aside className="grid content-start gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Vytvoření klienta</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={handleCreateClient}>
                <Input
                  required
                  value={clientForm.name}
                  onChange={(event) =>
                    setClientForm((currentForm) => ({ ...currentForm, name: event.target.value }))
                  }
                  placeholder="Název klienta"
                />
                <Input
                  value={clientForm.industry}
                  onChange={(event) =>
                    setClientForm((currentForm) => ({
                      ...currentForm,
                      industry: event.target.value,
                    }))
                  }
                  placeholder="Obor"
                />
                <Input
                  value={clientForm.web}
                  onChange={(event) =>
                    setClientForm((currentForm) => ({ ...currentForm, web: event.target.value }))
                  }
                  type="url"
                  placeholder="Web, např. https://example.com"
                />
                <Textarea
                  value={clientForm.note}
                  onChange={(event) =>
                    setClientForm((currentForm) => ({ ...currentForm, note: event.target.value }))
                  }
                  placeholder="Poznámka"
                />
                <Button type="submit">Uložit klienta</Button>
              </form>
            </CardContent>
          </Card>

{selectedClient ? (
            <Card>
              <CardHeader>
                <CardTitle>Vytvoření poznatku</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Poznatek se uloží ke klientovi {selectedClient.name}.
                </p>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={handleCreateInsight}>
                  <Input
                    required
                    value={insightForm.title}
                    onChange={(event) =>
                      setInsightForm((currentForm) => ({ ...currentForm, title: event.target.value }))
                    }
                    placeholder="Název poznatku"
                  />
                  <Select>
                    <SelectTrigger
                      required
                      value={insightForm.category}
                      onChange={(event) =>
                        setInsightForm((currentForm) => ({
                          ...currentForm,
                          category: event.target.value,
                        }))
                      }
                    >
                      <SelectValue placeholder="Vyberte kategorii" />
                      <SelectContent>
                        {insightCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                  <Textarea
                    required
                    value={insightForm.description}
                    onChange={(event) =>
                      setInsightForm((currentForm) => ({
                        ...currentForm,
                        description: event.target.value,
                      }))
                    }
                    placeholder="Popis"
                  />
                  <Button type="submit">Uložit poznatek</Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Poznatek</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Pro vytvoření poznatku nejprve vyberte klienta ze seznamu.
                </p>
              </CardHeader>
            </Card>
          )}
        </aside>
      </div>
    </AppLayout>
  )
}

export default App
