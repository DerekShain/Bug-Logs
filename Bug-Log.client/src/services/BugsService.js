import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
import { api } from './AxiosService'

class BugsService {
  async getBugs() {
    const res = await api.get('api/bugs/')
    AppState.bugs = res.data.map(b => new Bug(b))
  }

  async getBugById(bugId) {
    const res = await api.get(`api/bugs/${bugId}`)
    AppState.bug = new Bug(res.data)
  }

  async createBug(bug) {
    const res = await api.post('api/bugs', bug)
    AppState.bugs.push(new Bug(res.data))
    return res.data.id
  }

  async editBug(bug) {
    const res = await api.put(`api/bugs/${bug.id}`, bug)
    AppState.bug = new Bug(res.data)
    return res.data.id
  }

  async deleteBug(bugId) {
    const res = await api.delete('api/bugs/' + bugId)
    AppState.bugs = new Bug(res.data)
    return res.data.id
  }
}
export const bugsService = new BugsService()
