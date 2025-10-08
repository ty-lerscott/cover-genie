import type { ReactNode } from "react"

const PageHeader = ({
    title,
    children,
    description
}: {
    title: string;
    description: string;
    children: ReactNode;
}) => {
    return (
        <section className="flex items-center justify-between">
            <div>
                <h1 className="font-semibold text-xl">{title}</h1>
                <p className="mt-2 text-muted-foreground text-pretty">
                    {description}
                </p>
            </div>

            {children}
        </section>
    )
}

export default PageHeader;