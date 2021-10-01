import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getBugs)
      .get('/:id', this.getBug)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .get('/:id/notes', this.bugNote)
      .get('/:id/trackedbugs', this.trackedBugs)
      .put('/:id', this.editBug)
      // NOTE this needs to be a soft delete.
      .delete('/:id', this.deleteBug)
  }

  async getBugs(req, res, next) {
    try {
      const bugs = await bugsService.getBugs(req.query)
      res.send(bugs)
    } catch (error) {
      next(error)
      logger.error('getBugs Controller Error', error)
    }
  }

  async getBug(req, res, next) {
    try {
      const bug = await bugsService.getBugById(req.params.id)
      res.send(bug)
    } catch (error) {
      next(error)
      logger.error('getBug Controller Error', error)
    }
  }

  async createBug(req, res, next) {
    try {
      logger.log('User, createBug', req.userInfo)
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.createBug(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
      logger.error('create bug controller error', error)
    }
  }

  async bugNote(req, res, next) {
    try {
      const bugNote = await bugsService.getBugNoteById(req.params.id)
      res.send(bugNote)
    } catch (error) {
      next(error)
      logger.error('bugnote controller error', error)
    }
  }

  async trackedBugs(req, res, next) {
    try {
      const trackedBugs = await bugsService.getTrackedBugsById(req.params.id)
      res.send(trackedBugs)
    } catch (error) {
      next(error)
      logger.error('trackedBugs controller Error', error)
    }
  }

  async editBug(req, res, next) {
    try {
      const editBug = await bugsService.editBug(req.params.id, req.userInfo.id, req.body)
      res.send(editBug)
    } catch (error) {
      next(error)
      logger.error('editBug Error', error)
    }
  }

  async deleteBug(req, res, next) {
    try {
      const bug = await bugsService.deleteBug(req.params.id, req.userInfo.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}
