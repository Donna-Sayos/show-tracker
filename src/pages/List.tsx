import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function List() {
  const { status } = useParams();
  const { data } = useQuery({
    queryKey: ['items', status],
    queryFn: () => fetch(`http://localhost:3001/items?status=${status}`).then(res => res.json())
  });

  return (
    <div>
      <h1 className="text-2xl mb-4 capitalize">Status: {status}</h1>
      {data?.map((item: any) => <div key={item.id}>{item.title}</div>)}
    </div>
  );
}