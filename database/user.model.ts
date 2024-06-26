import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  threads: Schema.Types.ObjectId[];
  onboarded: boolean;
  communities: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
}

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  threads: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
  // followers: [{ string , ref: "User" } ],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" } ],
  // followers: [{ type: String, ref: "User" }]
});

const User = models.User || model("User", userSchema);

export default User;