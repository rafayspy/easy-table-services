'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='flex justify-center items-center flex-col'>
      <h2 className='text-center my-10 text-3xl'>Something went wrong!</h2>

      {
        error.message.includes("E11000") && 
        <h2 className='text-center my-2 text-3xl text-red-500 font-semibold'>Duplicate data Please Try Again!!!</h2>
      }

      <button
        className='btn btn-error'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}