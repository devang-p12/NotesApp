import { NoteData, Tag } from "@/App"
import { NoteForm } from "./NoteForm"
import { useNote } from "./NoteLayout"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function EditNote({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNoteProps) {
  const note = useNote()

  return (
    <div className="flex justify-center items-start min-h-screen p-8 bg-muted">
      <Card className="w-full max-w-2xl shadow-lg rounded-xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-3xl font-bold">Edit Note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <NoteForm
            title={note.title}
            markdown={note.markdown}
            tags={note.tags}
            onSubmit={(data) => onSubmit(note.id, data)}
            onAddTag={onAddTag}
            availableTags={availableTags}
          />
        </CardContent>
      </Card>
    </div>
  )
}
