import mongoose from "mongoose";

const { Schema } = mongoose;

// TODO: Add the "isActive" boolean field
// TODO: Consider creating a progress field to track the progress of the student.

const Enrollment = new Schema({
  clerkUserId: { type: String, required: true },
  courses: [
    {
      courseId: { type: Schema.Types.ObjectId, ref: "Courses" },
      enrollmentDate: { type: Date, default: Date.now },
    },
  ],
});

const EnrollmentModel =
  mongoose.models.Enrollment || mongoose.model("Enrollment", Enrollment);

export default EnrollmentModel;
