export interface EventRecord {
  id: number;
  name: string;
  venue: string;
  date: string;
  time?: string;
  description: string;
  image_path: string | null;
  duration_days: number;
  created_at: string;
  updated_at: string;
}

export const staticEvents: EventRecord[] = [
  {
    id: 1,
    name: "Autumn Carnival 2026",
    venue: "Midas Center, Dhanmondi",
    date: "2026-09-10T10:00",
    time: "10:00 AM to 10:00 PM",
    description: "",
    image_path: "/uploads/poster.jpg",
    duration_days: 3,
    created_at: "2026-07-31T09:45:50",
    updated_at: "2026-07-31T09:45:50"
  }
];
