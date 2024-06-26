import HeadingDashboard from '@/components/typography/HeadingDashboard'
import connectToDB from '@/config/connectDb'
import Category from '@/models/category.model'
import MenuItems from '@/models/menuItems.model'
import User from '@/models/user.model'
import { UserGroupIcon, BookmarkIcon, TagIcon, ArrowUpRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export const dynamic = 'force-dynamic';

async function Page() {
  connectToDB()
  const userCount = await User.countDocuments()
  const categoryCount = await Category.countDocuments()
  const menusCount = await MenuItems.countDocuments()

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
              <Link  href='/dashboard/category' className="btn btn-primary btn-sm mt-3">Buy Now
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
              <Link href='/dashboard/menu-items' className="btn btn-sm btn-primary">See More
                <ArrowUpRightIcon className='h-3 w-3' />
              </Link>
            </div>
          </div>
        </div>
        <div className="card  bg-base-100 shadow-xl">
          <div className="card-body">
            <UserGroupIcon className='h-14 w-14 text-violet-500' />
            <h2 className="card-title">Total Users: {String(userCount).padStart(2, '0')}</h2>
            <p className='text-justify'>You will find all the Users here in this section, you can add or delete Users too! </p>
            <div className="card-actions justify-end">
              <Link href='/dashboard/users' className="btn btn-sm btn-primary">See More
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