import {
    GoogleGenAI,
    createUserContent,
    createPartFromUri,
} from '@google/genai';
import rosterPrompt from '../public/prompts/roster.js';

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export default async function
    askGemini(inputImage) {
        try {

            const image = await ai.files.upload({
                file: `${inputImage}`,
            })
            
            const response = await ai.models.generateContent({
                model: `${'gemini-2.5-flash'}`,
                contents: createUserContent([
                        `${rosterPrompt}`,
                        createPartFromUri(image.uri, image.mimeType),
                    ])
                })
            
            console.log("console from gemini service, next is the output from llm.", response.text);
            return response.text;
            } catch (error) {
                console.log("Error in Gemini Service: ", error);
            }
}; 

// askGemini("./backend/src/service/linkedinProfile.png")
