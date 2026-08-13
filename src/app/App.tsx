import { useState } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Agenda } from './components/Agenda';
import { VisitDetail } from './components/VisitDetail';
import { AttentionForm } from './components/AttentionForm';
import { ClinicalHistory } from './components/ClinicalHistory';
import { Patients } from './components/Patients';
import { PetRegistration } from './components/PetRegistration';

export type Screen = 'login' | 'dashboard' | 'agenda' | 'visit-detail' | 'attention-form' | 'clinical-history' | 'patients' | 'pet-registration';

export interface Visit {
  id: string;
  petName: string;
  ownerName: string;
  time: string;
  type: string;
  status: 'pending' | 'in-progress' | 'completed';
  petType: string;
  breed: string;
  age: string;
}

export interface PetRegistrationData {
  id: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerAddress?: string;
  petName: string;
  petAge: string;
  petType: string;
  petBreed: string;
  consultType: 'presencial' | 'domicilio';
  registrationDate: string;
  appointmentDate?: string; // Para domicilio
  appointmentTime?: string; // Para presencial
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [registeredPets, setRegisteredPets] = useState<PetRegistrationData[]>([]);

  const navigateTo = (screen: Screen, visit?: Visit) => {
    if (visit) {
      setSelectedVisit(visit);
    }
    setCurrentScreen(screen);
  };

  const addPetRegistration = (pet: PetRegistrationData) => {
    setRegisteredPets(prev => [...prev, pet]);
  };

  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center sm:p-4">
      <div className="w-full h-full sm:h-auto max-w-md bg-white sm:rounded-3xl sm:shadow-2xl overflow-hidden sm:max-h-[932px] flex flex-col">
        {currentScreen === 'login' && <Login onNavigate={navigateTo} />}
        {currentScreen === 'dashboard' && <Dashboard onNavigate={navigateTo} registeredPetsCount={registeredPets.length} />}
        {currentScreen === 'agenda' && <Agenda onNavigate={navigateTo} registeredPets={registeredPets} />}
        {currentScreen === 'visit-detail' && selectedVisit && (
          <VisitDetail visit={selectedVisit} onNavigate={navigateTo} />
        )}
        {currentScreen === 'attention-form' && selectedVisit && (
          <AttentionForm visit={selectedVisit} onNavigate={navigateTo} />
        )}
        {currentScreen === 'clinical-history' && selectedVisit && (
          <ClinicalHistory visit={selectedVisit} onNavigate={navigateTo} />
        )}
        {currentScreen === 'patients' && <Patients onNavigate={navigateTo} registeredPets={registeredPets} />}
        {currentScreen === 'pet-registration' && <PetRegistration onNavigate={navigateTo} onRegister={addPetRegistration} />}
      </div>
    </div>
  );
}