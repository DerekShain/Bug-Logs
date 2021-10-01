import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
class BugsService {
  async getBugs(query) {
    const bugs = await dbContext.Bugs.find(query).populate('creator', 'name picture')
    return bugs
  }

  async getBugById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('Invalid Bug Id')
    }
    return bug
  }

  async createBug(id) {
    const bug = await dbContext.Bugs.create(id)
    return bug
  }

  async getBugNoteById(id) {
    const notes = await dbContext.Notes.find({ id }.sort('-note').populate('creator', 'name picture'))
    return notes
  }

  async getTrackedBugsById(id) {
    const tracked = await dbContext.TrackedBugs.find({ id }.sort('-tracked').populate('creator', 'name picture'))
    return tracked
  }

  async editBug(id, userId, bugData) {
    const bug = await this.getBugById(id)
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden('Not Authorized')
    }
    bug.title = bugData.title || bug.title
    bug.description = bugData.description || bug.description
    bug.creator = bugData.creatorId || bug.creator
    bug.priority = bugData.priority || bug.priority
    bug.closed = bugData.closed || bug.closed
    bug.closedDate = bugData.closedDate || bug.closedDate
    await bug.save()
    return bug
  }

  async deleteBug(id, userId) {
    const bug = await this.getBugById(id)
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden('not Authorized')
    }
    await bug.remove()
    return bug
  }

  async getBugsByAccount(accountId) {
    const bugs = await dbContext.TrackedBugs.find({ accountId: accountId }).sort('-tracked').populate('bug')
    return bugs
  }
}

export const bugsService = new BugsService()
