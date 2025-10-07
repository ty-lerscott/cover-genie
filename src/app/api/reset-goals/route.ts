import { type NextRequest, NextResponse } from 'next/server';

import supabase from '@/lib/supabase';

export async function GET(req: NextRequest) {
    const { headers } = req;

    if (headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({
            error: {
                message: 'Unauthorized'
            }
        }, {
            status: 401
        });
    }

    try {

        const { data, error } = await supabase
            .from('users')
            .select('user_id');

        if (error) {
            console.error('Error fetching users:', error);

            return NextResponse.json({
                error: {
                    message: 'Error fetching users'
                }
            }, {
                status: 500
            });
        }

        for (const user of data) {
            await supabase
                .from('users')
                .update({
                    goal: 0
                })
                .eq('user_id', user.user_id)
        }

        return NextResponse.json({
            message: 'Goals reset successfully'
        }, {
            status: 200
        })
    } catch (error) {
        console.error('Error processing request:', error);
        
        return NextResponse.json({
            error: {
                message: 'Error processing request'
            }
        }, {
            status: 500
        });
    }
}
