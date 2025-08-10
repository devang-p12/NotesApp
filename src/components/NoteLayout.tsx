import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Note } from "../App"
import { Card, CardContent } from "./ui/card"

type NoteLayoutProps = {
  notes: Note[]
}

export function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams()
  const note = notes.find((n) => n.id === id)

  if (note == null) {
    return (
      <div className="flex justify-center items-center min-h-screen p-8 bg-muted">
        <Card className="w-full max-w-lg shadow-lg rounded-xl">
          <CardContent className="text-center py-8 text-lg font-semibold">
            Note not found.
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex justify-center min-h-screen p-6 bg-muted">
      <div className="w-full max-w-4xl">
        <Outlet context={note} />
      </div>
    </div>
  )
}

export function useNote() {
  return useOutletContext<Note>()
}
