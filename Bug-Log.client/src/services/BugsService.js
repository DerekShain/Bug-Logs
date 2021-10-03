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
    const res = await api.put('api/bugs', bug)
    AppState.bugs = new Bug(res.data)
  }

  async deleteBug(bugId) {
    await api.delete('api/bugs/' + bugId)
    AppState.bugs = AppState.bugs.filter(b => b.id !== bugId)
  }
}
export const bugsService = new BugsService()
