'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function TranscriptionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Estado para la reunión seleccionada
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  const [transcription, setTranscription] = useState(null);
  const [summary, setSummary] = useState('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isGeneratingPodcast, setIsGeneratingPodcast] = useState(false);
  const [podcastUrl, setPodcastUrl] = useState(null);
  
  // Datos de ejemplo para las reuniones con transcripción
  const meetings = [
    {
      id: 1,
      title: 'Reunión de planificación sprint',
      date: '2025-05-20T10:00:00',
      hasTranscription: true,
      hasPodcast: false
    },
    {
      id: 2,
      title: 'Reunión con stakeholders',
      date: '2025-05-15T14:30:00',
      hasTranscription: true,
      hasPodcast: true
    }
  ];
  
  // Datos de ejemplo para la transcripción
  const transcriptionData = {
    meetingId: 1,
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
        id: 1,
        name: 'Juan Pérez', 
        role: 'Product Owner',
        contributions: [
          'Presentó 5 historias de usuario prioritarias',
          'Identificó el módulo de reportes como crítico',
          'Mencionó la necesidad de integración con sistema de pagos'
        ]
      },
      { 
        id: 2,
        name: 'María Rodríguez', 
        role: 'Scrum Master',
        contributions: [
          'Facilitó la reunión',
          'Asignó tareas a los miembros del equipo',
          'Gestionó las estimaciones de tiempo'
        ]
      },
      { 
        id: 3,
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

  // Efecto para verificar si hay un ID de reunión en los parámetros de búsqueda
  useEffect(() => {
    const meetingId = searchParams.get('id');
    if (meetingId) {
      const id = parseInt(meetingId);
      setSelectedMeetingId(id);
      
      // Cargar la transcripción si el ID coincide
      if (id === transcriptionData.meetingId) {
        setTranscription(transcriptionData);
        setSummary(transcriptionData.summary);
      } else {
        setTranscription(null);
        setSummary('');
      }
    }
  }, [searchParams]);

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Función para seleccionar una reunión
  const handleSelectMeeting = (meetingId) => {
    router.push(`/transcriptions?id=${meetingId}`);
  };
  
  // Función para generar un resumen
  const handleGenerateSummary = () => {
    if (!transcription) return;
    
    setIsGeneratingSummary(true);
    
    // Simulamos la generación del resumen con un temporizador
    setTimeout(() => {
      setSummary(transcriptionData.summary);
      setIsGeneratingSummary(false);
    }, 2000);
  };
  
  // Función para generar un podcast
  const handleGeneratePodcast = () => {
    if (!summary) return;
    
    setIsGeneratingPodcast(true);
    
    // Simulamos la generación del podcast con un temporizador
    setTimeout(() => {
      setPodcastUrl('https://example.com/podcast.mp3');
      setIsGeneratingPodcast(false);
      
      // Redirigir a la página de podcasts
      router.push(`/podcasts?id=${selectedMeetingId}`);
    }, 3000);
  };
  
  // Función para volver a la página de reuniones
  const handleBackToMeeting = () => {
    if (selectedMeetingId) {
      router.push(`/meetings?id=${selectedMeetingId}`);
    } else {
      router.push('/meetings');
    }
  };

  // Encontrar la reunión seleccionada
  const selectedMeeting = meetings.find(meeting => meeting.id === selectedMeetingId);

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
            {meetings.map(meeting => (
              <div 
                key={meeting.id}
                style={{
                  backgroundColor: meeting.id === selectedMeetingId ? '#4c1d95' : '#111827',
                  padding: '12px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={() => handleSelectMeeting(meeting.id)}
              >
                <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{meeting.title}</h3>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#9ca3af' }}>
                  {formatDate(meeting.date)}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{
                    backgroundColor: '#1f2937',
                    color: '#9ca3af',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    Transcripción
                  </span>
                  
                  {meeting.hasPodcast && (
                    <Link 
                      href={`/podcasts?id=${meeting.id}`}
                      style={{
                        backgroundColor: '#065f46',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        textDecoration: 'none'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Podcast
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Botón para volver a reuniones */}
          <div style={{ marginTop: '16px' }}>
            <button 
              onClick={handleBackToMeeting}
              style={{
                backgroundColor: '#374151',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              ← Volver a Reuniones
            </button>
          </div>
        </div>
        
        {/* Detalle de la transcripción */}
        <div>
          {selectedMeeting ? (
            <>
              {/* Información de la reunión */}
              <div style={{ 
                backgroundColor: '#1f2937', 
                borderRadius: '8px', 
                padding: '16px',
                marginBottom: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h2 style={{ margin: 0, fontSize: '20px' }}>{selectedMeeting.title}</h2>
                  
                  <Link 
                    href={`/meetings?id=${selectedMeeting.id}`}
                    style={{
                      backgroundColor: '#374151',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Ver reunión
                  </Link>
                </div>
                
                <p style={{ marginBottom: '16px', color: '#9ca3af' }}>
                  {formatDate(selectedMeeting.date)}
                </p>
              </div>
              
              {/* Transcripción */}
              {transcription ? (
                <div style={{ 
                  backgroundColor: '#1f2937', 
                  borderRadius: '8px', 
                  padding: '16px',
                  marginBottom: '20px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>Transcripción</h3>
                    
                    <button
                      onClick={handleGenerateSummary}
                      disabled={isGeneratingSummary}
                      style={{
                        backgroundColor: '#6d28d9',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: isGeneratingSummary ? 'not-allowed' : 'pointer',
                        opacity: isGeneratingSummary ? 0.7 : 1
                      }}
                    >
                      {isGeneratingSummary ? 'Generando...' : 'Generar resumen'}
                    </button>
                  </div>
                  
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
                    {transcription.content}
                  </div>
                  
                  {/* Contribuciones de los participantes */}
                  <div style={{ marginTop: '16px' }}>
                    <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>Contribuciones</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {transcription.speakers.map(speaker => (
                        <div 
                          key={speaker.id}
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
              ) : (
                <div style={{ 
                  backgroundColor: '#1f2937', 
                  borderRadius: '8px', 
                  padding: '16px',
                  marginBottom: '20px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center'
                }}>
                  <p style={{ color: '#9ca3af' }}>No hay transcripción disponible para esta reunión.</p>
                </div>
              )}
              
              {/* Resumen */}
              {summary && (
                <div style={{ 
                  backgroundColor: '#1f2937', 
                  borderRadius: '8px', 
                  padding: '16px',
                  marginBottom: '20px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>Resumen</h3>
                    
                    {!selectedMeeting.hasPodcast && (
                      <button
                        onClick={handleGeneratePodcast}
                        disabled={isGeneratingPodcast}
                        style={{
                          backgroundColor: '#6d28d9',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: isGeneratingPodcast ? 'not-allowed' : 'pointer',
                          opacity: isGeneratingPodcast ? 0.7 : 1
                        }}
                      >
                        {isGeneratingPodcast ? 'Generando...' : 'Generar podcast'}
                      </button>
                    )}
                    
                    {selectedMeeting.hasPodcast && (
                      <Link 
                        href={`/podcasts?id=${selectedMeeting.id}`}
                        style={{
                          backgroundColor: '#065f46',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '14px',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>🎙️</span> Ver podcast
                      </Link>
                    )}
                  </div>
                  
                  <div style={{ 
                    backgroundColor: '#111827', 
                    padding: '16px', 
                    borderRadius: '4px'
                  }}>
                    <p style={{ margin: 0 }}>{summary}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={{ 
              backgroundColor: '#1f2937', 
              borderRadius: '8px', 
              padding: '32px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '48px', 
                marginBottom: '16px'
              }}>
                📝
              </div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Selecciona una reunión</h3>
              <p style={{ color: '#9ca3af' }}>
                Elige una reunión de la lista para ver su transcripción
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
