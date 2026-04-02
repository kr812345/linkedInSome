import askOpenAi from '../service/service.openai.js';
import askGemini from '../service/service.gemini.js';

export default async function feedToLLM({systemPrompt, llm, inputImage}) {
    if (llm.openai) {
        return await askOpenAi(systemPrompt, inputImage);
    } else if (llm.gemini) {
        return await askGemini(systemPrompt, inputImage);
    } else if (llm.groq) {
        // return await askGroq();
        pass
    }
}