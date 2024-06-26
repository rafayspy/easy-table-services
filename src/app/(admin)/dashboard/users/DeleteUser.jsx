'use client'
import { deleteUser, makeAdmin, makeCustomer } from '@/action/action'
import { TrashIcon } from '@heroicons/react/24/outline'



function DeleteUser({ id, role = "" }) {

    return (
        <td className='flex justify-evenly items-center'>
            {
                role === 'admin' && <button
                    onClick={() => makeCustomer(JSON.parse(id))}
                    className='btn btn-info btn-sm'>Make Customer</button>
            }
            {
                role === 'customer' && <button
                    onClick={() => makeAdmin(JSON.parse(id))}
                    className='btn btn-info btn-sm'>Make Admin</button>
            }


            <button onClick={() => deleteUser(JSON.parse(id))} className='btn btn-circle btn-error btn-sm'>
                <TrashIcon className="h-5 w-5 " />
            </button>
        </td>
    )
}

export default DeleteUser