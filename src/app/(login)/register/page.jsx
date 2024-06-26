'use client'
import CONSTANTS from '@/assets/constants';
import HeadingDashboard from '@/components/typography/HeadingDashboard'
import useInput from '@/hooks/useInput';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

function Page() {
    const router = useRouter()
    const formData = {
        fullName: null,
        number: null,
        role: 'customer',
        email: null,
        password: null
    };
    const { input, inputChangeHandler, setInput } = useInput(formData);
    const login = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${CONSTANTS.baseUrl}/api/users`, input)
            console.log(res.data)
            if (res?.data?.status === 201) {
                // alert("User successfully registered!")
                toast.success('User successfully registered!')
                router.push('/login')
            } else {
                // toast.error(res?.data?.message)
                toast(
                    res?.data?.message,
                    {
                        duration: 6000,
                    }
                );
            }
        } catch (error) {
            toast.error(error.message)
        }

    }
    return (
        <div>
            <Toaster />
            <HeadingDashboard>Register</HeadingDashboard>
            <div className='mx-auto max-w-2xl'>
                <form onSubmit={login} className='grid grid-cols-1 w-full gap-2'>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Full Name</span>

                        </div>
                        <input
                            onChange={(e) => inputChangeHandler(e)}
                            required type="text" name="fullName" placeholder="Enter full Name..." className="input input-bordered input-info w-full " />

                    </label>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Email Address</span>

                        </div>
                        <input
                            onChange={(e) => inputChangeHandler(e)}
                            required name="email" type="email" placeholder="Enter email here..." className="input input-bordered input-info w-full " />

                    </label>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Phone Number</span>

                        </div>
                        <input
                            onChange={(e) => inputChangeHandler(e)}
                            required name="number" type="text" placeholder="Enter mobile number..." className="input input-bordered input-info w-full " />

                    </label>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Password</span>

                        </div>
                        <input
                            onChange={(e) => inputChangeHandler(e)}
                            required name="password" type="password" placeholder="Enter password..." className="input input-bordered input-info w-full " />

                    </label>
                    <div className='mt-5 flex justify-center'>
                        <button type='submit' className="btn btn-primary">Create User</button>
                    </div>


                </form>
            </div>

            <Link className='btn btn-accent absolute top-10 left-10' href='/'>&#8592; Go to Home</Link>
        </div>
    )
}

export default Page