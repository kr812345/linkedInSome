import { cleanLLMResponse } from "./cleanLLMResponse.js";
import feedToLLM from "./chooseLLM.js";

export const handleRetries = async (
  llmResponse,
  improveProfilePrompt,
  text,
  goal,
  llm,
  retries,
  delay,
) => {

  try {
    while (retries > 0) {
      const finalResponse = cleanLLMResponse(llmResponse);

      return finalResponse;
    }

    if (retries <= 0) {
        return json("Please try again there is some error.");
    }
  } catch (error) {
    const llmResponse = await feedToLLM({
      systemPrompt: improveProfilePrompt,
      userData: { text, goal: goal, error: error },
      llm,
    });
    const finalResponse = cleanLLMResponse(llmResponse);

    if (finalResponse.error) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      handleRetries(
        llmResponse,
        improveProfilePrompt,
        text,
        goal,
        llm,
        retries - 1,
        delay,
      );
    }

    return finalResponse;
  }
};
