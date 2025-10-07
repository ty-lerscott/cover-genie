'use client'

import Link from "next/link"
import { useSession } from "@clerk/nextjs";
import {
    Mail,
    Upload,
    FileText,
    Sparkles,
    Briefcase,
} from "lucide-react";

import UserPlan from '@/components/user-plan';
import UserGoal from '@/components/user-goal';
import { Button } from "@/components/ui/button"
import { type Session, getUserFirstName } from '@/selectors';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const activities = [
    {
      id: 1,
      type: "cover-letter",
      icon: Mail,
      title: "Cover Letter – Product Designer at Figma",
      date: "2 days ago",
      status: "Draft",
    },
    {
      id: 2,
      type: "resume",
      icon: FileText,
      title: "Resume – Updated Skills Section",
      date: "5 days ago",
      status: "Completed",
    },
    {
      id: 3,
      type: "job",
      icon: Briefcase,
      title: "Job Saved – Senior UX Designer at Notion",
      date: "1 week ago",
      status: "Saved",
    },
    {
      id: 4,
      type: "cover-letter",
      icon: Mail,
      title: "Cover Letter – UX Designer at Stripe",
      date: "1 week ago",
      status: "Submitted",
    },
]

export default function DashboardPage() {
    const { session } = useSession();

    const firstName = getUserFirstName(session as Session);

    return (
        <>
            <section>
                <h1 className="font-semibold text-xl">Welcome back{firstName ? `, ${firstName}`: ''}</h1>
                <p>Here's what's new and what you can do next.</p>
                <div className="flex mt-4 gap-2">
                    <Button asChild variant="default">
                        <div className="flex items-center gap-2">
                            <Sparkles size="1rem" />
                            <Link href="/dashboard/cover-letters">Generate a Cover Letter</Link>
                        </div>
                    </Button>
                    <Button asChild variant="secondary">
                        <div className="flex items-center gap-2">
                            <Upload size="1rem" />
                            <Link href="/dashboard/resumes">Upload a Resume</Link>
                        </div>
                    </Button>
                </div>
            </section>
            <section className="mt-4 flex gap-4">
                <Card className="flex-2">
                    <CardHeader className="font-semibold">
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-3">
                        {activities.map((activity) => {
                            const Icon = activity.icon
                            return (
                                <div
                                    key={activity.id}
                                    className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                    <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                    <p className="font-medium leading-none text-balance">{activity.title}</p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>{activity.date}</span>
                                        <span>•</span>
                                        <span className="text-primary">{activity.status}</span>
                                    </div>
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                    </CardContent>
                </Card>
                <div className="flex-1 flex flex-col gap-4">
                    <UserPlan />

                    <UserGoal />
                </div>
            </section>
            <p className="mt-8 text-center text-sm text-gray-500">Every great job starts with a great cover letter — you've got this.</p>
        </>
    )
}
