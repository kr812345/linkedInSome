import cloudinary from '../config/cloudinary.js';
import genFileName from '../helper/genFileName.js';

function uploadToCloud (filePath) {
    const newName = genFileName();
    try {
        const result = cloudinary.uploader.upload(filePath,{
            resource_type: 'image',
            folder: 'linkedIn-profiles/',
            format: "webp",
        })
        return result
    } catch (err) {
        throw new Error("Cloudinary Error:", err);
    }
}

export function deleteFromCloudinary(publicId) {
    try {
        const result = cloudinary.uploader.destroy(publicId);
        return result;
    } catch (err) {
        throw new Error("Cloudinary Deletion Error: ", err);
    }
}

export default uploadToCloud;

// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: "linkedIn-profiles/",
//         format: "webp",
//         public_id: async (req, file) => genFileName(),
//         on_success: async (req, file) => req.body.upload = "success",
//         return_delete_token: true,
//     }
// })

// const multerParser = multer({storage: './uploads'});

// export default multerParser;