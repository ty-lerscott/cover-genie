'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useSession } from '@clerk/nextjs';
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm, SubmitHandler } from "react-hook-form";

import dayjs from '@/lib/dayjs';
import getJobs from '@/lib/api/get-jobs';
import postJob from '@/lib/api/post-job';
import { Button } from "@/components/ui/button";
import JobsTable from '@/components/tables/jobs';
import AddJobForm from '@/components/forms/add-job';
import { getUserId, type Session } from '@/selectors';
import { type AddJobInputs } from '@/app/types/add-job-inputs';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import {
    AlertDialog,
    AlertDialogTitle,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog"

export default function DashboardJobsPage() {
    const { session } = useSession();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isAddJobOpen, setIsAddJobOpen] = useState(false);

    const { data: jobs, isLoading: isJobsLoading, refetch } = useQuery({
		queryKey: ['userJobs'],
		queryFn: () => getJobs(getUserId(session as Session)),
    });

    const {
        reset,
        control,
        register,
        handleSubmit,
        formState: { dirtyFields },
      } = useForm<AddJobInputs>({
        defaultValues: {
            status: 'Saved',
            dateAdded: dayjs().format("YYYY-MM-DD")
        }
    })

    const userId = getUserId(session as Session)

    const handleToggleAlert = () => {
        setIsAlertOpen(prevState => !prevState);
    }

    const handleToggleAddJobSidebar = () => {
        setIsAddJobOpen(prevState => !prevState);
    }

    const handleConfirmSidebarClose = () => {
        if (Object.keys(dirtyFields).length) {
            handleToggleAlert();
        } else {
            handleToggleAddJobSidebar();
        }
    }

    const handleConfirmClose = () => {
        handleToggleAlert();
        handleToggleAddJobSidebar();
        reset();
    }

    const handleCancelAddJob = () => {
        if (Object.keys(dirtyFields).length) {
            handleToggleAlert();
        } else {
            handleToggleAddJobSidebar();
            reset();
        }
    }

    const submitForm = useMutation({
        mutationFn: async ({userId, data}: {userId: string, data: AddJobInputs}) => {
            const resp = await postJob(userId, data)
            return resp;
        },
        onSuccess: () => {
            handleToggleAddJobSidebar();
            reset();
            refetch();
        }
    })

    const onSubmit: SubmitHandler<AddJobInputs> = (data: AddJobInputs) => {
        submitForm.mutate({userId, data})
    }

    return (
        <>
            <AlertDialog open={isAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete your
                            progress.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleToggleAlert}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmClose}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <section className="flex items-center justify-between">
                <div>
                    <h1 className="font-semibold text-xl">Job Tracker</h1>
                    <p className="mt-2 text-muted-foreground text-pretty">
                        Manage and track all your job applications
                    </p>
                </div>

                <Button size="lg" className="gap-2 cursor-pointer" onClick={handleToggleAddJobSidebar}>
                    <Plus className="size-5" />
                    Add Job
                </Button>
            </section>

            <JobsTable jobs={jobs} isJobsLoading={isJobsLoading} />

            <SidebarProvider
                defaultOpen={false}
                open={isAddJobOpen}
                style={{
                    //@ts-ignore
                    "--sidebar-width": "20rem",
                    "--sidebar-width-mobile": "20rem",
                }}
                >
                <Sidebar side="right">
                    <SidebarHeader>
                        <p className="font-semibold pl-2">Add Job</p>
                        <Button variant="ghost" onClick={handleConfirmSidebarClose}>
                            <X />
                        </Button>
                    </SidebarHeader>
                    <SidebarContent className="px-4">
                        <AddJobForm
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                            register={register}
                            handleCancelAddJob={handleCancelAddJob}
                            control={control}
                        />
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        </>
    )
}
