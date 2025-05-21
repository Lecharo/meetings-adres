'use client';

import Link from 'next/link';

export default function TranscriptionsPage() {
  // Datos de ejemplo para las transcripciones
  const transcriptions = [
    {
      id: 1,
      meetingTitle: 'Reunión de planificación sprint',
      date: '2025-05-15T14:30:00',
      summary: 'Se discutieron los objetivos del próximo sprint y se asignaron tareas al equipo.',
      speakers: [
        { name: 'Juan Pérez', role: 'Product Owner' },
        { name: 'María Rodríguez', role: 'Scrum Master' },
        { name: 'Carlos Gómez', role: 'Desarrollador' }
      ]
    },
    {
      id: 2,
      meetingTitle: 'Reunión con stakeholders',
      date: '2025-05-10T10:00:00',
      summary: 'Se presentaron los avances del proyecto y se recibió feedback positivo de los stakeholders.',
      speakers: [
        { name: 'Juan Pérez', role: 'Product Owner' },
        { name: 'Director General', role: 'Stakeholder' },
        { name: 'Laura Jiménez', role: 'Stakeholder' }
      ]
    }
  ];

  // Transcripción seleccionada (simulada)
  const selectedTranscription = {
    id: 1,
    meetingTitle: 'Reunión de planificación sprint',
    date: '2025-05-15T14:30:00',
    content: `
Juan (Product Owner): Buenos días a todos. Hoy vamos a planificar el próximo sprint.

María (Scrum Master): Perfecto. Empecemos revisando el backlog.

Juan (Product Owner): Tenemos 5 historias de usuario prioritarias para este sprint.

Carlos (Desarrollador): ¿Cuál es la más crítica?

Juan (Product Owner): La implementación del módulo de reportes es la más urgente.

María (Scrum Master): De acuerdo. Carlos, ¿puedes estimar cuánto tiempo te llevaría?

Carlos (Desarrollador): Calculo que unos 3 días para la versión básica.

Juan (Product Owner): Perfecto. También necesitamos terminar la integración con el sistema de pagos.

María (Scrum Master): Eso lo podemos asignar a Ana, que ya tiene experiencia con esa API.

Carlos (Desarrollador): Me parece bien. Yo puedo ayudar con la parte de testing cuando termine mi tarea.

Juan (Product Owner): Excelente. Entonces queda definido el plan para este sprint.
    `,
    summary: 'Se discutieron los objetivos del próximo sprint y se asignaron tareas al equipo. La implementación del módulo de reportes es la prioridad principal, seguida por la integración con el sistema de pagos. Carlos trabajará en el módulo de reportes (estimado en 3 días) y Ana se encargará de la integración con el sistema de pagos.',
    speakers: [
      { 
        name: 'Juan Pérez', 
        role: 'Product Owner',
        contributions: [
          'Presentó 5 historias de usuario prioritarias',
          'Identificó el módulo de reportes como crítico',
          'Mencionó la necesidad de integración con sistema de pagos'
        ]
      },
      { 
        name: 'María Rodríguez', 
        role: 'Scrum Master',
        contributions: [
          'Facilitó la reunión',
          'Asignó tareas a los miembros del equipo',
          'Gestionó las estimaciones de tiempo'
        ]
      },
      { 
        name: 'Carlos Gómez', 
        role: 'Desarrollador',
        contributions: [
          'Estimó 3 días para el módulo de reportes',
          'Se ofreció a ayudar con testing',
          'Hizo preguntas sobre prioridades'
        ]
      }
    ]
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Transcripciones</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px' }}>
        {/* Lista de transcripciones */}
        <div style={{ 
          backgroundColor: '#1f2937', 
          borderRadius: '8px', 
          padding: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ marginBottom: '16px', fontSize: '18px' }}>Reuniones con transcripción</h2>
          
          <div style={{ display: 'flex', marginBottom: '16px' }}>
            <input 
              type="text" 
              placeholder="Buscar transcripciones..." 
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #374151',
                backgroundColor: '#111827',
                color: 'white',
                width: '100%'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {transcriptions.map(transcription => (
              <div 
                key={transcription.id}
                style={{
                  backgroundColor: transcription.id === selectedTranscription.id ? '#4c1d95' : '#111827',
                  padding: '12px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{transcription.meetingTitle}</h3>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#9ca3af' }}>
                  {formatDate(transcription.date)}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{
                    backgroundColor: '#1f2937',
                    color: '#9ca3af',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {transcription.speakers.length} participantes
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Detalle de la transcripción */}
        <div>
          <div style={{ 
            backgroundColor: '#1f2937', 
            borderRadius: '8px', 
            padding: '16px',
            marginBottom: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ marginBottom: '8px', fontSize: '20px' }}>{selectedTranscription.meetingTitle}</h2>
            <p style={{ marginBottom: '16px', color: '#9ca3af' }}>
              {formatDate(selectedTranscription.date)}
            </p>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button style={{
                backgroundColor: '#6d28d9',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>Generar resumen</button>
              
              <button style={{
                backgroundColor: '#4b5563',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>Generar podcast</button>
            </div>
            
            <h3 style={{ marginBottom: '8px', fontSize: '16px' }}>Transcripción completa</h3>
            <div style={{ 
              backgroundColor: '#111827', 
              padding: '16px', 
              borderRadius: '4px',
              whiteSpace: 'pre-wrap',
              maxHeight: '300px',
              overflowY: 'auto',
              fontFamily: 'monospace',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              {selectedTranscription.content}
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: '#1f2937', 
            borderRadius: '8px', 
            padding: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Resumen</h3>
            <p style={{ marginBottom: '20px' }}>{selectedTranscription.summary}</p>
            
            <div style={{ marginBottom: '20px' }}>
              <Link 
                href={`/podcasts?meetingId=${selectedTranscription.id}`}
                style={{
                  backgroundColor: '#7c3aed',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>🎙️</span> Ir a Podcast de esta reunión
              </Link>
            </div>
            
            <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Contribuciones por participante</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedTranscription.speakers.map((speaker, index) => (
                <div 
                  key={index}
                  style={{
                    backgroundColor: '#111827',
                    padding: '12px',
                    borderRadius: '4px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '16px' }}>{speaker.name}</h4>
                    <span style={{ color: '#9ca3af', fontSize: '14px' }}>{speaker.role}</span>
                  </div>
                  
                  <ul style={{ margin: '0', paddingLeft: '20px' }}>
                    {speaker.contributions.map((contribution, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{contribution}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
