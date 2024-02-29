import { AlertCircle } from 'lucide-react'

import { CardWrapper } from '@/components/auth/CardWrapper'

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel='Oop! Something went wrong'
      backButtonHref='/auth/login'
      backButtonLabel='Back to login'
    >
      <div className='w-full flex justify-center items-center'>
        <AlertCircle className='text-destructive' />
      </div>
    </CardWrapper>
  )
}
