import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Scissors, Calendar, Users, Tag, BarChart2, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  
  const navItems = {
    admin: [
      { icon: <Calendar size={20} />, label: 'Appointments', path: '/admin/appointments' },
      { icon: <Users size={20} />, label: 'Clients', path: '/admin/clients' },
      { icon: <Scissors size={20} />, label: 'Stylists', path: '/admin/stylists' },
      { icon: <Tag size={20} />, label: 'Services', path: '/admin/services' },
      { icon: <BarChart2 size={20} />, label: 'Analytics', path: '/admin/analytics' },
      { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
    ],
    stylist: [
      { icon: <Calendar size={20} />, label: 'My Schedule', path: '/stylist/schedule' },
      { icon: <Users size={20} />, label: 'My Clients', path: '/stylist/clients' },
      { icon: <Tag size={20} />, label: 'Services', path: '/stylist/services' },
      { icon: <Settings size={20} />, label: 'Profile', path: '/stylist/profile' },
    ],
    client: [
      { icon: <Calendar size={20} />, label: 'My Appointments', path: '/client/appointments' },
      { icon: <Scissors size={20} />, label: 'Book Appointment', path: '/client/book' },
      { icon: <Tag size={20} />, label: 'Services', path: '/client/services' },
      { icon: <Settings size={20} />, label: 'Profile', path: '/client/profile' },
    ],
  };

  const items = user ? navItems[user.role] : [];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-center">
          <Scissors className="text-purple-600 mr-2" size={24} />
          <h1 className="text-xl font-bold text-gray-900">StylistHub</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
            >
              <span className="mr-3 text-gray-500">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex w-full items-center px-4 py-2 text-sm font-medium rounded-md text-red-700 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;