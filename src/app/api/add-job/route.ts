import { NextRequest, NextResponse } from 'next/server';

import supabase from '@/lib/supabase';
import sanitizeText from '@/lib/sanitize';
import { type AddJobInputs } from '@/app/types/add-job-inputs';

export async function POST(req: NextRequest) {
	try {
        const headers = await req.headers;
		const body: AddJobInputs = await req.json();

        const userId = headers.get('x-user-id');

        if (!userId) {
            return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
        }

        const sanitizedBody = Object.fromEntries(
            Object.entries(body).map(([key, value]) => [key, typeof value === 'number' ? value : sanitizeText(value as string)])
        ) as AddJobInputs;

        const { data: jobData, error: jobError } = await supabase
            .from('jobs')
            .insert([
                { title: sanitizedBody.title, company: sanitizedBody.companyName, description: sanitizedBody.description },
            ])
            .select()
            .single();

        if (jobError) {
            console.error('Error inserting job:', jobError);
            return NextResponse.json({ message: 'Error inserting job' }, { status: 500 });
        }

        const { error: userJobError } = await supabase
            .from('user_jobs')
            .insert([
                {
                    job_id: jobData.id,
                    user_id: userId,
                    status: sanitizedBody.status,
                    notes: sanitizedBody.notes,
                    date_added: sanitizedBody.dateAdded,
                    link: sanitizedBody.link,
                    history: [{ status: sanitizedBody.status, updated_date: sanitizedBody.dateAdded }],
                },
            ]);

        if (userJobError) {
            console.error('Error inserting user job:', userJobError);
            return NextResponse.json({ message: 'Error inserting user job' }, { status: 500 });
        }

		return NextResponse.json({ message: 'Job added successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error adding job:', error);
		return NextResponse.json({ message: 'Error adding job' }, { status: 500 });
	}
}
