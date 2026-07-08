
import { useState, useMemo } from 'react';
import { transformData, getFilterOptions } from '../utils/dataTransform';

export const useSchedule = () => {
  const [filters, setFilters] = useState({
    stage: null,
    day: null,
    artist: ''
  });

  const filterOptions = useMemo(() => getFilterOptions(), []);

  const schedule = useMemo(() => transformData(filters), [filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      stage: null,
      day: null,
      artist: ''
    });
  };

  return {
    schedule,
    filters,
    filterOptions,
    updateFilter,
    clearFilters
  };
};

