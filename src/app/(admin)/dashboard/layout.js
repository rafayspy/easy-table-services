import SideNavBar from "@/components/nav/SideNavBar";
import Link from "next/link";

export default function DashboardLayout({ children }) {

    // dark:bg-slate-900 dark:text-slate-300
    return (
        <main className="dark:bg-slate-900 dark:text-slate-300 px-1 relative" >
            <div className="flex justify-between min-h-screen">
                <aside className="w-2/12 py-1.5 min-h-screen overflow-y-auto">
                    <Link href="/" className="prose-xl text-center font-semibold block mx-2">Dashboard</Link>
                    <SideNavBar />
                </aside>
                <main
                    className="w-10/12 max-h-full overflow-y-auto">
                    <div
                        className="min-h-screen border-dashed border-2 dark:border-slate-400 rounded-md m-2 p-5 hero-pattern">
                        {children}
                    </div>
                </main>
            </div>
        </main>

    );
}

