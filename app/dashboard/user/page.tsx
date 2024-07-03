'use client'

import { getUsers } from '@/utils/actions/user/user';
import React, { useEffect, useState } from 'react'

function Users() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
    };

    fetchUsers();
  }, []);


  return (
    <div>Users</div>
  )
}

export default Users