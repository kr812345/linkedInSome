import feedToLLM from '../helper/chooseLLM.js';
import { extractTextFromPDF } from '../helper/extractTextFromPDF.js';
import improveProfilePrompt from '../public/prompts/improveProfilePrompt.js';
import { handleRetries } from '../helper/handleRetriesLLM.js';
import { cleanupUploads, deleteFile } from '../helper/cleanupUploads.js';
import { generateHash, getCache, setCache } from '../helper/cache.js';

export const improve = async (req, res) => {
    try {
        const [file, data] = [req.file, req.body];
        
        if (!file) {
            return res.status(400).json({ success: false, error: 'Resume file not found.' });
        }
        
        const resumeText = await extractTextFromPDF(file.path);
        if (resumeText.error) {
            return res.status(400).json({ success: false, error: 'Failed to extract text from PDF.' });
        }

        // Cache Logic
        const cacheKey = `improve:${generateHash(resumeText + data.goal + data.model)}`;
        const cachedData = await getCache(cacheKey);

        if (cachedData) {
            console.log(`[Redis Cache] Hit for ${cacheKey}`);
            return res.status(200).json({ success: true, message: 'Retrieved from cache', data: cachedData });
        }
        
        const llmResponse = await feedToLLM({
            systemPrompt: improveProfilePrompt, 
            userData: { resumeText, goal: data.goal }, 
            llm: data.model 
        });

        const final_llmResponse = await handleRetries(llmResponse, improveProfilePrompt, resumeText, data.goal, data.model, 2, 1000);

        await setCache(cacheKey, final_llmResponse);
        return res.status(200).json({ success: true, message: 'AI processing complete', data: final_llmResponse });

    } catch (error) {
        console.error('[Improve Controller Error]:', error.message);
        return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    } finally {
        if (req.file) {
            deleteFile(req.file.path);
        }
        cleanupUploads();
    }
}