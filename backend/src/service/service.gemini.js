import {
    GoogleGenAI,
    createUserContent,
    createPartFromUri,
} from '@google/genai';
import rosterPrompt from '../public/prompts/rosterPrompt.js';

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export default async function
    askGemini(systemPrompt, userData, inputImage) {
        try {
            let image;
            if (inputImage) {    
                image = await ai.files.upload({
                    file: `${inputImage}`,
                })    
            }
            console.log(systemPrompt);
            const response = await ai.models.generateContent({
                model: `${'gemini-2.5-flash'}`,
                contents: createUserContent([
                        `${systemPrompt}, \n userData: ${JSON.stringify(userData)}`,
                        inputImage ? createPartFromUri(image.uri, image.mimeType) : ''
                    ])
                })
            
            console.log("\n\n\n\n gemini response: ", response.text, '\n\n\n\n');
            return response.text;
            } catch (error) {
                console.log("Error in Gemini Service: ", error);
            }
}; 

// askGemini("./backend/src/service/linkedinProfile.png")
