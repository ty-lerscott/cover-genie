import Link from "next/link";
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="bg-secondary py-24 md:py-32">
        <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-secondary-foreground md:text-4xl">
                    Ready to create your next cover letter?
                </h2>
                <p className="mb-8 text-pretty text-lg text-secondary-foreground/80">Fast, personal, and powered by AI.</p>
                <Button size="lg" className="group" asChild>
                    <Link
                        href="/signup">
                        Start Writing Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
        </div>
    </section>
  )
}
