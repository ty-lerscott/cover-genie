import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { CTASection } from "@/components/cta-section"
import { HeroSection } from "@/components/hero-section"
import { StorySection } from "@/components/story-section"
import { HowItWorksSection } from "@/components/how-it-works"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <StorySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
