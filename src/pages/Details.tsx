import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['items', id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/items/${id}`);

      if (!res.ok) {
        throw new Error('Item not found');
      }

      return res.json();
    },
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: async (updatedItem: any) => {
      const res = await fetch(`http://localhost:3001/items/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!res.ok) {
        throw new Error('Failed to update item');
      }

      return res.json();
    },

    onMutate: async (updatedItem) => {
      await queryClient.cancelQueries({ queryKey: ['items', id] });

      const previousData = queryClient.getQueryData(['items', id]);

      queryClient.setQueryData(['items', id], (old: any) => ({
        ...old,
        ...updatedItem,
      }));

      return { previousData };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['items', id], context.previousData);
      }
    },

    onSuccess: (serverItem) => {
      queryClient.setQueryData(['items', id], serverItem);
    },
  });

  if (isLoading) {
    return (
      <div className="p-8 text-center text-rose-900 dark:text-rose-100">
        Loading details...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-8 text-center text-red-500">
        Item not found.
      </div>
    );
  }

  const btnClass = "mb-4 ml-2 px-4 py-2 rounded-lg text-sm transition-all duration-200 bg-rose-200 hover:bg-rose-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-rose-900 dark:text-rose-100 hover:scale-105 active:scale-95";

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Navigation */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        // className="mb-6 text-rose-600 dark:text-rose-400 hover:underline"
        className={btnClass}
      >
        ← Back
      </button>

      {/* Item Card */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-rose-100 dark:border-slate-700 shadow-lg">
        <div className="mb-8 border-b border-rose-100 dark:border-slate-700 pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500 bg-rose-100 dark:bg-slate-900 px-3 py-1 rounded-full">
            {data.status}
          </span>

          <h1 className="text-4xl font-extrabold text-rose-900 dark:text-white mt-4">
            {data.title}
          </h1>

          <p className="text-lg text-rose-600/80 dark:text-rose-300/80 italic">
            {data.creator} • {data.year}
          </p>
        </div>

        {/* Status / Rating Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-rose-50 dark:bg-slate-900 p-6 rounded-2xl">
          <div>
            <label
              htmlFor="status-select"
              className="block text-xs font-bold text-slate-500 uppercase mb-2"
            >
              Update Status
            </label>

            <select
              id="status-select"
              value={data.status}
              onChange={(e) =>
                mutation.mutate({ status: e.target.value })
              }
              className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-rose-200 dark:border-slate-700 cursor-pointer"
            >
              {['want', 'active', 'done', 'dropped'].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              Update Rating
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => mutation.mutate({ rating: num })}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    data.rating === num
                      ? 'bg-rose-500 text-white'
                      : 'bg-white dark:bg-slate-800 border border-rose-200 dark:border-slate-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}