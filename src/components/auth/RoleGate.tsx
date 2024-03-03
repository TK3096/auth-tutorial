'use client'

import { UserRole } from '@prisma/client'

import { useCurrentRole } from '@/hooks/useCurrentRole'

import { FormError } from '@/components/FormError'

interface RoleGateProps {
  children: React.ReactNode
  allowedRole: UserRole
}

export const RoleGate = (props: RoleGateProps) => {
  const { allowedRole, children } = props

  const role = useCurrentRole()

  if (role !== allowedRole) {
    return (
      <FormError message='You do not have permission to view this content' />
    )
  }

  return <>{children}</>
}
