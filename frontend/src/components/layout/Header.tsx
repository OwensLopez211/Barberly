import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu, Bell, X, AlignJustify } from 'lucide-react';
import Avatar from '../ui/Avatar';

const Header: React.FC = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  // Mock notifications data
  const notifications = [
    {
      id: '1',
      message: 'New appointment scheduled with Sarah for 2:00 PM',
      time: '10 minutes ago',
      read: false,
    },
    {
      id: '2',
      message: 'Client Alex canceled their 4:30 PM appointment',
      time: '1 hour ago',
      read: true,
    },
    {
      id: '3',
      message: 'Reminder: Team meeting tomorrow at 9:00 AM',
      time: '3 hours ago',
      read: true,
    },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <AlignJustify size={24} />}
            </button>
          </div>
          
          <div className="flex items-center">
            <div className="md:hidden">
              <span className="text-purple-600 font-bold">StylistHub</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {isNotificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="px-4 py-6 text-sm text-gray-500 text-center">No notifications</p>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 hover:bg-gray-50 ${notification.read ? '' : 'bg-purple-50'}`}
                          >
                            <p className="text-sm text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="px-4 py-2 border-t border-gray-200">
                        <button className="text-sm text-purple-600 hover:text-purple-800">
                          Mark all as read
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* User menu */}
            <div className="flex items-center">
              <div className="mr-2 flex flex-col items-end">
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
              </div>
              <Avatar src={user?.avatar} alt={user?.name || "User"} size="sm" status="online" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <nav className="px-2 pt-2 pb-4 space-y-1">
            {user?.role === 'stylist' && (
              <>
                <a href="/stylist/schedule" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                  My Schedule
                </a>
                <a href="/stylist/clients" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                  My Clients
                </a>
                <a href="/stylist/services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                  Services
                </a>
                <a href="/stylist/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                  Profile
                </a>
              </>
            )}
            {user?.role === 'client' && (
              <>
                <a href="/client/appointments" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                  My Appointments
                </a>
                <a href="/client/book" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                  Book Appointment
                </a>
                <a href="/client/services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                  Services
                </a>
                <a href="/client/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                  Profile
                </a>
              </>
            )}
            {user?.role === 'admin' && (
              <>
                <a href="/admin/appointments" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                  Appointments
                </a>
                <a href="/admin/clients" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                  Clients
                </a>
                <a href="/admin/stylists" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                  Stylists
                </a>
                <a href="/admin/services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                  Services
                </a>
                <a href="/admin/analytics" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                  Analytics
                </a>
                <a href="/admin/settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                  Settings
                </a>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;