export interface Attendee {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  location: string;
  link: string;
  attendees: Attendee[];
  topics: string[];
  hasTranscription: boolean;
  hasPodcast: boolean;
  tasks: Task[];
  agreements: string[];
}

export interface Task {
  id: string;
  description: string;
  assignee: string;
  dueDate: Date;
  status: 'pending' | 'completed';
}

export interface Transcription {
  id: string;
  meetingId: string;
  content: string;
  speakers: {
    id: string;
    name: string;
    contributions: string[];
  }[];
  summary: string;
}
