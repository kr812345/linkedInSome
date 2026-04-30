import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export default async function askGroq(systemPrompt, userData, inputImage) {
    try {

        const response = await client.responses.create({
            model: "openai/gpt-oss-20b",
            input: `System: ${systemPrompt} \n\n
            UserData: ${userData}`,
        });
        console.log("Groq response: ", response.output_text);
        return response.output_text;
    } catch (error) {
        throw new Error("Groq Error: ", error);
    }
}