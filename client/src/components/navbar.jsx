import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function navbar() {
  const { currentUser } = useSelector(state => state.user)
  return (
    <div>
      <div className="bg-slate-200">
        <div className="flex justify-between items-center pl-4 pr-10 p-3">
          <h1 className='font-bold'>Ronil's Login Page</h1>
          <ul className='flex gap-7'>
            <Link to={'/'}>Home</Link>
            <Link to={'/about'}>About</Link>
            <Link to={'/profile'}>
              {currentUser ? (<img src={currentUser.profilePhoto} alt='Profile Photo' className='h-8 w-8 rounded-full object-cover'></img>) : (<li>Sign In</li>)}
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}
