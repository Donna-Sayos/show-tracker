import { Routes, Route } from 'react-router-dom';
import { useUiStore } from './store/useUiStore';
import Navbar from './components/NavBar';
import Catalog from './pages/Catalog';
import Details from './pages/Details';
import List from './pages/List';
import NotFound from './pages/NotFound';

export default function App() {
  const theme = useUiStore((state) => state.theme);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-rose-50 dark:bg-slate-950 text-rose-900 dark:text-rose-100 transition-colors duration-300">
        <Navbar />
        <main className="p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/items/:id" element={<Details />} />
            <Route path="/list/:status" element={<List />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}