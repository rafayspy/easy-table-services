import CartArea from "./CartArea"
import FoodCard from "@/components/card/FoodCard"
import HeadingDashboard from "@/components/typography/HeadingDashboard"
import { getAllMenuItems } from "@/query/query";
import Link from "next/link"

export const dynamic = 'force-dynamic';

const POS = async () => {
    const data = await getAllMenuItems()
    return (
        <div
            className=" flex justify-between container mx-auto"
        >
            <aside className="w-2/3">
                <div className="">
                    <Link className='btn btn-sm btn-error absolute top-3 left-5' href='/dashboard/home'>&#8592; Back</Link>
                    <HeadingDashboard>Choose Food Items</HeadingDashboard>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
                    {
                        data?.map(food => <FoodCard key={food?.key.toString()} food={JSON.stringify(food)} />)
                    }
                </div>
            </aside>
            <CartArea />
        </div>
    )
}

export default POS