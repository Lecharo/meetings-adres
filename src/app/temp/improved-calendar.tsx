'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CalendarPage() {
  const router = useRouter();
  // Estado para la vista actual (mes, semana, día)
  const [currentView, setCurrentView] = useState('month');
  // Estado para el mes/semana/día actual
  const [currentDate, setCurrentDate] = useState(new Date());
  // Estado para el modal de nueva reunión
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);
  // Estado para la fecha seleccionada para la nueva reunión
  const [selectedDate, setSelectedDate] = useState(null);
  // Estado para la hora seleccionada para la nueva reunión
  const [selectedTime, setSelectedTime] = useState(null);
  
  // Datos de ejemplo para las reuniones
  const meetings = [
    {
      id: 1,
      title: 'Reunión de planificación sprint',
      date: '2025-05-20',
      startTime: '10:00',
      endTime: '11:30',
      attendees: ['Juan Pérez', 'María Rodríguez', 'Carlos Gómez', 'Ana Martínez'],
      description: 'Planificación del próximo sprint para el proyecto de innovación.'
    },
    {
      id: 2,
      title: 'Reunión con stakeholders',
      date: '2025-05-15',
      startTime: '14:30',
      endTime: '16:00',
      attendees: ['Juan Pérez', 'Pedro Sánchez', 'Laura Jiménez', 'Director General'],
      description: 'Presentación de avances del proyecto a los stakeholders.'
    },
    {
      id: 3,
      title: 'Daily Scrum',
      date: '2025-05-19',
      startTime: '09:00',
      endTime: '09:15',
      attendees: ['Todo el equipo de desarrollo'],
      description: 'Reunión diaria de seguimiento.'
    },
    {
      id: 4,
      title: 'Revisión de diseño',
      date: '2025-05-20',
      startTime: '14:00',
      endTime: '15:30',
      attendees: ['Ana Martínez', 'Carlos Gómez', 'Diseñador UX'],
      description: 'Revisión de los nuevos diseños de la interfaz de usuario.'
    }
  ];
  
  // Función para obtener el nombre del mes
  const getMonthName = (date) => {
    return date.toLocaleString('es-ES', { month: 'long' });
  };
  
  // Función para obtener el año
  const getYear = (date) => {
    return date.getFullYear();
  };
  
  // Función para obtener el primer día del mes
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  // Función para obtener el número de días en el mes
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  // Función para ir al mes/semana/día anterior
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (currentView === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };
  
  // Función para ir al mes/semana/día siguiente
  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (currentView === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };
  
  // Función para cambiar la vista
  const handleViewChange = (view) => {
    setCurrentView(view);
  };
  
  // Función para formatear la fecha
  const formatDate = (date) => {
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Función para abrir el modal de nueva reunión
  const handleOpenNewMeetingModal = (date, time = null) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setShowNewMeetingModal(true);
  };
  
  // Función para cerrar el modal de nueva reunión
  const handleCloseNewMeetingModal = () => {
    setShowNewMeetingModal(false);
    setSelectedDate(null);
    setSelectedTime(null);
  };
  
  // Función para obtener las reuniones de un día específico
  const getMeetingsForDay = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return meetings.filter(meeting => meeting.date === dateStr);
  };
  
  // Función para obtener las reuniones de una semana
  const getMeetingsForWeek = () => {
    // Obtener el primer día de la semana (domingo)
    const firstDayOfWeek = new Date(currentDate);
    const day = currentDate.getDay();
    firstDayOfWeek.setDate(currentDate.getDate() - day);
    
    // Crear un array con los 7 días de la semana
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      weekDays.push(date);
    }
    
    // Obtener las reuniones para cada día de la semana
    return weekDays.map(date => {
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const dayMeetings = meetings.filter(meeting => meeting.date === dateStr);
      return {
        date,
        meetings: dayMeetings
      };
    });
  };
  
  // Función para obtener las reuniones del día actual
  const getMeetingsForCurrentDay = () => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    return meetings.filter(meeting => meeting.date === dateStr);
  };
  
  // Función para navegar a la página de reuniones con el ID de la reunión seleccionada
  const handleSelectMeeting = (meetingId) => {
    // En una aplicación real, aquí navegaríamos a la página de reuniones con el ID
    router.push(`/meetings?id=${meetingId}`);
  };
  
  // Renderizar la vista de mes
  const renderMonthView = () => {
    const firstDay = getFirstDayOfMonth(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);
    
    // Nombres de los días de la semana
    const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    
    return (
      <div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          {weekDays.map(day => (
            <div key={day} style={{ 
              padding: '8px 0',
              fontWeight: 500,
              color: '#9ca3af'
            }}>
              {day}
            </div>
          ))}
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px'
        }}>
          {/* Días vacíos antes del primer día del mes */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} style={{ 
              minHeight: '100px',
              backgroundColor: '#111827',
              borderRadius: '4px'
            }}></div>
          ))}
          
          {/* Días del mes */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isToday = date.toDateString() === new Date().toDateString();
            const dayMeetings = getMeetingsForDay(day);
            
            return (
              <div 
                key={`day-${day}`} 
                style={{ 
                  minHeight: '100px',
                  backgroundColor: isToday ? 'rgba(109, 40, 217, 0.2)' : '#111827',
                  borderRadius: '4px',
                  padding: '8px',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  // Si el clic fue directamente en el contenedor del día (no en una reunión)
                  if (e.target === e.currentTarget) {
                    handleOpenNewMeetingModal(date);
                  }
                }}
              >
                <div style={{ fontWeight: 500, marginBottom: '8px' }}>{day}</div>
                
                {dayMeetings.map(meeting => (
                  <div 
                    key={meeting.id}
                    style={{ 
                      backgroundColor: '#6d28d9',
                      color: 'white',
                      padding: '4px 6px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      marginBottom: '4px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer'
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Evitar que se propague al contenedor del día
                      handleSelectMeeting(meeting.id);
                    }}
                  >
                    {meeting.startTime} - {meeting.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Renderizar la vista de semana
  const renderWeekView = () => {
    const weekData = getMeetingsForWeek();
    const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8:00 AM a 7:00 PM
    
    return (
      <div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '60px repeat(7, 1fr)',
          gap: '1px',
          backgroundColor: '#1f2937',
          border: '1px solid #1f2937',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          {/* Encabezado con los días de la semana */}
          <div style={{ 
            padding: '8px',
            backgroundColor: '#111827',
            borderBottom: '1px solid #1f2937'
          }}></div>
          
          {weekData.map((dayData, index) => {
            const isToday = dayData.date.toDateString() === new Date().toDateString();
            
            return (
              <div 
                key={index}
                style={{ 
                  padding: '8px',
                  backgroundColor: '#111827',
                  borderBottom: '1px solid #1f2937',
                  textAlign: 'center',
                  fontWeight: isToday ? 'bold' : 'normal',
                  color: isToday ? '#8b5cf6' : 'white'
                }}
              >
                <div>{weekDays[dayData.date.getDay()]}</div>
                <div>{dayData.date.getDate()}</div>
              </div>
            );
          })}
          
          {/* Filas de horas */}
          {hours.map(hour => (
            <React.Fragment key={hour}>
              {/* Columna de hora */}
              <div style={{ 
                padding: '8px',
                backgroundColor: '#111827',
                borderBottom: '1px solid #1f2937',
                textAlign: 'center',
                color: '#9ca3af',
                fontSize: '12px'
              }}>
                {hour}:00
              </div>
              
              {/* Celdas para cada día */}
              {weekData.map((dayData, dayIndex) => {
                const hourMeetings = dayData.meetings.filter(meeting => {
                  const startHour = parseInt(meeting.startTime.split(':')[0]);
                  return startHour === hour;
                });
                
                return (
                  <div 
                    key={dayIndex}
                    style={{ 
                      padding: '4px',
                      backgroundColor: '#111827',
                      borderBottom: '1px solid #1f2937',
                      minHeight: '60px',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      const date = new Date(dayData.date);
                      const time = `${hour}:00`;
                      handleOpenNewMeetingModal(date, time);
                    }}
                  >
                    {hourMeetings.map(meeting => (
                      <div 
                        key={meeting.id}
                        style={{ 
                          backgroundColor: '#6d28d9',
                          color: 'white',
                          padding: '4px 6px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          marginBottom: '4px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          cursor: 'pointer',
                          zIndex: 10
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectMeeting(meeting.id);
                        }}
                      >
                        {meeting.startTime} - {meeting.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };
  
  // Renderizar la vista de día
  const renderDayView = () => {
    const dayMeetings = getMeetingsForCurrentDay();
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8:00 AM a 7:00 PM
    
    return (
      <div>
        <h2 style={{ marginBottom: '16px', textAlign: 'center' }}>
          {currentDate.toLocaleString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '60px 1fr',
          gap: '1px',
          backgroundColor: '#1f2937',
          border: '1px solid #1f2937',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          {hours.map(hour => {
            const hourMeetings = dayMeetings.filter(meeting => {
              const startHour = parseInt(meeting.startTime.split(':')[0]);
              return startHour === hour;
            });
            
            return (
              <React.Fragment key={hour}>
                {/* Columna de hora */}
                <div style={{ 
                  padding: '8px',
                  backgroundColor: '#111827',
                  borderBottom: '1px solid #1f2937',
                  textAlign: 'center',
                  color: '#9ca3af',
                  fontSize: '12px'
                }}>
                  {hour}:00
                </div>
                
                {/* Celda para las reuniones */}
                <div 
                  style={{ 
                    padding: '4px',
                    backgroundColor: '#111827',
                    borderBottom: '1px solid #1f2937',
                    minHeight: '60px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    const time = `${hour}:00`;
                    handleOpenNewMeetingModal(currentDate, time);
                  }}
                >
                  {hourMeetings.map(meeting => (
                    <div 
                      key={meeting.id}
                      style={{ 
                        backgroundColor: '#6d28d9',
                        color: 'white',
                        padding: '8px',
                        borderRadius: '4px',
                        marginBottom: '4px',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectMeeting(meeting.id);
                      }}
                    >
                      <div style={{ fontWeight: 'bold' }}>{meeting.title}</div>
                      <div style={{ fontSize: '12px' }}>{meeting.startTime} - {meeting.endTime}</div>
                      <div style={{ fontSize: '12px', marginTop: '4px' }}>{meeting.attendees.join(', ')}</div>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Modal para crear nueva reunión
  const renderNewMeetingModal = () => {
    if (!showNewMeetingModal) return null;
    
    const formattedDate = selectedDate ? formatDate(selectedDate) : '';
    const formattedTime = selectedTime || '';
    
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
              value={formattedDate}
              readOnly
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
                defaultValue={formattedTime}
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
      <h1 style={{ marginBottom: '20px' }}>Calendario de Reuniones</h1>
      
      <div style={{ 
        backgroundColor: '#1f2937', 
        borderRadius: '8px', 
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Controles de navegación y vista */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => handleViewChange('month')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: currentView === 'month' ? '#6d28d9' : '#374151',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Mes
            </button>
            
            <button 
              onClick={() => handleViewChange('week')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: currentView === 'week' ? '#6d28d9' : '#374151',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Semana
            </button>
            
            <button 
              onClick={() => handleViewChange('day')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: currentView === 'day' ? '#6d28d9' : '#374151',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Día
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={handlePrevious}
              style={{
                backgroundColor: '#374151',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              &lt; Anterior
            </button>
            
            <h2 style={{ margin: 0 }}>
              {currentView === 'month' ? `${getMonthName(currentDate)} ${getYear(currentDate)}` : 
               currentView === 'week' ? `Semana del ${formatDate(getMeetingsForWeek()[0].date)}` :
               formatDate(currentDate)}
            </h2>
            
            <button 
              onClick={handleNext}
              style={{
                backgroundColor: '#374151',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Siguiente &gt;
            </button>
          </div>
          
          <button 
            onClick={() => handleOpenNewMeetingModal(new Date())}
            style={{
              backgroundColor: '#6d28d9',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            + Nueva Reunión
          </button>
        </div>
        
        {/* Contenido del calendario según la vista */}
        <div style={{ marginTop: '20px' }}>
          {currentView === 'month' && renderMonthView()}
          {currentView === 'week' && renderWeekView()}
          {currentView === 'day' && renderDayView()}
        </div>
      </div>
      
      {/* Modal para crear nueva reunión */}
      {renderNewMeetingModal()}
    </div>
  );
}
