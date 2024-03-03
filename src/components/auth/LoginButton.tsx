'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { LoginForm } from '@/components/auth/LoginForm'

interface LoginButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

export const LoginButton = (props: LoginButtonProps) => {
  const { children, asChild, mode = 'redirect' } = props

  const [mounted, setMounted] = useState(false)

  const router = useRouter()

  const handleClick = () => {
    router.push('/auth/login')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (mode === 'modal') {
    return (
      <Dialog open>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className='p-0 w-auto bg-transparent border-none'>
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <span className='cursor-pointer' onClick={handleClick}>
      {children}
    </span>
  )
}
