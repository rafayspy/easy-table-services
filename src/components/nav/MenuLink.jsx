"use client";
import { usePathname } from "next/navigation";
import Link from 'next/link';

function MenuLink({ link, label }) {
    const pathname = usePathname();
    const isActive = pathname === link;

    return (
        <Link
            href={link}
            className={`${isActive ? "text-violet-500 dark:text-violet-400" : ""} mr-5 text-lg dark:text-slate-400 hover:text-violet-700 dark:hover:text-violet-400 font-medium `}
        >
            {label}
        </Link>
    );
}

export default MenuLink;
