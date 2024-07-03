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
    <div>
    <h1>Users List</h1>
    <ul>
      {users.map(user => (
        <li key={user.clerkUserId}>
          {user.firstName} {user.lastName} - {user.email}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Users