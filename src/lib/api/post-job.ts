import dayjs from '@/lib/dayjs';
import { type AddJobInputs } from '@/app/types/add-job-inputs';

const postJob = async (userId: string, data: AddJobInputs) => {
	try {
		const dateAdded = dayjs(data.dateAdded).valueOf();

		const response = await fetch(`/api/users/${userId}/job`, {
			method: 'POST',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
				...data,
				dateAdded
			})
		});

		if (!response.ok) {
			throw new Error('Failed to add job');
		}

		const resp = await response.json();

		return resp;
	} catch (error) {
		console.error('Error adding job:', error);
		throw error;
	}
}

export default postJob;