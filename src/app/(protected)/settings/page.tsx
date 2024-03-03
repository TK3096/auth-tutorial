'use client'

import { LogoutButton } from '@/components/auth/LogoutButton'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const SettingsPage = () => {
  const user = useCurrentUser()

  return (
    <div className='bg-white p-10 rounded-xl'>
      <LogoutButton>
        <button>Sign out</button>
      </LogoutButton>
    </div>
  )
}

export default SettingsPage
