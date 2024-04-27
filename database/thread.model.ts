import { Document, model, models, Schema } from "mongoose";

export interface IThread extends Document {
  text: string;
  author: Schema.Types.ObjectId;
  community: Schema.Types.ObjectId;
  createdAt: Date;
  parentId: string;
  children: Schema.Types.ObjectId[];
  upVotes: Schema.Types.ObjectId[];
}

const threadSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  upVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Thread = models.Thread || model("Thread", threadSchema);

export default Thread;