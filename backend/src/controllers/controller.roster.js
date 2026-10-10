import fs from 'fs';
import feedToLLM from '../helper/chooseLLM.js';
import rosterPrompt from '../public/prompts/rosterPrompt.js';
import { parseRoastJson, normalizeRoast, toTeaser } from '../helper/parseRoast.js';
import { mockProfileRoast } from '../helper/mockRoast.js';
import { putRoast } from '../helper/roastSession.js';
import { cleanupUploads, deleteFile } from '../helper/cleanupUploads.js';
import { generateHash, getCache, setCache } from '../helper/cache.js';

async function buildProfileRoast(file) {
    if (process.env.MOCK_LLM === 'true') {
        return normalizeRoast(mockProfileRoast(), 'profile');
    }

    const fileBuffer = fs.readFileSync(file.path);
    const cacheKey = `roast:v2:profile:${generateHash(fileBuffer)}`;
    const cached = await getCache(cacheKey);
    if (cached && !cached.error) {
        return normalizeRoast(cached, 'profile');
    }

    const llmOutput = await feedToLLM({
        systemPrompt: rosterPrompt,
        llm: 'gemini',
        inputImage: file.path,
    });

    if (!llmOutput) {
        const error = new Error('The roast model did not respond. Try again in a moment.');
        error.status = 502;
        throw error;
    }

    const roast = normalizeRoast(parseRoastJson(llmOutput), 'profile');
    if (!roast.error) {
        await setCache(cacheKey, roast);
    }
    return roast;
}

export const roster = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ success: false, message: 'Upload a LinkedIn profile screenshot.' });
        }

        if (!file.mimetype?.startsWith('image/')) {
            return res.status(400).json({ success: false, message: 'Please upload an image file.' });
        }

        const roast = await buildProfileRoast(file);

        if (roast.error) {
            return res.status(400).json({ success: false, message: roast.error });
        }

        const roastId = await putRoast(roast);

        return res.status(200).json({
            success: true,
            gated: true,
            roastId,
            mode: 'profile',
            teaser: toTeaser(roast),
        });
    } catch (err) {
        console.error(err);
        const status = err.status || 500;
        res.status(status).json({
            success: false,
            message: status === 502 ? err.message : 'Could not process that screenshot.',
        });
    } finally {
        if (req.file) {
            deleteFile(req.file.path);
        }
        cleanupUploads();
    }
};
