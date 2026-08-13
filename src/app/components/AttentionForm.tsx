import { useState } from 'react';
import { ArrowLeft, Save, AlertCircle, Activity, Thermometer, Weight } from 'lucide-react';
import type { Screen, Visit } from '../App';

interface AttentionFormProps {
  visit: Visit;
  onNavigate: (screen: Screen, visit?: Visit) => void;
}

export function AttentionForm({ visit, onNavigate }: AttentionFormProps) {
  const [formData, setFormData] = useState({
    weight: '',
    temperature: '',
    heartRate: '',
    symptoms: '',
    diagnosis: '',
    treatment: '',
    observations: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving
    alert('Atención guardada exitosamente');
    onNavigate('agenda');
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('visit-detail', visit)}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold">Formulario de Atención</h2>
            <p className="text-green-100 text-sm">{visit.petName} - {visit.type}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
        {/* Vital Signs */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-500" />
            Signos Vitales
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Weight className="w-4 h-4 inline mr-1" />
                Peso (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="0.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Thermometer className="w-4 h-4 inline mr-1" />
                Temp. (°C)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => handleChange('temperature', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="38.0"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frecuencia Cardíaca (lpm)
            </label>
            <input
              type="number"
              value={formData.heartRate}
              onChange={(e) => handleChange('heartRate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              placeholder="120"
            />
          </div>
        </div>

        {/* Symptoms */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <AlertCircle className="w-4 h-4 inline mr-1 text-orange-500" />
            Síntomas
          </label>
          <textarea
            value={formData.symptoms}
            onChange={(e) => handleChange('symptoms', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
            placeholder="Describe los síntomas observados..."
          />
        </div>

        {/* Diagnosis */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Diagnóstico
          </label>
          <textarea
            value={formData.diagnosis}
            onChange={(e) => handleChange('diagnosis', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
            placeholder="Diagnóstico preliminar o definitivo..."
          />
        </div>

        {/* Treatment */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tratamiento
          </label>
          <textarea
            value={formData.treatment}
            onChange={(e) => handleChange('treatment', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
            placeholder="Medicamentos, dosis, frecuencia..."
          />
        </div>

        {/* Observations */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones
          </label>
          <textarea
            value={formData.observations}
            onChange={(e) => handleChange('observations', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
            placeholder="Notas adicionales..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 mb-4"
        >
          <Save className="w-5 h-5" />
          Guardar Atención
        </button>
      </form>
    </div>
  );
}