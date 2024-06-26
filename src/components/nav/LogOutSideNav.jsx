'use client'
import CONSTANTS from "@/assets/constants";
import {
    ArrowLeftStartOnRectangleIcon
} from "@heroicons/react/24/solid";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";


function LogOutSideNav() {
    const router = useRouter()
    const logout = async () => {
        try {
            const res = await axios.post(CONSTANTS?.baseUrl + '/api/users/logout')
            console.log(res?.data)
            if (res?.data?.success) {
                toast.success(res.data?.message)
                router.refresh()
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <>
            <Toaster />
            <li className='font-medium block px-1 rounded-sm my-1 cursor-pointer '>
                <button
                    onClick={logout}
                    className="flex flex-col justify-center items-center py-2 sm:flex-row sm:items-center sm:justify-start ">
                    <div className="text-xs md:text-base ">
                        <ArrowLeftStartOnRectangleIcon className="md:h-6 md:w-6 h-4 w-4 text-rose-700" />
                    </div>
                    <span className="pt-1 text-xs md:text-base sm:ml-4 sm:pt-0 text-rose-700 font-bold">Log out</span>
                </button>
            </li>
        </>
    );
}

export default LogOutSideNav;