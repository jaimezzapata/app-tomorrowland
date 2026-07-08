
import { usePin } from '../context/PinContext';
import { useState } from 'react';
import { ArtistModal } from './ArtistModal';

export const ArtistCard = ({ item }) => {
  const { togglePin, isPinned } = usePin();
  const [showModal, setShowModal] = useState(false);

  // Simplificar nombre de etapa
  const getSimplifiedStage = (stage) => {
    const stagesMap = {
      'Mainstage': 'MAIN',
      'Atmosphere': 'ATMO',
      'Core': 'CORE',
      'Cage': 'CAGE'
    };
    return stagesMap[stage] || stage;
  };

  // Simplificar fecha (ej: Viernes 17 de Julio -> V17)
  const getSimplifiedDate = (dateStr) => {
    // El formato es "Viernes 17 de julio"
    const dayLetter = dateStr.charAt(0).toUpperCase();
    const dayNumber = dateStr.match(/\d+/)?.[0] || '';
    return `${dayLetter}${dayNumber}`;
  };

  const getStageColor = (stage) => {
    const colors = {
      'Mainstage': 'text-purple-800 bg-purple-100 border-purple-300',
      'Atmosphere': 'text-blue-800 bg-blue-100 border-blue-300',
      'Cage': 'text-red-800 bg-red-100 border-red-300',
      'Core': 'text-green-800 bg-green-100 border-green-300'
    };
    return colors[stage] || 'text-slate-800 bg-slate-100 border-slate-300';
  };

  const pinned = isPinned(item);

  return (
    <>
      <div 
        onClick={() => setShowModal(true)}
        className="bg-white rounded-2xl p-6 shadow-2xl border-2 border-slate-200 hover:shadow-blue-500/20 hover:border-consciencia-blue/50 transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
      >
        <div className="flex justify-between items-start mb-4 gap-3 flex-wrap">
          <span className={`text-xs px-4 py-1.5 rounded-full font-extrabold uppercase tracking-wide border-2 ${getStageColor(item.stage)}`}>
            {getSimplifiedStage(item.stage)}
          </span>
          <span className="text-xs px-4 py-1.5 rounded-full font-extrabold uppercase tracking-wide bg-slate-200 text-slate-800 border-2 border-slate-300">
            {getSimplifiedDate(item.day)}
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

        {/* Botón de pin/despin */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePin(item);
          }}
          className={`mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg transition-all duration-200 font-bold text-sm ${
            pinned
              ? 'bg-yellow-400 text-yellow-900 shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={pinned ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          {pinned ? 'Desmarcar' : 'Marcar Artista'}
        </button>
      </div>
      
      {showModal && (
        <ArtistModal artist={item} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

