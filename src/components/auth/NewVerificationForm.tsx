'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BeatLoader } from 'react-spinners'

import { newVerfication } from '@/actions/new-verification'

import { CardWrapper } from '@/components/auth/CardWrapper'
import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'

export const NewVerificationForm = () => {
  const searchParams = useSearchParams()

  const [success, setSuccess] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()

  const token = searchParams.get('token')

  const handleSubmitVerification = useCallback(async () => {
    if (!token) {
      setError('Missing token')
      return
    }

    try {
      const res = await newVerfication(token)

      setSuccess(res.success)
      setError(res.error)
    } catch (err) {
      setError('Something went wrong')
    }
  }, [token])

  useEffect(() => {
    handleSubmitVerification()
  }, [handleSubmitVerification])

  return (
    <CardWrapper
      headerLabel='Confirming yout verification'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
    >
      <div className='flex justify-center items-center w-full'>
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  )
}
