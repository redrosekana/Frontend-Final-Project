import React from 'react'

interface ScopeProfileProps {
    LogoutButton: () => void
}

export default function ScopeProfile({ LogoutButton }:ScopeProfileProps) {
  return (
    <React.Fragment>
        <div className='absolute w-52 h-32 bg-gray-50 rounded-md right-5 top-24 z-50 drop-shadow-xl'>
            <ul className='h-full p-2 flex flex-col justify-center'>
                <li className='flex items-center pl-2 rounded-md flex-grow cursor-pointer hover:bg-gray-200'>Profile</li>
                <li className='flex items-center pl-2 rounded-md flex-grow cursor-pointer hover:bg-gray-200'>Reset Password</li>
                <li className='flex items-center pl-2 rounded-md flex-grow cursor-pointer hover:bg-gray-200' onClick={LogoutButton}>Logout</li>
            </ul>
        </div>
        <div className='absolute w-9 h-9 bg-slate-50 top-[90px] rotate-45 right-[30px] z-30 xl:right-[85px] '></div>
    </React.Fragment>
  )
}
