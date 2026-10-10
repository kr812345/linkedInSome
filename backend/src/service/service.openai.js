import rosterPrompt from "../public/prompts/rosterPrompt.js";
import OpenAI from "openai";

let client;

function getClient() {
    if (!client) {
        client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    return client;
}

const askOpenAi = async (inputImage) => {

    const response = await getClient().responses.create({
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