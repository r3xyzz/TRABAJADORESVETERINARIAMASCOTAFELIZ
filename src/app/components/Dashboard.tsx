import { Calendar, Users, ClipboardList, TrendingUp, Bell, LogOut } from 'lucide-react';
import type { Screen } from '../App';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
  registeredPetsCount: number;
}

export function Dashboard({ onNavigate, registeredPetsCount }: DashboardProps) {
  const stats = [
    { label: 'Citas Hoy', value: '12', icon: Calendar, color: 'bg-blue-500' },
    { label: 'Pacientes', value: String(2 + registeredPetsCount), icon: Users, color: 'bg-green-500' },
    { label: 'Pendientes', value: String(5 + registeredPetsCount), icon: ClipboardList, color: 'bg-orange-500' },
    { label: 'Este Mes', value: '89', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  const quickActions = [
    { label: 'Agenda del Día', screen: 'agenda' as Screen, icon: Calendar, color: 'bg-blue-500' },
    { label: 'Pacientes', screen: 'patients' as Screen, icon: Users, color: 'bg-green-500' },
    { label: 'Inscripción Mascota', screen: 'pet-registration' as Screen, icon: ClipboardList, color: 'bg-purple-500' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white flex-shrink-0">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Bienvenido, Dr. García</h2>
            <p className="text-blue-100 text-sm">Martes, 13 de Enero 2026</p>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('login')}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className={`${stat.color} w-10 h-10 rounded-full flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Accesos Rápidos</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => onNavigate(action.screen)}
                className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium text-gray-800">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Actividad Reciente</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-1">
                <p className="font-medium text-gray-800">Max - Control</p>
                <span className="text-xs text-gray-500">10:30 AM</span>
              </div>
              <p className="text-sm text-gray-500">Vacunación completada</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-1">
                <p className="font-medium text-gray-800">Luna - Consulta</p>
                <span className="text-xs text-gray-500">11:15 AM</span>
              </div>
              <p className="text-sm text-gray-500">Revisión general programada</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}