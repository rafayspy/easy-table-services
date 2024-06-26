import SideNavBar from "@/components/nav/SideNavBar";
import Link from "next/link";
import {
    HomeIcon,
    PresentationChartBarIcon
} from "@heroicons/react/24/solid";

export default function DashboardLayout({ children }) {

    const navItems = [
        {
            navTitle: "Home",
            link: "/customer-dashboard/home",
            icon: <HomeIcon className="md:h-6 md:w-6 h-4 w-4" />,
        },
        {
            navTitle: "Orders",
            link: "/customer-dashboard/orders",
            icon: <PresentationChartBarIcon className="md:h-6 md:w-6 h-4 w-4" />,
        },
       
    ]

    // dark:bg-slate-900 dark:text-slate-300
    return (
        <main className="dark:bg-slate-900 dark:text-slate-300 px-1 relative" >
            <div className="flex justify-between min-h-screen">
                <aside className="w-2/12 py-1.5 min-h-screen overflow-y-auto">
                    <Link href="/" className="prose-xl text-center font-semibold block mx-2">Dashboard</Link>
                    <SideNavBar navItems={navItems} />
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
