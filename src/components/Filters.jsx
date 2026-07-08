
export const Filters = ({ filters, filterOptions, updateFilter, clearFilters }) => {
  return (
    <div className="max-w-6xl mx-auto mt-5 mb-6 px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5">
        <div className="flex flex-col md:flex-row md:flex-wrap md:items-center gap-4">
          <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Stage</label>
            <select
              value={filters.stage || ''}
              onChange={(e) => updateFilter('stage', e.target.value || null)}
              className="px-4 py-3 border-2 border-slate-300 rounded-xl bg-white text-sm font-medium focus:border-consciencia-blue focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            >
              <option value="">Todas</option>
              {filterOptions.stages.map((stage) => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Día</label>
            <select
              value={filters.day || ''}
              onChange={(e) => updateFilter('day', e.target.value || null)}
              className="px-4 py-3 border-2 border-slate-300 rounded-xl bg-white text-sm font-medium focus:border-consciencia-blue focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            >
              <option value="">Todos</option>
              {filterOptions.days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Artista</label>
            <input
              type="text"
              placeholder="Buscar artista..."
              value={filters.artist}
              onChange={(e) => updateFilter('artist', e.target.value)}
              className="px-4 py-3 border-2 border-slate-300 rounded-xl bg-white text-sm font-medium focus:border-consciencia-blue focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            />
          </div>

          <button
            onClick={clearFilters}
            className="md:self-end mt-2 md:mt-0 px-6 py-3 bg-consciencia-blue hover:bg-blue-whale text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
};
