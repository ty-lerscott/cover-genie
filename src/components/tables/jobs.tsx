"use client"

import { useState } from 'react';
import { useSession } from '@clerk/nextjs';
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
	X,
	ArrowUp,
	ArrowDown,
	ArrowUpDown,
	ExternalLink,
} from "lucide-react";

import dayjs from '@/lib/dayjs';
import patchJob from '@/lib/api/patch-job';
import { Card } from "@/components/ui/card";
import JobForm from "@/components/forms/job";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import JobSidebar from '@/components/sidebars/job';
import { Skeleton } from "@/components/ui/skeleton";
import { getUserId, type Session } from '@/selectors';
import type { StatusUnion, Job } from '@/app/types/job';
import { type JobInputs } from '@/app/types/job-inputs';
import DeleteProgressAlert from '@/components/alerts/delete-progress';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const statusColors: Record<StatusUnion, string> = {
	Rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
	Saved: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
	Applied: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
	Interviewing: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
}

const JobTableHeaders = [
	{
		sortKey: 'title',
		title: 'Job Title'
	},
	{
		sortKey: 'company',
		title: 'Company'
	},
	{
		sortKey: 'status',
		title: 'Status'
	},
	{
		sortKey: 'date_added',
		title: 'Date Added'
	}
]

const SkeletonTableRows = () => {
	return Array(4).fill(0).map((_, index) => {
		return (
			<TableRow key={index}>
				<TableCell className="h-10 text-center text-muted-foreground">
					<Skeleton className="h-4 w-40" />
				</TableCell>
				<TableCell className="h-10 text-center text-muted-foreground">
					<Skeleton className="h-4 w-40" />
				</TableCell>
				<TableCell className="h-10 text-center text-muted-foreground">
					<Skeleton className="h-4 w-30" />
				</TableCell>
				<TableCell className="h-10 text-center text-muted-foreground">
					<Skeleton className="h-4 w-30" />
				</TableCell>
				<TableCell className="h-10 text-center text-muted-foreground">
					<Skeleton className="h-4 w-4" />
				</TableCell>
			</TableRow>
		)
	});
}

const toNativeDate = (date: string | number) => dayjs(Number(date)).format('YYYY-MM-DD')

