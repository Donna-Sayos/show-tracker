import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function List() {
  const { status } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/items');

      if (!res.ok) {
        throw new Error('Failed to load items');
      }

      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="p-8 text-center text-rose-900 dark:text-rose-100">
        Loading {status} items...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load items.
      </div>
    );
  }

  const sortedItems = [...data].sort((a: any, b: any) =>
    a.title.localeCompare(b.title)
  );

  // split
  const completed = sortedItems.filter(
    (item: any) => item.status === 'done'
  );
  const dropped = sortedItems.filter(
    (item: any) => item.status === 'dropped'
  );
  const filteredItems =
    status === 'done'
      ? sortedItems
      : sortedItems.filter((item: any) => item.status === status);

  const itemCount = status === 'done' ? (completed?.length || 0) + (dropped?.length || 0) : filteredItems?.length || 0;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8 border-b border-rose-100 dark:border-slate-700 pb-6">
        <h1 className="text-3xl font-extrabold text-rose-900 dark:text-white capitalize">
          {status} Shows
        </h1>
        <p className="text-sm text-rose-600/80 dark:text-rose-300/80 mt-2">
          {itemCount} items
        </p>
      </div>

      {/* DONE → split view */}
      {status === 'done' ? (
        <div className="space-y-12">

          {/* Completed */}
          <section>
            <h2 className="text-xl font-bold text-rose-900 dark:text-white mb-4">
              Completed
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completed.length === 0 ? (
                <div className="col-span-full text-center py-10 text-rose-500 dark:text-rose-300 border border-dashed border-rose-200 dark:border-slate-700 rounded-xl">
                  No completed shows
                </div>
              ) : (
                completed.map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/items/${item.id}`)}
                    className="group cursor-pointer bg-white dark:bg-slate-800 p-6 rounded-2xl border border-rose-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
                  >
                    <h2 className="text-xl font-bold text-rose-900 dark:text-rose-100 truncate group-hover:text-rose-600">
                      {item.title}
                    </h2>

                    <p className="text-sm text-rose-600/80 dark:text-rose-300/70 mt-2">
                      {item.creator} • {item.year}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Dropped */}
          <section>
            <h2 className="text-xl font-bold text-rose-900 dark:text-white mb-4">
              Dropped
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dropped.length === 0 ? (
                <div className="col-span-full text-center py-10 text-rose-500 dark:text-rose-300 border border-dashed border-rose-200 dark:border-slate-700 rounded-xl">
                  No dropped shows
                </div>
              ) : (
                dropped.map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/items/${item.id}`)}
                    className="group cursor-pointer bg-white dark:bg-slate-800 p-6 rounded-2xl border border-rose-100 dark:border-slate-700 shadow-sm opacity-70 hover:opacity-100 transition-all hover:shadow-xl hover:-translate-y-1"
                  >
                    <h2 className="text-xl font-bold text-rose-900 dark:text-rose-100 truncate group-hover:text-rose-600">
                      {item.title}
                    </h2>

                    <p className="text-sm text-rose-600/80 dark:text-rose-300/70 mt-2">
                      {item.creator} • {item.year}
                    </p>

                    <span className="text-xs text-red-500 font-semibold mt-3 inline-block">
                      Dropped
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      ) : (
        /* DEFAULT VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.length === 0 ? (
                <div className="col-span-full text-center py-10 text-rose-500 dark:text-rose-300 border border-dashed border-rose-200 dark:border-slate-700 rounded-xl">
                  No active shows
                </div>
            ) :(filteredItems.map((item: any) => (
            <div
              key={item.id}
              onClick={() => navigate(`/items/${item.id}`)}
              className="group cursor-pointer bg-white dark:bg-slate-800 p-6 rounded-2xl border border-rose-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <h2 className="text-xl font-bold text-rose-900 dark:text-rose-100 truncate group-hover:text-rose-600">
                {item.title}
              </h2>

              <p className="text-sm text-rose-600/80 dark:text-rose-300/70 mt-2">
                {item.creator} • {item.year}
              </p>

              <span className="text-xs font-semibold uppercase mt-4 inline-block text-rose-600">
                {item.status}
              </span>
            </div>
          )))}
        </div>
      )}
    </div>
  );
}