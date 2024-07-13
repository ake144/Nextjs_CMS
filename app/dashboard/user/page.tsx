'use client'

import { getUsers } from '@/utils/actions/user/user';
import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await  getUsers()

      setUsers(response);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li  className='mx-4 mt-2 justify-start items-start ' key={user.id}>{user.email} {''}  <span className='mx-4  justify-end items-end flex'>Publisher</span></li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
