import { NextRequest, NextResponse } from 'next/server';

const MAKE_WEBHOOK = process.env.WEBHOOK_URL;

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        if (!email) return NextResponse.json({ success: false, message: 'No email provided' }, { status: 400 });
        if (!MAKE_WEBHOOK) return NextResponse.json({ success: false, message: 'Webhook not configured' }, { status: 500 });

        const resp = await fetch(MAKE_WEBHOOK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-make-apikey': 'zeroone',
            },
            body: JSON.stringify({ email }),
        });

        if (!resp.ok) {
            const text = await resp.text().catch(() => null);
            return NextResponse.json({ success: false, message: 'rejected', data: text }, { status: 400 });
        }

        const data = await resp.json().catch(() => null);
        return NextResponse.json({ success: true, message: 'Response has been saved.', data }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: 'error in controller' }, { status: 500 });
    }
}