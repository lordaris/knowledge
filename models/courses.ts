import mongoose from "mongoose";

const { Schema } = mongoose;

// TODO: Add the "isActive" boolean field
// TODO: Add a "createdBy" field to store the user ID

const Courses = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  sections: [{ type: Schema.Types.ObjectId, ref: "Sections" }],
});

const CoursesModel =
  mongoose.models.Courses || mongoose.model("Courses", Courses);
export default CoursesModel;
