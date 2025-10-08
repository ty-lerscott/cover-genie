import { type StatusUnion } from './job';

export type JobInputs = {
    id?: string;
    title: string;
    company: string;
    status: StatusUnion;
    link: string;
    date_added: string;
    notes: string;
    description: string;
}