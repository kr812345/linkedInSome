import { cleanLLMResponse } from "./cleanLLMResponse.js";
import feedToLLM from './chooseLLM.js';

export const handleRetries = async (llmResponse, improveProfilePrompt, text, goal, llm, retries, delay) => {

    while (retries > 0) {

        const finalResponse = cleanLLMResponse(llmResponse);
        
        if (finalResponse.error) {
            const llmResponse = await feedToLLM({systemPrompt: improveProfilePrompt, userData: {text, goal: data.goal, error: finalResponse.error}, llm});
            const finalResponse = cleanLLMResponse(llmResponse);

            if (finalResponse.error) {
                await new Promise(resolve => setTimeout(resolve, delay));
                handleRetries(llmResponse, improveProfilePrompt, text, goal, llm, retries-1, delay);
            }

            return finalResponse;
        }

        return finalResponse;
    }
}