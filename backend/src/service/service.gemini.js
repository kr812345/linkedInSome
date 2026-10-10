import {
    GoogleGenAI,
    createUserContent,
    createPartFromUri,
} from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export default async function askGemini(systemPrompt, userData, inputImage, inputImages) {
    try {
        const paths = Array.isArray(inputImages) && inputImages.length
            ? inputImages
            : (inputImage ? [inputImage] : []);

        const parts = [`${systemPrompt}\n userData: ${JSON.stringify(userData ?? {})}`];

        for (const filePath of paths) {
            const image = await ai.files.upload({ file: `${filePath}` });
            parts.push(createPartFromUri(image.uri, image.mimeType));
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: createUserContent(parts),
        });

        console.log("\n\n\n\n gemini response: ", response.text, '\n\n\n\n');
        return response.text;
    } catch (error) {
        console.log("Error in Gemini Service: ", error);
        return undefined;
    }
}
