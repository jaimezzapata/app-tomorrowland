import { useSchedule } from './hooks/useSchedule';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { ScheduleList } from './components/ScheduleList';
import './App.css';

function App() {
  const { schedule, filters, filterOptions, updateFilter, clearFilters } = useSchedule();

  return (
    <div className="app">
      <Header />
      <Filters
        filters={filters}
        filterOptions={filterOptions}
        updateFilter={updateFilter}
        clearFilters={clearFilters}
      />
      <ScheduleList schedule={schedule} />
    </div>
  );
}

export default App;
