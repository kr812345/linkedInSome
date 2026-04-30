// import { askLLM } from '../service/service.gemini.js';
import uploadToCloud,{ deleteFromCloudinary } from '../service/service.cloudinary.js';
import feedToLLM from '../helper/chooseLLM.js';
import startAutomation from '../service/service.email.js';
import { extractTextFromPDF } from '../helper/extractTextFromPDF.js';
import rosterPrompt from '../public/prompts/rosterPrompt.js';
import improveProfilePrompt from '../public/prompts/improveProfilePrompt.js';
import { profileSchema } from '../public/schemas/profileSchema.js';
import { cleanLLMResponse } from '../helper/cleanLLMResponse.js';
import { handleRetries } from '../helper/handleRetriesLLM.js';
import { cleanupUploads, deleteFile } from '../helper/cleanupUploads.js';
import { generateHash, getCache, setCache } from '../helper/cache.js';
import fs from 'fs';

export const roster = async (req, res) => {
    try {
        const file = req.file;

        if (!file) return res.status(404).json({message: "No File"});

        // Cache Logic
        const fileBuffer = fs.readFileSync(file.path);
        const cacheKey = `roast:${generateHash(fileBuffer)}`;
        const cachedData = await getCache(cacheKey);

        if (cachedData) {
            console.log(`[Redis Cache] Hit for ${cacheKey}`);
            return res.status(200).json({success: true, message: "Roast Feedback Success (Cached)", data: cachedData});
        }

        // const llm = {gemini: true, openai: 0}
        const llmOutput = await feedToLLM({systemPrompt: rosterPrompt, llm: 'gemini', inputImage: file.path});

        console.log(llmOutput);
        const cleanLLMOutput = llmOutput.replace('```json','').replace('```','');

        if (cleanLLMOutput.error) {
            return res.status(400).json({success: false, message: "Not a LinkedIn Image/Screenshot", error: cleanLLMOutput.error});
        }

        if (typeof cleanLLMOutput !== "object" && typeof cleanLLMOutput !== "string") {
            return res.status(400).json({success: false, message: "Invalid LLM Output"});
        }
        if (typeof cleanLLMOutput === 'string') {
            const finalOutput = JSON.parse(cleanLLMOutput);   
            await setCache(cacheKey, finalOutput);
            return res.status(200).json({success: true, message: "Roast Feedback Success", data: finalOutput});
        }

        await setCache(cacheKey, cleanLLMOutput);
        return res.status(200).json({success: true, message: "Roast Feedback Success", data: cleanLLMOutput});

    } catch (err) {
        console.error(err);
        res.status(500).json({success: false, message: "error in processing request"});
    } finally {
        if (req.file) {
            deleteFile(req.file.path);
        }
        cleanupUploads();
    }
}

