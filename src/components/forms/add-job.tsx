import { type FormEventHandler } from 'react';
import { Controller, type Control, type UseFormRegister } from "react-hook-form";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { type AddJobInputs } from '@/app/types/add-job-inputs';
import {
    Select,
    SelectItem,
    SelectValue,
    SelectTrigger,
    SelectContent
} from '@/components/ui/select';

const AddJobForm = ({handleSubmit, onSubmit, register, handleCancelAddJob, control}: {
    handleSubmit: (onSubmit: (data: AddJobInputs) => unknown) => FormEventHandler<HTMLFormElement> | undefined
    onSubmit: (data: AddJobInputs) => void,
    register: UseFormRegister<AddJobInputs>
    handleCancelAddJob: () => void;
    control: Control<AddJobInputs, any, AddJobInputs>
}) => {
    return (
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
                                <SelectItem value="Saved">Saved</SelectItem>
                                <SelectItem value="Applied">Applied</SelectItem>
                                <SelectItem value="Interviewing">Interviewing</SelectItem>
                                <SelectItem value="Rejected">Rejected</SelectItem>
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
    )
}

export default AddJobForm;