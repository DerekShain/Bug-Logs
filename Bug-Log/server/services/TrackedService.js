import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
class TrackedService {
  async createTrackedBug(data) {
    const tracked = await dbContext.TrackedBugs.find({ bugId: data.bugId }).populate('tracker').populate('bug')
    if (tracked.length === 0) {
      const trackBug = await dbContext.TrackedBugs.create(data)
      await trackBug.populate('tracker')
      await trackBug.populate('bug')
      return trackBug
    } else {
      throw new BadRequest('Bug error')
    }
  }

  async deleteTrackedBug(userId, trackedBugId) {
    const bug = await dbContext.TrackedBugs.findById(trackedBugId)
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
