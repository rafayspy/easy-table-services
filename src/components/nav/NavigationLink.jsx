"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationItem({ item }) {
  const pathname = usePathname();
  const isActive = pathname.includes(item.link);

  return (
    <Link
      href={`${item.link}`}
      className={`font-medium  block px-1 rounded-sm my-1 ${isActive
        ? "bg-gradient-to-r text-white from-sky-600 to-indigo-600 hover:bg-gradient-to-r hover:from-sky-600/80 hover:to-indigo-600/80"
        : "dark:bg-gray-800 dark:hover:bg-gray-700/80 bg-gray-500"
        }`}
    >
      <div className="flex flex-col justify-center items-center py-2 sm:flex-row sm:items-center sm:justify-start ">
        <div className="text-xs md:text-base ">{item.icon}</div>
        <span className="pt-1 text-xs md:text-base sm:ml-4 sm:pt-0">{item.navTitle}</span>
      </div>
    </Link>
  );
}
