import DriverDetail from '@/components/admin/users/drivers/DriverDetail'
import withAdminLayout from '@/components/common/admin/withAdminLayout'
import { useGetDriverByIDQuery } from '@/store/api';
import { useRouter } from 'next/router'
import React from 'react'
import { Driver } from '@/types/driver';
import UserDetail from '@/components/admin/users/UserDetail';

const User = () => {
  const router = useRouter();
  const id = router.query.userId as string;
  return (
    <div className='space-y-10'>
      <UserDetail id={id} />
      <DriverDetail driverID={ id }/>
    </div>
  )
}

export default withAdminLayout(User);
