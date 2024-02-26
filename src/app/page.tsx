import { Poppins } from 'next/font/google'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { LoginButton } from '@/components/auth/LoginButton'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

const HomePage = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-500'>
      <div className='space-y-6 text-center'>
        <h1
          className={cn(
            'text-6xl font-semibold text-white drop-shadow-md',
            font.className,
          )}
        >
          🔐 Auth
        </h1>
        <p className='text-white text-lg'>A simple authentication service</p>

        <div>
          <LoginButton>
            <Button variant='secondary' size='lg'>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </div>
  )
}

export default HomePage
