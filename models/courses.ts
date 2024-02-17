import mongoose from "mongoose";
import { categories } from "@/utils/constants/categories";
const { Schema } = mongoose;

const Courses = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: categories, required: true },
  sections: [{ type: Schema.Types.ObjectId, ref: "Sections" }],
  createdBy: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

const CoursesModel =
  mongoose.models.Courses || mongoose.model("Courses", Courses);
export default CoursesModel;
