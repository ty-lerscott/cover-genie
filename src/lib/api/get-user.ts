const getUser = async (userId: string) => {
	try {
		const response = await fetch(`/api/users/${userId}`, {
			method: 'GET',
            cache: 'no-cache'
		});

		if (!response.ok) {
			throw new Error('Failed to fetch user');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching user:', error);
		throw error;
	}
}

export default getUser;