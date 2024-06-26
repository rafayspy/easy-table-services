import HeadingDashboard from '@/components/typography/HeadingDashboard'
import ActionArea from './DeleteUser'
import { getAllUsers } from '@/query/query'

export const dynamic = 'force-dynamic'

const Page = async () => {
  const data = await getAllUsers()
  return (
    <div>
      <HeadingDashboard>Users Section </HeadingDashboard>
      <section className="mt-20">

        <div className="overflow-x-auto">
          {data?.length > 0 &&
            <table className="table table-zebra table-pin-rows rounded-lg">
              {/* head */}
              <thead>
                <tr>
                  <th className='prose-lg'>#</th>
                  <th className='prose-lg'>Full Name</th>
                  <th className='prose-lg'>Email</th>
                  <th className='prose-lg'>Number</th>
                  <th className='prose-lg'>Role</th>

                  <th className='prose-lg text-center'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.map((category, idx) => <tr key={category._id}>
                    <th>{idx + 1}</th>
                    <td>{category?.fullName}</td>
                    <td>{category?.email}</td>
                    <td>{category?.number}</td>
                    <td className='capitalize'>{category?.role}</td>



                    <ActionArea role={category?.role.toString()} id={JSON.stringify(category?._id)} />

                  </tr>)
                }

              </tbody>
            </table>}
          {
            data.length === 0 && <h3 className='text-center font-medium text-2xl'>No data Found 🙁</h3>
          }
        </div>
      </section>
    </div>
  )
}

export default Page