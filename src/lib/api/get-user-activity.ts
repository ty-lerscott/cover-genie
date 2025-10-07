const getUserActivity = async (userId: string) => {
	try {
		const response = await fetch(`/api/users/${userId}/activity`, {
			method: 'GET',
            cache: 'no-cache'
		});

		if (!response.ok) {
			throw new Error('Failed to fetch user activity');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching user activity:', error);
		throw error;
	}
}

export default getUserActivity;