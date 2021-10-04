import { AppState } from '../AppState'
import { Note } from '../models/Note'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async getNotes() {
    AppState.notes = []
    const res = await api.get('api/notes')
    AppState.notes = res.data.map(b => new Note(b))
  }

  async getNoteById(noteId, note) {
    // debugger
    const res = await api.get(`api/notes/${noteId}`, note)
    AppState.note = new Note(res.data)
    logger.log('getNoteById', res.data)
  }

  async getNoteByBugId(bugId) {
    const res = await api.get(`api/bugs/${bugId}/notes`)
    AppState.notes = res.data.map(n => new Note(n))
    logger.log('notebybugid', res.data)
  }

  async createNote(note) {
    // debugger
    const res = await api.post('api/notes', note)
    AppState.notes.push(new Note(res.data))
    // this.getNotes(noteId.bug)
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
