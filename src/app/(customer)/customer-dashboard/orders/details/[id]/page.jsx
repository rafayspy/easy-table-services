import HeadingDashboard from '@/components/typography/HeadingDashboard'
import dayjs from 'dayjs'
import StatusSelector from './StatusSelector'
import { getOrderById } from '@/query/query';

const Page = async ({ params: { id } }) => {
  const order = await getOrderById(id);
  
  return (
    <div>
      <HeadingDashboard>Order Details</HeadingDashboard>
      <div className="overflow-x-auto">
        <table className="table table-zebra table-pin-rows">
          {/* head */}
          <thead>
            <tr>
              <th className='prose-lg'>Order ID</th>
              <th className='prose-lg'>Date</th>
              <th className='prose-lg'>Customer Name</th>
              <th className='prose-lg'>Sub Total</th>
              <th className='prose-lg'>VAT</th>
              <th className='prose-lg'>Total</th>
              <th className='prose-lg'>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td className='text-xs'>{order?._id?.toString()}</td>
              <td>{dayjs(order?.createdAt).format('DD/MM/YYYY')}</td>
              <td>{order?.customerName}</td>
              <td>{order?.subTotalPrice}</td>
              <td>{order?.vat}</td>
              <td>{order?.payableAmount}</td>
              <td>
                <StatusSelector selected={order?.orderStatus.toString()} id={id.toString()}/>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="table table-pin-rows">
          {/* head */}
          <thead>
            <tr>

              <th className='prose-lg'>Order Type</th>
              <th className='prose-lg'>Customer Name</th>
              <th className='prose-lg'>Customer Number</th>
              <th className='prose-lg'>Card Number</th>
              <th className='prose-lg'>Total Items ({order?.orderItems?.length})</th>

            </tr>
          </thead>
          <tbody>
            <tr >
              <td className='capitalize'><span className="badge">{order?.orderType}</span></td>
              <td className='capitalize'>{order?.customerName}</td>
              <td>{order?.customerNumber}</td>
              <td>{order?.cardNumber || <span className="badge badge-error">N/A</span>}</td>
              <td>{order?.orderItems?.map(i => <span key={i?.title} className="badge" >{i?.title} </span>)}</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page