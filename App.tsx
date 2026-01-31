
import React, { useState, useEffect } from 'react';
import { User, Room, RoomStatus, RoomType } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import RoomServicePanel from './components/RoomServicePanel';
import ImageMagic from './components/ImageMagic';
import { Hotel, BedDouble, ChefHat, Sparkles, LogOut, LayoutDashboard } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'rooms' | 'service' | 'ai-magic'>('dashboard');

  // Load mock user from localStorage (simulating persistent JWT session)
  useEffect(() => {
    const savedUser = localStorage.getItem('lumina_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('lumina_user', JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lumina_user');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Desktop */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
        user={user} 
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
             <Hotel className="text-blue-600 w-6 h-6" />
             <h1 className="text-xl font-bold text-slate-800 font-serif">Lumina Grand</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">Welcome, {user.name}</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 flex-1 overflow-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'service' && <RoomServicePanel />}
          {activeTab === 'ai-magic' && <ImageMagic />}
          {activeTab === 'rooms' && (
             <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
               <h2 className="text-2xl font-bold mb-6 text-slate-800">Available Accommodations</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* This would typically come from an API call to the Spring Boot microservice */}
                 {MOCK_ROOMS.map(room => (
                   <RoomCard key={room.id} room={room} />
                 ))}
               </div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

const RoomCard: React.FC<{ room: Room }> = ({ room }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all">
      <div className="relative h-48 overflow-hidden">
        <img src={room.image} alt={room.type} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 border border-blue-100">
          ${room.price}/night
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
           <h3 className="font-bold text-slate-800 text-lg">Room {room.number}</h3>
           <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${
             room.status === RoomStatus.AVAILABLE ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
           }`}>
             {room.status}
           </span>
        </div>
        <p className="text-slate-500 text-sm mb-4">{room.type} with panoramic city views and premium bedding.</p>
        <button className="w-full py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50" disabled={room.status !== RoomStatus.AVAILABLE}>
           {room.status === RoomStatus.AVAILABLE ? 'Book Now' : 'Currently Occupied'}
        </button>
      </div>
    </div>
  );
};

const MOCK_ROOMS: Room[] = [
  { id: '1', number: '101', type: RoomType.DELUXE, price: 250, status: RoomStatus.AVAILABLE, image: 'https://picsum.photos/seed/hotel1/800/600', rating: 4.8 },
  { id: '2', number: '204', type: RoomType.SUITE, price: 450, status: RoomStatus.OCCUPIED, image: 'https://picsum.photos/seed/hotel2/800/600', rating: 4.9 },
  { id: '3', number: '302', type: RoomType.STANDARD, price: 150, status: RoomStatus.AVAILABLE, image: 'https://picsum.photos/seed/hotel3/800/600', rating: 4.5 },
  { id: '4', number: '501', type: RoomType.PRESIDENTIAL, price: 1200, status: RoomStatus.AVAILABLE, image: 'https://picsum.photos/seed/hotel4/800/600', rating: 5.0 },
  { id: '5', number: '405', type: RoomType.DELUXE, price: 280, status: RoomStatus.AVAILABLE, image: 'https://picsum.photos/seed/hotel5/800/600', rating: 4.7 },
  { id: '6', number: '108', type: RoomType.STANDARD, price: 140, status: RoomStatus.MAINTENANCE, image: 'https://picsum.photos/seed/hotel6/800/600', rating: 4.4 },
];

export default App;
