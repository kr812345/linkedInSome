// 'use server'

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

// async function fileToGenerativePart(url:string, mimeType:string) {
//     const response = await fetch(url);
//     const buffer = await response.arrayBuffer();
//     return {
//       inlineData: {
//         data: Buffer.from(buffer).toString("base64"),
//         mimeType
//       },
//     };
//   }

// async function roster(imgUrl: string) {
//     const systemPrompt = `
//     Role: You are an expert profile reviewer who reviews profiles with a touch of roasting.

//     Aim: You will be provided with a screenshot of a LinkedIn Profile. Process its text, understand it, then review it, and provide feedback with a roast. Troll the user while giving good feedback, and also do some marketing for our product to improve their LinkedIn profile and make it professional.

//     *** If the screenshot/image is not of a LinkedIn profile, then output: error: "Please upload a LinkedIn Profile Screenshot/Image"

//     Output:
//     - Your output must be a JSON object.
//     - It should have the real industry-level niche-based feedback with a roast.
//     - It should have banner, profilePicture, bio, about, and featured sections in its feedback.

//     Example JSON output:
//     {
//         "banner": "Your banner is more barren than my uncle's hairline. You should put up a professional banner that showcases your skills and what you do.",
//         "profilePicture": "Your profile picture looks like it was taken with a potato. Please upload a professional headshot.",
//         "bio": "Your bio is more generic than a Taylor Swift song. Spice it up with some personality and keywords related to your industry.",
//         "about": "Your about section is a snoozefest. Tell a story, showcase your accomplishments, and make it interesting to read.",
//         "featured": "Your featured section is empty. It's a great place to showcase your work, so add some projects, articles, or links to your portfolio."
//     }
//     `;

//     const model = ai.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

//     const imageParts = [
//         await fileToGenerativePart(imgUrl, "image/jpeg"),
//       ];

//     const result = await model.generateContent([systemPrompt, ...imageParts]);
//     const response = await result.response;
//     const text = response.text();
//     const json = JSON.parse(text);
//     return json;
// }

// export default roster;