'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Meeting, Attendee, Task } from '../types/meeting';

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  meeting: Meeting | null;
}

export default function MeetingModal({ isOpen, onClose, selectedDate, meeting }: MeetingModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [newAttendee, setNewAttendee] = useState({ name: '', email: '' });
  const [topics, setTopics] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ description: '', assignee: '' });
  const [agreements, setAgreements] = useState<string[]>([]);
  const [newAgreement, setNewAgreement] = useState('');
  
  useEffect(() => {
    if (meeting) {
      setTitle(meeting.title);
      setDescription(meeting.description);
      setStartTime(format(new Date(meeting.start), 'HH:mm'));
      setEndTime(format(new Date(meeting.end), 'HH:mm'));
      setAttendees(meeting.attendees);
      setTopics(meeting.topics);
      setTasks(meeting.tasks);
      setAgreements(meeting.agreements);
    } else {
      resetForm();
    }
  }, [meeting]);
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStartTime('09:00');
    setEndTime('10:00');
    setAttendees([]);
    setTopics([]);
    setTasks([]);
    setAgreements([]);
  };
  
  const handleAddAttendee = () => {
    if (newAttendee.name && newAttendee.email) {
      setAttendees([
        ...attendees,
        {
          id: Date.now().toString(),
          name: newAttendee.name,
          email: newAttendee.email,
          status: 'pending'
        }
      ]);
      setNewAttendee({ name: '', email: '' });
    }
  };
  
  const handleRemoveAttendee = (id: string) => {
    setAttendees(attendees.filter(attendee => attendee.id !== id));
  };
  
  const handleAddTopic = () => {
    if (newTopic) {
      setTopics([...topics, newTopic]);
      setNewTopic('');
    }
  };
  
  const handleRemoveTopic = (index: number) => {
    setTopics(topics.filter((_, i) => i !== index));
  };
  
  const handleAddTask = () => {
    if (newTask.description && newTask.assignee) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          description: newTask.description,
          assignee: newTask.assignee,
          dueDate: new Date(),
          status: 'pending'
        }
      ]);
      setNewTask({ description: '', assignee: '' });
    }
  };
  
  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const handleAddAgreement = () => {
    if (newAgreement) {
      setAgreements([...agreements, newAgreement]);
      setNewAgreement('');
    }
  };
  
  const handleRemoveAgreement = (index: number) => {
    setAgreements(agreements.filter((_, i) => i !== index));
  };
  
  const handleSubmit = () => {
    // En una aplicación real, aquí enviaríamos los datos a una API
    console.log({
      title,
      description,
      start: selectedDate,
      startTime,
      endTime,
      attendees,
      topics,
      tasks,
      agreements
    });
    
    // Simulamos el envío de invitaciones
    alert('Reunión guardada y invitaciones enviadas a los participantes');
    
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {meeting ? 'Editar Reunión' : 'Nueva Reunión'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Fecha seleccionada */}
            {selectedDate && (
              <div className="bg-purple-900/30 p-3 rounded-lg">
                <p className="text-purple-300 font-medium">
                  Fecha seleccionada: {format(selectedDate, "EEEE d 'de' MMMM 'de' yyyy", { locale: es })}
                </p>
              </div>
            )}
            
            {/* Información básica */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Título de la reunión *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white"
                  placeholder="Ej: Revisión de proyecto"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Descripción
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white h-24"
                  placeholder="Describe el propósito de la reunión"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Hora de inicio
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Hora de fin
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white"
                  />
                </div>
              </div>
            </div>
            
            {/* Participantes */}
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Participantes</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <input
                    type="text"
                    value={newAttendee.name}
                    onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white"
                    placeholder="Nombre"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    value={newAttendee.email}
                    onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white"
                    placeholder="Correo electrónico"
                  />
                </div>
                
                <div>
                  <button
                    onClick={handleAddAttendee}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition"
                  >
                    Añadir
                  </button>
                </div>
              </div>
              
              {attendees.length > 0 && (
                <div className="bg-gray-800 rounded-md p-3 mt-2">
                  <ul className="divide-y divide-gray-700">
                    {attendees.map((attendee) => (
                      <li key={attendee.id} className="py-2 flex justify-between items-center">
                        <div>
                          <p className="text-white">{attendee.name}</p>
                          <p className="text-gray-400 text-sm">{attendee.email}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            attendee.status === 'accepted' ? 'bg-green-900 text-green-300' :
                            attendee.status === 'declined' ? 'bg-red-900 text-red-300' :
                            'bg-yellow-900 text-yellow-300'
                          }`}>
                            {attendee.status === 'accepted' ? 'Aceptado' :
                             attendee.status === 'declined' ? 'Rechazado' :
                             'Pendiente'}
                          </span>
                          <button
                            onClick={() => handleRemoveAttendee(attendee.id)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Temas */}
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Temas a tratar</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                <div className="md:col-span-3">
                  <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white"
                    placeholder="Nuevo tema"
                  />
                </div>
                
                <div>
                  <button
                    onClick={handleAddTopic}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition"
                  >
                    Añadir
                  </button>
                </div>
              </div>
              
              {topics.length > 0 && (
                <div className="bg-gray-800 rounded-md p-3 mt-2">
                  <ul className="divide-y divide-gray-700">
                    {topics.map((topic, index) => (
                      <li key={index} className="py-2 flex justify-between items-center">
                        <p className="text-white">{topic}</p>
                        <button
                          onClick={() => handleRemoveTopic(index)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Tareas */}
            {meeting && (
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Tareas asignadas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <input
                      type="text"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white"
                      placeholder="Descripción de la tarea"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      value={newTask.assignee}
                      onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white"
                      placeholder="Responsable"
                    />
                  </div>
                  
                  <div>
                    <button
                      onClick={handleAddTask}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition"
                    >
                      Añadir
                    </button>
                  </div>
                </div>
                
                {tasks.length > 0 && (
                  <div className="bg-gray-800 rounded-md p-3 mt-2">
                    <ul className="divide-y divide-gray-700">
                      {tasks.map((task) => (
                        <li key={task.id} className="py-2 flex justify-between items-center">
                          <div>
                            <p className="text-white">{task.description}</p>
                            <p className="text-gray-400 text-sm">Responsable: {task.assignee}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              task.status === 'completed' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                            }`}>
                              {task.status === 'completed' ? 'Completada' : 'Pendiente'}
                            </span>
                            <button
                              onClick={() => handleRemoveTask(task.id)}
                              className="text-gray-400 hover:text-red-400"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            {/* Acuerdos */}
            {meeting && (
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Acuerdos</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                  <div className="md:col-span-3">
                    <input
                      type="text"
                      value={newAgreement}
                      onChange={(e) => setNewAgreement(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white"
                      placeholder="Nuevo acuerdo"
                    />
                  </div>
                  
                  <div>
                    <button
                      onClick={handleAddAgreement}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition"
                    >
                      Añadir
                    </button>
                  </div>
                </div>
                
                {agreements.length > 0 && (
                  <div className="bg-gray-800 rounded-md p-3 mt-2">
                    <ul className="divide-y divide-gray-700">
                      {agreements.map((agreement, index) => (
                        <li key={index} className="py-2 flex justify-between items-center">
                          <p className="text-white">{agreement}</p>
                          <button
                            onClick={() => handleRemoveAgreement(index)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            {/* Opciones de Teams */}
            <div className="bg-gray-800 rounded-md p-4">
              <h3 className="text-lg font-medium text-white mb-3">Opciones de Microsoft Teams</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="create-teams-meeting"
                    className="h-4 w-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
                  />
                  <label htmlFor="create-teams-meeting" className="ml-2 block text-sm text-gray-300">
                    Crear reunión en Microsoft Teams
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="send-invitations"
                    className="h-4 w-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
                    defaultChecked
                  />
                  <label htmlFor="send-invitations" className="ml-2 block text-sm text-gray-300">
                    Enviar invitaciones por correo
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enable-transcription"
                    className="h-4 w-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
                    defaultChecked
                  />
                  <label htmlFor="enable-transcription" className="ml-2 block text-sm text-gray-300">
                    Habilitar transcripción automática
                  </label>
                </div>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-800 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
              >
                {meeting ? 'Actualizar reunión' : 'Crear reunión'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
