import { AppState } from '../AppState'
import { TrackedBug } from '../models/TrackedBug'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TrackedService {
  async getTrackedBugs() {
    const res = await api.get('api/trackedbugs')
    AppState.trackers = res.data.map(b => new TrackedBug(b))
  }

  async getTrackersByBugId(bugId) {
    const res = await api.get(`api/bugs/${bugId}/trackedbugs`)
    AppState.trackers = res.data.map(t => new TrackedBug(t))
  }

  async getTrackedBugById() {
    const res = await api.get('account/trackedbugs')
    AppState.trackers = res.data
  }

  async createTrackedBug(id) {
    const res = await api.post('api/trackedbugs', { bugId: id })
    AppState.trackers.push(new TrackedBug(res.data))
    return res.data.id
  }

  async deleteTrackedBug(id) {
    const res = await api.delete('api/trackedbugs/' + id)
    const trackedBugs = AppState.trackers.filter(b => b.accountId !== res.data.accountId)
    AppState.trackers = trackedBugs
    return res.data.id
  }
}

export const trackedService = new TrackedService()
