'use client'
import { deleteCategory } from '@/action/action'
import { TrashIcon } from '@heroicons/react/24/outline'



function DeleteCategory({ id }) {

    return (
        <button onClick={() => deleteCategory(JSON.parse(id))} className='btn btn-circle btn-error btn-sm'>
            <TrashIcon className="h-5 w-5 " />
        </button>
    )
}

export default DeleteCategory