import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
class TrackedService {
  async createTrackedBug(data) {
    const trackedBugs = await dbContext.TrackedBugs.find({ bugId: data.bugId }).populate('tracker').populate('bug')
    for (let i = 0; i < trackedBugs.length; i++) {
      const check = trackedBugs[i]
      if (check.accountId.toString() === data.accountId) {
        throw new BadRequest('can only track one time')
      }
    }

    const trackBug = await dbContext.TrackedBugs.create(data)
    await trackBug.populate('tracker')
    await trackBug.populate('bug')
    return trackBug
  }

  async deleteTrackedBug(userId, trackedBugId) {
    const bug = await dbContext.TrackedBugs.findOne({ _id: trackedBugId }).populate('tracker').populate('bug')
    const test = bug.accountId.toString()
    if (userId !== bug.accountId.toString()) {
      throw new Forbidden('not allowed')
    }
    await bug.delete()
    return bug
  }

  async getTrackedBugsById(id) {
    const bug = await dbContext.TrackedBugs.find({ bugId: id }).populate('tracker').populate('bug')
    if (!bug) {
      throw new Error('Invalid Bug Id')
    }
    return bug
  }
}
export const trackedService = new TrackedService()
