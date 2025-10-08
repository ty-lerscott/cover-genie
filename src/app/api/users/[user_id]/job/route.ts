import {createId} from '@paralleldrive/cuid2'
import { NextRequest, NextResponse } from 'next/server';

import supabase from '@/lib/supabase';
import sanitizeText from '@/lib/sanitize';
import { type JobInputs } from '@/app/types/job-inputs';

export async function POST(
    req: NextRequest,
    { params }: { params: { user_id: string } }
) {
	try {
        const {user_id} = await params;
		const body: JobInputs = await req.json();

        if (!user_id) {
            return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
        }

        const {title, company, description, ...sanitizedBody} = Object.fromEntries(
            Object.entries(body).map(([key, value]) => [key, typeof value === 'number' ? value : sanitizeText(value as string)])
        ) as JobInputs;

        const jobId = createId();

        const {error: jobsError} = await supabase
            .from('jobs')
            .insert({ title, company, description, id: jobId })
            .select()
            .single()

        const [userJobsResult, userActivityResult] = await Promise.allSettled([
            supabase
                .from('user_jobs')
                .insert({
                    user_id,
                    job_id: jobId,
                    status: sanitizedBody.status,
                    notes: sanitizedBody.notes,
                    date_added: sanitizedBody.date_added,
                    link: sanitizedBody.link
                }),
            supabase
                .from('user_activity')
                .insert({
                    user_id,
                    category: 'job',
                    description: title,
                    status: sanitizedBody.status,
                })
        ]);

        if (
            userJobsResult.status === 'fulfilled' &&
            userActivityResult.status === 'fulfilled'
        ) {
            const {error: userJobsError} = userJobsResult.value;
            const {error: userActivityError} = userActivityResult.value;

            if (jobsError || userJobsError || userActivityError) {
                console.error('Error adding job:', [jobsError, userJobsError, userActivityError].filter(Boolean));
                return NextResponse.json({ message: 'Error adding job' }, { status: 500 });
            }
        }

		return NextResponse.json({ message: 'Job added successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error adding job:', error);
		return NextResponse.json({ message: 'Error adding job' }, { status: 500 });
	}
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { user_id: string } }
) {
	try {
        const {user_id} = await params;
		const body: JobInputs = await req.json();

        if (!user_id) {
            return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
        }

        const {title, company, description, id, ...sanitizedBody} = Object.fromEntries(
            Object.entries(body).map(([key, value]) => [key, typeof value === 'number' ? value : sanitizeText(value as string)])
        ) as JobInputs;

        const [jobsResult, userJobsResult, userActivityResult] = await Promise.allSettled([
            supabase
                .from('jobs')
                .update({ id, title, company, description })
                .eq('id', id)
                .select(),
            supabase
                .from('user_jobs')
                .update({
                    user_id,
                    status: sanitizedBody.status,
                    notes: sanitizedBody.notes,
                    date_added: sanitizedBody.date_added,
                    link: sanitizedBody.link
                })
                .eq('job_id', id)
                .select(),
            supabase
                .from('user_activity')
                .insert({
                    user_id,
                    category: 'job',
                    description: title,
                    status: 'Updated',
                })
        ])

        if (
            jobsResult.status === "fulfilled" &&
            userJobsResult.status === "fulfilled" &&
            userActivityResult.status === 'fulfilled') {
            const {error: jobsError} = jobsResult.value;
            const {error: userJobsError} = userJobsResult.value;
            const {error: userActivityError} = userActivityResult.value;

            if (jobsError || userJobsError || userActivityError) {
                console.error('Error updating job:', [jobsError, userJobsError, userActivityError].filter(Boolean));
                return NextResponse.json({ message: 'Error updating job' }, { status: 500 });
            }
        } 
          
        return NextResponse.json({ message: 'Job updated successfully' }, { status: 200 });

	} catch (error) {
		console.error('Error updating job:', error);
		return NextResponse.json({ message: 'Error updating job' }, { status: 500 });
	}
}
