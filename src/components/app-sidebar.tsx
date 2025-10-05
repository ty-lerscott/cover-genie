'use client'

import Link from 'next/link';
import { useSession } from "@clerk/nextjs";
import {
	User,
	House,
	Inbox,
	PcCase,
	BriefcaseBusiness,
	MessageCircleQuestionMark
} from 'lucide-react';

import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { isAdmin as isAdminSelector, type Session } from '@/selectors';
import {
    Sidebar,
	useSidebar,
    SidebarFooter,
    SidebarContent,
} from "@/components/ui/sidebar"

export default function AppSidebar() {
	const isMobile = useIsMobile();
	const {toggleSidebar} = useSidebar();
	const {isSignedIn, session} = useSession();

	if (!isSignedIn) {
		return null;
	}

	const handleSidebarItemClick = () => {
		if (!isMobile) return;
		toggleSidebar();
	}

	const isAdmin = isAdminSelector(session as Session);
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
				<Link href="/dashboard" onClick={handleSidebarItemClick} className={anchorStyles}>
					<House size="1rem" />
					Home
				</Link>
				<Link href="/dashboard/cover-letters" onClick={handleSidebarItemClick} className={anchorStyles}>
					<Inbox size="1rem" />
					Cover Letters
				</Link>
				<Link href="/dashboard/resumes" onClick={handleSidebarItemClick} className={anchorStyles}>
					<PcCase size="1rem" />
					Resumes
				</Link>
				<Link href="/dashboard/jobs" onClick={handleSidebarItemClick} className={anchorStyles}>
					<BriefcaseBusiness size="1rem" />
					Jobs
				</Link>
				{isAdmin ? (
					<Link href="/dashboard/users" onClick={handleSidebarItemClick} className={anchorStyles}>
						<User size="1rem" />
						Users
					</Link>
				) : null}
			</SidebarContent>
			<SidebarFooter>
				<Button asChild variant="ghost" className="flex items-center gap-2">
					<div>
						<MessageCircleQuestionMark size="1rem" />
						Feedback
					</div>
				</Button>
			</SidebarFooter>
		</Sidebar>
	)
  }