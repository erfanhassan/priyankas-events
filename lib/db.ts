import { staticEvents, EventRecord } from '../data/events';

export type { EventRecord };

// Get the next upcoming event
export function getUpcomingEvent(): EventRecord | null {
  const now = new Date();
  
  const upcomingEvents = staticEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= now;
  });
  
  if (upcomingEvents.length === 0) return null;
  
  upcomingEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return upcomingEvents[0];
}

// Get all events sorted by date descending
export function getAllEvents(): EventRecord[] {
  return [...staticEvents].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Get a specific event by ID
export function getEventById(id: number): EventRecord | null {
  return staticEvents.find(event => event.id === id) || null;
}
