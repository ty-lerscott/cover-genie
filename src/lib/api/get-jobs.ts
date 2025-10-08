import { type Job } from '@/app/types/job';

const getUserJobs = async (userId: string): Promise<Job[]> => {
	try {
		const response = await fetch(`/api/users/${userId}/jobs`, {
			method: 'GET',
            cache: 'no-cache'
		});

		if (!response.ok) {
			throw new Error('Failed to fetch user jobs');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching user jobs:', error);
		throw error;
	}
}

export default getUserJobs;