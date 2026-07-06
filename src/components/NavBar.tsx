import { Link } from 'react-router-dom';
import { useUiStore } from '../store/useUiStore';

export default function Navbar() {
  const { toggleTheme, toggleDensity } = useUiStore();

  const linkClass = "hover:text-rose-600 dark:hover:text-rose-400 transition-colors";
  const btnClass = "px-4 py-2 rounded-lg text-sm transition-all duration-200 bg-rose-200 hover:bg-rose-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-rose-900 dark:text-rose-100 hover:scale-105 active:scale-95";

  return (
    <nav className="flex items-center justify-between p-6 bg-white dark:bg-slate-800 shadow-sm transition-colors duration-300">
      <div className="flex gap-6 font-bold text-rose-900 dark:text-rose-100">
        <Link to="/" className={linkClass}>Catalog</Link>
        <Link to="/list/want" className={linkClass}>To Watch</Link>
        <Link to="/list/done" className={linkClass}>Finished</Link>
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={toggleTheme} className={btnClass}>Theme</button>
        <button type="button" onClick={toggleDensity} className={btnClass}>Density</button>
      </div>
    </nav>
  );
}