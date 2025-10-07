export type AddJobInputs = {
    title: string;
    companyName: string;
    status: 'saved' | 'applied' | 'interviewing' | 'rejected'
    link: string;
    dateAdded: string;
    notes: string;
    description: string;
}