import { type StatusUnion } from './job';

export type AddJobInputs = {
    title: string;
    companyName: string;
    status: StatusUnion;
    link: string;
    dateAdded: string;
    notes: string;
    description: string;
}