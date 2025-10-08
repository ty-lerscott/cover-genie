import { LoaderCircle } from "lucide-react";
import type { FormEventHandler } from 'react';
import { Controller, type Control, type UseFormRegister } from "react-hook-form";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { type JobInputs } from '@/app/types/job-inputs';
import {
    Select,
    SelectItem,
    SelectValue,
    SelectTrigger,
    SelectContent
} from '@/components/ui/select';

const JobForm = ({
    isDirty,
    control,
    register,
    onSubmit,
    onCancel,
    isPending,
    submitLabel,
}: {
    isDirty: boolean;
    onCancel(): void;
    isPending: boolean;
    submitLabel: string;
    register: UseFormRegister<JobInputs>
    control: Control<JobInputs, any, JobInputs>,
    onSubmit: FormEventHandler<HTMLFormElement>
}) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
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
                <Label htmlFor="company">
                    Company Name <span className="text-destructive">*</span>
                </Label>
                <Input
                    {...register('company', {required: true})}
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
                                <SelectItem value="Saved">Saved</SelectItem>
                                <SelectItem value="Applied">Applied</SelectItem>
                                <SelectItem value="Interviewing">Interviewing</SelectItem>
                                <SelectItem value="Rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <div className="space-y-2 mt-4">
                    <Label htmlFor="link">
                        Job Link
                    </Label>
                    <Input
                        {...register('link')}
                        placeholder="https://example.com/job-posting"
                    />
                </div>

                <div className="space-y-2 mt-4">
                    <Label htmlFor="date_added">Date Added</Label>
                    <Input type="date" {...register('date_added', { required: true })} />
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
                <Button type="submit" className="relative" disabled={!isDirty}>
                {isPending ? <LoaderCircle className="animate-spin absolute right-2/3" /> : null}
                    {submitLabel}
                </Button>
                <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
            </div>
        </form>
    )
}

export default JobForm;