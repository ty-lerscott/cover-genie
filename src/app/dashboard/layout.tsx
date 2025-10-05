'use client';

import { useEffect } from "react";
import { useSession } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavigation from "@/components/dashboard-navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const router = useRouter();
	const { isLoaded, isSignedIn } = useSession();

	useEffect(() => {
		if (isLoaded && !isSignedIn) {
			router.push('/');
		}
	}, [isSignedIn, router, isLoaded])

	if (!isLoaded || !isSignedIn) {
		return (
			<div className="flex justify-center items-center h-full bg-background">
				<div className="animate-spin rounded-full h-28 w-28 border-t-2 border-b-2 border-primary"></div>
			</div>
		)
	}

	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="flex h-screen w-full bg-gray-100">
				<div className="flex-1 flex flex-col overflow-hidden">
					<DashboardNavigation />
					<main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
						{children}
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}
