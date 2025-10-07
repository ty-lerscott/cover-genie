import { useSession } from "@clerk/nextjs";
import { useQuery } from '@tanstack/react-query';
import { Mail, FileText, Briefcase } from "lucide-react";

import dayjs from '@/lib/dayjs';
import { Skeleton } from "@/components/ui/skeleton";
import { getUserId, type Session } from '@/selectors';
import getUserActivity from '@/lib/api/get-user-activity';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type ActivityType = {
    id: number;
    status: string;
    user_id: string;
    category: string;
    timestamp: string;
    description: string;
}

const Icons = {
    'cover letter': Mail,
    resume: FileText,
    job: Briefcase,
}

const Loading = () => {
    return Array(4).fill(0).map((_, index) => {
        return (
            <div
                key={index}
                className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Skeleton className="size-10" />
                </div>
                <div className="flex-1 space-y-1">
                        
                    <Skeleton className="h-4 w-full" />

                    <div className="flex items-center gap-2">
                        <span><Skeleton className="h-4 w-10" /></span>
                        <span>•</span>
                        <span>
                            <Skeleton className="h-4 w-10" />
                        </span>
                    </div>
                </div>
            </div>
        )
    })
}

const UserActivity = () => {
    const { session } = useSession();
    const { data, isLoading } = useQuery<ActivityType[]>({
        queryKey: ['userActivity'],
        queryFn: () => getUserActivity(getUserId(session as Session)),
    });

    if (!isLoading && !data) return null;

    return (
        <Card className="flex-2">
            <CardHeader className="font-semibold">
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="space-y-3">
                {isLoading ? <Loading /> : (data || []).map((activity) => {
                    const Icon = Icons[activity.category as keyof typeof Icons]
                    return (
                        <div
                            key={activity.id}
                            className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 space-y-1">
                            <p className="font-medium leading-none text-balance">{activity.description}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{dayjs(activity.timestamp).fromNow()}</span>
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
    )
}

export default UserActivity;