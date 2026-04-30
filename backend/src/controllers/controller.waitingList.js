import startAutomation from '../service/service.email.js';

export const waitingList = async (req, res) => {
    try {
        const email = req.body.email;

        if (!email) {
            return res.status(400).json({success: false, message: "no email found"});
        }

        const makeResponse = await startAutomation(email);
        
        if (makeResponse === "rejected") {
            return res.status(400).json({success: false, message: makeResponse});
        }

        return res.status(200).json({ success: true, message: "Response has been saved.", data: makeResponse });
    } catch (err) {
        console.error(`Error in controller: ${err}`);
    }
}