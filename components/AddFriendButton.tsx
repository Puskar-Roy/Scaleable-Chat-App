'use client'

import React from 'react'
import Button from './Button'

const AddFriendButton = () => {
  return (
    <form className='max-w-sm'>
      <label htmlFor="email" className='font-medium text-sm block leading-6 text-gray-500'>
        Add Friend Via Email
      </label>

      <div className='mt-2 flex gap-4'>
        <input type="text" className='block w-full rounded-md border-0 py-[1.5] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6' placeholder='email@email.com' />
        <Button>Add</Button>
      </div>
    </form>
  )
}

export default AddFriendButton
