'use client'

import Link from 'next/link';
import { useSession } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import {
	User,
	House,
	Inbox,
	PcCase,
	BriefcaseBusiness,
	MessageCircleQuestionMark
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { isAdmin as isAdminSelector, type Session } from '@/selectors';
import {
    Sidebar,
	useSidebar,
    SidebarFooter,
    SidebarContent,
} from "@/components/ui/sidebar";

const links = (isAdmin: boolean) => [
	{
		href: '/dashboard',
		text: 'Home',
		Icon: House
	},
	{
		href: '/dashboard/cover-letters',
		text: 'Cover Letters',
		Icon: Inbox
	},
	{
		href: '/dashboard/resumes',
		text: 'Resumes',
		Icon: PcCase
	},
	{
		href: '/dashboard/jobs',
		text: 'Jobs',
		Icon: BriefcaseBusiness
	},
	isAdmin ? {
		href: '/dashboard/users',
		text: 'Users',
		Icon: User
	} : undefined
]



export default function AppSidebar() {
	const isMobile = useIsMobile();
	const pathname = usePathname();
	const {toggleSidebar} = useSidebar();
	const {isSignedIn, session} = useSession();

	if (!isSignedIn) {
		return null;
	}

	const handleSidebarItemClick = () => {
		if (!isMobile) return;
		toggleSidebar();
	}

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
				{links(isAdminSelector(session as Session)).filter(Boolean).map(link => {
					const isActive = link?.href === pathname;
					const Icon = link?.Icon || House;
					
					return (
						<Link
							key={link?.href}
							href={link?.href || ''}
							onClick={handleSidebarItemClick}
							className={cn('flex items-center gap-2 p-2 ml-2 transition', isActive ? 'text-primary fill-primary' : 'hover:text-primary hover:fill-primary')}
						>
							<Icon size="1rem" />
							{link?.text}
						</Link>
					)
				})}
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