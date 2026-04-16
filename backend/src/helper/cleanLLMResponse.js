import { profileSchema } from "../public/schemas/profileSchema.js";

export const cleanLLMResponse = (llmResponse) => {

    // const cleanLLMResponse = llmResponse.replace('```json','').replace('```','');
    const jsonLLMResponse = JSON.parse(cleanLLMResponse);
    const final_llmResponse = profileSchema.parse(jsonLLMResponse);

    return final_llmResponse;
}