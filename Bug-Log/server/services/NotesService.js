import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { bugsService } from './BugsService'
class NotesService {
  async createNote(noteId) {
    await bugsService.getBugById(noteId.bugId)
    const note = await dbContext.Notes.create(noteId)
    await note.populate('creator', 'name picture')
    return note
  }

  async deleteNote(noteId, userId) {
    const note = await dbContext.Notes.findById(noteId)
    if (userId !== note.creatorId.toString()) {
      throw new Forbidden('not allowed')
    }
    await note.remove()
    return note
  }

  async getNoteById(noteId) {
    const note = await dbContext.Notes.findById(noteId).populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('Invalid Note Id')
    }
    return note
  }
}

export const notesService = new NotesService()
