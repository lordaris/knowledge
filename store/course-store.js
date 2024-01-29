import { create } from "zustand";

const useCourseStore = create((set) => ({
  courses: [],
  setCourses: (courses) => set({ courses }),
  loadCourses: async (userId) => {
    try {
      const response = await fetch(`/api/courses/instructor/${userId}`);
      if (response.ok) {
        const data = await response.json();
        set({ courses: data.data });
      }
    } catch (error) {
      console.log(error);
    }
  },
  addCourse: async (newCourse) => {
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });
      if (response.ok) {
        const data = await response.json();
        set((state) => ({ courses: [...state.courses, data.data] }));
      } else {
        throw new Error("Failed to create course");
      }
    } catch (error) {
      console.error(error);
    }
  },

  deleteCourse: async (courseId) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        set((state) => ({
          courses: state.courses.filter((course) => course._id !== courseId),
        }));
      }
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useCourseStore;
