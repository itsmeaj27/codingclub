export type EventStatus = 'upcoming' | 'ongoing' | 'completed';

function parseTimeString(timeStr: string): { hours: number; minutes: number } | null {
  if (!timeStr) return null;
  const cleaned = timeStr.trim().toUpperCase();
  const match = cleaned.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/);
  if (!match) return null;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3];

  if (meridiem === 'PM' && hours < 12) {
    hours += 12;
  } else if (meridiem === 'AM' && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
}

export function getEventDateRange(event: {
  date: string | Date;
  startTime?: string | null;
  endTime?: string | null;
}): { startDate: Date; endDate: Date } {
  const baseDate = new Date(event.date);
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const day = baseDate.getDate();

  const startParsed = event.startTime ? parseTimeString(event.startTime) : null;
  const endParsed = event.endTime ? parseTimeString(event.endTime) : null;

  const startDate = new Date(
    year,
    month,
    day,
    startParsed ? startParsed.hours : 0,
    startParsed ? startParsed.minutes : 0,
    0
  );

  let endDate: Date;
  if (endParsed) {
    endDate = new Date(year, month, day, endParsed.hours, endParsed.minutes, 0);
    // If end time is earlier than start time (e.g. multi-hour overnight event), push to next day
    if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }
  } else {
    // End of the day
    endDate = new Date(year, month, day, 23, 59, 59, 999);
  }

  return { startDate, endDate };
}

/**
 * Calculates the effective event status based on current time and event date/times.
 * If the event has concluded, it resolves to 'completed' even if saved as 'upcoming'.
 */
export function getEffectiveEventStatus(event: {
  date: string | Date;
  startTime?: string | null;
  endTime?: string | null;
  status?: string | null;
}): EventStatus {
  if (event.status === 'completed') {
    return 'completed';
  }

  try {
    const { startDate, endDate } = getEventDateRange(event);
    const now = new Date();

    if (now > endDate) {
      return 'completed';
    }

    if (now >= startDate && now <= endDate) {
      return 'ongoing';
    }

    return 'upcoming';
  } catch {
    return (event.status as EventStatus) || 'upcoming';
  }
}

/**
 * Sorts events so upcoming and ongoing events appear first (soonest first),
 * followed by completed events (most recent first).
 */
export function sortEvents<
  T extends {
    date: string | Date;
    startTime?: string | null;
    endTime?: string | null;
    status?: string | null;
  },
>(events: T[]): T[] {
  return [...events].sort((a, b) => {
    const statusA = getEffectiveEventStatus(a);
    const statusB = getEffectiveEventStatus(b);

    const isUpcomingOrOngoingA = statusA === 'upcoming' || statusA === 'ongoing';
    const isUpcomingOrOngoingB = statusB === 'upcoming' || statusB === 'ongoing';

    if (isUpcomingOrOngoingA && !isUpcomingOrOngoingB) return -1;
    if (!isUpcomingOrOngoingA && isUpcomingOrOngoingB) return 1;

    if (isUpcomingOrOngoingA && isUpcomingOrOngoingB) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
