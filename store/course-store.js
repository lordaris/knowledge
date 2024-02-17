import { create } from "zustand";

const useCourseStore = create((set) => ({
  courses: [],
  allCourses: [],
  singleCourse: {},
  lessons: [],
  singleLesson: {},
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
  loadAllCourses: async () => {
    try {
      const response = await fetch(`/api/courses`);
      if (response.ok) {
        const data = await response.json();
        set({ allCourses: data.data });
      }
    } catch (error) {
      console.log(error);
    }
  },
  loadSingleCourse: async (courseId) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`);
      if (response.ok) {
        const data = await response.json();
        set({ singleCourse: data.data || {} });
      }
    } catch (error) {
      console.log(error);
    }
  },
  loadSingleLesson: async (lessonId) => {
    try {
      const response = await fetch(`/api/courses/lessons/${lessonId}`);
      if (response.ok) {
        const data = await response.json();
        set({ singleLesson: data.data || {} });
      }
    } catch (error) {
      console.error(error);
    }
  },

  loadSections: async (courseId) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`);
      if (!response.ok) throw new Error("Failed to load sections");
      const result = await response.json();
      const sections = result.data.sections || []; // Extract sections from response
      set((state) => ({
        singleCourse: { ...state.singleCourse, sections },
      }));
    } catch (error) {
      console.error(error);
    }
  },

  loadLessons: async (sectionId) => {
    try {
      const response = await fetch(
        `/api/courses/sections/${sectionId}/lessons`,
      );
      if (!response.ok) throw new Error("Failed to fetch lessons");
      const data = await response.json();
      set((state) => ({
        singleCourse: {
          ...state.singleCourse,
          sections: state.singleCourse.sections.map((section) =>
            section._id === sectionId ? { ...section, lessons: data } : section,
          ),
        },
      }));
    } catch (error) {
      console.error(error);
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

  addSection: async (courseId, newSection) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/sections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSection),
      });
      if (response.ok) {
        const data = await response.json();
        set((state) => ({
          singleCourse: {
            ...state.singleCourse,
            sections: [...state.singleCourse.sections, data.data],
          },
        }));
      } else {
        throw new Error("Failed to create section");
      }
    } catch (error) {
      console.error(error);
    }
  },

  addLesson: async (sectionId, newLesson) => {
    try {
      const response = await fetch(
        `/api/courses/sections/${sectionId}/lessons`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newLesson),
        },
      );
      if (response.ok) {
        const data = await response.json();
        set((state) => ({
          singleCourse: {
            ...state.singleCourse,
            sections: state.singleCourse.sections.map((section) =>
              section._id === sectionId
                ? { ...section, lessons: [...section.lessons, data.data] }
                : section,
            ),
          },
        }));
      } else {
        throw new Error("Failed to create lesson");
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

  updateCourse: async (courseId, updatedCourse) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCourse),
      });
      if (response.ok) {
        const data = await response.json();
        set((state) => ({
          courses: state.courses.map((course) =>
            course._id === courseId ? data.data : course,
          ),
        }));
      } else {
        throw new Error("Failed to update course");
      }
    } catch (error) {
      console.error(error);
    }
  },

  updateSection: async (courseId, sectionId, updatedSection) => {
    try {
      const response = await fetch(
        `/api/courses/${courseId}/sections/${sectionId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedSection),
        },
      );
      if (response.ok) {
        const data = await response.json();
        set((state) => ({
          singleCourse: {
            ...state.singleCourse,
            sections: state.singleCourse.sections.map((section) =>
              section._id === sectionId
                ? { ...section, ...data.data, lessons: section.lessons } // Ensure lessons are preserved or merged from response
                : section,
            ),
          },
        }));
      } else {
        throw new Error("Failed to update section");
      }
    } catch (error) {
      console.error(error);
    }
  },

  deleteSection: async (courseId, sectionId) => {
    try {
      const response = await fetch(
        `/api/courses/${courseId}/sections/${sectionId}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) throw new Error("Failed to delete section");

      set((state) => ({
        singleCourse: {
          ...state.singleCourse,
          sections: state.singleCourse.sections.filter(
            (section) => section._id !== sectionId,
          ),
        },
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useCourseStore;
