import askGemini from '../service/service.gemini.js';

export default async function feedToLLM({ systemPrompt, userData, llm, inputImage, inputImages }) {
    console.log("feedToLLM's userData: ", userData);
    if (typeof llm === 'string' && llm.includes('gemini')) {
        return await askGemini(systemPrompt, userData, inputImage, inputImages);
    }
    throw new Error('Unsupported model');
}
