import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
    return (
        <div>
            <header>
                <UserButton />
            </header>
            <h1>Dashboard Page</h1>

            <Link href="/">Homepage</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/about">About</Link>
            <Link href="/login">Login</Link>
        </div>
    );
  }
  