'use client'

import { useEffect } from 'react';
import { useSession } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

import { isAdmin as isAdminSelector, type Session } from '@/selectors';

export default function DashboardUsersPage() {
    const router = useRouter();
    const { session } = useSession();
    const isAdmin = isAdminSelector(session as Session);

    useEffect(() => {
        if (session && !isAdmin) {
            router.push('/dashboard')
        }
    }, [session, isAdmin])

    if (!isAdmin) {
        return null;
    }
    
    return (
        <h1>Users Page</h1>
    )
}
