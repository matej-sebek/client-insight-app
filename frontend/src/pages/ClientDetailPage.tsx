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

export function ClientDetailPage() {
  return (
    <section className="grid gap-4" aria-labelledby="client-detail-title">
      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle id="client-detail-title">Detail klienta</CardTitle>
            <p className="text-sm text-muted-foreground">
              Placeholder pro detail klienta a jeho poznatky.
            </p>
          </div>
          <Button>Pridat poznatek</Button>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input placeholder="Vyhledat v poznatcich" />
            <Select>
              <SelectTrigger defaultValue="">
                <SelectValue placeholder="Kategorie" />
                <SelectContent>
                  <SelectItem value="obchod">Obchod</SelectItem>
                  <SelectItem value="produkt">Produkt</SelectItem>
                  <SelectItem value="podpora">Podpora</SelectItem>
                </SelectContent>
              </SelectTrigger>
            </Select>
          </div>
          <div className="rounded-md border p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-medium">Ukazkovy poznatek</h3>
              <Badge>Produkt</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Zde bude seznam poznatku filtrovany podle kategorie a hledani.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
