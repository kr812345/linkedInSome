import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,  
// });

cloudinary.config({
    cloud_name: "damljwkim",
    api_key: "398827719559747",
    api_secret: "wVJqbafMyIXi03BsFZi-qLZllOY",  
});

export default cloudinary;