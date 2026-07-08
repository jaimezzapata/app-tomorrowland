
// Parse a time string like "12:00 - 14:00" into start and end minutes
export const parseTimeRange = (timeStr) => {
  const [startStr, endStr] = timeStr.split(' - ');
  const [startHour, startMinute] = startStr.split(':').map(Number);
  const [endHour, endMinute] = endStr.split(':').map(Number);
  
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;
  
  return { start: startTotalMinutes, end: endTotalMinutes };
};

// Check if two time ranges overlap
export const checkOverlap = (time1, time2) => {
  return time1.start < time2.end && time2.start < time1.end;
};

// Find all conflicting artists for a given list
export const findConflicts = (artists) => {
  const conflicts = new Set();
  
  for (let i = 0; i < artists.length; i++) {
    for (let j = i + 1; j < artists.length; j++) {
      const a = artists[i];
      const b = artists[j];
      
      if (a.day === b.day) {
        const timeA = parseTimeRange(a.hora);
        const timeB = parseTimeRange(b.hora);
        
        if (checkOverlap(timeA, timeB)) {
          conflicts.add(a.artista + a.stage + a.day);
          conflicts.add(b.artista + b.stage + b.day);
        }
      }
    }
  }
  
  return conflicts;
};

// Group artists by day
export const groupByDay = (artists) => {
  const groups = {};
  
  artists.forEach((artist) => {
    if (!groups[artist.day]) {
      groups[artist.day] = [];
    }
    groups[artist.day].push(artist);
  });
  
  // Sort each day's artists by start time
  Object.keys(groups).forEach((day) => {
    groups[day].sort((a, b) => {
      const timeA = parseTimeRange(a.hora).start;
      const timeB = parseTimeRange(b.hora).start;
      return timeA - timeB;
    });
  });
  
  return groups;
};

// Calculate the position and height for a calendar event
const MINUTES_IN_DAY = 24 * 60;
const CALENDAR_HEIGHT = 650; // Height for 13 hours (12:00 to 01:00, 13*50px)
const START_HOUR = 12;
const START_MINUTES = START_HOUR * 60;

export const getEventPosition = (timeStr) => {
  const { start, end } = parseTimeRange(timeStr);
  
  // Calculate relative to our 12:00 start
  const relativeStart = start - START_MINUTES;
  const relativeEnd = end - START_MINUTES;
  
  const top = (relativeStart / MINUTES_IN_DAY) * CALENDAR_HEIGHT;
  const height = ((relativeEnd - relativeStart) / MINUTES_IN_DAY) * CALENDAR_HEIGHT;
  
  return { top: Math.max(top, 0), height: Math.max(height, 40) };
};

// Arrange events to avoid overlapping
export const arrangeEvents = (events) => {
  if (!events.length) return [];

  // First, sort events by start time
  const sortedEvents = [...events].sort((a, b) => {
    const ta = parseTimeRange(a.hora).start;
    const tb = parseTimeRange(b.hora).start;
    return ta - tb;
  });

  // Group overlapping events into columns
  const columns = [];

  sortedEvents.forEach((event) => {
    const eventTime = parseTimeRange(event.hora);
    let placed = false;

    // Try to place in existing column
    for (let i = 0; i < columns.length && !placed; i++) {
      const column = columns[i];
      const lastEventInColumn = column[column.length - 1];
      const lastEventTime = parseTimeRange(lastEventInColumn.hora);

      // No overlap, place here
      if (!checkOverlap(eventTime, lastEventTime)) {
        column.push(event);
        placed = true;
      }
    }

    // If not placed, create new column
    if (!placed) {
      columns.push([event]);
    }
  });

  // Now assign each event its column index and total columns
  const arrangedEvents = sortedEvents.map((event) => {
    let columnIndex = 0;
    let totalColumns = columns.length;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].includes(event)) {
        columnIndex = i;
        break;
      }
    }

    return {
      ...event,
      columnIndex,
      totalColumns
    };
  });

  return arrangedEvents;
};
