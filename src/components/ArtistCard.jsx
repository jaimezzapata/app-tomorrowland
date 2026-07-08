
export const ArtistCard = ({ item }) => {
  const getStageColor = (stage) => {
    const colors = {
      'Mainstage': 'text-purple-800 bg-purple-100 border-purple-300',
      'Atmosphere': 'text-blue-800 bg-blue-100 border-blue-300',
      'Core': 'text-green-800 bg-green-100 border-green-300',
      'Cage': 'text-red-800 bg-red-100 border-red-300'
    };
    return colors[stage] || 'text-slate-800 bg-slate-100 border-slate-300';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xl border-2 border-slate-200 hover:shadow-blue-500/20 hover:border-consciencia-blue/50 transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="flex justify-between items-start mb-4 gap-3 flex-wrap">
        <span className={`text-xs px-4 py-1.5 rounded-full font-extrabold uppercase tracking-wide border-2 ${getStageColor(item.stage)}`}>
          {item.stage}
        </span>
        <span className="text-xs px-4 py-1.5 rounded-full font-extrabold uppercase tracking-wide bg-slate-200 text-slate-800 border-2 border-slate-300">
          {item.day}
        </span>
      </div>
      <div>
        <h3 className="text-2xl font-black mb-2 gradient-text group-hover:scale-105 transition-transform">{item.artista}</h3>
        <p className="text-base text-slate-700 font-semibold flex items-center gap-2">
          <svg className="w-5 h-5 text-consciencia-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {item.hora}
        </p>
      </div>
    </div>
  );
};
