import OpenAI from "openai";
import improveProfilePrompt from "../public/prompts/improveProfilePrompt";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

const askGROQ = (systemPrompt, userData, inputImage) => {

    const response = await client.responses.create({
        model: "openai/gpt-oss-20b",
        input: `System: ${systemPrompt}
                User: ${userData}`,
    });
    console.log(response.output_text);
}