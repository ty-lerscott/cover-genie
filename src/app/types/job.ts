export type StatusUnion = 'Saved' | 'Applied' | 'Interviewing' | 'Rejected';

export type Job = {
    id: string;
    status: StatusUnion;
    notes: string;
    date_added: string;
    link: string,
    title: string;
    company: string;
    description: string;
}