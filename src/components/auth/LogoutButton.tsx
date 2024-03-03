'use client'

import { logout } from '@/actions/logout'

interface LogoutButtonProps {
  children?: React.ReactNode
}

export const LogoutButton = (props: LogoutButtonProps) => {
  const { children } = props

  const handleLogout = () => {
    logout()
  }

  return (
    <span className='cursor-pointer' onClick={handleLogout}>
      {children}
    </span>
  )
}
