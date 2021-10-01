import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
class NotesService {
  async createNote(id) {
    const note = await dbContext.Notes.create(id)
    return note
  }

  async deleteNote(id, userId) {
    const note = await this.getNoteById(id)
    if (userId !== note.creatorId.toString()) {
      throw new Forbidden('not allowed')
    }
    await note.remove()
    return note
  }

  async getNoteById(id) {
    const note = await dbContext.Notes.findById(id).populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('Invalid Note Id')
    }
    return note
  }
}

export const notesService = new NotesService()
