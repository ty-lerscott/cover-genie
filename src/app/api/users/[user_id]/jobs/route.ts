import { NextRequest, NextResponse } from 'next/server';

import supabase from '@/lib/supabase';

export async function GET(
    req: NextRequest,
    { params }: { params: { user_id: string } }
) {
	try {
        const { user_id } = await params;

        if (!user_id) {
            return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("user_jobs")
            .select(`
                id,
                status,
                notes,
                date_added,
                link,
                history,
                job:jobs (
                    title,
                    company,
                    description
                )
            `);

        if (error) {
            console.error('Error getting user jobs');
            return NextResponse.json({ message: 'Error getting user jobs' }, { status: 500 });
        }

        const normalizedJobs = data?.map(({job, ...jobData}) => ({
            ...jobData,
            ...job
        }))

		return NextResponse.json(normalizedJobs, { status: 200 });
	} catch (error) {
		console.error('Error adding job:', error);
		return NextResponse.json({ message: 'Error adding job' }, { status: 500 });
	}
}
