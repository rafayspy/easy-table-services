import HeadingDashboard from "@/components/typography/HeadingDashboard"
import connectToDB from "@/config/connectDb"
import Category from "@/models/category.model"
import MenuItems from "@/models/menuItems.model"
import Order from "@/models/order.model"
import GetUserFromCookie from "@/utils/GetUserFromCookie"
// import GetUserFromCookie from "@/utils/GetUserFromCookie.js"
import {
    BookmarkIcon, TagIcon, ArrowUpRightIcon, ChartBarIcon
} from '@heroicons/react/24/solid'
import Link from 'next/link'

const Page = async () => {
    connectToDB()
    const user = await GetUserFromCookie()

    const categoryCount = await Category.countDocuments()
    const menusCount = await MenuItems.countDocuments()
    const orders = await Order.countDocuments({
        OrderedBy: user?._id
    })
    
    return (
        <div>
            <HeadingDashboard>
                Dashboard!!!
            </HeadingDashboard>
            <section className='grid grid-cols-3 gap-x-5'>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <TagIcon className='h-14 w-14 text-accent' />
                        <h2 className="card-title">Categories : {String(categoryCount).padStart(2, '0')}</h2>
                        <p className='text-justify'>You will find all the categories here in this section.
                            you can add or delete categories too! </p>
                        <div className="card-actions justify-end">
                            <Link href='/' className="btn btn-primary btn-sm mt-3">Buy Now
                                <ArrowUpRightIcon className='h-3 w-3' />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card  bg-base-100 shadow-xl">
                    <div className="card-body">
                        <BookmarkIcon className='h-14 w-14 text-error' />
                        <h2 className="card-title">Menu Items: {String(menusCount).padStart(2, '0')}</h2>
                        <p className='text-justify'>You will find all the Menu Items here in this section. you can add or delete Menu Items too! </p>
                        <div className="card-actions justify-end">
                            <Link href='/' className="btn btn-sm btn-primary">See More
                                <ArrowUpRightIcon className='h-3 w-3' />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card  bg-base-100 shadow-xl">
                    <div className="card-body">
                        <ChartBarIcon className='h-14 w-14 text-violet-500' />
                        <h2 className="card-title">Total Orders: {String(orders).padStart(2, '0')}</h2>
                        <p className='text-justify'>You will find all the Orders here in this section, you can add or delete Orders too! </p>
                        <div className="card-actions justify-end">
                            <Link href='/customer-dashboard/orders' className="btn btn-sm btn-primary">See Orders
                                <ArrowUpRightIcon className='h-3 w-3' />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page