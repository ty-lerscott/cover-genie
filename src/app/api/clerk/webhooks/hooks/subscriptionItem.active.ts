import { NextResponse } from 'next/server';

import supabase from '@/lib/supabase';
import { type GenericBody } from '../types/body';

type TierSlug = 'free' | 'basic' | 'pro' | 'unlimited'

type SubscriptionItemActiveBody = GenericBody<{
    created_at: number,
    id: string,
    interval: string,
    object: string,
    payer: {
        email: string,
        first_name: string,
        id: string,
        image_url: string,
        last_name: string,
        organization_id: string,
        organization_name: string,
        user_id: string,
    },
    period_end: number,
    period_start: number,
    plan: {
        amount: number,
        currency: string,
        id: string,
        is_recurring: boolean,
        name: string,
        slug: TierSlug,
    },
    plan_id: string,
    status: string,
    subscription_id: string,
    updated_at: string,
}, 'subscriptionItem.active'>

const TIER_ALLOTMENTS = {
    free: 5,
    basic: 40,
    pro: 75,
    unlimited: -1
}

const subscriptionItemActiveHook = async (requestBody: SubscriptionItemActiveBody) => {
    const { plan, payer: { user_id } } = requestBody.data;
    const allotment = TIER_ALLOTMENTS[plan.slug];

    const { error } = await supabase
        .from('user_cover_letter_allotments')
        .upsert([{ user_id, allotment, count: 0 }]);

    if (error) {
        console.error('Error updating allotment:', error);
        return NextResponse.json({ message: 'Error updating allotment' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Allotment created' });
}

export default subscriptionItemActiveHook;