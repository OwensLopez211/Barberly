import React from 'react';
import AppLayout from '../../components/layout/AppLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
  BarChart2, Calendar, Users, Scissors, DollarSign, TrendingUp, TrendingDown
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Salon performance overview and management</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100 mr-4">
            <Calendar className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
            <div className="flex items-center">
              <p className="text-2xl font-semibold text-gray-900 mr-2">18</p>
              <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full flex items-center">
                <TrendingUp className="h-3 w-3 mr-0.5" />
                5%
              </span>
            </div>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-teal-100 mr-4">
            <Users className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Active Clients</p>
            <div className="flex items-center">
              <p className="text-2xl font-semibold text-gray-900 mr-2">182</p>
              <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full flex items-center">
                <TrendingUp className="h-3 w-3 mr-0.5" />
                12%
              </span>
            </div>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-amber-100 mr-4">
            <Scissors className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Active Stylists</p>
            <p className="text-2xl font-semibold text-gray-900">8</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 mr-4">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
            <div className="flex items-center">
              <p className="text-2xl font-semibold text-gray-900 mr-2">$12,450</p>
              <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full flex items-center">
                <TrendingDown className="h-3 w-3 mr-0.5" />
                3%
              </span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <Card title="Revenue Overview">
            <div className="h-72 flex items-center justify-center">
              <BarChart2 className="h-24 w-24 text-gray-300" />
              <p className="text-gray-500 ml-4">Revenue chart will be displayed here</p>
            </div>
          </Card>
        </div>

        {/* Top Services */}
        <div className="lg:col-span-1">
          <Card title="Most Popular Services">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Scissors className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Haircut & Style</p>
                    <p className="text-xs text-gray-500">45 min • $45</p>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700">124 bookings</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Scissors className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Hair Coloring</p>
                    <p className="text-xs text-gray-500">90 min • $95</p>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700">98 bookings</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Scissors className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Blowout</p>
                    <p className="text-xs text-gray-500">30 min • $35</p>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700">87 bookings</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Scissors className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Highlights</p>
                    <p className="text-xs text-gray-500">120 min • $120</p>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700">72 bookings</div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" fullWidth>
                View All Services
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Stylists */}
        <Card title="Top Performing Stylists">
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full object-cover mr-4"
                src="https://images.pexels.com/photos/3373716/pexels-photo-3373716.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Stylist"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Jessica Lee</p>
                <p className="text-xs text-gray-500">Hair Specialist</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">$4,250</p>
                <p className="text-xs text-green-600">42 clients</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full object-cover mr-4"
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Stylist"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Michael Chen</p>
                <p className="text-xs text-gray-500">Color Expert</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">$3,870</p>
                <p className="text-xs text-green-600">38 clients</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full object-cover mr-4"
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Stylist"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Olivia Johnson</p>
                <p className="text-xs text-gray-500">Senior Stylist</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">$3,120</p>
                <p className="text-xs text-green-600">32 clients</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" size="sm" fullWidth>
              View All Stylists
            </Button>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card title="Recent Activity">
          <div className="space-y-4">
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New appointment booked</p>
                <p className="text-xs text-gray-500">Emma Johnson booked a Haircut & Style for tomorrow at 10:00 AM</p>
                <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-red-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Appointment cancelled</p>
                <p className="text-xs text-gray-500">James Wilson canceled his appointment for today at 2:30 PM</p>
                <p className="text-xs text-gray-400 mt-1">20 minutes ago</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New client registered</p>
                <p className="text-xs text-gray-500">Sarah Martinez created a new client account</p>
                <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-amber-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Payment received</p>
                <p className="text-xs text-gray-500">Payment of $75 received from Alex Thompson</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" size="sm" fullWidth>
              View All Activity
            </Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;