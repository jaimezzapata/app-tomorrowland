
import data from '../../data.json';

export const getFilterOptions = () => {
  const stages = Object.keys(data.stages);
  const days = new Set();
  const artists = new Set();

  Object.values(data.stages).forEach((stage) => {
    Object.keys(stage).forEach((day) => {
      days.add(day);
      stage[day].forEach((set) => {
        artists.add(set.artista);
      });
    });
  });

  return {
    stages,
    days: Array.from(days),
    artists: Array.from(artists).sort()
  };
};

export const transformData = (filters = {}) => {
  const { stage: selectedStage, day: selectedDay, artist: selectedArtist } = filters;
  const result = [];

  Object.entries(data.stages).forEach(([stageName, stageData]) => {
    if (selectedStage && selectedStage !== stageName) return;

    Object.entries(stageData).forEach(([dayName, sets]) => {
      if (selectedDay && selectedDay !== dayName) return;

      sets.forEach((set) => {
        if (selectedArtist && !set.artista.toLowerCase().includes(selectedArtist.toLowerCase())) return;

        result.push({
          stage: stageName,
          day: dayName,
          hora: set.hora,
          artista: set.artista
        });
      });
    });
  });

  return result;
};

export default data;

