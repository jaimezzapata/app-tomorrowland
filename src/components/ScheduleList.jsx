
import { ArtistCard } from './ArtistCard';

export const ScheduleList = ({ schedule }) => {
  if (schedule.length === 0) {
    return (
      <div className="max-w-6xl mx-auto text-center py-16 px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-10">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-consciencia-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold gradient-text mb-2">No se encontraron resultados</h3>
          <p className="text-slate-600">Intenta con otros filtros o palabras clave</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-10">
      <p className="text-sm text-slate-600 mb-4 font-medium px-2">
        {schedule.length} resultados encontrados
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {schedule.map((item, index) => (
          <ArtistCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};
