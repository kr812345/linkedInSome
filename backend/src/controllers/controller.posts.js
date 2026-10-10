import fs from 'fs';
import feedToLLM from '../helper/chooseLLM.js';
import postsPrompt from '../public/prompts/postsPrompt.js';
import { parseRoastJson, normalizeRoast, toTeaser } from '../helper/parseRoast.js';
import { mockPostsRoast } from '../helper/mockRoast.js';
import { putRoast } from '../helper/roastSession.js';
import { cleanupUploads, deleteFile } from '../helper/cleanupUploads.js';
import { generateHash, getCache, setCache } from '../helper/cache.js';

const MAX_TEXT = 20000;

function cleanupFiles(files) {
    for (const file of files || []) {
        deleteFile(file.path);
    }
    cleanupUploads();
}

export const roastPosts = async (req, res) => {
    const files = Array.isArray(req.files) ? req.files : [];

    try {
        const postsText = String(req.body?.postsText || '').trim().slice(0, MAX_TEXT);
        const images = files.filter((file) => file.mimetype?.startsWith('image/'));

        if (files.length > 0 && images.length !== files.length) {
            return res.status(400).json({ success: false, message: 'Post uploads need to be images.' });
        }

        if (images.length === 0 && postsText.length < 20) {
            return res.status(400).json({
                success: false,
                message: 'Add up to 5 post screenshots, paste the post text, or both.',
            });
        }

        if (images.length > 5) {
            return res.status(400).json({ success: false, message: 'Upload up to 5 post screenshots.' });
        }

        let roast;
        if (process.env.MOCK_LLM === 'true') {
            roast = normalizeRoast(mockPostsRoast(), 'posts');
        } else {
            const hashSource = [
                postsText,
                ...images.map((file) => fs.readFileSync(file.path)),
            ];
            const cacheKey = `roast:v2:posts:${generateHash(Buffer.concat(hashSource.map((part) => Buffer.isBuffer(part) ? part : Buffer.from(part))))}`;
            const cached = await getCache(cacheKey);
            if (cached && !cached.error) {
                roast = normalizeRoast(cached, 'posts');
            } else {
                const llmOutput = await feedToLLM({
                    systemPrompt: postsPrompt,
                    userData: { postsText, imageCount: images.length },
                    llm: 'gemini',
                    inputImages: images.map((file) => file.path),
                });

                if (!llmOutput) {
                    return res.status(502).json({
                        success: false,
                        message: 'The roast model did not respond. Try again in a moment.',
                    });
                }

                roast = normalizeRoast(parseRoastJson(llmOutput), 'posts');
                if (!roast.error) {
                    await setCache(cacheKey, roast);
                }
            }
        }

        if (roast.error) {
            return res.status(400).json({ success: false, message: roast.error });
        }

        const roastId = await putRoast(roast);

        return res.status(200).json({
            success: true,
            gated: true,
            roastId,
            mode: 'posts',
            teaser: toTeaser(roast),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Could not process those posts.' });
    } finally {
        cleanupFiles(files);
    }
};
