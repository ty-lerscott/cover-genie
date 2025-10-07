import { Target } from "lucide-react";
import { useSession } from "@clerk/nextjs";
import { useQuery } from '@tanstack/react-query';

import getUser from '@/lib/api/get-user';
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { getUserId, type Session } from '@/selectors';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const UserGoal = () => {
    const { session } = useSession();
    const { data, isLoading } = useQuery<{goal: number, goal_limit: number}>({
        queryKey: ['user'],
        queryFn: () => getUser(getUserId(session as Session)),
    });

    if (!isLoading && !data) return null;

    const progress = ((data?.goal || 0) / (data?.goal_limit || 0)) * 100;
    const remaining = (data?.goal_limit || 0) - (data?.goal || 0);

    return (
        <Card>
            <CardHeader className="flex items-center">
                <Target size="1rem" className="stroke-primary" />
                <CardTitle>Your Monthly Goals</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Job Applications</span>
                    <span className="text-xs font-semibold">
                        {isLoading ? (
                            <Skeleton className="h-2 w-10" />
                         ) : `${data?.goal} of ${data?.goal_limit}`}
                    </span>
                </div>
                <Progress value={progress} className="my-2" />
                <span className="text-xs text-gray-500">
                    {isLoading ? (
                        <Skeleton className="h-2 w-40" />
                     ) : `${remaining} more to reach your goal`}
                </span>
            </CardContent>
        </Card>
    )
}

export default UserGoal;