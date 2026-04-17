import { cleanLLMResponse } from "./cleanLLMResponse.js";
import feedToLLM from "./chooseLLM.js";

export const handleRetries = async (
  llmResponse,
  prompt,
  text,
  goal,
  llm,
  retries,
  delay,
) => {

  try {
    while (retries > 0) {
      const finalResponse = cleanLLMResponse(llmResponse);
      
      if (!finalResponse.error) return finalResponse;
    }
  } catch (error) {
    if (retries <= 0) {
        return json("Please try again there is some error.");
    }
    
    console.log(retries);

    await new Promise(res => setTimeout (res, delay));

    const nextResponse = await feedToLLM({
      systemPrompt: prompt,
      userData: { text, goal: goal, error: error.message },
      llm,
    });

    return await handleRetries(nextResponse, prompt, text, goal, llm, retries - 1, delay);
  }
};
