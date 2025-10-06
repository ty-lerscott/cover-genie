'use client';

import { Crown } from "lucide-react";
import { useSession } from "@clerk/nextjs";
import { useQuery } from '@tanstack/react-query';
import { useSubscription } from '@clerk/nextjs/experimental';

import { Button } from "@/components/ui/button"
import getAllotment from "@/lib/api/get-allotment";
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import {
    getUserId,
    type Session,
    type Subscription,
    getSubscriptionTier
} from '@/selectors';
import Link from 'next/link';

const UserPlan = () => {
    const { session } = useSession();
    const subscription = useSubscription();
    const { data, isLoading } = useQuery<{allotment: number, count: number}>({
        queryKey: ['userAllotment'],
        queryFn: () => getAllotment(getUserId(session as Session)),
    });

    const tier = getSubscriptionTier(subscription as unknown as Subscription);

    if (!isLoading && !data) return null;

    const isFree = tier.toLowerCase() === 'free';
    const isUnlimited = tier.toLowerCase() === 'unlimited';
    const progressAmount = isUnlimited ? 100 : ((data?.count || 0)/(data?.allotment || 0))*100;
    const remaining = isUnlimited ? -1 : (data?.allotment || 0) - (data?.count || 0)

    return (
        <Card>
            <CardHeader className="flex items-center">
                <Crown size="1rem" className="stroke-primary" />
                <CardTitle>Your Plan</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">{isLoading ? (
                        <Skeleton className="h-4 w-20" />
                    ) : `${tier} Plan`}</span>
                    <span className="text-xs font-semibold">
                        {isLoading ? <Skeleton className="h-4 w-20" /> : (
                           `${data?.count} of ${isUnlimited ? 'unlimited' : data?.allotment} letters`
                        )}
                    </span>
                </div>
                <Progress value={progressAmount} className="my-2" />
                <span className="text-xs text-gray-500">{
                    isLoading ? (
                        <Skeleton className="h-2 w-40" />
                     ) : `${remaining < 0 ? 'Unlimited': remaining} cover letter${remaining !== 1 ? 's' : ''} remaining${isFree ? '' : 'this month'}`}
                </span>

                <Button variant="outline" className="mt-4 w-full" asChild>
                    <Link href="/dashboard/upgrade">
                        Upgrade Plan
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}

export default UserPlan;