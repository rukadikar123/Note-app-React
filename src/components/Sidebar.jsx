import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='w-[20%] bg-gray-100 shadow-md h-[87vh] py-4 px-1'>
        <ul className='flex flex-col gap-6'>
            <Link to="/" className='text-xl border-b-1 p-2 border-gray-300 hover:bg-emerald-300'>Home</Link>
            <Link to="/pinned-notes" className='text-xl border-b-1 p-2 border-gray-300 hover:bg-emerald-300'>Pinned Notes</Link>
            <Link  to="/category" className='text-xl border-b-1 p-2 border-gray-300 hover:bg-emerald-300'>Categories</Link>
            <Link to="/trashed-notes" className='text-xl border-b-1 p-2 border-gray-300 hover:bg-emerald-300'>Trash</Link>
        </ul>
    </div>
  )
}

export default Sidebar