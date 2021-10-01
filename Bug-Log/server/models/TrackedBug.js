import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TrackedBugSchema = new Schema(
  {
    bugId: { type: Schema.Types.ObjectId, ref: 'Bug', required: true },
    accountId: { type: Schema.Types.ObjectId, ref: 'Tracker', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TrackedBugSchema.virtual('tracker', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

TrackedBugSchema.virtual('bug', {
  localField: 'bugId',
  foreignField: '_id',
  ref: 'Bug',
  justOne: true
})
