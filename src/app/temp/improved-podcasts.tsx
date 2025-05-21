'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PodcastsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const audioRef = useRef(null);
  
  // Estado para la reunión seleccionada
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  
  // Datos de ejemplo para las reuniones con podcast
  const podcasts = [
    {
      id: 2,
      title: 'Reunión con stakeholders',
      date: '2025-05-15T14:30:00',
      duration: '12:35',
      audioUrl: 'https://example.com/podcast1.mp3',
      summary: 'Presentación de avances del proyecto a los stakeholders. Se discutieron las funcionalidades implementadas, se recibió feedback positivo sobre la interfaz de usuario y se definieron los próximos pasos para el desarrollo.',
      speakers: ['Juan Pérez', 'Pedro Sánchez', 'Laura Jiménez', 'Director General'],
      topics: ['Demostración de funcionalidades', 'Feedback de stakeholders', 'Próximos pasos'],
      hasTranscription: true
    },
    {
      id: 4,
      title: 'Revisión técnica',
      date: '2025-05-10T11:00:00',
      duration: '23:18',
      audioUrl: 'https://example.com/podcast2.mp3',
      summary: 'Revisión técnica del código y la arquitectura del sistema. Se identificaron áreas de mejora en el rendimiento y se propusieron soluciones para optimizar las consultas a la base de datos.',
      speakers: ['Carlos Gómez', 'Ana Martínez', 'Técnico de Sistemas'],
      topics: ['Revisión de código', 'Optimización de rendimiento', 'Arquitectura del sistema'],
      hasTranscription: false
    }
  ];

  // Efecto para verificar si hay un ID de reunión en los parámetros de búsqueda
  useEffect(() => {
    const meetingId = searchParams.get('id');
    if (meetingId) {
      setSelectedMeetingId(parseInt(meetingId));
    }
  }, [searchParams]);

  // Efecto para actualizar el tiempo actual del audio
  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration || 0);
      }
    };

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
  
  // Función para formatear el tiempo
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === 0) return '00:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Función para seleccionar un podcast
  const handleSelectPodcast = (podcastId) => {
    router.push(`/podcasts?id=${podcastId}`);
  };
  
  // Función para reproducir/pausar el audio
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Función para cambiar la posición del audio
  const handleSeek = (e) => {
    if (audioRef.current) {
      const newTime = (e.target.value / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  // Función para cambiar el volumen
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  
  // Función para avanzar 10 segundos
  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };
  
  // Función para retroceder 10 segundos
  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };
  
  // Función para volver a la página de reuniones
  const handleBackToMeeting = () => {
    if (selectedMeetingId) {
      router.push(`/meetings?id=${selectedMeetingId}`);
    } else {
      router.push('/meetings');
    }
  };
  
  // Función para ir a la transcripción
  const handleGoToTranscription = (meetingId) => {
    router.push(`/transcriptions?id=${meetingId}`);
  };

  // Encontrar el podcast seleccionado
  const selectedPodcast = podcasts.find(podcast => podcast.id === selectedMeetingId);

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
          <h2 style={{ marginBottom: '16px', fontSize: '18px' }}>Reuniones con podcast</h2>
          
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
                  backgroundColor: podcast.id === selectedMeetingId ? '#065f46' : '#111827',
                  padding: '12px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={() => handleSelectPodcast(podcast.id)}
              >
                <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{podcast.title}</h3>
                <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#9ca3af' }}>
                  {formatDate(podcast.date)}
                </p>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#9ca3af' }}>
                  Duración: {podcast.duration}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{
                    backgroundColor: '#1f2937',
                    color: '#9ca3af',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    Podcast
                  </span>
                  
                  {podcast.hasTranscription && (
                    <Link 
                      href={`/transcriptions?id=${podcast.id}`}
                      style={{
                        backgroundColor: '#1e40af',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        textDecoration: 'none'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Transcripción
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
        
        {/* Detalle del podcast */}
        <div>
          {selectedPodcast ? (
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
                  <h2 style={{ margin: 0, fontSize: '20px' }}>{selectedPodcast.title}</h2>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {selectedPodcast.hasTranscription && (
                      <button 
                        onClick={() => handleGoToTranscription(selectedPodcast.id)}
                        style={{
                          backgroundColor: '#1e40af',
                          color: 'white',
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>📝</span> Ver transcripción
                      </button>
                    )}
                    
                    <Link 
                      href={`/meetings?id=${selectedPodcast.id}`}
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
                </div>
                
                <p style={{ marginBottom: '16px', color: '#9ca3af' }}>
                  {formatDate(selectedPodcast.date)}
                </p>
                
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Resumen</h3>
                  <p style={{ margin: 0 }}>{selectedPodcast.summary}</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Participantes</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      {selectedPodcast.speakers.map((speaker, index) => (
                        <li key={index}>{speaker}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Temas</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      {selectedPodcast.topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Reproductor de audio */}
              <div style={{ 
                backgroundColor: '#1f2937', 
                borderRadius: '8px', 
                padding: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Reproductor</h3>
                
                <audio 
                  ref={audioRef} 
                  src={selectedPodcast.audioUrl}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  style={{ display: 'none' }}
                />
                
                <div style={{ 
                  backgroundColor: '#111827', 
                  borderRadius: '8px', 
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  {/* Barra de progreso */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', minWidth: '40px' }}>{formatTime(currentTime)}</span>
                    
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={duration ? (currentTime / duration) * 100 : 0} 
                      onChange={handleSeek}
                      style={{
                        flex: 1,
                        height: '4px',
                        borderRadius: '2px',
                        appearance: 'none',
                        backgroundColor: '#4b5563',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    />
                    
                    <span style={{ fontSize: '14px', minWidth: '40px' }}>{formatTime(duration)}</span>
                  </div>
                  
                  {/* Controles de reproducción */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                    {/* Botón de retroceso */}
                    <button 
                      onClick={handleRewind}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px'
                      }}
                    >
                      -10s
                    </button>
                    
                    {/* Botón de reproducción/pausa */}
                    <button 
                      onClick={handlePlayPause}
                      style={{
                        backgroundColor: '#065f46',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px'
                      }}
                    >
                      {isPlaying ? '⏸️' : '▶️'}
                    </button>
                    
                    {/* Botón de avance */}
                    <button 
                      onClick={handleForward}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px'
                      }}
                    >
                      +10s
                    </button>
                  </div>
                  
                  {/* Control de volumen */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button 
                      onClick={() => setShowVolumeControl(!showVolumeControl)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px'
                      }}
                    >
                      {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
                    </button>
                    
                    {showVolumeControl && (
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={volume * 100} 
                        onChange={handleVolumeChange}
                        style={{
                          flex: 1,
                          height: '4px',
                          borderRadius: '2px',
                          appearance: 'none',
                          backgroundColor: '#4b5563',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      />
                    )}
                  </div>
                </div>
                
                {/* Opciones adicionales */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '16px', 
                  marginTop: '16px' 
                }}>
                  <button style={{
                    backgroundColor: '#374151',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>⬇️</span> Descargar
                  </button>
                  
                  <button style={{
                    backgroundColor: '#374151',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>🔗</span> Compartir
                  </button>
                </div>
              </div>
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
                🎙️
              </div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Selecciona un podcast</h3>
              <p style={{ color: '#9ca3af' }}>
                Elige una reunión de la lista para escuchar su podcast
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
