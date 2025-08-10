import { Link, useNavigate } from "react-router-dom"
import { useNote } from "./NoteLayout"
import { Button } from "./ui/button"
import ReactMarkdown from "react-markdown"

type NoteProps = {
  onDelete: (id: string) => void
}

export function Note({ onDelete }: NoteProps) {
  const note = useNote()
  const navigate = useNavigate()

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6 bg-background rounded-xl shadow-lg">
      {/* Title & Tags */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold break-words">{note.title}</h1>

        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-secondary text-secondary-foreground px-3 py-1 text-sm rounded-full"
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link to={`/${note.id}/edit`}>
          <Button variant="default" size="lg">
            Edit
          </Button>
        </Link>
        <Button
          variant="destructive"
          size="lg"
          onClick={() => {
            onDelete(note.id)
            navigate("/")
          }}
        >
          Delete
        </Button>
        <Link to="/">
          <Button variant="outline" size="lg">
            Back
          </Button>
        </Link>
      </div>

      {/* Markdown Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
      </div>
    </div>
  )
}
