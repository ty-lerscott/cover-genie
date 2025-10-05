'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession, UserButton } from "@clerk/nextjs";

export function Navigation() {
    const { isSignedIn } = useSession();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-foreground">
                    Cover <span className="text-primary">Genie</span>
                    </div>
                </Link>

                <div className="flex items-center gap-6">
                    <Link
                        href="#how-it-works"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        How It Works
                    </Link>
                    {isSignedIn ? (
                        <>
                            <Button size="sm" asChild>
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                            <UserButton />
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                                Login
                            </Link>
                            <Button size="sm" asChild>
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </>
                    )}
                    
                </div>
            </div>
        </nav>
    )
}
