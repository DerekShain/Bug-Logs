import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { bugsService } from '../services/BugsService'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      // NOTE vv added this for many to many?
      .get('/trackedbugs', this.getTrackedBugs)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  // NOTE added this for many to many?
  async getTrackedBugs(req, res, next) {
    try {
      const tracked = await bugsService.getBugsByAccount(req.userInfo.id)
      res.send(tracked)
    } catch (error) {
      next('getTrackedBugs Error', error)
    }
  }
}
