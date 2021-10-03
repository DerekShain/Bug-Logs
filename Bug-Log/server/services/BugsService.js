import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
class BugsService {
  async getBugs(query) {
    const bugs = await dbContext.Bugs.find(query).sort('-createdAt').populate('creator', 'name picture')
    return bugs
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('Invalid Bug Id')
    }
    return bug
  }

  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator', 'name picture')
    return bug
  }

  async getBugNoteById(bugId) {
    const notes = await dbContext.Notes.find({ bugId }).populate('creator', 'name picture')
    return notes
  }

  async getTrackedBugsById(id) {
    const tracked = await dbContext.TrackedBugs.find({ bugId: id }).populate('tracker').populate('bug')
    return tracked
  }

  async getBugsByAccount(accountId) {
    const bugs = await dbContext.TrackedBugs.find({ accountId }).populate('tracker').populate('bug')
    return bugs
  }

  async editBug(bugId, userId, bugData) {
    const bug = await this.getBugById(bugId)
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden('Not Authorized')
    }
    if (bug.closed === true) {
      throw new BadRequest('Bug Not Found')
    }
    bug.title = bugData.title || bug.title
    bug.description = bugData.description || bug.description
    bug.priority = bugData.priority || bug.priority
    bug.creatorId = bugData.creatorId || bug.creatorId
    await bug.save()
    return bug
  }

  async deleteBug(bugId, userId) {
    const bug = await this.getBugById(bugId)
    if (bug.closed === true) {
      return
    }
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden('not Authorized')
    }
    bug.closed = true
    await bug.save()
    return bug
  }
}

export const bugsService = new BugsService()
