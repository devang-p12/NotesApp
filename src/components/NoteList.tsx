import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import ReactSelect from "react-select"
import { Tag } from "@/App"
import { useMemo, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

type SimplifiedNote = {
  tags: Tag[]
  title: string
  id: string
}

type NoteListProps = {
  availableTags: Tag[]
  notes: SimplifiedNote[]
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
}

export function NoteList({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag
}: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState("")
  const [editTagsModalOpen, setEditTagsModalOpen] = useState(false)

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every(tag =>
            note.tags.some(noteTag => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, notes])

  return (
    <div className="m-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Notes</h1>
        <div className="flex gap-3">
          <Link to="/new">
            <Button variant="default">Create</Button>
          </Link>
          <Button variant="secondary" onClick={() => setEditTagsModalOpen(true)}>
            Edit Tags
          </Button>
        </div>
      </div>

      {/* Filters */}
      <form className="flex gap-6 mb-8 flex-wrap">
        <div className="flex flex-col gap-2 min-w-[200px]">
          <Label>Title</Label>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Search by title..."
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2 min-w-[250px]">
          <Label>Tags</Label>
          <ReactSelect
            value={selectedTags.map(tag => ({
              label: tag.label,
              value: tag.id
            }))}
            options={availableTags.map(tag => ({
              label: tag.label,
              value: tag.id
            }))}
            onChange={tags => {
              setSelectedTags(
                tags.map(tag => ({
                  label: tag.label,
                  id: tag.value
                }))
              )
            }}
            isMulti
          />
        </div>
      </form>

      {/* Notes list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map(note => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            tags={note.tags}
          />
        ))}
      </div>

      {/* Edit Tags Modal */}
      <EditTagsModal
        open={editTagsModalOpen}
        onOpenChange={setEditTagsModalOpen}
        availableTags={availableTags}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
    </div>
  )
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Link
      to={`/${id}`}
      className="block no-underline text-foreground hover:opacity-80 transition"
    >
      <Card className="h-full shadow-md hover:shadow-lg transition">
        <CardContent className="p-5">
          <div className="font-semibold text-lg mb-3">{title}</div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span
                  key={tag.id}
                  className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full"
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

function EditTagsModal({
  open,
  onOpenChange,
  availableTags,
  onDeleteTag,
  onUpdateTag
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  availableTags: Tag[]
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Tags</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {availableTags.map(tag => (
            <div key={tag.id} className="flex items-center gap-3">
              <Input
                type="text"
                value={tag.label}
                onChange={e => onUpdateTag(tag.id, e.target.value)}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => onDeleteTag(tag.id)}
              >
                &times;
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
