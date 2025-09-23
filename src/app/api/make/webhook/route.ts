import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL || process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;
    const makeApiKey = process.env.MAKE_WEBHOOK_KEY || process.env.NEXT_PUBLIC_MAKE_WEBHOOK_KEY;

    if (!makeWebhookUrl) {
      return NextResponse.json({ success: false, error: 'MAKE_WEBHOOK_URL not configured' }, { status: 500 });
    }

    const res = await fetch(makeWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(makeApiKey ? { 'x-make-apikey': makeApiKey } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ success: false, error: `Make webhook failed: ${res.status}`, details: text }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Unknown error' }, { status: 500 });
  }
}




export async function POST(request: Request) {
  try {
    const body = await request.json();
    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL || process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;
    const makeApiKey = process.env.MAKE_WEBHOOK_KEY || process.env.NEXT_PUBLIC_MAKE_WEBHOOK_KEY;

    if (!makeWebhookUrl) {
      return NextResponse.json({ success: false, error: 'MAKE_WEBHOOK_URL not configured' }, { status: 500 });
    }

    const res = await fetch(makeWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(makeApiKey ? { 'x-make-apikey': makeApiKey } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ success: false, error: `Make webhook failed: ${res.status}`, details: text }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Unknown error' }, { status: 500 });
  }
}


