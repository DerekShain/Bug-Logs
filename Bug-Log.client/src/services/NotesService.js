import { AppState } from '../AppState'
import { Note } from '../models/Note'
import { api } from './AxiosService'

class NotesService {
  async getNotes() {
    const res = await api.get('api/notes/')
    AppState.notes = res.data.map(b => new Note(b))
  }

  async getNoteById(bugId, noteId) {
    const res = await api.get(`api/bugs/${bugId}/notes/${noteId}`)
    AppState.note = new Note(res.data)
  }

  async getNoteByBugId(bugId, noteId) {
    const res = await api.get(`api/bugs/${bugId}/notes/${noteId}`)
    AppState.note = new Note(res.data)
  }

  async createNote(note) {
    const res = await api.post('api/notes', note)
    AppState.notes.push(new Note(res.data))
    return res.data.id
  }

  async editNote(note) {
    const res = await api.put('api/notes', note)
    AppState.notes = new Note(res.data)
  }

  async deleteNote(noteId) {
    await api.delete('api/notes/' + noteId)
    AppState.notes = AppState.notes.filter(b => b.id !== noteId)
  }
}
export const notesService = new NotesService()
