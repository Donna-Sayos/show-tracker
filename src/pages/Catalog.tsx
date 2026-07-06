import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUiStore } from '../store/useUiStore';
import { useNavigate } from 'react-router-dom';

export default function Catalog() {
  const { density } = useUiStore();
  const navigate = useNavigate();

  const [selectedGenre, setSelectedGenre] = useState('all');

  const { data, isLoading } = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/items');
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 text-rose-900 dark:text-rose-100">
        Loading...
      </div>
    );
  }

  const sortedItems = [...data].sort((a: any, b: any) =>
    a.title.localeCompare(b.title)
  );

  const genres = [
    'all',
    ...new Set(sortedItems.map((item: any) => item.genre)),
  ];

  const filteredItems =
    selectedGenre === 'all'
      ? sortedItems
      : sortedItems.filter((item: any) => item.genre === selectedGenre);

  return (
    <>
      <div className="mb-6">
        <label htmlFor="genre-filter" className="sr-only">
          Filter by genre
        </label>

        <select
          id="genre-filter"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="rounded-xl border border-rose-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-rose-900 dark:text-rose-100"
        >
          <option value="all">All Genres</option>

          {genres
            .filter((genre) => genre !== 'all')
            .sort()
            .map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
        </select>
      </div>

      <div
        className={`grid gap-6 ${
          density === 'compact'
            ? 'grid-cols-4'
            : 'grid-cols-1 md:grid-cols-3'
        }`}
      >
        {filteredItems.map((item: any) => (
          <div
            key={item.id}
            onClick={() => navigate(`/items/${item.id}`)}
            className="group cursor-pointer bg-white dark:bg-slate-800 p-6 rounded-2xl border border-rose-100 dark:border-slate-700 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-rose-200 dark:hover:border-slate-600"
          >
            <h2 className="text-xl font-bold text-rose-900 dark:text-rose-100 mb-2 truncate group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              {item.title}
            </h2>

            <p className="text-sm text-rose-600/80 dark:text-rose-300/70 mb-4">
              {item.genre}
            </p>

            <div className="flex justify-between items-center mt-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-300 bg-rose-100/50 dark:bg-slate-900 px-3 py-1 rounded-full">
                {item.status}
              </span>

              <span className="text-sm font-semibold text-rose-500 dark:text-rose-400 group-hover:underline">
                View
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}