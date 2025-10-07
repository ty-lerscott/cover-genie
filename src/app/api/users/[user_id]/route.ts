import { NextRequest, NextResponse } from 'next/server';

import supabase from '@/lib/supabase';

export async function GET(
  req: NextRequest,
  { params }: { params: { user_id: string } }
) {
  try {
    const {user_id: userId} = await params;

    if (!userId) {
      return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error('Error fetching user:', error);

        return NextResponse.json({
            error: {
                message: 'Error fetching user'
            }
        }, {
            status: 500
        });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Error fetching user' }, { status: 500 });
  }
}
