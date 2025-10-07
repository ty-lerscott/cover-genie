import { NextRequest, NextResponse } from 'next/server';

import supabase from '@/lib/supabase';

export async function GET(
  req: NextRequest,
  { params }: { params: { user_id: string } }
) {
    try {
        const {user_id: userId} = await params;

        if (!userId) {
            return NextResponse.json({
                error: {
                    message: 'user_id is required'
                }
            }, {
                status: 400
            });
        }

        const { data, error } = await supabase
            .from('user_cover_letter_allotments')
            .select('allotment, count')
            .eq('user_id', userId)
            .single();

        if (error) {
            console.error('Error fetching allotment:', error);

            return NextResponse.json({
                error: {
                    message: 'Error fetching allotment'
                }
            }, {
                status: 500
            });
        }

        return NextResponse.json(data)
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
