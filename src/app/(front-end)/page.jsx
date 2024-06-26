import CONSTANTS from '@/assets/constants'
import FoodCard from '@/components/card/FoodCard'
import HeadingDashboard from '@/components/typography/HeadingDashboard'
import axios from 'axios'
import CartArea from './CartArea'

export const dynamic = 'force-dynamic';
export const revalidate = 5;


async function Page() {
  const { data: { data } } = await axios.get(`${CONSTANTS.baseUrl}/api/menu-items`)

  return (
    <div className='container mx-auto'>

      <section className='grid sm:grid-cols-3 gap-x-3 grid-col-1'>
        <section className='col-span-2 bg-hero-pattern'>
          <HeadingDashboard>All Food Items</HeadingDashboard>
          {
            data?.length < 1 &&
            <h3 className='text-center font-medium text-2xl my-10 opacity-80'>No Food items found.😔</h3>
          }
          <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-col-1 gap-5'>
            {
              data?.map(food => <FoodCard key={food?._id} food={JSON.stringify(food)} />)
            }

          </div>
        </section>
        {
          data?.length > 0 &&
          <CartArea />
        }
      </section>
    </div>
  )
}

export default Page