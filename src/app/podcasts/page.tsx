'use client';

export default function PodcastsPage() {
  // Datos de ejemplo para los podcasts
  const podcasts = [
    {
      id: 1,
      meetingTitle: 'Reunión de planificación sprint',
      date: '2025-05-15T14:30:00',
      duration: '08:45',
      description: 'Resumen de la reunión de planificación del sprint donde se discutieron los objetivos y se asignaron tareas.',
      topics: ['Planificación', 'Sprint', 'Asignación de tareas']
    },
    {
      id: 2,
      meetingTitle: 'Reunión con stakeholders',
      date: '2025-05-10T10:00:00',
      duration: '12:30',
      description: 'Presentación de avances del proyecto a los stakeholders principales y discusión de próximos pasos.',
      topics: ['Presentación', 'Avances', 'Feedback']
    },
    {
      id: 3,
      meetingTitle: 'Daily Scrum',
      date: '2025-05-19T09:00:00',
      duration: '05:15',
      description: 'Reunión diaria de seguimiento donde cada miembro del equipo compartió sus avances y bloqueantes.',
      topics: ['Daily', 'Seguimiento', 'Bloqueantes']
    }
  ];

  // Podcast seleccionado
  const selectedPodcast = podcasts[0];

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

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Podcasts</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px' }}>
        {/* Lista de podcasts */}
        <div style={{ 
          backgroundColor: '#1f2937', 
          borderRadius: '8px', 
          padding: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ marginBottom: '16px', fontSize: '18px' }}>Podcasts disponibles</h2>
          
          <div style={{ display: 'flex', marginBottom: '16px' }}>
            <input 
              type="text" 
              placeholder="Buscar podcasts..." 
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
            {podcasts.map(podcast => (
              <div 
                key={podcast.id}
                style={{
                  backgroundColor: podcast.id === selectedPodcast.id ? '#4c1d95' : '#111827',
                  padding: '12px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{podcast.meetingTitle}</h3>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#9ca3af' }}>
                  {formatDate(podcast.date)}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{
                    backgroundColor: '#1f2937',
                    color: '#9ca3af',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {podcast.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Detalle del podcast */}
        <div style={{ 
          backgroundColor: '#1f2937', 
          borderRadius: '8px', 
          padding: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              backgroundColor: '#4c1d95', 
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div>ADRES</div>
                <div style={{ fontSize: '14px' }}>Podcast</div>
              </div>
            </div>
            
            <div style={{ flex: 1 }}>
              <h2 style={{ marginBottom: '8px', fontSize: '20px' }}>{selectedPodcast.meetingTitle}</h2>
              <p style={{ marginBottom: '8px', color: '#9ca3af' }}>
                {formatDate(selectedPodcast.date)} • {selectedPodcast.duration}
              </p>
              <p style={{ marginBottom: '16px' }}>{selectedPodcast.description}</p>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                {selectedPodcast.topics.map((topic, index) => (
                  <span 
                    key={index}
                    style={{
                      backgroundColor: '#374151',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Reproductor de audio */}
          <div style={{ 
            backgroundColor: '#111827', 
            borderRadius: '8px', 
            padding: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ 
              backgroundColor: '#374151',
              height: '4px',
              borderRadius: '2px',
              marginBottom: '8px',
              position: 'relative'
            }}>
              <div style={{ 
                position: 'absolute',
                left: '0',
                top: '0',
                height: '100%',
                width: '30%',
                backgroundColor: '#6d28d9',
                borderRadius: '2px'
              }}></div>
              <div style={{ 
                position: 'absolute',
                left: '30%',
                top: '-4px',
                height: '12px',
                width: '12px',
                backgroundColor: '#8b5cf6',
                borderRadius: '50%'
              }}></div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: '#9ca3af', fontSize: '14px' }}>2:38 / {selectedPodcast.duration}</div>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <button style={{ 
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}>⏮</button>
                
                <button style={{ 
                  backgroundColor: '#6d28d9',
                  border: 'none',
                  color: 'white',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}>⏸</button>
                
                <button style={{ 
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}>⏭</button>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button style={{ 
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}>🔊</button>
                
                <div style={{ 
                  backgroundColor: '#374151',
                  height: '4px',
                  width: '60px',
                  borderRadius: '2px',
                  position: 'relative'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    height: '100%',
                    width: '70%',
                    backgroundColor: '#6d28d9',
                    borderRadius: '2px'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Acciones */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <button style={{
              backgroundColor: '#4b5563',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span>⬇️</span> Descargar
            </button>
            
            <button style={{
              backgroundColor: '#4b5563',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span>🔗</span> Compartir
            </button>
            
            <button style={{
              backgroundColor: '#4b5563',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span>📝</span> Ver transcripción
            </button>
          </div>
          
          {/* Episodios relacionados */}
          <div>
            <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>Podcasts relacionados</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {podcasts.slice(1).map(podcast => (
                <div 
                  key={podcast.id}
                  style={{
                    backgroundColor: '#111827',
                    padding: '12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>{podcast.meetingTitle}</h4>
                    <p style={{ margin: '0', fontSize: '12px', color: '#9ca3af' }}>
                      {formatDate(podcast.date)} • {podcast.duration}
                    </p>
                  </div>
                  
                  <button style={{ 
                    backgroundColor: '#6d28d9',
                    border: 'none',
                    color: 'white',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}>▶</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
