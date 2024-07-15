import { User } from "@clerk/nextjs/server";
import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  clerkUserId: {
    type: String,
    required: true,
  },
  profilePic: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

if(mongoose.models && mongoose.models["users"])
{
  delete mongoose.models['users']
}

const UserModel = mongoose.model("users", userSchema);
export default UserModel;