import { useState } from 'react';
import { ArrowLeft, User, PawPrint, Calendar, Building2, Home, Phone, Mail, CheckCircle } from 'lucide-react';
import type { Screen, PetRegistrationData } from '../App';

interface PetRegistrationProps {
  onNavigate: (screen: Screen) => void;
  onRegister: (pet: PetRegistrationData) => void;
}

type ConsultType = 'presencial' | 'domicilio' | null;

export function PetRegistration({ onNavigate, onRegister }: PetRegistrationProps) {
  const [consultType, setConsultType] = useState<ConsultType>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    ownerAddress: '',
    petName: '',
    petAge: '',
    petType: '',
    petBreed: '',
    appointmentDay: '', // Día para domicilio
    appointmentMonth: '', // Mes para domicilio
    appointmentTime: '', // Para presencial
  });

  const availableTimes = [
    '1:00 PM',
    '1:30 PM', 
    '3:00 PM',
    '4:30 PM'
  ];

  const months = [
    { value: '01', label: 'Enero' },
    { value: '02', label: 'Febrero' },
    { value: '03', label: 'Marzo' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Mayo' },
    { value: '06', label: 'Junio' },
    { value: '07', label: 'Julio' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' },
  ];

  const days = Array.from({ length: 31 }, (_, i) => {
    const day = (i + 1).toString().padStart(2, '0');
    return { value: day, label: day };
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!consultType) return;

    // Validar que se haya seleccionado fecha/hora según el tipo
    if (consultType === 'domicilio' && (!formData.appointmentDay || !formData.appointmentMonth)) {
      alert('Por favor selecciona día y mes para la visita a domicilio');
      return;
    }
    if (consultType === 'presencial' && !formData.appointmentTime) {
      alert('Por favor selecciona una hora para la cita presencial');
      return;
    }

    // Crear fecha completa para domicilio (año actual)
    const appointmentDate = consultType === 'domicilio' 
      ? `2026-${formData.appointmentMonth}-${formData.appointmentDay}`
      : '';

    // Crear el objeto de registro
    const newRegistration: PetRegistrationData = {
      id: `pet-${Date.now()}`,
      ownerName: formData.ownerName,
      ownerPhone: formData.ownerPhone,
      ownerEmail: formData.ownerEmail,
      ownerAddress: formData.ownerAddress,
      petName: formData.petName,
      petAge: formData.petAge,
      petType: formData.petType,
      petBreed: formData.petBreed,
      consultType: consultType,
      registrationDate: new Date().toISOString(),
      appointmentDate: appointmentDate,
      appointmentTime: formData.appointmentTime,
    };

    // Guardar el registro
    onRegister(newRegistration);

    // Mostrar mensaje de éxito
    setShowSuccess(true);

    // Limpiar formulario
    setFormData({
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      ownerAddress: '',
      petName: '',
      petAge: '',
      petType: '',
      petBreed: '',
      appointmentDay: '',
      appointmentMonth: '',
      appointmentTime: '',
    });

    // Resetear tipo de consulta después de 2 segundos
    setTimeout(() => {
      setShowSuccess(false);
      setConsultType(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold">Inscripción Mascota</h2>
            <p className="text-purple-100 text-sm">Nueva consulta</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Mini Titles */}
        {!consultType && (
          <div className="mb-6">
            <h3 className="text-center text-gray-700 mb-2">Selecciona el tipo de consulta:</h3>
            <div className="flex flex-col gap-2 text-center">
              <p className="text-sm text-gray-500">• Inscribir mascota para consulta presencial</p>
              <p className="text-sm text-gray-500">• Inscribir mascota para atención a domicilio</p>
            </div>
          </div>
        )}

        {/* Consultation Type Selection */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Selecciona Tipo de Consulta</h3>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => setConsultType('presencial')}
              className={`p-4 rounded-xl border-2 transition-all ${
                consultType === 'presencial'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  consultType === 'presencial' ? 'bg-purple-500' : 'bg-gray-200'
                }`}>
                  <Building2 className={`w-6 h-6 ${
                    consultType === 'presencial' ? 'text-white' : 'text-gray-500'
                  }`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-800">Consulta Presencial</p>
                  <p className="text-sm text-gray-500">En las instalaciones de la veterinaria</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  consultType === 'presencial'
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300'
                }`}>
                  {consultType === 'presencial' && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            </button>

            <button
              onClick={() => setConsultType('domicilio')}
              className={`p-4 rounded-xl border-2 transition-all ${
                consultType === 'domicilio'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  consultType === 'domicilio' ? 'bg-purple-500' : 'bg-gray-200'
                }`}>
                  <Home className={`w-6 h-6 ${
                    consultType === 'domicilio' ? 'text-white' : 'text-gray-500'
                  }`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-800">Atención a Domicilio</p>
                  <p className="text-sm text-gray-500">En la comodidad de tu hogar</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  consultType === 'domicilio'
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300'
                }`}>
                  {consultType === 'domicilio' && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Registration Form */}
        {consultType && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            {/* Owner Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-purple-500" />
                <h3 className="font-semibold text-gray-800">Datos del Propietario</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="ownerName" className="block text-sm text-gray-600 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Juan Pérez García"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="ownerPhone" className="block text-sm text-gray-600 mb-2">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      id="ownerPhone"
                      name="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={handleInputChange}
                      required
                      placeholder="+34 600 000 000"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ownerEmail" className="block text-sm text-gray-600 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="ownerEmail"
                      name="ownerEmail"
                      value={formData.ownerEmail}
                      onChange={handleInputChange}
                      placeholder="ejemplo@correo.com"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    />
                  </div>
                </div>

                {consultType === 'domicilio' && (
                  <div>
                    <label htmlFor="ownerAddress" className="block text-sm text-gray-600 mb-2">
                      Dirección (para servicio a domicilio) *
                    </label>
                    <input
                      type="text"
                      id="ownerAddress"
                      name="ownerAddress"
                      value={formData.ownerAddress}
                      onChange={handleInputChange}
                      required={consultType === 'domicilio'}
                      placeholder="Calle, número, piso, ciudad"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Pet Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <PawPrint className="w-5 h-5 text-purple-500" />
                <h3 className="font-semibold text-gray-800">Datos de la Mascota</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="petName" className="block text-sm text-gray-600 mb-2">
                    Nombre de la Mascota *
                  </label>
                  <input
                    type="text"
                    id="petName"
                    name="petName"
                    value={formData.petName}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Max"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="petType" className="block text-sm text-gray-600 mb-2">
                    Tipo de Animal *
                  </label>
                  <select
                    id="petType"
                    name="petType"
                    value={formData.petType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white"
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                    <option value="conejo">Conejo</option>
                    <option value="ave">Ave</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="petBreed" className="block text-sm text-gray-600 mb-2">
                    Raza
                  </label>
                  <input
                    type="text"
                    id="petBreed"
                    name="petBreed"
                    value={formData.petBreed}
                    onChange={handleInputChange}
                    placeholder="Ej: Golden Retriever"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="petAge" className="block text-sm text-gray-600 mb-2">
                    Edad *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="petAge"
                      name="petAge"
                      value={formData.petAge}
                      onChange={handleInputChange}
                      required
                      placeholder="Ej: 3 años, 6 meses"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    />
                  </div>
                </div>

                {consultType === 'presencial' && (
                  <div>
                    <label htmlFor="appointmentTime" className="block text-sm text-gray-600 mb-2">
                      Hora de la Cita *
                    </label>
                    <select
                      id="appointmentTime"
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white"
                    >
                      <option value="">Seleccionar hora</option>
                      {availableTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                )}

                {consultType === 'domicilio' && (
                  <div>
                    <label htmlFor="appointmentDate" className="block text-sm text-gray-600 mb-2">
                      Fecha de la Visita *
                    </label>
                    <div className="flex gap-2">
                      <select
                        id="appointmentDay"
                        name="appointmentDay"
                        value={formData.appointmentDay}
                        onChange={handleInputChange}
                        required
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white"
                      >
                        <option value="">Día</option>
                        {days.map(day => (
                          <option key={day.value} value={day.value}>{day.label}</option>
                        ))}
                      </select>
                      <select
                        id="appointmentMonth"
                        name="appointmentMonth"
                        value={formData.appointmentMonth}
                        onChange={handleInputChange}
                        required
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white"
                      >
                        <option value="">Mes</option>
                        {months.map(month => (
                          <option key={month.value} value={month.value}>{month.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 pb-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 transition-all shadow-md"
              >
                Registrar Inscripción
              </button>
            </div>
          </form>
        )}

        {!consultType && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <PawPrint className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-gray-500">Selecciona el tipo de consulta para continuar</p>
          </div>
        )}

        {/* Success Message Overlay */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 mx-4 max-w-sm animate-fade-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">¡Inscripción Exitosa!</h3>
              <p className="text-gray-600 text-center">La mascota ha sido registrada correctamente</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}