'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Header } from '@/components/auth/Header'
import { Social } from '@/components/auth/Social'
import { BackButton } from '@/components/auth/BackButton'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocials?: boolean
}

export const CardWrapper = (props: CardWrapperProps) => {
  const {
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel,
    showSocials,
  } = props

  return (
    <Card className='w-[400px] shadow-md'>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocials && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
