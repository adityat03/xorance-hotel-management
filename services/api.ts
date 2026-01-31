
import { User, Room, ServiceRequest } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Helper to get the JWT token from storage
 */
const getAuthHeader = () => {
  const userStr = localStorage.getItem('lumina_user');
  if (!userStr) return {};
  const user = JSON.parse(userStr);
  return { 'Authorization': `Bearer ${user.token}` };
};

export const api = {
  // Auth Microservice
  login: async (email: string, pass: string): Promise<User> => {
    // In production, this calls Spring Security /api/auth/login
    console.log(`Connecting to ${API_BASE_URL}/auth/login...`);
    // Simulated delay
    await new Promise(r => setTimeout(r, 800));
    
    // For demo purposes, we still return mock if backend isn't live
    return {
      id: 'u1',
      name: email === 'admin@lumina.com' ? 'Admin' : 'Guest User',
      email: email,
      role: email === 'admin@lumina.com' ? 'ADMIN' : 'GUEST',
      token: 'mock-jwt-token-from-spring-boot'
    };
  },

  // Room Microservice
  getRooms: async (): Promise<Room[]> => {
    const response = await fetch(`${API_BASE_URL}/rooms/available`, {
      headers: getAuthHeader()
    });
    if (!response.ok) throw new Error('Failed to fetch rooms');
    return response.json();
  },

  // Booking Microservice
  createBooking: async (bookingData: any) => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    return response.json();
  },

  // Service Microservice
  submitServiceRequest: async (request: Partial<ServiceRequest>) => {
    const response = await fetch(`${API_BASE_URL}/service-requests`, {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    return response.json();
  }
};
