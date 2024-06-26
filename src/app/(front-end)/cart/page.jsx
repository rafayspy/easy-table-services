'use client'
import GlobalContext from "@/context/globalContext"
import { useContext } from "react";
import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { calculateSubtotal } from "@/utils/helpers";
import toast from "react-hot-toast";
import HeadingDashboard from "@/components/typography/HeadingDashboard";
import useInput from "@/hooks/useInput";
import axios from "axios";
import CONSTANTS from "@/assets/constants";
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';

const Page = () => {
    const { cartData,setCartData, removeCartItem, addToCartHandler, decrementCartQuantity } = useContext(GlobalContext)
    const router = useRouter()

    const { input, inputChangeHandler, setInput } = useInput({
        customerName: null,
        customerNumber: null,
        cardNumber: null,
        cardExpire: null,
        cvv: null,

    });

    const orderHandler = async (event) => {
        event.preventDefault()
        try {
            const res = await axios.post(`${CONSTANTS.baseUrl}/api/order`, {
                ...input,
                cartData: cartData
            })
            // console.log(res)
            setCartData([])
            localStorage.removeItem('cartItems')
            toast.success("Successfully order submitted")
            router.push('/')
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className="container mx-auto">
            <h3 className="text-center font-semibold text-xl text-rose-500">Your Order</h3>
            {
                cartData.length > 0 ?
                    <div>
                        <div>
                            {cartData.map(item =>
                                <div className="flex justify-between items-center m-1.5 border-b pb-5" key={item?._id}>
                                    <div className="flex items-center justify-between gap-x-3">
                                        <p className="font-semibold text-rose-500">{item?.title}</p>
                                        <p className="text-base">({item?.price} x {item?.quantity} = {item?.price * item?.quantity} {CONSTANTS?.CURRENCY})</p>
                                    </div>
                                    <div className="flex justify-evenly items-center gap-x-2 ">
                                        <button
                                            onClick={() => {
                                                addToCartHandler(item, "cartItems")
                                            }}
                                            className="btn btn-outline btn-circle btn-success btn-sm">
                                            <PlusIcon className="h-6 w-6" />
                                        </button>
                                        <p className="btn btn-info btn-sm">{item?.quantity}</p>
                                        {
                                            item?.quantity === 1 ?
                                                <button
                                                    onClick={() => {
                                                        removeCartItem(item?._id, "cartItems")
                                                    }}
                                                    className="btn btn-outline btn-circle btn-error btn-sm ">
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                                :
                                                <button
                                                    onClick={() => {
                                                        decrementCartQuantity(item?._id, "cartItems")
                                                    }}
                                                    className="btn btn-outline btn-circle btn-error btn-sm ">
                                                    <MinusIcon className="h-4 w-4" />
                                                </button>
                                        }


                                    </div>
                                </div>)}
                        </div>
                        <div className="flex justify-between m-1.5">
                            <p className="text-sm font-medium">SubTotal : </p>
                            <p>
                                {new Intl.NumberFormat("en-In").format(calculateSubtotal(cartData))}{" "}
                                {CONSTANTS?.CURRENCY}
                            </p>
                        </div>
                        <div className="flex justify-between m-1.5">
                            <p className="text-sm font-medium">Vat (10%) : </p>
                            <p>
                                {new Intl.NumberFormat("en-In").format(calculateSubtotal(cartData) * 10 / 100)}{" "}
                                {CONSTANTS?.CURRENCY}
                            </p>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between m-1.5">
                            <p className="text-sm font-medium">Grand Total : </p>
                            <p>
                                {new Intl.NumberFormat("en-In").format(calculateSubtotal(cartData) + calculateSubtotal(cartData) * 10 / 100)}{" "}
                                {CONSTANTS?.CURRENCY}
                            </p>
                        </div>
                        <HeadingDashboard>Fill these information to submit your order</HeadingDashboard>
                        <div className="mt-10 pb-10 max-w-lg mx-auto">
                            <form onSubmit={orderHandler}>
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text">Customer&apos;s Name</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter Customer Name..."
                                        className="input input-bordered w-full "
                                        name='customerName'
                                        onChange={(e) => inputChangeHandler(e)}
                                        required
                                    />
                                </label>
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text">Customer&apos;s Number</span>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="Enter contact number..."
                                        className="input input-bordered w-full "
                                        name='customerNumber'
                                        onChange={(e) => inputChangeHandler(e)}
                                        required
                                    />
                                </label>
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text">Card Number</span>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="Enter Card Number..."
                                        className="input input-bordered w-full "
                                        name='cardNumber'
                                        onChange={(e) => inputChangeHandler(e)}
                                        required
                                    />
                                </label>
                                <div className="flex justify-between items-center gap-x-2 mb-5">

                                    <label className="form-control w-full ">
                                        <div className="label">
                                            <span className="label-text">Card Expire</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="input input-bordered w-full "
                                            name='cardExpire'
                                            onChange={(e) => inputChangeHandler(e)}
                                            required
                                        />
                                    </label>
                                    <label className="form-control w-full ">
                                        <div className="label">
                                            <span className="label-text">Card CVV</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="_ _ _"
                                            className="input input-bordered w-full "
                                            name='cvv'
                                            minLength={3}
                                            maxLength={3}
                                            onChange={(e) => inputChangeHandler(e)}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className="flex justify-center">
                                    <button className="btn btn-error">
                                        Submit Order
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                    :
                    <h3 className="text-center font-mono text-slate-300 my-16">
                        Start adding items to your cart
                    </h3>
            }
        </div >
    )
}

export default Page