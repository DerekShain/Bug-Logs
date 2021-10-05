export class TrackedBug {
  constructor(data) {
    this.creatorId = data.creatorId
    this.bugId = data.bugId
    this.accountId = data.accountId
    this.id = data.id
    this.tracker = data.tracker
    this.bug = data.bug
  }
}
