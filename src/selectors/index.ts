export type Session = {
    user: {
        id: string;
        firstName?: string;
        publicMetadata: {
            scope?: string
        }
    }
}

export type Subscription = {
    data: {
        subscriptionItems: {
            plan: {
                isDefault: boolean,
                name: string,
                description: string,
                slug: 'free' | 'basic' | 'pro' | 'unlimited',
            }
        }[]
    }
}

export const isAdmin = (state?: Session): boolean => state?.user.publicMetadata?.scope === 'admin'

export const getUserId = (state: Session): string => state?.user.id
export const getUserFirstName = (state: Session): string => state?.user?.firstName || ''

export const getSubscriptionTier = (state: Subscription): string => {
    const activeSubscription = (state || {})?.data?.subscriptionItems.find(item => item.plan.isDefault) || (state || {})?.data?.subscriptionItems[0]

    return activeSubscription ? activeSubscription.plan.name : 'Free'; 
}