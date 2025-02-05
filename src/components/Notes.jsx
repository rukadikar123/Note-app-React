import React from 'react'
import { useSelector } from 'react-redux'

function Notes() {
  const user=useSelector(state => state.noteSlice.user)
  console.log(user);
  

  return (
    <div className='h-[87vh] '>
      {
        user ? <div></div>: <p className="mt-72 ml-72 text-xl">Login or sign up to create your Note </p>
      }
    </div>
  )
}

export default Notes