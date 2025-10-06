import { NextRequest, NextResponse } from 'next/server';

import subscriptionItemActiveHook from './hooks/subscriptionItem.active'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		switch (body.type) {
			case 'subscriptionItem.active':
				return subscriptionItemActiveHook(body);
			default:
				console.dir(body, {depth: null});
				break;
		}

		return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
	} catch (error) {
		console.error('Error processing webhook:', error);
		return NextResponse.json({ message: 'Error processing webhook' }, { status: 500 });
	}
}
