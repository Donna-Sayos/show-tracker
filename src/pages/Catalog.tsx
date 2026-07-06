import { useQuery } from '@tanstack/react-query';
import { useUiStore } from '../store/useUiStore';
import { useNavigate } from 'react-router-dom';

export default function Catalog() {
  const { density } = useUiStore();
  const navigate = useNavigate();
  
  const { data, isLoading } = useQuery({
    queryKey: ['items'],
    queryFn: () => fetch('http://localhost:3001/items').then(res => res.json())
  });

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className={`grid gap-6 ${density === 'compact' ? 'grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
      {data.map((item: any) => (
        <div key={item.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-rose-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-xl font-bold text-rose-900 dark:text-rose-100 mb-2">{item.title}</h2>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs font-medium capitalize text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-slate-900 px-3 py-1 rounded-full">
              {item.status}
            </span>
            <button 
              type="button"
              onClick={() => navigate(`/items/${item.id}`)}
              className="text-rose-500 dark:text-rose-400 hover:underline text-sm font-medium"
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}