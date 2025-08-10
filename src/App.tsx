import { Button } from "@/components/ui/button"
import {Navigate, Route, Routes} from "react-router-dom"
import { NewNote } from "./components/NewNote"
import { useLocalStorage } from "./useLocalStorage"
import { useMemo } from "react"
import { v4 as uuidV4} from "uuid"
import { NoteList } from "./components/NoteList"
import { Note } from "./components/Note"
import { NoteLayout } from "./components/NoteLayout"
import { EditNote } from "./components/EditNote"

export type Tag = {
  id: string
  label: string
}

export type RawNote = {
  tagIds: any
  id: string
}& RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type Note = {
  id: string
}& NoteData 

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}



function App() { 
  const [notes,setNotes] = useLocalStorage<RawNote[]>("NOTES",[])
  const [tags,setTags] = useLocalStorage<Tag[]>("TAGS",[])

  const noteWithTags = useMemo(() => {
    return notes.map(note => {
      return ({ ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) })
    })
  },[notes,tags])

  function onCreateNote({tags,...data}: NoteData){
    setNotes(prevNotes => {
      return [...prevNotes,{...data,id: uuidV4(),tagIds: tags.map(tag => tag.id) }]
    })
  }

  function onUpdateNote(id: string , {tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return {...note,...data, tagIds: tags.map(tag => tag.id)}
        } else {
          return note 
        }
      })
    })
  }

  function onDeleteButton(id: string){
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id != id)
    })
  }

  function updateTag(id: string , label: string){
    setTags(prevTags => {
      return prevTags.map(tag => {
        if(tag.id === id){
          return {...tag,label}
        } else {
          return tag
        }
      })
    })

  }

  function deleteTag(id: string){
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id != id)
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev,tag])
  }
  
  return (
    <div className="my-4">
    <Routes>
      <Route path="/" element={<NoteList notes = {noteWithTags} availableTags={tags} onUpdateTag={updateTag} onDeleteTag={deleteTag}/>}/>
      <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag = {addTag} availableTags={tags}/>}/>
      <Route path="/:id" element={<NoteLayout notes={noteWithTags}/>}>
        <Route index element={<Note onDelete = {onDeleteButton} />}/>
        <Route path="edit" element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags}/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
    </div>
  )
}

export default App


