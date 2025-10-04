import Link from 'next/link';
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-secondary py-24 md:py-32">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-secondary-foreground md:text-6xl">
                    Your AI partner for effortless, personalized cover letters.
                    </h1>
                    <p className="mb-8 text-pretty text-lg text-secondary-foreground/80 md:text-xl">
                    Cover Genie helps you write tailored cover letters in minutes — saving you time and helping your
                    applications shine.
                    </p>
                    <Button size="lg" className="group" asChild>
                        <Link href="/signup">
                            Start Writing Now
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Subtle decorative element */}
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        </section>
    )
}
