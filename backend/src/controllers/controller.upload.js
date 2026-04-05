import { ClockFading } from 'lucide-react';
// import { askLLM } from '../service/service.gemini.js';
import uploadToCloud,{ deleteFromCloudinary } from '../service/service.cloudinary.js';
import feedToLLM from '../helper/chooseLLM.js';
import startAutomation from '../service/service.email.js';
import { extractTextFromPDF } from '../helper/extractTextFromPDF.js';
import rosterPrompt from '../public/prompts/rosterPrompt.js';
import improveProfilePrompt from '../public/prompts/improveProfilePrompt.js';
import { profileSchema } from '../public/schemas/profileSchema.js';

export const uploadImage = async (req, res) => {
    try {
        const file = req.file;

        if (!file) return res.status(404).json({message: "No File"});

        const llm = {gemini: true, openai: 0}
        console.log('controller se: ', rosterPrompt);
        const llmOutput = await feedToLLM({systemPrompt: rosterPrompt, llm, inputImage: file.path});

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
            return res.status(200).json({success: true, message: "Roast Feedback Success", data: finalOutput});
        }

        return res.status(200).json({success: true, message: "Roast Feedback Success", data: cleanLLMOutput});

    } catch (err) {
        console.error(err);
        res.status(500).json({success: false, message: "error in processing request"});
    }
}

// export const aiTellMe = async (req, res) => {
//     try {
//         const file = req.file;
        
//         if (!file) return res.status(404).json({message: "No Image"});
        
//         const llm = {gemini: 1}
//         const inputImage = file.path;   

//         const llmOutput = await feedToLLM(llm, inputImage);

//         return res.status(200).json({success: true, message: "Image uploaded successfully", data: llmOutput});
//     } catch (err) {
//         console.log("error: ", err);
//         res.status(500).json({success: false, message: "error in aiTellMe"});
//     }
// }


export const improve = async (req, res) => {
    try {

        const [file, data] = [req.file, req.body];
        
        if (!file) throw new Error('File not Found.');
        console.log({file, data});
        
        const text = await extractTextFromPDF(file.path);
        if (!text) throw new Error('Failed to extract Text.');
        
        const llm = {gemini: true, openai: 0} 
        const llmResponse = await feedToLLM({systemPrompt:improveProfilePrompt, userData:{text, goal: data.goal}, llm});
        console.log(llmResponse);

        const cleanLLMResponse = llmResponse.replace('```json','').replace('```','');
        const jsonLLMResponse = JSON.parse(cleanLLMResponse);
        const final_llmResponse = profileSchema.parse(jsonLLMResponse);
        
        return res.status(200).json({ success: true, message: 'got the ai response successfully', data: `${JSON.stringify(final_llmResponse)}`})
    } catch (error) {
        throw new Error(`improve Error: ${error}`);
    }
}


export const waitingList = async (req, res) => {
    try {
        const email = req.body.email;

        const makeResponse = await startAutomation(email);
        
        if (makeResponse === "rejected") {
            return res.status(400).json({success: false, message: makeResponse});
        }

        return res.status(200).json({ success: true, message: "Response has been saved.", data: makeResponse });
    } catch (err) {
        console.error(`Error in controller: ${err}`);
    }
}