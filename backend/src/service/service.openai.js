import rosterPrompt from "../public/prompts/roster.js";
import OpenAI from "openai";
const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const askOpenAi = async (inputImage) => {

    const response = await client.responses.create({
        model: "gpt-5-nano",
        // reasoning: "",
        // tools: "web_search",
        input: [
            {   
                role: "developer",
                content: `${rosterPrompt}`
            },
            {
                role: "user",
                type: "input_image",
                content: `${inputImage}`
            },
        ]
    });
    console.log(response.output_text);
}

export default askOpenAi;