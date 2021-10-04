import { AppState } from '../AppState'
import { TrackedBug } from '../models/TrackedBug'
import { api } from './AxiosService'

class TrackedService {
  async getTrackedBugs() {
    const res = await api.get('api/trackedbugs/')
    AppState.tracked = res.data.map(b => new TrackedBug(b))
  }

  async getTrackedBugById(bugId) {
    const res = await api.get('api/account/trackedbugs')
    AppState.tracked = new TrackedBug(res.data)
  }

  async createTrackedBug(trackedBug) {
    const res = await api.post('api/trackedbugs', trackedBug)
    AppState.tracked.push(new TrackedBug(res.data))
    return res.data.id
  }

  async deleteTrackedBug(bugId) {
    await api.delete('api/trackedbugs/' + bugId)
    AppState.tracked = AppState.tracked.filter(b => b.id !== bugId)
  }
}

export const trackedService = new TrackedService()
