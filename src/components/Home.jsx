
import { useSchedule } from '../hooks/useSchedule';
import { Header } from './Header';
import { Filters } from './Filters';
import { ScheduleList } from './ScheduleList';
import { Link } from 'react-router-dom';
import { usePin } from '../context/PinContext';

export const Home = () => {
  const { schedule, filters, filterOptions, updateFilter, clearFilters } = useSchedule();
  const { pinnedArtists } = usePin();

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Navbar con botón a Mi Ruta */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Line-up Completo</h2>
          <Link
            to="/my-schedule"
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-lg font-bold transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Mi Ruta ({pinnedArtists.length})
          </Link>
        </div>
      </div>

      <Filters
        filters={filters}
        filterOptions={filterOptions}
        updateFilter={updateFilter}
        clearFilters={clearFilters}
      />
      <ScheduleList schedule={schedule} />
    </div>
  );
};

