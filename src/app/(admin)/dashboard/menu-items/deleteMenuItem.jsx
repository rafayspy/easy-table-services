'use client'
import { deleteMenuItem } from '@/action/action'
import { TrashIcon } from '@heroicons/react/24/outline'



function DeleteMenuItem({ id }) {

    return (
        <button onClick={() => deleteMenuItem(JSON.parse(id))} className='btn btn-circle btn-error btn-sm'>
            <TrashIcon className="h-5 w-5 " />
        </button>
    )
}

export default DeleteMenuItem