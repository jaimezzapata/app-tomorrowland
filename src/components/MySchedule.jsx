
import { usePin } from '../context/PinContext';
import { Link } from 'react-router-dom';
import { groupByDay, findConflicts, parseTimeRange, getEventPosition } from '../utils/timeHelpers';
import { useState, useEffect } from 'react';
import { ArtistModal } from './ArtistModal';

export const MySchedule = () => {
  const { pinnedArtists, clearAll } = usePin();
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const groupedArtists = groupByDay(pinnedArtists);
  const conflicts = findConflicts(pinnedArtists);

  // Initialize selectedDay with first day if it exists
  const days = Object.keys(groupedArtists);
  
  useEffect(() => {
    if (!selectedDay && days.length > 0) {
      setSelectedDay(days[0]);
    }
  }, [days, selectedDay]);

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
      'Mainstage': 'border-purple-500 bg-purple-50 text-purple-900',
      'Atmosphere': 'border-blue-500 bg-blue-50 text-blue-900',
      'Cage': 'border-red-500 bg-red-50 text-red-900',
      'Core': 'border-green-500 bg-green-50 text-green-900'
    };
    return colors[stage] || 'border-slate-500 bg-slate-50 text-slate-900';
  };

  const getStageHeaderColor = (stage) => {
    const colors = {
      'Mainstage': 'bg-purple-100 text-purple-900 border-b-purple-300',
      'Atmosphere': 'bg-blue-100 text-blue-900 border-b-blue-300',
      'Cage': 'bg-red-100 text-red-900 border-b-red-300',
      'Core': 'bg-green-100 text-green-900 border-b-green-300'
    };
    return colors[stage] || 'bg-slate-100 text-slate-900 border-b-slate-300';
  };

  // Create time markers for the calendar (12:00 to 01:00 next day)
  const timeMarkers = [];
  for (let hour = 12; hour <= 24; hour++) {
    const displayHour = hour > 23 ? '00' : hour;
    timeMarkers.push(`${displayHour}:00`);
  }

  // Get unique stages for selected day
  const getStagesForDay = (dayArtists) => {
    const stages = new Set(dayArtists.map(a => a.stage));
    // Sort stages to have consistent order
    const stageOrder = ['Mainstage', 'Atmosphere', 'Core', 'Cage'];
    return [...stages].sort((a, b) => stageOrder.indexOf(a) - stageOrder.indexOf(b));
  };

  // Group artists by stage for selected day
  const groupByStage = (dayArtists) => {
    const groups = {};
    dayArtists.forEach(artist => {
      if (!groups[artist.stage]) {
        groups[artist.stage] = [];
      }
      groups[artist.stage].push(artist);
    });
    return groups;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Link to="/" className="text-white hover:text-yellow-400 transition-colors flex items-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al line-up
            </Link>
            <h1 className="text-3xl font-black text-white drop-shadow-lg">Mi Ruta</h1>
            <p className="text-sm opacity-95 text-white drop-shadow-md">
              {pinnedArtists.length} artistas seleccionados
              {conflicts.size > 0 && (
                <span className="ml-3 text-yellow-400 font-bold flex items-center gap-1 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {conflicts.size} conflictos!
                </span>
              )}
            </p>
          </div>

          {pinnedArtists.length > 0 && (
            <button
              onClick={clearAll}
              className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold transition-all duration-200 text-sm"
            >
              Limpiar todos
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 py-4">
        {pinnedArtists.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-black mb-2 gradient-text">No tienes artistas marcados</h3>
              <p className="text-slate-600 mb-5 text-sm">Marca tus artistas favoritos para armar tu ruta personalizada!</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2 bg-consciencia-blue hover:bg-blue-whale text-white rounded-md font-bold transition-all duration-200 text-sm"
              >
                Ver line-up completo
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Day selector tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-lg font-extrabold transition-all duration-200 text-base border-2 ${
                    selectedDay === day
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                      : 'bg-white text-slate-900 border-slate-400 hover:bg-slate-100 shadow-md'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Calendar view for selected day */}
            {selectedDay && (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="p-3 border-b border-slate-200 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">{selectedDay}</h2>
                  <span className="text-xs text-slate-600 font-medium">
                    {groupedArtists[selectedDay].length} artista{groupedArtists[selectedDay].length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="flex overflow-x-auto">
                  {/* Time markers column */}
                  <div className="flex-shrink-0 w-14 border-r border-slate-100 bg-slate-50">
                    {timeMarkers.map((time) => (
                      <div key={time} className="h-[40px] px-1.5 text-right text-[10px] font-semibold text-slate-500 border-b border-slate-100 flex items-end pb-0.5">
                        {time}
                      </div>
                    ))}
                  </div>

                  {/* Stage columns */}
                  {getStagesForDay(groupedArtists[selectedDay]).map(stage => {
                    const stageArtists = groupByStage(groupedArtists[selectedDay])[stage];
                    
                    return (
                      <div key={stage} className="flex-shrink-0 w-32 md:w-40 border-r border-slate-100">
                        {/* Stage header */}
                        <div className={`h-[40px] px-2 flex items-center justify-center font-extrabold text-xs uppercase tracking-wide border-b border-b-2 ${getStageHeaderColor(stage)}`}>
                          {getSimplifiedStage(stage)}
                        </div>
                        
                        {/* Events container */}
                        <div className="relative bg-slate-50" style={{ height: `${timeMarkers.length * 40}px` }}>
                          {/* Grid lines */}
                          {timeMarkers.map((time, i) => (
                            <div
                              key={time}
                              className="w-full h-[40px] border-b border-slate-100"
                            />
                          ))}
                          
                          {/* Stage events */}
                          {stageArtists.map((item, index) => {
                            const { top, height } = getEventPosition(item.hora);
                            const isConflict = conflicts.has(item.artista + item.stage + item.day);
                            
                            return (
                              <div
                                key={index}
                                onClick={() => setSelectedArtist(item)}
                                className={`absolute left-1 right-1 rounded-md p-1 border-l-2 shadow-sm transition-all duration-200 hover:shadow cursor-pointer overflow-hidden flex items-center ${getStageColor(item.stage)} ${isConflict ? 'ring-1 ring-red-300 ring-inset' : ''}`}
                                style={{
                                  top: `${top * 0.8}px`,
                                  height: `${Math.max(height * 0.8, 32)}px`
                                }}
                              >
                                <div className="w-full flex items-center justify-between gap-1">
                                  <div className="font-bold text-[10px] md:text-[11px] truncate flex-1">
                                    {item.artista}
                                  </div>
                                  {isConflict && (
                                    <div className="text-red-600 shrink-0">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      <ArtistModal 
        artist={selectedArtist} 
        onClose={() => setSelectedArtist(null)} 
      />
    </div>
  );
};

