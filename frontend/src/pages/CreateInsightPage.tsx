import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function CreateInsightPage() {
  return (
    <section aria-labelledby="create-insight-title">
      <Card>
        <CardHeader>
          <CardTitle id="create-insight-title">Vytvoreni poznatku</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <Input placeholder="Nazev poznatku" />
            <Input placeholder="Kategorie" />
            <Textarea placeholder="Popis" />
            <div>
              <Button type="button">Ulozit poznatek</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
