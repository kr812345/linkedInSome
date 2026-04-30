import express from 'express';
import * as r from '../controllers/controller.roster.js';
import * as i from '../controllers/controller.improve.js';
import * as wl from '../controllers/controller.waitingList.js';
import { shareRoast } from '../controllers/controller.share.js';
import multer, { diskStorage } from 'multer';

const fileFilter = (req, file, cb) => {
    const allowed = ['image/*', 'application/pdf'];

    if (!allowed.includes(file.mimetype)) {
        return cb(new Error('INVALID_FILE_TYPE'), false);
    }

    return cb(null, true);
}

const storage = diskStorage({
                                destination: './uploads',
                                filename: (req, file, cb) => {
                                    cb(null, Date.now() + "-" + file.originalname);
                                },
                                });

const upload = multer({storage, });

const linkRoastRouter = express.Router();

linkRoastRouter.post('/roast', upload.single('file'), r.roster);
linkRoastRouter.post('/improve', upload.single('resume'), i.improve);
// linkRoastRouter.post('/llm-tell-me', c.aiTellMe);
linkRoastRouter.post('/waitinglist', wl.waitingList);
linkRoastRouter.post('/shareRoast', shareRoast);

export default linkRoastRouter;