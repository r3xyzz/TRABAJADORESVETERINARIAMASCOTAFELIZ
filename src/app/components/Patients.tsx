import { useState } from 'react';
import { Search, ArrowLeft, Dog, Cat, X, Calendar, MapPin, Home, Building2, Pill, Syringe, Activity, FileText, AlertCircle, Clock, User, Phone, Mail, ClipboardList, Download, Edit2, Save, CheckCircle, Plus, Trash2 } from 'lucide-react';
import type { Screen, PetRegistrationData } from '../App';

interface PatientsProps {
  onNavigate: (screen: Screen) => void;
  registeredPets: PetRegistrationData[];
}

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  owner: string;
  ownerPhone: string;
  ownerEmail: string;
  photo: string;
  lastVisit: string;
  weight: string;
  color: string;
}

interface MedicalRecord {
  pet: Pet;
  consultReason: string;
  consultType: 'presencial' | 'domicilio';
  consultDate: string;
  medicalHistory: string[];
  physicalExam: {
    weight: string;
    temperature: string;
    heartRate: string;
    respiratoryRate: string;
    bodyCondition: string;
  };
  diagnosis: string[];
  treatments: {
    name: string;
    dose: string;
    frequency: string;
    duration: string;
    type: 'presencial' | 'domicilio';
  }[];
  testResults: {
    test: string;
    result: string;
    date: string;
  }[];
  allergies: string[];
  vaccines: {
    name: string;
    date: string;
    nextDate: string;
  }[];
  followUp: string;
  recommendations: string[];
}

