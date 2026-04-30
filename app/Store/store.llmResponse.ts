import { create } from "zustand";
import { llmResponseStore } from "../Types/types.Store";

const useLLMResponseStore = create<llmResponseStore>((set) => ({
    data: {
        message: "Your new linkedin profile will appear here."
    },
    setData: (data) => set({ data })
}))

export { useLLMResponseStore };