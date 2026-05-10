import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function ClientsPage() {
  return (
    <section aria-labelledby="clients-title">
      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle id="clients-title">Klienti</CardTitle>
            <p className="text-sm text-muted-foreground">Placeholder pro seznam klientu.</p>
          </div>
          <Button>Pridat klienta</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nazev</TableHead>
                <TableHead>Obor</TableHead>
                <TableHead>Web</TableHead>
                <TableHead>Stav</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Ukazkovy klient</TableCell>
                <TableCell>Vzdelavani</TableCell>
                <TableCell>https://example.com</TableCell>
                <TableCell>
                  <Badge variant="secondary">Demo</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  )
}
