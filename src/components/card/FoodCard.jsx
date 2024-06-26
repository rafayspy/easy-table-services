'use client'
import Image from 'next/image'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react'
import GlobalContext from '@/context/globalContext'
import toast, { Toaster } from 'react-hot-toast'
import CONSTANTS from '@/assets/constants'

const FoodCard = ({ food }) => {
    const parsedData = JSON.parse(food)
    const {addToCartHandler} = useContext(GlobalContext)
    const { _id, title, itemCode, price, image, category, description } = parsedData
    const addToCart = () => {
        addToCartHandler(parsedData,  "cartItems");
        toast.success("Added to cart");
    }

    return (
        <div className="card w-full bg-base-100 dark:bg-slate-800/95 shadow-xl">
            <figure className='h-40'>
                <Image
                    alt={title}
                    src={image}
                    height={100}
                    width={500}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title first-letter:capitalize">
                    {title}
                    <div className="badge badge-secondary">{category?.categoryName}</div>
                </h2>
                <p className='text-base font-medium'>Price : <span className='font-bold text-rose-500'>{price}  {CONSTANTS?.CURRENCY}</span></p>
                <p className='text-base font-normal first-letter:capitalize'>{description.length < 70
                    ? description
                    : `${description.slice(0, 70)}...`}</p>
                <div className="card-actions justify-between items-center">
                    <div className="badge badge-outline">Code: {itemCode}</div>
                    <button onClick={() => addToCart(_id)} className="btn btn-error btn-sm btn-circle">
                        <ShoppingCartIcon className='h-6 w-6' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FoodCard