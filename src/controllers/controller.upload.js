import { ClockFading } from 'lucide-react';
// import { askLLM } from '../service/service.gemini.js';
import uploadToCloud,{ deleteFromCloudinary } from '../service/service.cloudinary.js';
import feedToLLM from '../helper/chooseLLM.js';

export const uploadImage = async (req, res) => {
    try {
        const file = req.file;

        if (!file) return res.status(404).json({message: "No File"});
        
        const respo = await uploadToCloud(`./${file.path}`);
        
        if (!respo) {
            return res.status(400).json({success: false, message: "Image uploading Failed"})
        }

        const llm = {gemini: 1}
        const inputImage = respo.secure_url;

        const llmOutput = await feedToLLM(llm, inputImage);

        const respoAfterDelete = await deleteFromCloudinary(respo.public_id);

        if (!respoAfterDelete) {
            return res.status(400).json({success: false, message: "Image deletion Failed"})
        }

        return res.status(200).json({success: true, message: "Image uploaded successfully", data: respo})
    } catch (err) {
        console.error(err);
        res.status(500).json({success: false, message: "error in uploading in cloudinary"});
    }
}

export const geminiTellMe = (req, res) => {
    try {
        
    } catch (err) {
        console.log("error: ", err);
    }
}