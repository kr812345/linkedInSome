import { ClockFading } from 'lucide-react';
// import { askLLM } from '../service/service.gemini.js';
import uploadToCloud,{ deleteFromCloudinary } from '../service/service.cloudinary.js';
import feedToLLM from '../helper/chooseLLM.js';

export const uploadImage = async (req, res) => {
    try {
        const file = req.file;
        // const llm = req.body;

        if (!file) return res.status(404).json({message: "No File"});
        
        // const respo = await uploadToCloud(`./${file.path}`);
        
        // if (!respo) {
        //     return res.status(400).json({success: false, message: "Image uploading Failed"});
        // }

        const llm = {gemini: true, openai: 0}
        // const inputImage = respo.secure_url;

        const llmOutput = await feedToLLM({llm, inputImage: file.path});

        if (llmOutput.error) {
            return res.status(400).json({success: false, message: llmOutput.error});
        }

        // const respoAfterDelete = await deleteFromCloudinary(respo.public_id);

        // if (!respoAfterDelete) {
        //     return res.status(400).json({success: false, message: "Image deletion Failed"});
        // }

        if (typeof llmOutput !== "object" && typeof llmOutput !== "string") {
            return res.status(400).json({success: false, message: "Invalid LLM Output"});
        }

        return res.status(200).json({success: true, message: "Roast Feedback Success", data: llmOutput});
    } catch (err) {
        console.error(err);
        res.status(500).json({success: false, message: "error in processing request"});
    }
}

export const aiTellMe = async (req, res) => {
    try {
        const file = req.file;
        
        if (!file) return res.status(404).json({message: "No Image"});
        
        const llm = {gemini: 1}
        const inputImage = file.path;   

        const llmOutput = await feedToLLM(llm, inputImage);

        return res.status(200).json({success: true, message: "Image uploaded successfully", data: llmOutput});
    } catch (err) {
        console.log("error: ", err);
        res.status(500).json({success: false, message: "error in aiTellMe"});
    }
}