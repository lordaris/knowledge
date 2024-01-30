import { create } from "zustand";

const useSectionStore = create((set) => ({
  sectionsByCourse: {},
  isLoading: false,
  error: null,

  loadSections: async (courseId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/courses/${courseId}`);
      if (!response.ok) throw new Error("Failed to load sections");
      const result = await response.json();
      const sections = result.data.sections || []; // Extract sections from response
      set((state) => ({
        sectionsByCourse: { ...state.sectionsByCourse, [courseId]: sections },
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },

  addSection: async (courseId, section) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/sections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(section),
      });
      if (!response.ok) throw new Error("Failed to add section");
      const newSection = await response.json();
      set((state) => ({
        sectionsByCourse: {
          ...state.sectionsByCourse,
          [courseId]: [...(state.sectionsByCourse[courseId] || []), newSection],
        },
      }));
    } catch (error) {
      set({ error: error.message });
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
        sections: state.sections.filter((section) => section._id !== sectionId),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateSection: async (courseId, sectionId, section) => {
    try {
      const response = await fetch(
        `/api/courses/${courseId}/sections/${sectionId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(section),
        },
      );
      if (!response.ok) throw new Error("Failed to update section");
      const updatedSection = await response.json();
      set((state) => ({
        sections: state.sections.map((section) => {
          if (section._id === sectionId) return updatedSection;
          return section;
        }),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export default useSectionStore;
