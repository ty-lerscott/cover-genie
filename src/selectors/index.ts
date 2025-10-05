export type Session = {
    user: {
        firstName?: string;
        publicMetadata: {
            scope?: string
        }
    }
}

export const isAdmin = (state?: Session): boolean => state?.user.publicMetadata?.scope === 'admin'

export const getUserFirstName = (state: Session): string => state?.user?.firstName || ''