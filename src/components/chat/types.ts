
export interface User {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  online: boolean;
  lastSeen?: string;
  lastMessage?: string;
  unreadCount?: number;
  avatarColor?: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  receiverId: string;
  read: boolean;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Martínez',
    initials: 'AM',
    online: true,
    lastMessage: 'Necesito información sobre el nuevo sistema de reportes que implementaron...',
    unreadCount: 1,
    avatarColor: 'bg-primary/20'
  },
  {
    id: '2',
    name: 'Juan Rodríguez',
    initials: 'JR',
    online: false,
    lastSeen: '15 min',
    lastMessage: 'Hola, ¿podrías revisar el documento que te envié la semana pasada?',
    unreadCount: 1,
    avatarColor: 'bg-secondary/20'
  },
  {
    id: '3',
    name: 'María López',
    initials: 'ML',
    online: true,
    lastMessage: '¡Gracias por la información!',
    avatarColor: 'bg-blue-500/20'
  },
  {
    id: '4',
    name: 'Carlos González',
    initials: 'CG',
    online: false,
    lastSeen: '2h',
    lastMessage: 'Ok, perfecto',
    avatarColor: 'bg-green-500/20'
  },
  {
    id: '5',
    name: 'Laura Sánchez',
    initials: 'LS',
    online: true,
    lastMessage: '¿Para cuándo necesitas el informe?',
    avatarColor: 'bg-amber-500/20'
  },
  {
    id: '6',
    name: 'Soporte Técnico',
    initials: 'ST',
    online: true,
    lastMessage: 'Hemos solucionado el problema que reportaste',
    avatarColor: 'bg-indigo-500/20'
  }
];

export const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '101',
      content: 'Hola, ¿cómo estás?',
      timestamp: '09:25',
      senderId: 'currentUser',
      receiverId: '1',
      read: true
    },
    {
      id: '102',
      content: 'Bien, gracias. ¿Me podrías dar información sobre el nuevo sistema de reportes?',
      timestamp: '09:26',
      senderId: '1',
      receiverId: 'currentUser',
      read: true
    },
    {
      id: '103',
      content: 'Claro, el nuevo sistema permite generar reportes personalizados con gráficos interactivos',
      timestamp: '09:27',
      senderId: 'currentUser',
      receiverId: '1',
      read: true
    },
    {
      id: '104',
      content: 'Necesito información sobre el nuevo sistema de reportes que implementaron. ¿Está disponible para todos los usuarios o solo para administradores?',
      timestamp: '09:28',
      senderId: '1',
      receiverId: 'currentUser',
      read: false
    }
  ],
  '2': [
    {
      id: '201',
      content: 'Hola Juan, ¿qué tal?',
      timestamp: 'Ayer',
      senderId: 'currentUser',
      receiverId: '2',
      read: true
    },
    {
      id: '202',
      content: 'Todo bien. Oye, te envié un documento la semana pasada',
      timestamp: 'Ayer',
      senderId: '2',
      receiverId: 'currentUser',
      read: true
    },
    {
      id: '203',
      content: 'Hola, ¿podrías revisar el documento que te envié la semana pasada?',
      timestamp: 'Hoy 08:15',
      senderId: '2',
      receiverId: 'currentUser',
      read: false
    }
  ]
};
