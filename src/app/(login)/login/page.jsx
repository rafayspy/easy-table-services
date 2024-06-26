'use client'
import CONSTANTS from '@/assets/constants';
import HeadingDashboard from '@/components/typography/HeadingDashboard';
import useInput from '@/hooks/useInput';
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

import toast, { Toaster } from 'react-hot-toast';

function Page() {
    const formData = {
        username: null,
        password: null
    };
    const { input, inputChangeHandler, setInput } = useInput(formData);

    const router = useRouter()

    const login = async (event) => {
        event.preventDefault();
        if (!input.username || !input.password) {
            alert("Please enter a username and password.")
        }
        try {
            // console.log(input)
            const res = await axios.post(`${CONSTANTS.baseUrl}/api/users/login`, {
                username: input.username,
                password: input.password
            })
            console.log(res?.data)
            if(res?.data?.success){
                toast.success("Login successful!")
                router.push('/')
            }else{
                toast.error(res?.data?.message)
            }
        } catch (error) {
            toast.error(error?.message)
            console.log(error);
        }
    }

    return (
        <div>
            <Image
                className="blur-sm dark:backdrop-blur-sm -z-50"
                src="/bg-res.jpeg"
                alt="Background"
                quality={100}
                fill
                sizes="100vw"
                style={{
                    objectFit: "cover",
                }}
            />
            <Toaster/>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <div className="w-full bg-gray-100/95 rounded-lg shadow dark:border md:mt-0 sm:max-w-md p-10 dark:bg-gray-800/95 dark:border-gray-700">
                    <HeadingDashboard>Login</HeadingDashboard>
                    <form onSubmit={login} className='grid grid-cols-1 w-full gap-2'>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Email / Phone Number</span>

                            </div>
                            <input
                                name="username"
                                type="text"
                                placeholder="Enter email here..."
                                className="input input-bordered input-info w-full "
                                onChange={(e) => inputChangeHandler(e)}
                                required
                            />

                        </label>

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Password</span>

                            </div>
                            <input

                                name="password"
                                type="password"
                                placeholder="Enter password..."
                                className="input input-bordered input-info w-full "
                                onChange={(e) => inputChangeHandler(e)}
                                required
                            />

                        </label>
                        <div className='mt-5 flex justify-center'>
                            <button type='submit' className="btn btn-primary">Login</button>
                        </div>
                        <p className='text-center my-1'>--OR--</p>
                        <Link href={'/register'} className="link link-primary text-center">Register new User</Link>
                    </form>
                </div>
            </div>

            <Link className='btn btn-neutral absolute top-10 left-10' href='/'>&#8592; Go to Home</Link>
        </div>

    )
}

export default Page;