import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from './api/axios'; // Axios instance to make requests

interface User {
  id: number;
  name: string;
  email: string;
}

// Function to fetch users from the API
const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get('/users');
  return response.data;
};

// Function to add a user
const addUser = async (newUser: { name: string; email: string }): Promise<User> => {
  const response = await axios.post('/users', newUser);
  return response.data;
};

const App: React.FC = () => {
  const { data: users, isLoading, error } = useQuery<User[], Error>({
    queryKey: ['users'],  // Define the query key here
    queryFn: fetchUsers,  // Specify the function to fetch data
  });
  const queryClient = useQueryClient();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Define the mutation
  const { mutate: createUser } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      // Refetch the list of users after adding a new one
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleAddUser = () => {
    if (name && email) {
      createUser({ name, email });
      setName('');
      setEmail('');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>

      <h2>Add New User</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default App;
