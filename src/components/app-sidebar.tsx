'use client'

import Link from 'next/link';
import {
    Sidebar,
	useSidebar,
    SidebarFooter,
    SidebarContent,
} from "@/components/ui/sidebar"
import { useSession } from "@clerk/nextjs";
import { House, PcCase, Inbox, BriefcaseBusiness, User } from 'lucide-react';

import {isAdmin as isAdminSelector} from '@/selectors';
  
export default function AppSidebar() {
	const {toggleSidebar} = useSidebar();
	const {isSignedIn, session} = useSession();

	if (!isSignedIn) {
		return null;
	}

	const isAdmin = isAdminSelector(session);
	const anchorStyles = 'flex items-center gap-2 p-2 ml-2 transition hover:text-primary hover:fill-primary';

	return (
		<Sidebar>
			<div className="p-4">
				<div className="flex items-center gap-2">
					<div className="text-2xl font-bold text-foreground">
					Cover <span className="text-primary">Genie</span>
					</div>
				</div>
			</div>
			<SidebarContent>
				<Link href="/dashboard" onClick={toggleSidebar} className={anchorStyles}>
					<House size="1rem" />
					Home
				</Link>
				<Link href="/dashboard/cover-letters" onClick={toggleSidebar} className={anchorStyles}>
					<Inbox size="1rem" />
					Cover Letters
				</Link>
				<Link href="/dashboard/resumes" onClick={toggleSidebar} className={anchorStyles}>
					<PcCase size="1rem" />
					Resumes
				</Link>
				<Link href="/dashboard/jobs" onClick={toggleSidebar} className={anchorStyles}>
					<BriefcaseBusiness size="1rem" />
					Jobs
				</Link>
				{isAdmin ? (
					<Link href="/dashboard/users" onClick={toggleSidebar} className={anchorStyles}>
						<User size="1rem" />
						Users
					</Link>
				) : null}
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	)
  }