const JobsTable = ({jobs, isJobsLoading}: {jobs?: Job[], isJobsLoading: boolean}) => {
	const { session } = useSession();
	const queryClient = useQueryClient();
	const [job, setJob] = useState<Job | null>(null);
	const [sortBy, setSortBy] = useState("date_added");
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
	const [statusFilter, setStatusFilter] = useState<StatusUnion | "All">("All")
	const {
        reset,
        control,
        register,
        handleSubmit,
        formState: { dirtyFields, isDirty },
      } = useForm<JobInputs>({
        defaultValues: {
			...job
		}
    })

	const _userId = getUserId(session as Session)

	const handleOnStatusFilterChange = (value: StatusUnion | 'All') => {
		setStatusFilter(value)
	}

	const handleOnSortTable = (columnName: string) => () => {
		if (sortBy === columnName) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc")
		} else {
			setSortBy(columnName)
			setSortOrder("asc")
		}
	}

	const handleOnJobClick = (job: Job) => () => {
		setJob(job);
		reset({
			...job,
			date_added: toNativeDate(job.date_added)
		});
	}

	const handleConfirmClose = () => {
		setIsAlertOpen(false);
		setJob(null);
	}

	const handleConfirmSidebarClose = () => {
		if (Object.keys(dirtyFields).length) {
            setIsAlertOpen(true);
        } else {
            setJob(null);
        }
	}

	const submitForm = useMutation({
        mutationFn: async ({userId, data}: {userId: string, data: JobInputs}) => {
            const resp = await patchJob(userId, data)
            return resp;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
				queryKey: ['userJobs']
			});
			setJob(null);
        }
    })

	
	const handleOnSubmit: SubmitHandler<JobInputs> = (data: JobInputs) => {
        submitForm.mutate({userId: _userId, data})
    }

	const handleCancelEditJob = () => {
        if (isDirty) {
            setIsAlertOpen(true);
        } else {
			setJob(null);
            reset({
				...job,
				date_added: toNativeDate((job as Job).date_added)
			});
        }
    }

    const SortIcon = ({ column }: { column: string }) => {
        if (sortBy !== column) return <ArrowUpDown className="h-4 w-4" />
        return sortOrder === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
    }

	const filteredJobs = jobs?.filter((job) => statusFilter === "All" || job.status === statusFilter) || []

	const sortedJobs = [...filteredJobs].sort((a, b) => {
	  const aValue = a[sortBy as keyof Job]
	  const bValue = b[sortBy as keyof Job]
	  const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0
	  return sortOrder === "asc" ? comparison : -comparison
	})

    return (
		<>
			<JobSidebar
				title="Edit Job"
				isOpen={Boolean(job)}
				onClose={handleConfirmSidebarClose}
			>
				<JobForm 
					isDirty={isDirty}
					control={control}
					register={register}
					submitLabel="Update Job"
					onCancel={handleCancelEditJob}
					isPending={submitForm.isPending}
					onSubmit={handleSubmit(handleOnSubmit)}
				/>
			</JobSidebar>

			<Card className="overflow-hidden mt-4 gap-0 py-0">
				<DeleteProgressAlert
					isOpen={isAlertOpen}
					onConfirm={handleConfirmClose}
					onCancel={() => setIsAlertOpen(false)}
				/>
				<div className="border-b bg-muted/50 p-4">
					<div className="flex items-center gap-4">
						<span className="text-sm font-medium">Filter by status:</span>
						<Select value={statusFilter} onValueChange={handleOnStatusFilterChange}>
						<SelectTrigger className="w-[180px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">All Statuses</SelectItem>
							<SelectItem value="Saved">Saved</SelectItem>
							<SelectItem value="Applied">Applied</SelectItem>
							<SelectItem value="Interviewing">Interviewing</SelectItem>
							<SelectItem value="Rejected">Rejected</SelectItem>
						</SelectContent>
						</Select>
						<span className="ml-auto text-sm text-muted-foreground">
							{sortedJobs?.length || 0} {sortedJobs?.length === 1 ? "job" : "jobs"}
						</span>
					</div>
				</div>

				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								{JobTableHeaders.map(header => (
									<TableHead key={header.sortKey}>
										<Button
											size="sm"
											variant="ghost"
											onClick={handleOnSortTable(header.sortKey)}
											className="h-auto has-[>svg]:p-0 font-semibold"
										>
											{header.title}
											<SortIcon column={header.sortKey} />
										</Button>
									</TableHead>
								))}
								<TableHead>Link</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{isJobsLoading ? (<SkeletonTableRows />) : sortedJobs?.length === 0 ? (
								<TableRow>
									<TableCell colSpan={5} className="h-10 text-center text-muted-foreground">
										No jobs found.
									</TableCell>
								</TableRow>
							) : (sortedJobs || []).map((job) => (
								<TableRow key={job.id} onClick={handleOnJobClick(job)} className="cursor-pointer">
									<TableCell className="font-medium">{job.title}</TableCell>
									<TableCell className="text-muted-foreground">{job.company}</TableCell>
									<TableCell>
										<Badge variant="secondary" className={statusColors[job.status]}>
											{job.status}
										</Badge>
									</TableCell>
									<TableCell className="text-muted-foreground">
										{dayjs(Number(job.date_added)).format('MMM DD, YYYY')}
									</TableCell>
									<TableCell>
									{job.link ? (
										<Button
											size="sm"
											variant="ghost"
											onClick={() => {
												window.open(job.link, "_blank")
											}}
											className="h-auto p-1"
										>
											<ExternalLink className="h-4 w-4" />
										</Button>
									) : null}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</Card>
		</>
    )
}

export default JobsTable;
