import { UserButton } from "@clerk/nextjs";
import {useSidebar} from '@/components/ui/sidebar';

const DashboardNavigation = () => {
    const { toggleSidebar } = useSidebar();

    return (
        <header className="flex justify-between items-center p-4 bg-white border-b">
            <button onClick={toggleSidebar} className="md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
            <div className="flex-1"></div>
            <UserButton />
        </header>
    )
}

export default DashboardNavigation