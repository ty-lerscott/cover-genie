'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SignUp, useSession } from "@clerk/nextjs";

export default function Page() {
	const router = useRouter();
	const { isLoaded, isSignedIn } = useSession();

	useEffect(() => {
		if (isSignedIn) {
			router.push('/dashboard');
		}
	}, [isSignedIn, router])

	if (!isLoaded) {
		return (
			<div className="flex justify-center items-center h-full bg-primary">
				<div className="animate-spin rounded-full h-28 w-28 border-t-2 border-b-2 border-background"></div>
			</div>
		);
	}

	if (isLoaded && !isSignedIn) {
		return (
			<div className="flex justify-center items-center h-full bg-primary">
				<SignUp />
			</div>
		)
	}

	return null;
}