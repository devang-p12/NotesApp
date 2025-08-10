import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CreatableReactSelect from "react-select/creatable"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Link, useNavigate } from "react-router-dom"
import { FormEvent, useRef, useState } from "react"
import { NoteData, Tag } from "@/App"
import { v4 as uuidV4 } from "uuid"

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<NoteData>

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = []
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags
    })

    navigate("..")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 w-full"
    >
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Title
        </Label>
        <Input
          id="title"
          required
          ref={titleRef}
          defaultValue={title}
          placeholder="Enter note title"
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags" className="text-sm font-medium">
          Tags
        </Label>
        <CreatableReactSelect
          className="react-select-container"
          classNamePrefix="react-select"
          onCreateOption={(label) => {
            const newTag = { id: uuidV4(), label }
            onAddTag(newTag)
            setSelectedTags((prev) => [...prev, newTag])
          }}
          value={selectedTags.map((tag) => ({
            label: tag.label,
            value: tag.id
          }))}
          options={availableTags.map((tag) => ({
            label: tag.label,
            value: tag.id
          }))}
          onChange={(tags) => {
            setSelectedTags(
              tags.map((tag) => ({
                label: tag.label,
                id: tag.value
              }))
            )
          }}
          isMulti
        />
      </div>

      {/* Body */}
      <div className="space-y-2">
        <Label htmlFor="markdown" className="text-sm font-medium">
          Body
        </Label>
        <Textarea
          id="markdown"
          required
          rows={15}
          ref={markdownRef}
          defaultValue={markdown}
          placeholder="Write your note here..."
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <Button type="submit" size="lg">
          Save
        </Button>
        <Link to="..">
          <Button type="button" variant="outline" size="lg">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  )
}
