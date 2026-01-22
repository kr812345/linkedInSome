import {
    GoogleGenAI,
    createUserContent,
    createPartFromUri,
} from '@google/genai';
import rosterPrompt from '../public/prompts/roster.js';

const ai = new GoogleGenAI();

export default async function
    askGemini(inputImage) {
        const image = await ai.files.upload({
                file: `${inputImage}`,
            })
    
        const response = ai.chats.create({
            model: `${'gemini-2.5-flash'}`,
            contents: [
                createUserContent(
                    `${rosterPrompt}`,
                    createPartFromUri(image.uri, image.mimeType),
                )]})
        
        console.log("console from gemini service, next is the output from llm.", response.content);
}; 
