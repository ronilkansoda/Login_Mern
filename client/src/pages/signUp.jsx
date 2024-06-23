import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

export default function signUp() {

  const [formData, setFormData] = useState({})
  const [err, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  // console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch("/api/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data)
      setLoading(false)
      // setError(false)
      if (data.success == false) {
        setError(true)
        return;
      }
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }

  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-center font-semibold text-3xl my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Username'
          id='username'
          className='bg-slate-200 p-3 rounded-lg'
          onChange={handleChange} />

        <input
          type="email"
          placeholder='Email'
          id='email'
          className='bg-slate-200 p-3 rounded-lg'
          onChange={handleChange} />

        <input
          type="password"
          placeholder='Password'
          id='password'
          className='bg-slate-200 p-3 rounded-lg'
          onChange={handleChange} />

        <button
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}

        </button>

        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have a account?</p>
        <Link to={'/signIn'}>
          <span className='text-blue-500'>
            Sign In
          </span>
        </Link>
      </div>
      <div className="text-red-700 mt-3">{err && 'Something went wronge!!!'}</div>
    </div>
  )
}
