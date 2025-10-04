export function Footer() {
    return (
        <footer className="border-t border-border bg-secondary py-8">
            <div className="container mx-auto px-4">
                <div className="text-center text-sm text-secondary-foreground/60">
                © {new Date().getFullYear()} Cover Genie. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
  