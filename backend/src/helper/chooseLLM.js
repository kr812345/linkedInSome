import askOpenAi from '../service/service.openai.js';
import askGemini from '../service/service.gemini.js';

export default async function feedToLLM({llm, inputImage}) {
    if (llm.openai) {
        return await askOpenAi(inputImage);
    } else if (llm.gemini) {
        return await askGemini(inputImage);
    }
}