// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'stylist' | 'client';
  avatar?: string;
}

// Appointment Types
export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  stylistId: string;
  stylistName: string;
  date: string;
  startTime: string;
  endTime: string;
  services: Service[];
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  totalPrice: number;
}

// Service Types
export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
}

// Client Types
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  notes?: string;
  lastVisit?: string;
  appointmentHistory?: Appointment[];
}

// Stylist Types
export interface Stylist extends User {
  specialties: string[];
  bio?: string;
  schedule: {
    monday: TimeSlot[];
    tuesday: TimeSlot[];
    wednesday: TimeSlot[];
    thursday: TimeSlot[];
    friday: TimeSlot[];
    saturday: TimeSlot[];
    sunday: TimeSlot[];
  };
}

export interface TimeSlot {
  start: string; // format: "HH:MM"
  end: string; // format: "HH:MM"
}

// Analytics Types
export interface DailyStats {
  date: string;
  totalAppointments: number;
  totalRevenue: number;
  completionRate: number;
}

export interface StylistPerformance {
  stylistId: string;
  stylistName: string;
  appointmentsCount: number;
  totalRevenue: number;
  clientRetentionRate: number;
}

export interface ServicePopularity {
  serviceId: string;
  serviceName: string;
  bookingCount: number;
  revenue: number;
}