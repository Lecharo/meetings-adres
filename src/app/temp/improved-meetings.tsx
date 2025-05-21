'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function MeetingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Estado para el modal de nueva reunión
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);
  // Estado para la fecha seleccionada para la nueva reunión
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Estado para la reunión seleccionada
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  
  // Datos de ejemplo para las reuniones
  const meetings = [
    {
      id: 1,
      title: 'Reunión de planificación sprint',
      date: '2025-05-20T10:00:00',
      description: 'Planificación del próximo sprint para el proyecto de innovación.',
      attendees: ['Juan Pérez', 'María Rodríguez', 'Carlos Gómez', 'Ana Martínez'],
      topics: ['Revisión de backlog', 'Definición de objetivos', 'Asignación de tareas'],
      status: 'scheduled',
      hasTranscription: true,
      hasPodcast: false
    },
    {
      id: 2,
      title: 'Reunión con stakeholders',
      date: '2025-05-15T14:30:00',
      description: 'Presentación de avances del proyecto a los stakeholders.',
      attendees: ['Juan Pérez', 'Pedro Sánchez', 'Laura Jiménez', 'Director General'],
      topics: ['Demostración de funcionalidades', 'Feedback de stakeholders', 'Próximos pasos'],
      status: 'completed',
      hasTranscription: true,
      hasPodcast: true
    },
    {
      id: 3,
      title: 'Daily Scrum',
      date: '2025-05-19T09:00:00',
      description: 'Reunión diaria de seguimiento.',
      attendees: ['Todo el equipo de desarrollo'],
      topics: ['Avances del día anterior', 'Plan para hoy', 'Bloqueos'],
      status: 'scheduled',
      hasTranscription: false,
      hasPodcast: false
    }
  ];

  // Efecto para verificar si hay un ID de reunión en los parámetros de búsqueda
  useEffect(() => {
    const meetingId = searchParams.get('id');
    if (meetingId) {
      setSelectedMeetingId(parseInt(meetingId));
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
  
  // Función para abrir el modal de nueva reunión
  const handleOpenNewMeetingModal = () => {
    setSelectedDate(new Date());
    setShowNewMeetingModal(true);
  };
  
  // Función para cerrar el modal de nueva reunión
  const handleCloseNewMeetingModal = () => {
    setShowNewMeetingModal(false);
  };
  
  // Modal para crear nueva reunión
  const renderNewMeetingModal = () => {
    if (!showNewMeetingModal) return null;
    
    const formattedDate = formatDate(selectedDate).split(' ')[0]; // Solo la fecha, sin la hora
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: '#1f2937',
          borderRadius: '8px',
          padding: '24px',
          width: '500px',
          maxWidth: '90%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          <h2 style={{ marginBottom: '16px' }}>Nueva Reunión</h2>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Título</label>
            <input 
              type="text" 
              placeholder="Título de la reunión" 
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #374151',
                backgroundColor: '#111827',
                color: 'white'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Fecha</label>
            <input 
              type="text" 
              defaultValue={formattedDate}
              placeholder="DD/MM/YYYY"
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #374151',
                backgroundColor: '#111827',
                color: 'white'
              }}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Hora de inicio</label>
              <input 
                type="text" 
                placeholder="HH:MM" 
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #374151',
                  backgroundColor: '#111827',
                  color: 'white'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Hora de fin</label>
              <input 
                type="text" 
                placeholder="HH:MM" 
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #374151',
                  backgroundColor: '#111827',
                  color: 'white'
                }}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Descripción</label>
            <textarea 
              placeholder="Descripción de la reunión" 
              rows={4}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #374151',
                backgroundColor: '#111827',
                color: 'white',
                resize: 'vertical'
              }}
            ></textarea>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Participantes</label>
            <input 
              type="text" 
              placeholder="Añadir participantes (separados por comas)" 
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #374151',
                backgroundColor: '#111827',
                color: 'white'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Temas a tratar</label>
            <input 
              type="text" 
              placeholder="Añadir temas (separados por comas)" 
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #374151',
                backgroundColor: '#111827',
                color: 'white'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button 
              onClick={handleCloseNewMeetingModal}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: '1px solid #374151',
                backgroundColor: 'transparent',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
            
            <button 
              onClick={() => {
                alert('Reunión creada con éxito');
                handleCloseNewMeetingModal();
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#6d28d9',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Crear Reunión
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Reuniones</h1>
      
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <input 
          type="text" 
          placeholder="Buscar reuniones..." 
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #374151',
            backgroundColor: '#111827',
            color: 'white',
            width: '300px'
          }}
        />
        
        <button 
          onClick={handleOpenNewMeetingModal}
          style={{
            backgroundColor: '#6d28d9',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          + Nueva Reunión
        </button>
      </div>
      
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <button style={{
          backgroundColor: '#6d28d9',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px 0 0 4px',
          cursor: 'pointer'
        }}>Todas</button>
        
        <button style={{
          backgroundColor: '#111827',
          color: 'white',
          border: '1px solid #374151',
          borderLeft: 'none',
          padding: '8px 16px',
          cursor: 'pointer'
        }}>Programadas</button>
        
        <button style={{
          backgroundColor: '#111827',
          color: 'white',
          border: '1px solid #374151',
          borderLeft: 'none',
          padding: '8px 16px',
          borderRadius: '0 4px 4px 0',
          cursor: 'pointer'
        }}>Completadas</button>
      </div>
      
      <div>
        {meetings.map(meeting => {
          const isSelected = selectedMeetingId === meeting.id;
          
          return (
            <div 
              key={meeting.id} 
              style={{
                backgroundColor: isSelected ? '#2d3748' : '#1f2937',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: isSelected ? '2px solid #6d28d9' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{ margin: 0, fontSize: '18px' }}>{meeting.title}</h2>
                
                <span style={{
                  backgroundColor: meeting.status === 'completed' ? '#065f46' : '#5b21b6',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {meeting.status === 'completed' ? 'Completada' : 'Programada'}
                </span>
              </div>
              
              <div style={{ marginBottom: '12px', color: '#9ca3af', fontSize: '14px' }}>
                <strong>Fecha:</strong> {formatDate(meeting.date)}
              </div>
              
              <p style={{ marginBottom: '12px' }}>{meeting.description}</p>
              
              <div style={{ marginBottom: '12px' }}>
                <strong>Asistentes:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {meeting.attendees.map((attendee, index) => (
                    <span key={index} style={{
                      backgroundColor: '#374151',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>{attendee}</span>
                  ))}
                </div>
              </div>
              
              <div style={{ marginBottom: '12px' }}>
                <strong>Temas:</strong>
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  {meeting.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
              
              {/* Badges para transcripciones y podcasts */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                {meeting.hasTranscription && (
                  <Link 
                    href={`/transcriptions?id=${meeting.id}`}
                    style={{
                      backgroundColor: '#1e40af',
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
                    <span>📝</span> Ver transcripción
                  </Link>
                )}
                
                {meeting.hasPodcast && (
                  <Link 
                    href={`/podcasts?id=${meeting.id}`}
                    style={{
                      backgroundColor: '#065f46',
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
                    <span>🎙️</span> Escuchar podcast
                  </Link>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button style={{
                  backgroundColor: '#4b5563',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>Ver detalles</button>
                
                {meeting.status !== 'completed' && (
                  <button style={{
                    backgroundColor: '#6d28d9',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>Iniciar reunión</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Modal para crear nueva reunión */}
      {renderNewMeetingModal()}
    </div>
  );
}
