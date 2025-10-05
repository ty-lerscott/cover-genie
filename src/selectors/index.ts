export const isAdmin = (state?: {
    user: {
        publicMetadata: {
            scope?: string
        }
    }
}): boolean => state?.user.publicMetadata?.scope === 'admin'