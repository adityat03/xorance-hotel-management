
import React, { useState } from 'react';
import { ChefHat, Coffee, Pizza, Wine, Clock, CheckCircle2, Search } from 'lucide-react';

const MENU_ITEMS = [
  { id: 1, name: 'Continental Breakfast', price: 24, category: 'Food', image: 'https://picsum.photos/seed/food1/400/300' },
  { id: 2, name: 'Truffle Mushroom Pizza', price: 32, category: 'Food', image: 'https://picsum.photos/seed/food2/400/300' },
  { id: 3, name: 'Signature Cappuccino', price: 12, category: 'Drink', image: 'https://picsum.photos/seed/food3/400/300' },
  { id: 4, name: 'Red Wine (Cabernet)', price: 85, category: 'Drink', image: 'https://picsum.photos/seed/food4/400/300' },
  { id: 5, name: 'Caesar Salad', price: 18, category: 'Food', image: 'https://picsum.photos/seed/food5/400/300' },
  { id: 6, name: 'Iced Matcha Latte', price: 14, category: 'Drink', image: 'https://picsum.photos/seed/food6/400/300' },
];

const RoomServicePanel: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [search, setSearch] = useState('');

  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

  const placeOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setCart([]);
    }, 4000);
  };

  const filteredMenu = MENU_ITEMS.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (orderPlaced) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-slate-200 animate-in fade-in zoom-in">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-14 h-14 text-green-600 animate-bounce" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 font-serif">Order Received!</h2>
        <p className="text-slate-500 mt-2 max-w-sm">Our kitchen is preparing your meal. It will be delivered to your room in approximately 25-30 minutes.</p>
        <button onClick={() => setOrderPlaced(false)} className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold">Return to Menu</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      <div className="flex-1 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 font-serif">Epicurean Dining</h1>
            <p className="text-slate-500">Curated room service menu available 24/7.</p>
          </div>
          <div className="relative w-full md:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
                type="text" 
                placeholder="Search menu..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
             />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMenu.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm group hover:shadow-md transition-all">
              <div className="relative h-40 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-600">
                  {item.category}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold text-slate-800">{item.name}</h3>
                   <span className="text-blue-600 font-bold">${item.price}</span>
                </div>
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-96 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col h-fit sticky top-24">
         <div className="flex items-center gap-2 mb-6 pb-6 border-b">
           <div className="p-2 bg-slate-900 text-white rounded-lg">
             <ChefHat className="w-5 h-5" />
           </div>
           <h2 className="text-xl font-bold text-slate-800">Your Order</h2>
         </div>

         <div className="flex-1 space-y-4 max-h-[400px] overflow-auto mb-6 pr-2">
           {cart.length === 0 ? (
             <div className="text-center py-12">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Pizza className="w-8 h-8 text-slate-200" />
               </div>
               <p className="text-slate-400 text-sm">Your tray is currently empty.</p>
             </div>
           ) : (
             cart.map((item, idx) => (
               <div key={idx} className="flex items-center gap-4 animate-in slide-in-from-right-2">
                 <img src={item.image} className="w-12 h-12 rounded-lg object-cover" />
                 <div className="flex-1">
                   <p className="text-sm font-bold text-slate-800">{item.name}</p>
                   <p className="text-xs text-slate-500">${item.price}</p>
                 </div>
                 <button 
                  onClick={() => setCart(cart.filter((_, i) => i !== idx))}
                  className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                 >
                   &times;
                 </button>
               </div>
             ))
           )}
         </div>

         {cart.length > 0 && (
           <div className="space-y-4 pt-6 border-t">
             <div className="flex justify-between items-center text-slate-500">
               <span className="text-sm">Service Fee</span>
               <span className="text-sm">$5.00</span>
             </div>
             <div className="flex justify-between items-center text-xl font-bold text-slate-900">
               <span>Total</span>
               <span>${totalPrice + 5}</span>
             </div>
             <button 
              onClick={placeOrder}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
             >
               Confirm & Place Order
             </button>
             <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                <Clock className="w-3 h-3" />
                Est. Time: 25-30 Mins
             </div>
           </div>
         )}
      </div>
    </div>
  );
};

export default RoomServicePanel;
