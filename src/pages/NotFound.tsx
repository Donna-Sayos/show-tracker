import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  const btnClass = "px-4 py-2 rounded-lg text-sm transition-all duration-200 bg-rose-200 hover:bg-rose-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-rose-900 dark:text-rose-100 hover:scale-105 active:scale-95";

  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl">404</h1>
      <p className="mt-2 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>

      <button
        type='button'
        onClick={() => navigate('/')}
        className={btnClass}
      >
        Back to Home
      </button>
    </div>
  );
}