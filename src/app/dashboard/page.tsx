'use client'

import Link from "next/link"
import { useSession } from "@clerk/nextjs";
import { Upload, Sparkles } from "lucide-react";

import UserPlan from '@/components/user-plan';
import UserGoal from '@/components/user-goal';
import { Button } from "@/components/ui/button"
import PageHeader from '@/components/page-header';
import UserActivity from '@/components/user-activity';
import { type Session, getUserFirstName } from '@/selectors';

export default function DashboardPage() {
    const { session } = useSession();

    const firstName = getUserFirstName(session as Session);

    return (
        <>       
            <PageHeader
                title={`Welcome back${firstName ? `, ${firstName}`: ''}`}
                description="Here's what's new and what you can do next."
            >
                <div className="flex mt-4 gap-2">
                    <Button asChild variant="default">
                        <div className="flex items-center gap-2">
                            <Sparkles size="1rem" />

                            <Link href="/dashboard/cover-letters">Generate a Cover Letter</Link>
                        </div>
                    </Button>

                    <Button asChild variant="outline">
                        <div className="flex items-center gap-2">
                            <Upload size="1rem" />
                            
                            <Link href="/dashboard/resumes">Upload a Resume</Link>
                        </div>
                    </Button>
                </div>
            </PageHeader>

            <section className="mt-4 flex gap-4">
                <UserActivity />

                <div className="flex-1 flex flex-col gap-4">
                    <UserPlan />

                    <UserGoal />
                </div>
            </section>

            <p className="mt-8 text-center text-sm text-gray-500">Every great job starts with a great cover letter — you've got this.</p>
        </>
    )
}
