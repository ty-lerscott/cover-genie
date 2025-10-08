import { X } from 'lucide-react';
import { type ReactNode } from 'react';

import { Button } from "@/components/ui/button";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"

const JobSidebar = ({
    title,
    isOpen,
    onClose,
    children,
}: {
    title: string;
    onClose(): void;
    isOpen: boolean;
    children: ReactNode;
}) => {
    return (
        <SidebarProvider
            defaultOpen={false}
            open={isOpen}
            style={{
                // @ts-ignore
                "--sidebar-width": "20rem",
                "--sidebar-width-mobile": "20rem",
            }}
        >
            <Sidebar side="right">
                <SidebarHeader>
                    <p className="font-semibold pl-2">{title}</p>
                    <Button variant="ghost" onClick={onClose}>
                        <X />
                    </Button>
                </SidebarHeader>
                <SidebarContent className="px-4">
                    {children}
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    )
}

export default JobSidebar;