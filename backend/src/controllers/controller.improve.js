import feedToLLM from '../helper/chooseLLM.js';
import { extractTextFromPDF } from '../helper/extractTextFromPDF.js';
import rosterPrompt from '../public/prompts/rosterPrompt.js';
import improveProfilePrompt from '../public/prompts/improveProfilePrompt.js';
import { profileSchema } from '../public/schemas/profileSchema.js';
import { cleanLLMResponse } from '../helper/cleanLLMResponse.js';
import { handleRetries } from '../helper/handleRetriesLLM.js';

export const improve = async (req, res) => {
    try {

        const [file, data] = [req.file, req.body];
        
        if (!file) throw new Error('File not Found.');
        console.log({file, data});
        
        const resumeText = await extractTextFromPDF(file.path);
        if (resumeText.error) throw new Error('Failed to extract Text.');
        
        // const llm = {gemini: true, openai: 0} 
        const llmResponse = await feedToLLM({systemPrompt: improveProfilePrompt, userData: {resumeText, goal: data.goal}, llm: data.model});
        console.log(llmResponse);

        const final_llmResponse = await handleRetries(llmResponse, improveProfilePrompt, resumeText, data.goal, data.model, 3, 1000);
        // const final_llmResponse = cleanLLMResponse(llmResponse);

        return res.status(200).json({ success: true, message: 'got the ai response successfully', data: `${JSON.stringify(final_llmResponse)}`})
    } catch (error) {
        throw new Error(`improve Error: ${error}`);
    }
}