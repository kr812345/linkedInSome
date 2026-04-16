import { create } from "zustand";
import { llmResponseStore } from "../Types/types.Store";

const useLLMResponseStore = create<llmResponseStore>((set: Function)=>({
    data: {
        message: "Your new linkedin profile will appear here."
    },
    setData: (data: object) => set({data: {...data}})
}))

export { useLLMResponseStore };