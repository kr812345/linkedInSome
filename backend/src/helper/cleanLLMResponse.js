import { profileSchema } from "../public/schemas/profileSchema.js";

export const cleanLLMResponse = (llmResponse) => {
    try {
        // Find JSON block using regex to ignore AI "chatter" before/after
        const jsonMatch = llmResponse.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No JSON found in LLM response");
        
        const jsonContent = jsonMatch[0];
        const jsonLLMResponse = JSON.parse(jsonContent);
        
        return profileSchema.parse(jsonLLMResponse);
    } catch (error) {
        console.error("[Parsing Error]:", error.message);
        return { error: true, message: error.message };
    }
}