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
  let currentRetries = retries;
  let currentResponse = llmResponse;

  while (currentRetries >= 0) {
    try {
      const finalResponse = cleanLLMResponse(currentResponse);
      
      // If parsing is successful and no schema error, return it
      if (!finalResponse.error) return finalResponse;
      
      console.warn(`[Retry ${retries - currentRetries + 1}] Parsing failed: ${finalResponse.message}`);
    } catch (error) {
      console.error(`[Retry ${retries - currentRetries + 1}] Unexpected Error:`, error.message);
    }

    if (currentRetries === 0) break;

    currentRetries--;
    console.log(`Retrying... (${currentRetries} attempts left)`);
    await new Promise(res => setTimeout(res, delay));

    currentResponse = await feedToLLM({
      systemPrompt: prompt,
      userData: { text, goal, error: "Previous response was invalid JSON or failed schema validation." },
      llm,
    });
  }

  throw new Error("Failed to get a valid response from AI after multiple attempts.");
};
