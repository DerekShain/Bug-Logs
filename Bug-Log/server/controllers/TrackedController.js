import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'
import { trackedService } from '../services/TrackedService'
export class TrackedController extends BaseController {
  constructor() {
    super('api/trackedbugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTracked)
      .delete('/:trackedId', this.deleteTracked)
  }

  async createTracked(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      res.send(await trackedService.createTrackedBug(req.body))
    } catch (error) {
      next(error)
      logger.error('create tracked controller error', error)
    }
  }

  async deleteTracked(req, res, next) {
    try {
      const tracked = await trackedService.deleteTrackedBug(req.userInfo.id, req.params.trackedId)
      res.send(tracked)
    } catch (error) {
      next(error)
      logger.error('deleteNote controller error', error)
    }
  }
}
