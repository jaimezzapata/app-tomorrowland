
import { usePin } from '../context/PinContext';

export const ArtistModal = ({ artist, onClose }) => {
  const { togglePin, isPinned } = usePin();
  const pinned = isPinned(artist);

  // Simplificar nombre de etapa y fecha
  const getSimplifiedStage = (stage) => {
    const stagesMap = {
      'Mainstage': 'MAIN',
      'Atmosphere': 'ATMO',
      'Core': 'CORE',
      'Cage': 'CAGE'
    };
    return stagesMap[stage] || stage;
  };

  const getStageColor = (stage) => {
    const colors = {
      'Mainstage': 'bg-purple-100 text-purple-900 border-purple-300',
      'Atmosphere': 'bg-blue-100 text-blue-900 border-blue-300',
      'Cage': 'bg-red-100 text-red-900 border-red-300',
      'Core': 'bg-green-100 text-green-900 border-green-300'
    };
    return colors[stage] || 'bg-slate-100 text-slate-900 border-slate-300';
  };

  if (!artist) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal content */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black text-white">{artist.artista}</h2>
              <p className="text-white/80 text-sm">{artist.day}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide border-2 ${getStageColor(artist.stage)}`}>
              {getSimplifiedStage(artist.stage)}
            </span>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-consciencia-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">{artist.hora}</span>
            </div>
          </div>

          <button
            onClick={() => togglePin(artist)}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-200 ${
              pinned
                ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={pinned ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            {pinned ? 'Desmarcar de mi ruta' : 'Marcar en mi ruta'}
          </button>
        </div>
      </div>
    </div>
  );
};

