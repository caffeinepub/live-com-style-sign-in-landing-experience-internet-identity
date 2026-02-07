export interface Tile {
  id: string;
  name: string;
  description: string;
  route: string;
}

export const tiles: Tile[] = [
  {
    id: 'mail',
    name: 'Mail',
    description: 'Access your email messages, compose new emails, and manage your inbox.',
    route: '/app/mail'
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'View and manage your schedule, create events, and set reminders.',
    route: '/app/calendar'
  },
  {
    id: 'people',
    name: 'People',
    description: 'Manage your contacts, view profiles, and stay connected with others.',
    route: '/app/people'
  },
  {
    id: 'files',
    name: 'Files',
    description: 'Store, organize, and share your documents and files securely.',
    route: '/app/files'
  },
  {
    id: 'notes',
    name: 'Notes',
    description: 'Create and organize notes, lists, and ideas in one place.',
    route: '/app/notes'
  },
  {
    id: 'photos',
    name: 'Photos',
    description: 'View, organize, and share your photo collection.',
    route: '/app/photos'
  },
  {
    id: 'tasks',
    name: 'Tasks',
    description: 'Track your to-do items, set priorities, and manage projects.',
    route: '/app/tasks'
  },
  {
    id: 'settings',
    name: 'Settings',
    description: 'Configure your account preferences and application settings.',
    route: '/app/settings'
  }
];
