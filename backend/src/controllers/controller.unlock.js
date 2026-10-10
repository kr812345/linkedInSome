import crypto from 'crypto';
import { getRoast } from '../helper/roastSession.js';
import { saveLead } from '../helper/leadsStore.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const unlockRoast = async (req, res) => {
    try {
        const { roastId, name, email, consent } = req.body || {};
        const cleanName = String(name || '').trim().replace(/\s+/g, ' ');
        const cleanEmail = String(email || '').trim().toLowerCase();

        if (cleanName.length < 2 || cleanName.length > 80) {
            return res.status(400).json({ success: false, message: 'Please enter your name.' });
        }

        if (!EMAIL.test(cleanEmail) || cleanEmail.length > 160) {
            return res.status(400).json({ success: false, message: 'Please enter a valid email.' });
        }

        if (consent !== true) {
            return res.status(400).json({
                success: false,
                message: 'Confirm the consent line to unlock the full roast.',
            });
        }

        const roast = await getRoast(roastId);
        if (!roast) {
            return res.status(404).json({
                success: false,
                message: 'This roast expired. Run it again — screenshots are not kept.',
            });
        }

        await saveLead({
            id: crypto.randomUUID(),
            name: cleanName,
            email: cleanEmail,
            consent: true,
            mode: roast.mode,
            score: roast.score,
            roastId,
            createdAt: new Date().toISOString(),
            source: 'linkroast',
        });

        const { createdAt, ...data } = roast;

        return res.status(200).json({ success: true, data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Could not save that. Try again.' });
    }
};
