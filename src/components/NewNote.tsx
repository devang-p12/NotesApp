import { NoteData, Tag } from "@/App"
import { NoteForm } from "./NoteForm"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
  return (
    <div className="flex justify-center items-start min-h-screen p-8 bg-muted">
      <Card className="w-full max-w-2xl shadow-lg rounded-xl border border-border">
        <CardHeader className="pb-4 space-y-2">
          <CardTitle className="text-3xl font-bold">Create a New Note</CardTitle>
          <CardDescription className="text-muted-foreground">
            Fill in the details below to add a new note.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <NoteForm
              onSubmit={onSubmit}
              onAddTag={onAddTag}
              availableTags={availableTags}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
