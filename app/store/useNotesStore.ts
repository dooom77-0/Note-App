import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  favorite: boolean;
  deleted: boolean;
};

type NotesState = {
  notes: Note[];
  addNote: (data: { title: string; content: string }) => void;
};

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],

      // دالة الإضافة (title + content)
      addNote: ({ title, content }) =>
        set((state) => ({
          notes: [
            ...state.notes,
            {
              id: Date.now().toString(),
              title,
              content,
              createdAt: new Date().toISOString(),
              favorite: false,
              deleted: false,
            },
          ],
        })),
    }),
    {
      name: "notes-storage", // التخزين التلقائي
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
