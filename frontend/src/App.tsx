import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { gql } from '@apollo/client';

const GET_HELLO = gql`
  query {
    hello
  }
`;

const fetchHello = async () => {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: GET_HELLO }),
  });
  const { data } = await response.json();
  return data;
};

const App: React.FC = () => {
  const { data, error, isLoading } = useQuery(['hello'], fetchHello);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return <div>{data?.hello}</div>;
};

export default App;
