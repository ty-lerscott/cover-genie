import dayjs from '@/lib/dayjs';
import { type JobInputs } from '@/app/types/job-inputs';

const patchJob = async (userId: string, data: JobInputs) => {
	try {
		const date_added = dayjs(data.date_added).valueOf();

		const response = await fetch(`/api/users/${userId}/job`, {
			method: 'PATCH',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
				...data,
				date_added
			})
		});

		if (!response.ok) {
			throw new Error('Failed to update job');
		}

		const resp = await response.json();

		return resp;
	} catch (error) {
		console.error('Error updating job:', error);
		throw error;
	}
}

export default patchJob;