'use client';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useSession } from '@clerk/nextjs';
import { useMutation } from "@tanstack/react-query"
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import dayjs from '@/lib/dayjs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import postAddJob from '@/lib/api/post-add-job';
import { Textarea } from "@/components/ui/textarea"
import { getUserId, type Session } from '@/selectors';
import { type AddJobInputs } from '@/app/types/add-job-inputs';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import {
    Select,
    SelectItem,
    SelectValue,
    SelectTrigger,
    SelectContent
} from '@/components/ui/select';
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
    const [isAddJobOpen, setIsAddJobOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const {
        reset,
        control,
        register,
        handleSubmit,
        formState: { dirtyFields },
      } = useForm<AddJobInputs>({
        defaultValues: {
            status: 'saved',
            dateAdded: dayjs().format("YYYY-MM-DD")
        }
    })

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
            const resp = await postAddJob(userId, data)
            return resp;
        },
        onSuccess: () => {
            handleToggleAddJobSidebar();
            reset();
        }
    })

    const onSubmit: SubmitHandler<AddJobInputs> = (data: AddJobInputs) => {
        const userId = getUserId(session as Session)

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
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Job Title <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    {...register('title', {required: true})}
                                    placeholder="e.g. Senior Frontend Developer"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="companyName">
                                    Company Name <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    {...register('companyName', {required: true})}
                                    placeholder="e.g. TechCorp"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger id="status">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="saved">Saved</SelectItem>
                                                <SelectItem value="applied">Applied</SelectItem>
                                                <SelectItem value="interviewing">Interviewing</SelectItem>
                                                <SelectItem value="rejected">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <div className="space-y-2 mt-4">
                                    <Label htmlFor="companyName">
                                        Job Link
                                    </Label>
                                    <Input
                                        {...register('link')}
                                        placeholder="https://example.com/job-posting"
                                    />
                                </div>

                                <div className="space-y-2 mt-4">
                                    <Label htmlFor="dateAdded">Date Added</Label>
                                    <Input type="date" {...register('dateAdded', { required: true })} />
                                </div>

                                <div className="space-y-2 mt-4">
                                    <Label htmlFor="description">Job Description</Label>
                                    <Textarea
                                        placeholder="Add job description here..."
                                        {...register("description", { required: true })}
                                    />
                                </div>

                                <div className="space-y-2 mt-4">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea
                                        placeholder="Add your notes here..."
                                        {...register("notes")}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 mt-2">
                                <Button type="submit">Add Job</Button>
                                <Button variant="outline" type="button" onClick={handleCancelAddJob}>Cancel</Button>
                            </div>
                        </form>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        </>
    )
}
