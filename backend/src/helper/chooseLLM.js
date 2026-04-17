import askOpenAi from '../service/service.openai.js';
import askGemini from '../service/service.gemini.js';
import askGroq from '../service/service.groq.js';

export default async function feedToLLM({systemPrompt, userData, llm, inputImage}) {
    console.log("feedToLLM's userData: ", userData);
    if (llm == 'openai') {
        return await askOpenAi(systemPrompt, userData, inputImage);
    } else if (llm == 'gemini') {
        return await askGemini(systemPrompt, userData, inputImage);
    } else if (llm == 'groq') {
        return await askGroq(systemPrompt, userData, inputImage);
    }
}