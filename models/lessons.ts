import mongoose from "mongoose";

const { Schema } = mongoose;

const Lessons = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const LessonsModel =
  mongoose.models.Lessons || mongoose.model("Lessons", Lessons);
export default LessonsModel;
