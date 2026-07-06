import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function Details() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['items', id],
    queryFn: () => fetch(`http://localhost:3001/items/${id}`).then(res => res.json())
  });

  if (isLoading) return <div>Loading details...</div>;
  return <div><h1>{data.title}</h1><p>{data.description}</p></div>;
}