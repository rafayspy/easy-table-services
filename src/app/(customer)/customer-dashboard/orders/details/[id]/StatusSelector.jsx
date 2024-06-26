'use client'

import { changeOrderStatus } from "@/action/action"

const StatusSelector = ({ selected, id }) => {
  const values = ["pending", "preparing", "served", "canceled", "paid"]
  const handler = (e) => {
    console.log(e.target.value)
    changeOrderStatus(id, e.target.value)
  }
  console.log(id)
  return (
    <select
      onChange={(e) => handler(e)}
      className="rounded-md capitalize p-2" defaultValue={selected}>
      {
        values?.map(i => <option key={i} value={i} className='capitalize'>{i}</option>)
      }
    </select>
  )
}

export default StatusSelector