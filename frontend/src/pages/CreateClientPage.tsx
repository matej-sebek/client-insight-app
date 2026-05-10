import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function CreateClientPage() {
  return (
    <section aria-labelledby="create-client-title">
      <Card>
        <CardHeader>
          <CardTitle id="create-client-title">Vytvoreni klienta</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <Input placeholder="Nazev klienta" />
            <Input placeholder="Obor" />
            <Input placeholder="Web" />
            <Textarea placeholder="Poznamka" />
            <div>
              <Button type="button">Ulozit klienta</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
