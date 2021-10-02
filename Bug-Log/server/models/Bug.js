import { Schema } from 'mongoose'

export const BugSchema = new Schema(
  {
    closed: { type: Boolean, default: 0, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    priority: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
    closedDate: { type: Date },
    markDeleted: { type: Boolean }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

BugSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
