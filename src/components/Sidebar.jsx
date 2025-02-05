import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='w-[20%] bg-gray-100 shadow-md h-[87vh] py-4 px-2'>
        <ul className='flex flex-col gap-6'>
            <Link className='text-xl border-b-1 p-2 border-gray-300 hover:bg-amber-100'>Home</Link>
            <Link className='text-xl border-b-1 p-2 border-gray-300 hover:bg-amber-100'>Pinned Notes</Link>
            <Link className='text-xl border-b-1 p-2 border-gray-300 hover:bg-amber-100'>Categories/Tags</Link>
            <Link className='text-xl border-b-1 p-2 border-gray-300 hover:bg-amber-100'>Trash</Link>
        </ul>
    </div>
  )
}

export default Sidebar