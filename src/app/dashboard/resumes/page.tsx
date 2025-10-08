'use client';

import { Plus } from 'lucide-react';

import { Button } from "@/components/ui/button";
import PageHeader from '@/components/page-header';

export default function DashboardResumesPage() {

    const handleToggleResume = () => {}

    return (
        <>
            <PageHeader
                title="Resumes"
                description="Upload and manage your resume versions for different job applications"
            >
                <Button size="lg" className="gap-2 cursor-pointer" onClick={handleToggleResume}>
                    <Plus className="size-5" />
                    Upload Resume
                </Button>
            </PageHeader>
        </>
    )
}
