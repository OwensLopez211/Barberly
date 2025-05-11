import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Appointment } from '../../types';

// Mock appointments data
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    clientId: '101',
    clientName: 'Emma Johnson',
    stylistId: '201',
    stylistName: 'Michael Chen',
    date: '2025-06-01',
    startTime: '10:00',
    endTime: '11:00',
    services: [
      { id: '301', name: 'Haircut', description: 'Basic haircut', duration: 45, price: 35, category: 'Hair' }
    ],
    status: 'scheduled',
    totalPrice: 35
  },
  {
    id: '2',
    clientId: '102',
    clientName: 'James Wilson',
    stylistId: '201',
    stylistName: 'Michael Chen',
    date: '2025-06-01',
    startTime: '13:00',
    endTime: '14:30',
    services: [
      { id: '302', name: 'Coloring', description: 'Hair coloring', duration: 90, price: 75, category: 'Hair' }
    ],
    status: 'scheduled',
    totalPrice: 75
  },
  {
    id: '3',
    clientId: '103',
    clientName: 'Sophia Martinez',
    stylistId: '202',
    stylistName: 'Jessica Lee',
    date: '2025-06-02',
    startTime: '09:30',
    endTime: '11:00',
    services: [
      { id: '303', name: 'Haircut & Style', description: 'Cut and styling', duration: 60, price: 50, category: 'Hair' },
      { id: '304', name: 'Conditioning', description: 'Deep conditioning', duration: 30, price: 25, category: 'Hair' }
    ],
    status: 'scheduled',
    totalPrice: 75
  }
];

const AppointmentCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week'>('week');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Generate days for the week view
  const generateWeekDays = (date: Date) => {
    const days = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Start from Sunday

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const weekDays = generateWeekDays(currentDate);

  // Business hours
  const businessHours = [];
  for (let hour = 9; hour <= 18; hour++) {
    businessHours.push(`${hour}:00`);
  }

  // Handle navigation
  const previousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  // Filter appointments by date
  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return MOCK_APPOINTMENTS.filter(appointment => appointment.date === dateString);
  };

  // Format appointment time
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    return `${hour > 12 ? hour - 12 : hour}:${minutes}${hour >= 12 ? 'pm' : 'am'}`;
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      case 'no-show': return 'warning';
      default: return 'info';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Calendar Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="ml-4">
            <Button
              variant={view === 'day' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setView('day')}
              className="mr-2"
            >
              Day
            </Button>
            <Button
              variant={view === 'week' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setView('week')}
            >
              Week
            </Button>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={previousWeek}
            icon={<ChevronLeft size={16} />}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextWeek}
            icon={<ChevronRight size={16} />}
          />
        </div>
      </div>

      {/* Week View */}
      {view === 'week' && (
        <div className="overflow-x-auto">
          <div className="grid grid-cols-8 border-b">
            <div className="py-2 px-3 text-xs font-medium text-gray-500 bg-gray-50 border-r"></div>
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`py-2 px-3 text-center ${
                  day.toDateString() === new Date().toDateString()
                    ? 'bg-purple-50'
                    : 'bg-gray-50'
                }`}
              >
                <p className="text-xs font-medium text-gray-500">
                  {day.toLocaleString('default', { weekday: 'short' })}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    day.toDateString() === new Date().toDateString()
                      ? 'text-purple-600'
                      : 'text-gray-800'
                  }`}
                >
                  {day.getDate()}
                </p>
              </div>
            ))}
          </div>

          <div className="relative">
            {businessHours.map((hour, hourIndex) => (
              <div key={hour} className="grid grid-cols-8 border-b">
                <div className="py-4 px-3 text-xs font-medium text-gray-500 border-r">
                  {hour}
                </div>
                {weekDays.map((day, dayIndex) => {
                  const dayAppointments = getAppointmentsForDate(day);
                  const hourAppointments = dayAppointments.filter(
                    (appointment) => appointment.startTime.split(':')[0] === hour.split(':')[0]
                  );

                  return (
                    <div
                      key={`${dayIndex}-${hourIndex}`}
                      className="p-1 min-h-[70px] border-r relative"
                    >
                      {hourAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          onClick={() => setSelectedAppointment(appointment)}
                          className="bg-purple-100 border-l-4 border-purple-500 p-2 rounded mb-1 cursor-pointer hover:bg-purple-200 transition-colors"
                        >
                          <p className="text-xs font-semibold text-purple-800 truncate">
                            {`${formatTime(appointment.startTime)} - ${formatTime(appointment.endTime)}`}
                          </p>
                          <p className="text-xs font-medium text-gray-800 truncate">
                            {appointment.clientName}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {appointment.services.map(s => s.name).join(', ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Day View */}
      {view === 'day' && (
        <div>
          <div className="text-center py-3 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              {currentDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
          </div>
          <div className="divide-y">
            {businessHours.map((hour) => {
              const dayAppointments = getAppointmentsForDate(currentDate);
              const hourAppointments = dayAppointments.filter(
                (appointment) => appointment.startTime.split(':')[0] === hour.split(':')[0]
              );

              return (
                <div key={hour} className="flex">
                  <div className="p-3 w-20 text-sm font-medium text-gray-500 bg-gray-50 border-r">
                    {hour}
                  </div>
                  <div className="flex-1 p-2 min-h-[80px]">
                    {hourAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        onClick={() => setSelectedAppointment(appointment)}
                        className="flex bg-purple-100 border-l-4 border-purple-500 p-3 rounded mb-2 cursor-pointer hover:bg-purple-200 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-purple-800">
                            {`${formatTime(appointment.startTime)} - ${formatTime(appointment.endTime)}`}
                          </p>
                          <p className="text-sm font-medium text-gray-800">
                            {appointment.clientName}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {appointment.services.map(s => s.name).join(', ')}
                          </p>
                        </div>
                        <div>
                          <Badge variant={getStatusColor(appointment.status)} rounded>
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Appointment Details</h3>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Client</p>
                <p className="text-base font-medium">{selectedAppointment.clientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Stylist</p>
                <p className="text-base font-medium">{selectedAppointment.stylistName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="text-base font-medium">
                  {new Date(selectedAppointment.date).toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })},{' '}
                  {formatTime(selectedAppointment.startTime)} - {formatTime(selectedAppointment.endTime)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Services</p>
                <ul className="list-disc list-inside">
                  {selectedAppointment.services.map((service) => (
                    <li key={service.id} className="text-base">
                      {service.name} - ${service.price}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-base font-semibold">${selectedAppointment.totalPrice}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge variant={getStatusColor(selectedAppointment.status)} size="md">
                  {selectedAppointment.status}
                </Badge>
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              {selectedAppointment.status === 'scheduled' && (
                <>
                  <Button variant="primary" fullWidth>
                    Check In
                  </Button>
                  <Button variant="outline" fullWidth>
                    Reschedule
                  </Button>
                  <Button variant="danger" fullWidth>
                    Cancel
                  </Button>
                </>
              )}
              {selectedAppointment.status === 'completed' && (
                <Button variant="primary" fullWidth>
                  View Receipt
                </Button>
              )}
              {selectedAppointment.status === 'cancelled' && (
                <Button variant="primary" fullWidth>
                  Rebook
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;