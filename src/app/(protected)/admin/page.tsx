'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RoleGate } from '@/components/auth/RoleGate'
import { FormSuccess } from '@/components/FormSuccess'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

import { admin } from '@/actions/admin'

const AdminPage = () => {
  const handleServerActionClick = async () => {
    const res = await admin()

    if (res.error) {
      toast.error(res.error)
    }

    if (res.success) {
      toast.success(res.success)
    }
  }

  const handleApiRouteClick = async () => {
    const res = await fetch('/api/admin')

    if (res.ok) {
      toast.success('Allow API Route')
    } else {
      toast.error('Forbidden API Route')
    }
  }

  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>🔑 Admin</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <RoleGate allowedRole='ADMIN'>
          <FormSuccess message='You are allowed to see this content' />
        </RoleGate>
        <div className='flex justify-between items-center rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin-only API Route</p>
          <Button onClick={handleApiRouteClick}>Click to test</Button>
        </div>

        <div className='flex justify-between items-center rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin-only Server Action</p>
          <Button onClick={handleServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminPage
