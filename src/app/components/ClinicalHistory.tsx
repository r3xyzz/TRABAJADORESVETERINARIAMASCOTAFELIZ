import { ArrowLeft, Calendar, FileText, Syringe, Pill, AlertTriangle } from 'lucide-react';
import type { Screen, Visit } from '../App';

interface ClinicalHistoryProps {
  visit: Visit;
  onNavigate: (screen: Screen, visit?: Visit) => void;
}

export function ClinicalHistory({ visit, onNavigate }: ClinicalHistoryProps) {
  const historyRecords = [
    {
      id: '1',
      date: '10 Ene 2026',
      type: 'Consulta',
      doctor: 'Dr. García',
      diagnosis: 'Infección respiratoria leve',
      treatment: 'Antibiótico (Amoxicilina 250mg) cada 12h por 7 días',
    },
    {
      id: '2',
      date: '05 Dic 2025',
      type: 'Vacunación',
      doctor: 'Dra. Martínez',
      diagnosis: 'Control de vacunas',
      treatment: 'Vacuna antirrábica anual aplicada',
    },
    {
      id: '3',
      date: '15 Nov 2025',
      type: 'Control',
      doctor: 'Dr. García',
      diagnosis: 'Chequeo general - Estado saludable',
      treatment: 'Desparasitación preventiva',
    },
  ];

  const vaccinations = [
    { name: 'Antirrábica', date: '05 Dic 2025', nextDue: '05 Dic 2026' },
    { name: 'Polivalente', date: '15 Jun 2025', nextDue: '15 Jun 2026' },
    { name: 'Tos de las perreras', date: '20 Ago 2025', nextDue: '20 Ago 2026' },
  ];

  const allergies = ['Penicilina', 'Polen de flores'];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 text-white flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => onNavigate('visit-detail', visit)}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold">Historial Clínico</h2>
            <p className="text-indigo-100 text-sm">{visit.petName} - {visit.breed}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Pet Summary */}
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
              {visit.petName.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl">{visit.petName}</h3>
              <p className="text-indigo-100">{visit.breed} • {visit.age}</p>
              <p className="text-sm text-indigo-200 mt-1">ID: #VET-{visit.id.padStart(4, '0')}</p>
            </div>
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h4 className="font-semibold text-red-800">Alergias</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {allergies.map((allergy, index) => (
              <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                {allergy}
              </span>
            ))}
          </div>
        </div>

        {/* Vaccinations */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Syringe className="w-5 h-5 text-indigo-500" />
            <h4 className="font-semibold text-gray-800">Vacunas</h4>
          </div>
          <div className="space-y-3">
            {vaccinations.map((vaccine, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">{vaccine.name}</p>
                  <p className="text-xs text-gray-500">Última: {vaccine.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Próxima</p>
                  <p className="text-sm font-medium text-indigo-600">{vaccine.nextDue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* History Records */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-indigo-500" />
            <h4 className="font-semibold text-gray-800">Historial de Consultas</h4>
          </div>
          <div className="space-y-4">
            {historyRecords.map((record) => (
              <div key={record.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">{record.date}</span>
                  </div>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                    {record.type}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">Atendido por: {record.doctor}</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Diagnóstico:</p>
                    <p className="text-sm text-gray-800">{record.diagnosis}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
                      <Pill className="w-3 h-3" />
                      Tratamiento:
                    </p>
                    <p className="text-sm text-gray-800">{record.treatment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}