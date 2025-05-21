'use client';

import Link from 'next/link';

export default function Home() {
  // Características principales de la aplicación con enlaces a las páginas correspondientes
  const features = [
    {
      title: 'Gestión de Reuniones',
      description: 'Crea, edita y gestiona todas tus reuniones en un solo lugar.',
      icon: '📅',
      link: '/meetings'
    },
    {
      title: 'Calendario Interactivo',
      description: 'Visualiza tus reuniones en diferentes vistas: mes, semana o día.',
      icon: '🗓️',
      link: '/calendar'
    },
    {
      title: 'Transcripciones Automáticas',
      description: 'Obtén transcripciones automáticas de tus reuniones para no perder ningún detalle.',
      icon: '📝',
      link: '/transcriptions'
    },
    {
      title: 'Generación de Resúmenes',
      description: 'Genera resúmenes automáticos de tus reuniones con los puntos más importantes.',
      icon: '📋',
      link: '/transcriptions'
    },
    {
      title: 'Podcasts en Español',
      description: 'Convierte tus reuniones en podcasts para compartir o escuchar más tarde.',
      icon: '🎙️',
      link: '/podcasts'
    },
    {
      title: 'Integración con Teams',
      description: 'Conecta con Microsoft Teams para una experiencia de reuniones sin interrupciones.',
      icon: '🔄',
      link: '/meetings'
    }
  ];

  // Estadísticas de ejemplo
  const stats = [
    { label: 'Reuniones Gestionadas', value: '1,234' },
    { label: 'Horas Ahorradas', value: '567' },
    { label: 'Usuarios Activos', value: '890' },
    { label: 'Transcripciones Generadas', value: '456' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      {/* Sección de héroe */}
      <div style={{ 
        backgroundColor: '#1f2937', 
        borderRadius: '8px', 
        padding: '40px 20px',
        marginBottom: '30px',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '16px',
          background: 'linear-gradient(90deg, #8b5cf6, #6d28d9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}>
          MeetingsADRES
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          maxWidth: '800px', 
          margin: '0 auto 24px auto',
          color: '#e5e7eb'
        }}>
          Transforma la manera en que gestionas tus reuniones con transcripciones automáticas, 
          resúmenes inteligentes y generación de podcasts.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <Link href="/calendar" style={{
            backgroundColor: '#6d28d9',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            Comenzar Ahora
          </Link>
          
          <Link href="/meetings" style={{
            backgroundColor: 'transparent',
            color: 'white',
            border: '1px solid #6d28d9',
            padding: '12px 24px',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            Ver Reuniones
          </Link>
        </div>
      </div>
      
      {/* Sección de características */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          fontSize: '1.75rem', 
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Características Principales
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px'
        }}>
          {features.map((feature, index) => (
            <Link 
              key={index} 
              href={feature.link}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ 
                backgroundColor: '#1f2937', 
                borderRadius: '8px', 
                padding: '24px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
              >
                <div style={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '16px',
                  textAlign: 'center'
                }}>
                  {feature.icon}
                </div>
                
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  marginBottom: '12px',
                  textAlign: 'center',
                  color: '#e5e7eb'
                }}>
                  {feature.title}
                </h3>
                
                <p style={{ 
                  fontSize: '1rem',
                  color: '#9ca3af',
                  textAlign: 'center',
                  flex: 1
                }}>
                  {feature.description}
                </p>
                
                <div style={{
                  marginTop: '16px',
                  backgroundColor: '#374151',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#4c1d95';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#374151';
                }}
                >
                  Ir a {feature.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Sección de estadísticas */}
      <div style={{ 
        backgroundColor: '#1f2937', 
        borderRadius: '8px', 
        padding: '32px',
        marginBottom: '30px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ 
          fontSize: '1.75rem', 
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          MeetingsADRES en Números
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          textAlign: 'center'
        }}>
          {stats.map((stat, index) => (
            <div key={index}>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold',
                marginBottom: '8px',
                background: 'linear-gradient(90deg, #8b5cf6, #6d28d9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                {stat.value}
              </div>
              
              <div style={{ 
                fontSize: '1rem',
                color: '#9ca3af'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Sección de llamada a la acción */}
      <div style={{ 
        backgroundColor: '#4c1d95', 
        borderRadius: '8px', 
        padding: '40px 20px',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ 
          fontSize: '1.75rem', 
          marginBottom: '16px',
          color: 'white'
        }}>
          ¿Listo para transformar tus reuniones?
        </h2>
        
        <p style={{ 
          fontSize: '1.1rem', 
          maxWidth: '800px', 
          margin: '0 auto 24px auto',
          color: '#e5e7eb'
        }}>
          Comienza a utilizar MeetingsADRES hoy mismo y descubre cómo puedes hacer que tus reuniones sean más productivas.
        </p>
        
        <Link href="/meetings" style={{
          backgroundColor: 'white',
          color: '#4c1d95',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '4px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'inline-block'
        }}>
          Crear Mi Primera Reunión
        </Link>
      </div>
      
      {/* Enlaces rápidos a secciones principales */}
      <div style={{ 
        marginTop: '30px',
        backgroundColor: '#1f2937', 
        borderRadius: '8px', 
        padding: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          Acceso Rápido
        </h2>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <Link href="/calendar" style={{
            backgroundColor: '#374151',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#4c1d95';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#374151';
          }}
          >
            <span>🗓️</span> Calendario
          </Link>
          
          <Link href="/meetings" style={{
            backgroundColor: '#374151',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#4c1d95';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#374151';
          }}
          >
            <span>📅</span> Reuniones
          </Link>
          
          <Link href="/transcriptions" style={{
            backgroundColor: '#374151',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#4c1d95';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#374151';
          }}
          >
            <span>📝</span> Transcripciones
          </Link>
          
          <Link href="/podcasts" style={{
            backgroundColor: '#374151',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#4c1d95';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#374151';
          }}
          >
            <span>🎙️</span> Podcasts
          </Link>
        </div>
      </div>
    </div>
  );
}
