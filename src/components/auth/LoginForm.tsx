'use client'

import * as z from 'zod'
import { useTransition, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginSchema } from '@/schemas'

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CardWrapper } from '@/components/auth/CardWrapper'
import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'

import { login } from '@/actions/login'

export const LoginForm = () => {
  const searchParams = useSearchParams()

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [showTwoFactor, setShowTwoFactor] = useState(false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      code: '',
    },
  })

  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider'
      : ''
  const callbackUrl = searchParams.get('callbackUrl') || undefined

  const handleSubmitLogin = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset()
            setError(data?.error)
          }

          if (data?.success) {
            form.reset()
            setSuccess(data?.success)
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true)
          }
        })
        .catch(() => {
          setError('Something went wrong')
        })
    })
  }

  return (
    <CardWrapper
      headerLabel='Welcome back'
      backButtonLabel='Don&lsquo;t have an account?'
      backButtonHref='/auth/register'
      showSocials
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitLogin)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            {!showTwoFactor && (
              <>
                <FormField
                  name='email'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder='example@mail.com'
                          type='email'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name='password'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          type='password'
                        />
                      </FormControl>

                      <Button
                        size='sm'
                        variant='link'
                        className='px-0 font-normal'
                        asChild
                      >
                        <Link href='/auth/reset'>Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {showTwoFactor && (
              <FormField
                name='code'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='123456'
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <FormError message={error || urlError} />
          <FormSuccess message={success} />

          <Button type='submit' className='w-full'>
            {showTwoFactor ? 'Confirm' : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