export function Patients({ onNavigate, registeredPets }: PatientsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPet, setSelectedPet] = useState<MedicalRecord | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDiagnosis, setEditedDiagnosis] = useState<string[]>([]);
  const [editedNotes, setEditedNotes] = useState('');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [medicalRecords, setMedicalRecords] = useState<Map<string, { diagnosis: string[], notes: string }>>(new Map());

  // Mock pets (datos de ejemplo)
  const mockPets: Pet[] = [
    {
      id: '1',
      name: 'Max',
      species: 'Perro',
      breed: 'Golden Retriever',
      age: '3 años',
      owner: 'Carlos Rodríguez',
      ownerPhone: '+34 612 345 678',
      ownerEmail: 'carlos.r@email.com',
      photo: '🐕',
      lastVisit: '15 Ene 2026',
      weight: '28 kg',
      color: 'bg-amber-500'
    },
    {
      id: '2',
      name: 'Luna',
      species: 'Gato',
      breed: 'Siamés',
      age: '2 años',
      owner: 'María González',
      ownerPhone: '+34 623 456 789',
      ownerEmail: 'maria.g@email.com',
      photo: '🐱',
      lastVisit: '18 Ene 2026',
      weight: '4.2 kg',
      color: 'bg-purple-500'
    },
  ];

  // Convertir mascotas registradas a formato Pet
  const registeredPetsFormatted: Pet[] = registeredPets.map(pet => {
    const today = new Date();
    const formattedDate = `${today.getDate()} Ene 2026`;
    
    return {
      id: pet.id,
      name: pet.petName,
      species: pet.petType.charAt(0).toUpperCase() + pet.petType.slice(1),
      breed: pet.petBreed || 'No especificado',
      age: pet.petAge,
      owner: pet.ownerName,
      ownerPhone: pet.ownerPhone,
      ownerEmail: pet.ownerEmail || 'No especificado',
      photo: pet.petType.toLowerCase() === 'perro' ? '🐕' : pet.petType.toLowerCase() === 'gato' ? '🐱' : '🐾',
      lastVisit: formattedDate,
      weight: 'N/A',
      color: pet.petType.toLowerCase() === 'perro' ? 'bg-amber-500' : 'bg-purple-500'
    };
  });

  // Combinar mascotas mock con registradas
  const pets = [...mockPets, ...registeredPetsFormatted];

  const getMedicalRecord = (pet: Pet): MedicalRecord => {
    return {
      pet,
      consultReason: 'Control de rutina y vacunación anual',
      consultType: pet.id === '2' || pet.id === '5' ? 'domicilio' : 'presencial',
      consultDate: pet.lastVisit,
      medicalHistory: [
        'Vacunación completa al día',
        'Esterilizado/a a los 8 meses',
        pet.id === '1' ? 'Displasia de cadera leve diagnosticada en 2024' : 'Sin antecedentes patológicos relevantes'
      ],
      physicalExam: {
        weight: pet.weight,
        temperature: pet.species === 'Perro' ? '38.5°C' : '38.2°C',
        heartRate: pet.species === 'Perro' ? '90 lpm' : '140 lpm',
        respiratoryRate: pet.species === 'Perro' ? '25 rpm' : '30 rpm',
        bodyCondition: 'Óptima (5/9)'
      },
      diagnosis: [
        'Estado general saludable',
        pet.id === '1' ? 'Displasia de cadera bajo control' : 'Sin hallazgos patológicos',
        'Peso adecuado para raza y edad'
      ],
      treatments: [
        {
          name: 'Vacuna Polivalente',
          dose: '1 ml',
          frequency: 'Anual',
          duration: '1 dosis',
          type: pet.id === '2' || pet.id === '5' ? 'domicilio' : 'presencial'
        },
        {
          name: 'Desparasitación interna',
          dose: '1 comprimido',
          frequency: 'Cada 3 meses',
          duration: '1 día',
          type: pet.id === '2' || pet.id === '5' ? 'domicilio' : 'presencial'
        },
        pet.id === '1' ? {
          name: 'Condroprotector',
          dose: '500 mg',
          frequency: 'Diaria',
          duration: 'Continuo',
          type: 'presencial'
        } : {
          name: 'Antipulgas pipeta',
          dose: '1 pipeta',
          frequency: 'Mensual',
          duration: '1 aplicación',
          type: pet.id === '2' || pet.id === '5' ? 'domicilio' : 'presencial'
        }
      ],
      testResults: [
        {
          test: 'Análisis de sangre completo',
          result: 'Valores normales',
          date: pet.lastVisit
        },
        {
          test: 'Examen coprológico',
          result: 'Negativo para parásitos',
          date: pet.lastVisit
        },
        pet.id === '1' ? {
          test: 'Radiografía de cadera',
          result: 'Displasia grado I sin progresión',
          date: '10 Dic 2025'
        } : {
          test: 'Examen dental',
          result: 'Dentadura en buen estado',
          date: pet.lastVisit
        }
      ],
      allergies: pet.id === '4' ? ['Alergia a proteína de pollo', 'Sensibilidad a ciertos antiinflamatorios'] : [],
      vaccines: [
        {
          name: 'Polivalente',
          date: pet.lastVisit,
          nextDate: '15 Ene 2027'
        },
        {
          name: 'Rabia',
          date: '15 Jul 2025',
          nextDate: '15 Jul 2026'
        },
        pet.species === 'Gato' ? {
          name: 'Leucemia Felina',
          date: '15 May 2025',
          nextDate: '15 May 2026'
        } : {
          name: 'Tos de las perreras',
          date: '20 Ago 2025',
          nextDate: '20 Ago 2026'
        }
      ],
      followUp: 'Control en 6 meses para vacunación de rabia. Revisar peso y condición articular.',
      recommendations: [
        'Paciente cooperativo durante la consulta',
        'Propietario informado sobre cuidados post-vacunación',
        pet.id === '1' ? 'Observar movilidad en las próximas semanas. Si hay cojera, considerar ajuste de tratamiento' : 'Sin observaciones adicionales',
        'Recordar al propietario próxima cita programada',
        pet.id === '4' ? 'Reforzar importancia de la dieta hipoalergénica' : 'Revisar plan de desparasitación en próxima visita'
      ]
    };
  };

  const filteredPets = pets.filter(pet => 
    pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = () => {
    if (selectedPet) {
      const saved = medicalRecords.get(selectedPet.pet.id);
      setEditedDiagnosis(saved?.diagnosis || selectedPet.diagnosis);
      setEditedNotes(saved?.notes || selectedPet.recommendations.join('\n'));
      setIsEditing(true);
    }
  };

  const handleSaveChanges = () => {
    if (selectedPet) {
      // Convert diagnosis text to array
      const diagnosisArray = editedDiagnosis;
      
      // Save to medicalRecords Map
      setMedicalRecords(prev => {
        const newMap = new Map(prev);
        newMap.set(selectedPet.pet.id, {
          diagnosis: diagnosisArray,
          notes: editedNotes
        });
        return newMap;
      });

      // Update current selectedPet
      setSelectedPet({
        ...selectedPet,
        diagnosis: diagnosisArray,
        recommendations: editedNotes.split('\n').filter(note => note.trim() !== '')
      });

      setIsEditing(false);
      setShowSaveSuccess(true);

      setTimeout(() => {
        setShowSaveSuccess(false);
      }, 2000);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedDiagnosis([]);
    setEditedNotes('');
  };

  const handleDiagnosisChange = (index: number, value: string) => {
    const newDiagnosis = [...editedDiagnosis];
    newDiagnosis[index] = value;
    setEditedDiagnosis(newDiagnosis);
  };

  const handleAddDiagnosis = () => {
    setEditedDiagnosis([...editedDiagnosis, '']);
  };

  const handleRemoveDiagnosis = (index: number) => {
    const newDiagnosis = editedDiagnosis.filter((_, i) => i !== index);
    setEditedDiagnosis(newDiagnosis);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold">Pacientes</h2>
            <p className="text-green-100 text-sm">{pets.length} mascotas registradas</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, dueño o raza..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
      </div>

      {/* Pets List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-3">
          {filteredPets.map((pet) => (
            <button
              key={pet.id}
              onClick={() => setSelectedPet(getMedicalRecord(pet))}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-start gap-4">
                <div className={`${pet.color} w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0`}>
                  {pet.photo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-gray-800">{pet.name}</h3>
                    <span className="text-xs text-gray-500">{pet.lastVisit}</span>
                  </div>
                  <p className="text-sm text-gray-600">{pet.breed} • {pet.age}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <User className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-500">{pet.owner}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {pet.weight}
                    </span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      {pet.species}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredPets.length === 0 && (
          <div className="text-center py-12">
            <Dog className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No se encontraron mascotas</p>
          </div>
        )}
      </div>

      {/* Medical Record Modal */}
      {selectedPet && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-0">
          <div className="bg-white w-full max-w-2xl rounded-t-3xl max-h-[90vh] flex flex-col animate-slide-up">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white rounded-t-3xl flex-shrink-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`${selectedPet.pet.color} w-14 h-14 rounded-xl flex items-center justify-center text-2xl`}>
                    {selectedPet.pet.photo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Ficha Clínica</h3>
                    <p className="text-green-100 text-sm">{selectedPet.pet.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPet(null)}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Consultation Type Badge */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full">
                  {selectedPet.consultType === 'presencial' ? (
                    <>
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm">Presencial</span>
                    </>
                  ) : (
                    <>
                      <Home className="w-4 h-4" />
                      <span className="text-sm">A Domicilio</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{selectedPet.consultDate}</span>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Pet and Owner Info */}
              <section>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-green-500" />
                  Datos del Paciente y Propietario
                </h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Mascota</p>
                      <p className="text-sm font-medium text-gray-800">{selectedPet.pet.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Especie</p>
                      <p className="text-sm font-medium text-gray-800">{selectedPet.pet.species}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Raza</p>
                      <p className="text-sm font-medium text-gray-800">{selectedPet.pet.breed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Edad</p>
                      <p className="text-sm font-medium text-gray-800">{selectedPet.pet.age}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-800">{selectedPet.pet.owner}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-800">{selectedPet.pet.ownerPhone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-800">{selectedPet.pet.ownerEmail}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Consult Reason */}
              <section>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Motivo de la Consulta
                </h4>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-gray-800">{selectedPet.consultReason}</p>
                </div>
              </section>

              {/* Medical History */}
              <section>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-500" />
                  Historial Médico
                </h4>
                <div className="bg-purple-50 rounded-xl p-4 space-y-2">
                  {selectedPet.medicalHistory.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-800">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Physical Exam */}
              <section>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-red-500" />
                  Examen Físico
                </h4>
                <div className="bg-red-50 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Peso</p>
                      <p className="text-sm font-medium text-gray-800">{selectedPet.physicalExam.weight}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Temperatura</p>
                      <p className="text-sm font-medium text-gray-800">{selectedPet.physicalExam.temperature}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Frecuencia Cardíaca</p>
                      <p className="text-sm font-medium text-gray-800">{selectedPet.physicalExam.heartRate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Frecuencia Respiratoria</p>
                      <p className="text-sm font-medium text-gray-800">{selectedPet.physicalExam.respiratoryRate}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">Condición Corporal</p>
                      <p className="text-sm font-medium text-gray-800">{selectedPet.physicalExam.bodyCondition}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Diagnosis */}
              <section>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Diagnóstico
                </h4>
                <div className="bg-orange-50 rounded-xl p-4 space-y-2">
                  {isEditing ? (
                    <>
                      {editedDiagnosis.map((diagnosis, index) => (
                        <div key={index} className="flex items-start gap-2 group">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
                          <input
                            type="text"
                            value={diagnosis}
                            onChange={(e) => handleDiagnosisChange(index, e.target.value)}
                            placeholder="Escribe el diagnóstico..."
                            className="flex-1 text-sm text-gray-800 bg-white border border-orange-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveDiagnosis(index)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleAddDiagnosis}
                        className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium mt-2"
                      >
                        <Plus className="w-4 h-4" />
                        Agregar nuevo diagnóstico
                      </button>
                    </>
                  ) : (
                    selectedPet.diagnosis.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-800">{item}</p>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* Treatments */}
              <section>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Pill className="w-5 h-5 text-indigo-500" />
                  Tratamientos Aplicados
                </h4>
                <div className="space-y-3">
                  {selectedPet.treatments.map((treatment, index) => (
                    <div key={index} className="bg-indigo-50 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium text-gray-800">{treatment.name}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          treatment.type === 'presencial' 
                            ? 'bg-indigo-200 text-indigo-700' 
                            : 'bg-purple-200 text-purple-700'
                        }`}>
                          {treatment.type === 'presencial' ? (
                            <span className="flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              Presencial
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Home className="w-3 h-3" />
                              Domicilio
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Dosis: </span>
                          <span className="text-gray-800">{treatment.dose}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Frecuencia: </span>
                          <span className="text-gray-800">{treatment.frequency}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500">Duración: </span>
                          <span className="text-gray-800">{treatment.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Test Results */}
              <section>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-500" />
                  Resultados de Pruebas
                </h4>
                <div className="space-y-3">
                  {selectedPet.testResults.map((test, index) => (
                    <div key={index} className="bg-teal-50 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium text-gray-800">{test.test}</p>
                        <span className="text-xs text-gray-500">{test.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{test.result}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Allergies */}
              {selectedPet.allergies.length > 0 && (
                <section>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Alergias
                  </h4>
                  <div className="bg-red-50 rounded-xl p-4 space-y-2">
                    {selectedPet.allergies.map((allergy, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-800">{allergy}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Vaccines */}
              <section>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Syringe className="w-5 h-5 text-pink-500" />
                  Vacunas
                </h4>
                <div className="space-y-3">
                  {selectedPet.vaccines.map((vaccine, index) => (
                    <div key={index} className="bg-pink-50 rounded-xl p-4">
                      <p className="font-medium text-gray-800 mb-2">{vaccine.name}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Aplicada: </span>
                          <span className="text-gray-800">{vaccine.date}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Próxima: </span>
                          <span className="text-gray-800">{vaccine.nextDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Follow Up */}
              <section>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-500" />
                  Seguimiento
                </h4>
                <div className="bg-cyan-50 rounded-xl p-4">
                  <p className="text-sm text-gray-800">{selectedPet.followUp}</p>
                </div>
              </section>

              {/* Recommendations */}
              <section>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-gray-600" />
                  Notas del Veterinario
                </h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  {isEditing ? (
                    <textarea
                      value={editedNotes}
                      onChange={(e) => setEditedNotes(e.target.value)}
                      placeholder="Escribe las notas del veterinario (una por línea)..."
                      className="text-sm text-gray-800 bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full min-h-[120px] resize-y"
                    />
                  ) : (
                    selectedPet.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-800">{rec}</p>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* Edit and Save Buttons */}
              {isEditing ? (
                <div className="pt-2 pb-4 flex justify-between">
                  <button
                    onClick={handleCancelEdit}
                    className="w-1/2 bg-gray-500 text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-600 transition-colors shadow-md"
                  >
                    <X className="w-5 h-5" />
                    <span className="font-medium">Cancelar</span>
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="w-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-colors shadow-md"
                  >
                    <Save className="w-5 h-5" />
                    <span className="font-medium">Guardar Cambios</span>
                  </button>
                </div>
              ) : (
                <div className="pt-2 pb-4">
                  <button
                    onClick={handleEditClick}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-colors shadow-md"
                  >
                    <Edit2 className="w-5 h-5" />
                    <span className="font-medium">Editar Ficha Clínica</span>
                  </button>
                </div>
              )}

              {/* Download Button */}
              <div className="pt-2 pb-4">
                <button
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-colors shadow-md"
                >
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Descargar Ficha Clínica (PDF)</span>
                </button>
              </div>

              {/* Save Success Message */}
              {showSaveSuccess && (
                <div className="pt-2 pb-4">
                  <div className="bg-green-500 text-white py-4 rounded-xl flex items-center justify-center gap-2 shadow-md">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Cambios guardados exitosamente</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}