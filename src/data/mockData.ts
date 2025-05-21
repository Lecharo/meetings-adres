import { Meeting, Transcription } from '../types/meeting';

// Fechas para las reuniones de ejemplo (usando la fecha actual y días cercanos)
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

// Función para crear fechas con horas específicas
const createDate = (baseDate: Date, hours: number, minutes: number): Date => {
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

// Reuniones de ejemplo
export const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Revisión de Proyecto ADRES',
    description: 'Revisión mensual del estado del proyecto y próximos pasos',
    start: createDate(today, 10, 0),
    end: createDate(today, 11, 30),
    location: 'Microsoft Teams',
    link: 'https://teams.microsoft.com/l/meetup-join/example-link-1',
    attendees: [
      { id: '1', name: 'Carlos Rodríguez', email: 'carlos@example.com', status: 'accepted' },
      { id: '2', name: 'María López', email: 'maria@example.com', status: 'accepted' },
      { id: '3', name: 'Juan Pérez', email: 'juan@example.com', status: 'pending' },
      { id: '4', name: 'Ana Gómez', email: 'ana@example.com', status: 'declined' },
    ],
    topics: ['Estado del proyecto', 'Presupuesto', 'Cronograma', 'Riesgos'],
    hasTranscription: true,
    hasPodcast: true,
    tasks: [
      { id: '1', description: 'Actualizar cronograma', assignee: 'Carlos Rodríguez', dueDate: tomorrow, status: 'pending' },
      { id: '2', description: 'Revisar presupuesto', assignee: 'María López', dueDate: tomorrow, status: 'pending' },
    ],
    agreements: [
      'Se aprobó el nuevo cronograma',
      'Se asignará presupuesto adicional para el módulo de reportes',
    ],
  },
  {
    id: '2',
    title: 'Planificación Sprint',
    description: 'Planificación del próximo sprint del equipo de desarrollo',
    start: createDate(tomorrow, 9, 0),
    end: createDate(tomorrow, 10, 30),
    location: 'Microsoft Teams',
    link: 'https://teams.microsoft.com/l/meetup-join/example-link-2',
    attendees: [
      { id: '1', name: 'Carlos Rodríguez', email: 'carlos@example.com', status: 'accepted' },
      { id: '2', name: 'María López', email: 'maria@example.com', status: 'accepted' },
      { id: '5', name: 'Pedro Sánchez', email: 'pedro@example.com', status: 'pending' },
    ],
    topics: ['Revisión del sprint anterior', 'Planificación del nuevo sprint', 'Asignación de tareas'],
    hasTranscription: false,
    hasPodcast: false,
    tasks: [],
    agreements: [],
  },
  {
    id: '3',
    title: 'Reunión con Stakeholders',
    description: 'Presentación de avances a los stakeholders del proyecto',
    start: createDate(yesterday, 14, 0),
    end: createDate(yesterday, 15, 30),
    location: 'Microsoft Teams',
    link: 'https://teams.microsoft.com/l/meetup-join/example-link-3',
    attendees: [
      { id: '1', name: 'Carlos Rodríguez', email: 'carlos@example.com', status: 'accepted' },
      { id: '6', name: 'Laura Martínez', email: 'laura@example.com', status: 'accepted' },
      { id: '7', name: 'Roberto Díaz', email: 'roberto@example.com', status: 'accepted' },
    ],
    topics: ['Demostración de funcionalidades', 'Feedback de stakeholders', 'Próximos pasos'],
    hasTranscription: true,
    hasPodcast: false,
    tasks: [
      { id: '3', description: 'Incorporar feedback de stakeholders', assignee: 'Carlos Rodríguez', dueDate: tomorrow, status: 'pending' },
    ],
    agreements: [
      'Se priorizará el módulo de reportes para el próximo sprint',
      'Se realizará una demo adicional en dos semanas',
    ],
  },
];

// Transcripción de ejemplo
export const mockTranscription: Transcription = {
  id: '1',
  meetingId: '1',
  content: `
Carlos: Buenos días a todos, bienvenidos a nuestra reunión mensual de revisión del proyecto ADRES.
María: Buenos días Carlos, gracias por organizar.
Juan: Hola a todos.
Carlos: Hoy vamos a revisar el estado actual del proyecto, el presupuesto, el cronograma y los riesgos identificados.
María: Perfecto. Respecto al presupuesto, estamos un 5% por debajo de lo planificado, lo cual es positivo.
Carlos: Excelente noticia. En cuanto al cronograma, tenemos un retraso de una semana en el módulo de reportes.
Juan: Sí, hemos tenido algunos desafíos técnicos que no anticipamos. Necesitaremos recursos adicionales.
María: Podemos reasignar parte del presupuesto no utilizado para cubrir esa necesidad.
Carlos: Me parece bien. ¿Todos de acuerdo con aprobar el nuevo cronograma y asignar presupuesto adicional para el módulo de reportes?
María: De acuerdo.
Juan: Sí, de acuerdo.
Carlos: Perfecto, entonces queda aprobado. Ahora pasemos a revisar los riesgos...
  `,
  speakers: [
    {
      id: '1',
      name: 'Carlos Rodríguez',
      contributions: [
        'Dio la bienvenida y estableció la agenda',
        'Informó sobre el retraso en el cronograma',
        'Facilitó la toma de decisiones'
      ]
    },
    {
      id: '2',
      name: 'María López',
      contributions: [
        'Presentó el estado del presupuesto',
        'Propuso solución para reasignar recursos'
      ]
    },
    {
      id: '3',
      name: 'Juan Pérez',
      contributions: [
        'Explicó los desafíos técnicos',
        'Identificó la necesidad de recursos adicionales'
      ]
    }
  ],
  summary: 'En la reunión se revisó el estado del proyecto ADRES. Se identificó que el presupuesto está un 5% por debajo de lo planificado, pero hay un retraso de una semana en el módulo de reportes debido a desafíos técnicos. Se acordó aprobar el nuevo cronograma y asignar presupuesto adicional para el módulo de reportes.'
};
