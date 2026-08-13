import { useState } from 'react';
import { ArrowLeft, Search, Calendar as CalendarIcon, Clock, User, Filter } from 'lucide-react';
import type { Screen, Visit, PetRegistrationData } from '../App';

interface AgendaProps {
  onNavigate: (screen: Screen, visit?: Visit) => void;
  registeredPets: PetRegistrationData[];
}

export function Agenda({ onNavigate, registeredPets }: AgendaProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const mockVisits: Visit[] = [
    {
      id: '1',
      petName: 'Max',
      ownerName: 'Carlos Rodríguez',
      time: '09:00',
      type: 'Control',
      status: 'completed',
      petType: 'Perro',
      breed: 'Golden Retriever',
      age: '3 años'
    },
    {
      id: '2',
      petName: 'Luna',
      ownerName: 'María González',
      time: '10:30',
      type: 'Vacunación',
      status: 'in-progress',
      petType: 'Gato',
      breed: 'Siamés',
      age: '1 año'
    },
    {
      id: '3',
      petName: 'Rocky',
      ownerName: 'Pedro Martínez',
      time: '11:00',
      type: 'Consulta',
      status: 'pending',
      petType: 'Perro',
      breed: 'Labrador',
      age: '5 años'
    },
  ];

  // Convertir mascotas registradas a visitas
  const registeredVisits: Visit[] = registeredPets.map((pet, index) => {
    let displayTime = '';
    
    if (pet.consultType === 'presencial' && pet.appointmentTime) {
      // Si es presencial, usar la hora seleccionada
      displayTime = pet.appointmentTime;
    } else if (pet.consultType === 'domicilio' && pet.appointmentDate) {
      // Si es domicilio, mostrar la fecha
      const date = new Date(pet.appointmentDate);
      displayTime = date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    } else {
      // Fallback
      const baseHour = 14 + index;
      displayTime = `${baseHour.toString().padStart(2, '0')}:00`;
    }
    
    return {
      id: pet.id,
      petName: pet.petName,
      ownerName: pet.ownerName,
      time: displayTime,
      type: pet.consultType === 'presencial' ? 'Consulta Presencial' : 'Atención Domicilio',
      status: 'pending' as const,
      petType: pet.petType.charAt(0).toUpperCase() + pet.petType.slice(1),
      breed: pet.petBreed || 'No especificado',
      age: pet.petAge
    };
  });

  // Combinar visitas mock con registradas
  const allVisits = [...mockVisits, ...registeredVisits];

  // Filtrar por búsqueda
  const filteredVisits = allVisits.filter(visit =>
    visit.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'in-progress':
        return 'En curso';
      case 'pending':
        return 'Pendiente';
      default:
        return status;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold">Agenda del Día</h2>
            <p className="text-blue-100 text-sm">12 citas programadas</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar paciente..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-gray-800 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 bg-white border-b border-gray-100 flex gap-2 overflow-x-auto">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium whitespace-nowrap">
          Todas (12)
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-gray-200">
          Pendientes (5)
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-gray-200">
          En curso (1)
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-gray-200">
          <Filter className="w-4 h-4 inline mr-1" />
          Filtros
        </button>
      </div>

      {/* Visit List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredVisits.map((visit) => (
            <button
              key={visit.id}
              onClick={() => onNavigate('visit-detail', visit)}
              className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-800">{visit.time}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(visit.status)}`}>
                      {getStatusText(visit.status)}
                    </span>
                  </div>
                  <p className="font-bold text-gray-800">{visit.petName}</p>
                  <p className="text-sm text-gray-500">{visit.ownerName}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                    {visit.type}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{visit.petType}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}