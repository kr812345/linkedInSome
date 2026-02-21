import express from 'express';
import * as c from '../controllers/controller.upload.js';
// import multerParser from '../service/service.cloudinary.js';
import multer, { diskStorage } from 'multer';

const storage = diskStorage({
                                destination: './uploads',
                                filename: (req, file, cb) => {
                                    cb(null, Date.now() + "-" + file.originalname);
                                }});

const upload = multer({ storage });

const uploadRouter = express.Router();

uploadRouter.post('/roast', upload.single('file'), c.uploadImage);
// uploadRouter.post('/llm-tell-me', c.aiTellMe);
uploadRouter.post('/waitinglist', c.waitingList);

export default uploadRouter;