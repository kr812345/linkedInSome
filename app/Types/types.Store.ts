
type llmResponseStore = {
    data: object | string | null,
    setData: (data: object | string | null) => void;
}

export type { llmResponseStore };