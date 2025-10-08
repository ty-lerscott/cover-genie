"use client"

import { useState } from 'react';
import { ExternalLink, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { StatusUnion, Job } from '@/app/types/job';
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
		sortKey: 'dateAdded',
		title: 'Date Added'
	}
]

const JobsTable = ({jobs, isJobsLoading}: {jobs?: Job[], isJobsLoading: boolean}) => {
	const [ sortBy, setSortBy ] = useState("dateAdded");
	const [ sortOrder, setSortOrder ] = useState<"asc" | "desc">("desc");
	const [statusFilter, setStatusFilter] = useState<StatusUnion | "All">("All")

    const SortIcon = ({ column }: { column: string }) => {
        if (sortBy !== column) return <ArrowUpDown className="h-4 w-4" />
        return sortOrder === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
    }

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
		console.log(job);
	}

	const filteredJobs = jobs?.filter((job) => statusFilter === "All" || job.status === statusFilter) || []

	const sortedJobs = [...filteredJobs].sort((a, b) => {
	  const aValue = a[sortBy as keyof Job]
	  const bValue = b[sortBy as keyof Job]
	  const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0
	  return sortOrder === "asc" ? comparison : -comparison
	})

    return (
        <Card className="overflow-hidden mt-4 gap-0 py-0">
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
						<SelectItem value="Interview">Interview</SelectItem>
						<SelectItem value="Rejected">Rejected</SelectItem>
					</SelectContent>
					</Select>
					<span className="ml-auto text-sm text-muted-foreground">
						{jobs?.length || 0} {jobs?.length === 1 ? "job" : "jobs"}
					</span>
				</div>
            </div>

            <div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							{JobTableHeaders.map(header => (
								<TableHead>
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
						{sortedJobs?.length === 0 ? (
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
								{new Date(job?.date_added).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric",
								})}
								</TableCell>
								<TableCell>
								{job.link && (
									<Button
										variant="ghost"
										size="sm"
										onClick={(e) => {
											e.stopPropagation()
											window.open(job.link, "_blank")
										}}
										className="h-auto p-1"
									>
									<ExternalLink className="h-4 w-4" />
									</Button>
								)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
            </div>
        </Card>
    )
}

export default JobsTable;
