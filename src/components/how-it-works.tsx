import { FileText, Sparkles, Send } from "lucide-react"

const steps = [
  {
    icon: FileText,
    title: "Tell Cover Genie about the job you want.",
    description: "Share the job details and your experience — no need to start from scratch.",
  },
  {
    icon: Sparkles,
    title: "Watch AI craft a letter that sounds like you.",
    description: "Our AI analyzes your input and creates a personalized, professional cover letter.",
  },
  {
    icon: Send,
    title: "Edit, tweak, and send — all in minutes.",
    description: "Make final adjustments and download your polished cover letter instantly.",
  },
]

export function HowItWorksSection() {
    return (
        <section id="how-it-works" className="py-24 md:py-32">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="mb-16 text-balance text-3xl font-bold tracking-tight md:text-5xl">
                    Personalized. Fast. Effortless.
                    </h2>

                    <div className="grid gap-12 md:gap-16">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                                <step.icon className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="mb-3 text-balance text-xl font-semibold md:text-2xl">{step.title}</h3>
                            <p className="text-pretty text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
