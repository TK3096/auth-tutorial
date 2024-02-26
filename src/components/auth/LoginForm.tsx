'use client'

import * as z from 'zod'

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

export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmitLogin = (values: z.infer<typeof LoginSchema>) => {
    console.log(values)
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
            <FormField
              name='email'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
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
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message='Something went wrong' />
          <FormSuccess message='Success' />

          <Button type='submit' className='w-full'>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
