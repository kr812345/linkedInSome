import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// Helper to find font path robustly (works in both dev and prod)
const getFontPath = (relativePath) => {
    // Check in current directory (typical for local dev run from root)
    let fullPath = path.resolve(process.cwd(), relativePath);
    if (fs.existsSync(fullPath)) return fullPath;
    
    // Check in parent directory (typical for Docker where cwd is /app/backend)
    fullPath = path.resolve(process.cwd(), '..', relativePath);
    return fullPath;
};

// Register Fonts
const regularFontPath = getFontPath('public/FONTS/Inter/static/Inter_28pt-Regular.ttf');
const boldFontPath = getFontPath('public/FONTS/Inter/static/Inter_28pt-Bold.ttf');

/**
 * Wraps text into lines for SVG.
 */
function wrapText(text, maxChars) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        if ((currentLine + " " + word).length < maxChars) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

export const shareRoast = async (req, res) => {
    try {
        const { data } = req.body;
        if (!data) return res.status(400).json({ success: false, message: 'Roast data is required' });

        const width = 1080;
        const padding = 100;
        
        let sectionsSvg = '';
        let currentY = 220; 
        const sectionSpacing = 50;
        const labelHeight = 40;
        const fontSize = 32;
        const lineHeight = fontSize * 1.4;

        Object.entries(data).forEach(([key, value]) => {
            const label = key.toUpperCase();
            const content = String(value).replace(/[*#]/g, ''); 

            // Keep the darker orange for visibility as it doesn't affect speed
            sectionsSvg += `<text x="${padding}" y="${currentY}" class="label">${label}</text>`;
            currentY += labelHeight;

            // Wrap and Draw Content
            const lines = wrapText(content, 50);
            lines.forEach(line => {
                const escapedLine = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                sectionsSvg += `<text x="${padding}" y="${currentY}" class="content">${escapedLine}</text>`;
                currentY += lineHeight;
            });

            currentY += sectionSpacing;
        });

        const footerHeight = 150;
        const height = Math.max(1350, currentY + footerHeight);

        const svg = `
            <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
                <style>
                    @font-face {
                        font-family: 'Inter';
                        src: url('file://${regularFontPath}');
                        font-weight: normal;
                    }
                    @font-face {
                        font-family: 'Inter';
                        src: url('file://${boldFontPath}');
                        font-weight: bold;
                    }
                    .label { fill: #d32700; font-family: 'Inter', sans-serif; font-size: 24px; font-weight: bold; letter-spacing: 2px; }
                    .content { fill: #050505; font-family: 'Inter', sans-serif; font-size: 32px; font-weight: normal; line-height: 1.4; }
                    .title { fill: #050505; font-family: 'Inter', sans-serif; font-size: 64px; font-weight: bold; }
                    .brand { fill: #d32700; font-family: 'Inter', sans-serif; font-size: 28px; font-weight: bold; }
                    .footer { fill: #90A4AE; font-family: 'Inter', sans-serif; font-size: 24px; }
                </style>
                
                <rect width="100%" height="100%" fill="white" />
                
                <!-- Luxury Accents -->
                <path d="M 0 0 L 250 0 L 0 250 Z" fill="#ff2f00" opacity="0.08" />
                <path d="M ${width} ${height} L ${width - 350} ${height} L ${width} ${height - 350} Z" fill="#ff2f00" />
                
                <!-- Branding Header -->
                <text x="${padding}" y="80" class="brand">LINKROAST</text>
                <text x="${padding}" y="160" class="title">Profile Roast</text>
                
                <!-- Content -->
                ${sectionsSvg}
                
                <!-- Footer -->
                <text x="${width / 2}" y="${height - 70}" text-anchor="middle" class="footer">Optimize your identity at LinkRoast.com</text>
            </svg>
        `;

        const buffer = await sharp(Buffer.from(svg))
            .png()
            .toBuffer();

        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);

    } catch (error) {
        console.error('[Share Roast Error]:', error);
        res.status(500).json({ success: false, message: 'Failed to generate image' });
    }
};
