import React from 'react';
import AppLayout from '../../components/layout/AppLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import AppointmentCalendar from '../../components/dashboard/AppointmentCalendar';
import { Calendar, Users, Clock, DollarSign, Scissors } from 'lucide-react';

const StylistDashboard: React.FC = () => {
  // Mock data for dashboard
  const upcomingAppointments = [
    {
      id: '1',
      clientName: 'Emma Johnson',
      time: '10:00 AM',
      service: 'Haircut',
      duration: '45 min',
      status: 'confirmed',
    },
    {
      id: '2',
      clientName: 'James Wilson',
      time: '1:00 PM',
      service: 'Coloring',
      duration: '90 min',
      status: 'confirmed',
    },
    {
      id: '3',
      clientName: 'Sophia Martinez',
      time: '3:30 PM',
      service: 'Styling',
      duration: '60 min',
      status: 'pending',
    },
  ];

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Stylist Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your overview for today.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100 mr-4">
            <Calendar className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
            <p className="text-2xl font-semibold text-gray-900">5</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-teal-100 mr-4">
            <Users className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Clients</p>
            <p className="text-2xl font-semibold text-gray-900">42</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-amber-100 mr-4">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Hours Booked</p>
            <p className="text-2xl font-semibold text-gray-900">6.5h</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 mr-4">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
            <p className="text-2xl font-semibold text-gray-900">$345</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-1">
          <Card title="Upcoming Appointments">
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <div className="mr-4">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Scissors className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{appointment.clientName}</p>
                    <p className="text-sm text-gray-600">{appointment.service} ({appointment.duration})</p>
                    <div className="mt-1 flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600">{appointment.time}</span>
                    </div>
                  </div>
                  <Badge
                    variant={appointment.status === 'confirmed' ? 'success' : 'warning'}
                    rounded
                  >
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" fullWidth>
                View All Appointments
              </Button>
            </div>
          </Card>
        </div>

        {/* Calendar */}
        <div className="lg:col-span-2">
          <AppointmentCalendar />
        </div>
      </div>
    </AppLayout>
  );
};

export default StylistDashboard;