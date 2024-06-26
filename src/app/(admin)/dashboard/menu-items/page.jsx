import { PlusIcon } from '@heroicons/react/24/solid'
import HeadingDashboard from '@/components/typography/HeadingDashboard'
import Link from 'next/link'
import DeleteMenuItem from './deleteMenuItem';
import Image from 'next/image';
import { getAllMenuItems } from '@/query/query';

export const dynamic = 'force-dynamic';

async function Page() {
  const data = await getAllMenuItems();

  return (
    <div>
      <div className='flex justify-end'>
        <Link
          className='btn btn-primary'
          href={'/dashboard/menu-items/create'}>
          <PlusIcon className="h-6 w-6" />
          Add Menu Item</Link>
      </div>

      <HeadingDashboard>
        Menu Items
      </HeadingDashboard>
      {
        data.length > 0 &&
        <section className="mt-20">

          <div className="overflow-x-auto">
            <table className="table table-zebra table-pin-rows">
              {/* head */}
              <thead>
                <tr>
                  <th className='prose-lg'>#</th>
                  <th className='prose-lg'>Image</th>
                  <th className='prose-lg'>Title</th>
                  <th className='prose-lg'>Code</th>
                  <th className='prose-lg'>Price</th>
                  <th className='prose-lg'>Category Name</th>

                  <th className='prose-lg'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.map((category, idx) => <tr key={category._id}>
                    <th>{idx + 1}</th>
                    <th>
                      <Image
                        alt={category?.title}
                        src={category?.image}
                        className='rounded-md'
                        height={50}
                        width={50}
                      />
                    </th>
                    <td className="capitalize">{category?.title}</td>
                    <td>{category?.itemCode}</td>
                    <td>{category?.price}</td>
                    <td className="capitalize" >{category?.category?.categoryName}</td>

                    <td>
                      <DeleteMenuItem id={JSON.stringify(category?._id)} />
                    </td>
                  </tr>)
                }

              </tbody>
            </table>
          </div>
        </section>
      }

      {
        data.length === 0 && <h3 className='text-center font-medium text-2xl my-10'>No data Found 🙁</h3>
      }
    </div>
  )
}

export default Page