import { create } from "zustand";
import { llmResponseStore } from "../Types/types.Store";

const useLLMResponseStore = create<llmResponseStore>((set: Function)=>({
    data: {
        message: "Your new linkedin profile will be here very soon."
    },
    setData: (data: object) => set({data: {...data}})
}))

export { useLLMResponseStore };