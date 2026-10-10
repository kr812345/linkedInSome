import fs from 'fs';
import express from 'express';
import multer, { diskStorage } from 'multer';
import * as r from '../controllers/controller.roster.js';
import * as posts from '../controllers/controller.posts.js';
import * as unlock from '../controllers/controller.unlock.js';
import * as i from '../controllers/controller.improve.js';
import * as wl from '../controllers/controller.waitingList.js';
import { shareRoast } from '../controllers/controller.share.js';

const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = diskStorage({
    destination: uploadsDir,
    filename: (_req, file, cb) => {
        const safe = file.originalname.replace(/[^\w.\-]+/g, '_').slice(0, 80);
        cb(null, `${Date.now()}-${safe}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 8 * 1024 * 1024, files: 5 },
});

function runUpload(middleware) {
    return (req, res, next) => {
        middleware(req, res, (err) => {
            if (!err) return next();
            const message = err.code === 'LIMIT_FILE_SIZE'
                ? 'Each image must be under 8MB.'
                : (err.code === 'LIMIT_UNEXPECTED_FILE' || err.code === 'LIMIT_FILE_COUNT')
                    ? 'Upload up to 5 post screenshots.'
                    : 'Could not read that upload.';
            return res.status(400).json({ success: false, message });
        });
    };
}

const linkRoastRouter = express.Router();

linkRoastRouter.post('/roast', runUpload(upload.single('file')), r.roster);
linkRoastRouter.post('/roast-posts', runUpload(upload.array('files', 5)), posts.roastPosts);
linkRoastRouter.post('/unlock', unlock.unlockRoast);
linkRoastRouter.post('/improve', runUpload(upload.single('resume')), i.improve);
linkRoastRouter.post('/waitinglist', wl.waitingList);
linkRoastRouter.post('/shareRoast', shareRoast);

export default linkRoastRouter;
