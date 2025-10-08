export type StatusUnion = 'Saved' | 'Applied' | 'Interviewing' | 'Rejected';

type History = {
    status: StatusUnion;
    updated_date: number;
}

export type Job = {
    id: string;
    status: StatusUnion;
    notes: string;
    date_added: string;
    link: string,
    history: History[],
    title: string;
    company: string;
    description: string;
}