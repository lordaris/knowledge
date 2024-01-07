import mongoose from "mongoose";

const { Schema } = mongoose;

// TODO: Add the progress field to the Schema
// TODO: Add the preferences field to the Schema

const Users = new Schema({
  clerkUserId: { type: String, required: true },
  email: { type: String },
  name: { type: String },
});

const UsersModel = mongoose.models.Users || mongoose.model("Users", Users);
export default UsersModel;
