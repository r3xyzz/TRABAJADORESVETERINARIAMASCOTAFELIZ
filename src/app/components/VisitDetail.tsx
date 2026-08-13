import { ArrowLeft, Phone, Mail, MapPin, Calendar, FileText, ClipboardList } from 'lucide-react';
import type { Screen, Visit } from '../App';

interface VisitDetailProps {
  visit: Visit;
  onNavigate: (screen: Screen, visit?: Visit) => void;
}

export function VisitDetail({ visit, onNavigate }: VisitDetailProps) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => onNavigate('agenda')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold">Detalle de Visita</h2>
            <p className="text-purple-100 text-sm">{visit.time} - {visit.type}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Pet Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {visit.petName.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-800">{visit.petName}</h3>
              <p className="text-gray-500">{visit.breed} • {visit.age}</p>
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium mt-1">
                {visit.petType}
              </span>
            </div>
          </div>
        </div>

        {/* Owner Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
          <h4 className="font-semibold text-gray-800 mb-4">Información del Propietario</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="font-medium text-gray-800">{visit.ownerName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-medium text-gray-800">+52 55 1234 5678</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Correo</p>
                <p className="font-medium text-gray-800">propietario@email.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Dirección</p>
                <p className="font-medium text-gray-800">Av. Principal 123, CDMX</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
          <h4 className="font-semibold text-gray-800 mb-4">Detalles de la Cita</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Tipo de consulta</span>
              <span className="font-medium text-gray-800">{visit.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Hora</span>
              <span className="font-medium text-gray-800">{visit.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Estado</span>
              <span className="font-medium text-blue-600">
                {visit.status === 'pending' ? 'Pendiente' : visit.status === 'in-progress' ? 'En curso' : 'Completada'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => onNavigate('attention-form', visit)}
            className="w-full bg-purple-500 text-white py-4 rounded-xl font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
          >
            <ClipboardList className="w-5 h-5" />
            Iniciar Atención
          </button>
          <button
            onClick={() => onNavigate('clinical-history', visit)}
            className="w-full bg-white border-2 border-purple-500 text-purple-500 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Ver Historial Clínico
          </button>
        </div>
      </div>
    </div>
  );
}