'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useSession } from '@clerk/nextjs';
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query"

import dayjs from '@/lib/dayjs';
import getJobs from '@/lib/api/get-jobs';
import postJob from '@/lib/api/post-job';
import JobForm from "@/components/forms/job";
import { Button } from "@/components/ui/button";
import JobsTable from '@/components/tables/jobs';
import JobSidebar from '@/components/sidebars/job';
import { getUserId, type Session } from '@/selectors';
import { type JobInputs } from '@/app/types/job-inputs';
import DeleteProgressAlert from '@/components/alerts/delete-progress';


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
      } = useForm<JobInputs>({
        defaultValues: {
            status: 'Saved',
            date_added: dayjs().format("YYYY-MM-DD")
        }
    })

    const userId = getUserId(session as Session)
    const isDirty = Boolean(Object.keys(dirtyFields).length)

    const handleToggleAlert = () => {
        setIsAlertOpen(prevState => !prevState);
    }

    const handleToggleAddJobSidebar = () => {
        setIsAddJobOpen(prevState => !prevState);
    }

    const handleConfirmSidebarClose = () => {
        if (isDirty) {
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
        if (isDirty) {
            handleToggleAlert();
        } else {
            handleToggleAddJobSidebar();
            reset();
        }
    }

    const submitForm = useMutation({
        mutationFn: async ({userId, data}: {userId: string, data: JobInputs}) => {
            const resp = await postJob(userId, data)
            return resp;
        },
        onSuccess: () => {
            handleToggleAddJobSidebar();
            reset();
            refetch();
        }
    })

    const handleOnSubmit: SubmitHandler<JobInputs> = (data: JobInputs) => {
        submitForm.mutate({userId, data})
    }

    return (
        <>
            <DeleteProgressAlert
                isOpen={isAlertOpen}
                onCancel={handleCancelAddJob}
                onConfirm={handleConfirmClose}
            />

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

            <JobSidebar
                title="Add Job"
                isOpen={isAddJobOpen}
                onClose={handleConfirmSidebarClose}
            >
                <JobForm
                    isDirty={isDirty}
                    control={control}
                    register={register}
                    submitLabel="Add Job"
                    onCancel={handleCancelAddJob}
                    isPending={submitForm.isPending}
                    onSubmit={handleSubmit(handleOnSubmit)}
                />
            </JobSidebar>
        </>
    )
}
