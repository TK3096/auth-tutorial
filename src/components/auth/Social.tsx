'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

import { Button } from '@/components/ui/button'

export const Social = () => {
  const searchParams = useSearchParams()

  const callbackUrl = searchParams.get('callbackUrl') || undefined

  const handleClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
        onClick={() => handleClick('google')}
      >
        <FcGoogle className='h-5 w-5' />
      </Button>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
        onClick={() => handleClick('github')}
      >
        <FaGithub className='h-5 w-5' />
      </Button>
    </div>
  )
}
