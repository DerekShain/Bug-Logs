export class Note {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.bugId = data.bugId
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}
