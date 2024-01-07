import mongoose from "mongoose";

const { Schema } = mongoose;

const Sections = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  lessons: [{ type: Schema.Types.ObjectId, ref: "Lessons" }],
});

const SectionsModel =
  mongoose.models.Sections || mongoose.model("Sections", Sections);
export default SectionsModel;
