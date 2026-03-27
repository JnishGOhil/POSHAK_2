/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Ruler, User, Home, Search, 
  ChevronRight, Star, Trash2, Plus, Minus, 
  CreditCard, ShoppingCart, ArrowLeft, CheckCircle2,
  Scissors, MapPin, Phone, Mail, Lock, Eye, EyeOff,
  LogOut, Edit2, Save, X
} from 'lucide-react';
import { 
  PRODUCTS, FABRICS, Product, Fabric, Category, 
  UserProfile, DUMMY_USERS, Address, MeasurementProfile 
} from './types';

// --- Components ---

const Navbar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
    <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-ocean' : 'text-slate-400'}`}>
      <Home size={24} />
      <span className="text-[10px] font-medium uppercase tracking-wider">Home</span>
    </button>
    <button onClick={() => setActiveTab('shop')} className={`flex flex-col items-center gap-1 ${activeTab === 'shop' ? 'text-ocean' : 'text-slate-400'}`}>
      <ShoppingBag size={24} />
      <span className="text-[10px] font-medium uppercase tracking-wider">Shop</span>
    </button>
    <button onClick={() => setActiveTab('tailoring')} className={`flex flex-col items-center gap-1 ${activeTab === 'tailoring' ? 'text-ocean' : 'text-slate-400'}`}>
      <Scissors size={24} />
      <span className="text-[10px] font-medium uppercase tracking-wider">Tailor</span>
    </button>
    <button onClick={() => setActiveTab('cart')} className={`flex flex-col items-center gap-1 ${activeTab === 'cart' ? 'text-ocean' : 'text-slate-400'}`}>
      <ShoppingCart size={24} />
      <span className="text-[10px] font-medium uppercase tracking-wider">Cart</span>
    </button>
    <button onClick={() => setActiveTab('account')} className={`flex flex-col items-center gap-1 ${activeTab === 'account' ? 'text-ocean' : 'text-slate-400'}`}>
      <User size={24} />
      <span className="text-[10px] font-medium uppercase tracking-wider">Profile</span>
    </button>
  </nav>
);

const Header = ({ title, showBack, onBack }: { title: string, showBack?: boolean, onBack?: () => void }) => (
  <header className="sticky top-0 bg-pearl/80 backdrop-blur-md z-40 px-6 py-4 flex items-center justify-between border-b border-ocean/10">
    <div className="flex items-center gap-4">
      {showBack && (
        <button onClick={onBack} className="p-1 -ml-1 text-ocean">
          <ArrowLeft size={24} />
        </button>
      )}
      <h1 className="text-2xl font-serif font-bold text-ocean tracking-tight">
        {showBack ? title : "POSHAK"}
      </h1>
    </div>
    {!showBack && <Search size={20} className="text-ocean" />}
  </header>
);

// --- Auth Screens ---

const AuthScreen = ({ onLogin }: { onLogin: (user: UserProfile) => void }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      const user = DUMMY_USERS.find(u => u.email === email) || DUMMY_USERS[0];
      onLogin(user);
    } else if (mode === 'signup') {
      const newUser: UserProfile = {
        id: `u${Date.now()}`,
        name,
        email,
        phone: '',
        addresses: [],
        measurements: []
      };
      onLogin(newUser);
    } else {
      alert('Password reset link sent to your email!');
      setMode('login');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-6 py-12 flex flex-col min-h-[80vh]"
    >
      <div className="mb-12">
        <h2 className="text-3xl font-serif font-bold text-ocean mb-2">
          {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
        </h2>
        <p className="text-slate-500 text-sm">
          {mode === 'login' ? 'Sign in to continue shopping' : mode === 'signup' ? 'Join the POSHAK community' : 'Enter your email to receive a reset link'}
        </p>
      </div>

      <form onSubmit={handleAuth} className="space-y-6 flex-1">
        {mode === 'signup' && (
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                required
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe" 
                className="w-full bg-white border border-ocean/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-ocean shadow-sm" 
              />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com" 
              className="w-full bg-white border border-ocean/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-ocean shadow-sm" 
            />
          </div>
        </div>

        {mode !== 'forgot' && (
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                required
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-white border border-ocean/10 rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:border-ocean shadow-sm" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        )}

        {mode === 'login' && (
          <button 
            type="button"
            onClick={() => setMode('forgot')}
            className="text-xs font-bold text-ocean float-right"
          >
            Forgot Password?
          </button>
        )}

        <button 
          type="submit"
          className="w-full bg-ocean text-white py-4 rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-ocean/20 mt-8"
        >
          {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Send Link'}
        </button>
      </form>

      <div className="mt-auto pt-8 text-center">
        <p className="text-sm text-slate-500">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="ml-2 font-bold text-ocean"
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </motion.div>
  );
};

// --- Profile Screens ---

const ProfileScreen = ({ user, onLogout, onUpdateUser }: { 
  user: UserProfile, 
  onLogout: () => void,
  onUpdateUser: (u: UserProfile) => void
}) => {
  const [view, setView] = useState<'main' | 'personal' | 'addresses' | 'measurements'>('main');
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleUpdatePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onUpdateUser({
      ...user,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    });
    setView('main');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newAddress: Address = {
      id: editingItem?.id || `a${Date.now()}`,
      label: formData.get('label') as string,
      address: formData.get('address') as string,
    };
    const newAddresses = editingItem 
      ? user.addresses.map(a => a.id === editingItem.id ? newAddress : a)
      : [...user.addresses, newAddress];
    onUpdateUser({ ...user, addresses: newAddresses });
    setEditingItem(null);
  };

  const handleAddMeasurement = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newMeasurement: MeasurementProfile = {
      id: editingItem?.id || `m${Date.now()}`,
      name: formData.get('name') as string,
      chest: Number(formData.get('chest')),
      shoulder: Number(formData.get('shoulder')),
      sleeveLength: Number(formData.get('sleeveLength')),
      waist: Number(formData.get('waist')),
      length: Number(formData.get('length')),
    };
    const newMeasurements = editingItem 
      ? user.measurements.map(m => m.id === editingItem.id ? newMeasurement : m)
      : [...user.measurements, newMeasurement];
    onUpdateUser({ ...user, measurements: newMeasurements });
    setEditingItem(null);
  };

  if (view === 'personal') {
    return (
      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="px-6 py-6">
        <Header title="Personal Details" showBack onBack={() => setView('main')} />
        <form onSubmit={handleUpdatePersonal} className="space-y-6 mt-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
            <input name="name" defaultValue={user.name} className="w-full bg-white border border-ocean/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-ocean shadow-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
            <input name="email" defaultValue={user.email} className="w-full bg-white border border-ocean/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-ocean shadow-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Number</label>
            <input name="phone" defaultValue={user.phone} className="w-full bg-white border border-ocean/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-ocean shadow-sm" />
          </div>
          <button type="submit" className="w-full bg-ocean text-white py-4 rounded-2xl font-bold uppercase tracking-widest shadow-lg">Save Changes</button>
        </form>
      </motion.div>
    );
  }

  if (view === 'addresses') {
    return (
      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="px-6 py-6">
        <Header title="Addresses" showBack onBack={() => setView('main')} />
        <div className="space-y-4 mt-6">
          {user.addresses.map(addr => (
            <div key={addr.id} className="bg-white p-4 rounded-2xl border border-ocean/5 flex justify-between items-start">
              <div>
                <p className="font-bold text-sm">{addr.label}</p>
                <p className="text-slate-500 text-xs mt-1">{addr.address}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingItem(addr)} className="text-ocean"><Edit2 size={16} /></button>
                <button onClick={() => onUpdateUser({ ...user, addresses: user.addresses.filter(a => a.id !== addr.id) })} className="text-red-400"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          <button onClick={() => setEditingItem({})} className="w-full border-2 border-dashed border-ocean/20 text-ocean py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
            <Plus size={16} /> Add New Address
          </button>
        </div>

        <AnimatePresence>
          {editingItem && (
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 bg-pearl z-[70] p-6">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-serif font-bold text-ocean">{editingItem.id ? 'Edit Address' : 'New Address'}</h3>
                <button onClick={() => setEditingItem(null)}><X size={24} /></button>
              </div>
              <form onSubmit={handleAddAddress} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Label (e.g. Home, Office)</label>
                  <input name="label" defaultValue={editingItem.label} required className="w-full bg-white border border-ocean/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-ocean shadow-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Address</label>
                  <textarea name="address" defaultValue={editingItem.address} required rows={3} className="w-full bg-white border border-ocean/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-ocean shadow-sm" />
                </div>
                <button type="submit" className="w-full bg-ocean text-white py-4 rounded-2xl font-bold uppercase tracking-widest shadow-lg">Save Address</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  if (view === 'measurements') {
    return (
      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="px-6 py-6">
        <Header title="Measurements" showBack onBack={() => setView('main')} />
        <div className="space-y-4 mt-6">
          {user.measurements.map(m => (
            <div key={m.id} className="bg-white p-4 rounded-2xl border border-ocean/5 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">{m.name}</p>
                <p className="text-slate-400 text-[10px] mt-1">Chest: {m.chest}" | Waist: {m.waist}"</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingItem(m)} className="text-ocean"><Edit2 size={16} /></button>
                <button onClick={() => onUpdateUser({ ...user, measurements: user.measurements.filter(item => item.id !== m.id) })} className="text-red-400"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          <button onClick={() => setEditingItem({})} className="w-full border-2 border-dashed border-ocean/20 text-ocean py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
            <Plus size={16} /> Add New Profile
          </button>
        </div>

        <AnimatePresence>
          {editingItem && (
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 bg-pearl z-[70] p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-serif font-bold text-ocean">{editingItem.id ? 'Edit Profile' : 'New Profile'}</h3>
                <button onClick={() => setEditingItem(null)}><X size={24} /></button>
              </div>
              <form onSubmit={handleAddMeasurement} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Profile Name</label>
                  <input name="name" defaultValue={editingItem.name} required placeholder="e.g. Slim Fit" className="w-full bg-white border border-ocean/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-ocean shadow-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {['Chest', 'Shoulder', 'SleeveLength', 'Waist', 'Length'].map(field => (
                    <div key={field} className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{field} (in)</label>
                      <input name={field} type="number" step="0.1" defaultValue={editingItem[field.toLowerCase() === 'sleevelength' ? 'sleeveLength' : field.toLowerCase()]} required className="w-full bg-white border border-ocean/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-ocean shadow-sm" />
                    </div>
                  ))}
                </div>
                <button type="submit" className="w-full bg-ocean text-white py-4 rounded-2xl font-bold uppercase tracking-widest shadow-lg">Save Profile</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 pb-24">
      <div className="py-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl mb-4">
          <img src={`https://picsum.photos/seed/${user.id}/200/200`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <h3 className="text-xl font-serif font-bold text-ocean">{user.name}</h3>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{user.email}</p>
      </div>

      <div className="space-y-2">
        <button onClick={() => setView('personal')} className="w-full bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-ocean/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-ocean/5 text-ocean rounded-xl flex items-center justify-center"><User size={20} /></div>
            <span className="font-medium text-sm">Personal Details</span>
          </div>
          <ChevronRight size={16} className="text-slate-300" />
        </button>
        <button onClick={() => setView('measurements')} className="w-full bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-ocean/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-ocean/5 text-ocean rounded-xl flex items-center justify-center"><Ruler size={20} /></div>
            <span className="font-medium text-sm">Measurement Profiles</span>
          </div>
          <ChevronRight size={16} className="text-slate-300" />
        </button>
        <button onClick={() => setView('addresses')} className="w-full bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-ocean/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-ocean/5 text-ocean rounded-xl flex items-center justify-center"><MapPin size={20} /></div>
            <span className="font-medium text-sm">Shipping Addresses</span>
          </div>
          <ChevronRight size={16} className="text-slate-300" />
        </button>
        <button className="w-full bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-ocean/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-ocean/5 text-ocean rounded-xl flex items-center justify-center"><ShoppingBag size={20} /></div>
            <span className="font-medium text-sm">My Orders</span>
          </div>
          <ChevronRight size={16} className="text-slate-300" />
        </button>
      </div>

      <button onClick={onLogout} className="w-full mt-8 py-4 text-red-400 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
        <LogOut size={18} /> Sign Out
      </button>
    </motion.div>
  );
};

// --- Screens ---

const HomeScreen = ({ onCategorySelect }: { onCategorySelect: (c: Category) => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="pb-24"
  >
    {/* Hero Section */}
    <div className="relative h-[400px] overflow-hidden">
      <img 
        src="https://picsum.photos/seed/poshak-hero/800/1200" 
        alt="Hero" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean/80 via-transparent to-transparent flex flex-col justify-end p-8">
        <h2 className="text-4xl font-serif font-bold text-white mb-2">Elegance Redefined</h2>
        <p className="text-pearl/90 text-sm mb-6 max-w-[250px]">Premium Ethnic & Formal Wear for the Modern Indian Man.</p>
        <button className="bg-pearl text-ocean px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest self-start shadow-lg">
          Explore Collection
        </button>
      </div>
    </div>

    {/* Categories */}
    <div className="px-6 py-8">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ocean/60 mb-6">Collections</h3>
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => onCategorySelect('Ethnic')} className="relative h-48 rounded-2xl overflow-hidden group">
          <img src="https://picsum.photos/seed/eth-cat/400/400" className="w-full h-full object-cover transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="text-white font-serif text-xl font-bold">Ethnic</span>
          </div>
        </button>
        <button onClick={() => onCategorySelect('Formal')} className="relative h-48 rounded-2xl overflow-hidden group">
          <img src="https://picsum.photos/seed/form-cat/400/400" className="w-full h-full object-cover transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="text-white font-serif text-xl font-bold">Formal</span>
          </div>
        </button>
      </div>
    </div>

    {/* Featured */}
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ocean/60">Trending Now</h3>
        <button className="text-ocean text-xs font-bold flex items-center gap-1">
          View All <ChevronRight size={14} />
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {PRODUCTS.slice(0, 3).map(product => (
          <div key={product.id} className="min-w-[200px] bg-white rounded-2xl overflow-hidden shadow-sm border border-ocean/5">
            <img src={product.image} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
            <div className="p-4">
              <h4 className="font-medium text-sm mb-1 truncate">{product.name}</h4>
              <p className="text-ocean font-bold">₹{product.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const ShopScreen = ({ addToCart }: { addToCart: (p: Product) => void }) => {
  const [filter, setFilter] = useState<Category | 'All'>('All');
  
  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-6 pb-24"
    >
      <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar">
        {['All', 'Ethnic', 'Formal'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat as any)}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${filter === cat ? 'bg-ocean text-white' : 'bg-white text-ocean border border-ocean/20'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {filteredProducts.map(product => (
          <motion.div 
            layout
            key={product.id} 
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-ocean/5 flex flex-col"
          >
            <div className="relative">
              <img src={product.image} className="w-full h-56 object-cover" referrerPolicy="no-referrer" />
              <button 
                onClick={() => addToCart(product)}
                className="absolute bottom-3 right-3 bg-ocean text-white p-2 rounded-full shadow-lg"
              >
                <Plus size={18} />
              </button>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-center gap-1 mb-1">
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                <span className="text-[10px] text-slate-400 font-bold">{product.rating}</span>
              </div>
              <h4 className="font-medium text-sm mb-1 line-clamp-1">{product.name}</h4>
              <p className="text-ocean font-bold mt-auto">₹{product.price.toLocaleString()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const TailoringScreen = ({ user }: { user: UserProfile | null }) => {
  const [step, setStep] = useState(1);
  const [selectedFabric, setSelectedFabric] = useState<Fabric | null>(null);
  const [measurements, setMeasurements] = useState<any>({});

  const handleSelectProfile = (profile: MeasurementProfile) => {
    setMeasurements({
      chest: profile.chest,
      shoulder: profile.shoulder,
      sleeveLength: profile.sleeveLength,
      waist: profile.waist,
      length: profile.length,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-6 pb-24"
    >
      <div className="py-6">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= i ? 'bg-ocean text-white' : 'bg-white text-ocean border border-ocean/20'}`}>
                {i}
              </div>
              {i < 3 && <div className={`h-[2px] flex-1 mx-2 ${step > i ? 'bg-ocean' : 'bg-ocean/10'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h3 className="text-xl font-serif font-bold text-ocean mb-2">Select Fabric</h3>
            <p className="text-slate-500 text-sm mb-6">Choose from our premium collection of imported and local fabrics.</p>
            <div className="grid grid-cols-2 gap-4">
              {FABRICS.map(fabric => (
                <button 
                  key={fabric.id}
                  onClick={() => setSelectedFabric(fabric)}
                  className={`p-2 rounded-2xl border-2 transition-all ${selectedFabric?.id === fabric.id ? 'border-ocean bg-ocean/5' : 'border-transparent bg-white shadow-sm'}`}
                >
                  <img src={fabric.image} className="w-full aspect-square object-cover rounded-xl mb-3" referrerPolicy="no-referrer" />
                  <h4 className="font-bold text-xs text-left mb-1">{fabric.name}</h4>
                  <p className="text-ocean text-[10px] font-bold text-left">₹{fabric.pricePerMeter}/meter</p>
                </button>
              ))}
            </div>
            <button 
              disabled={!selectedFabric}
              onClick={() => setStep(2)}
              className="w-full bg-ocean text-white py-4 rounded-2xl font-bold uppercase tracking-widest mt-8 disabled:opacity-50"
            >
              Next: Measurements
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-serif font-bold text-ocean">Provide Measurements</h3>
              {user && user.measurements.length > 0 && (
                <div className="relative group">
                  <button className="text-[10px] font-bold text-ocean border border-ocean/20 px-2 py-1 rounded flex items-center gap-1">
                    <Ruler size={10} /> Use Saved Profile
                  </button>
                  <div className="absolute right-0 top-full mt-1 bg-white shadow-xl rounded-xl border border-ocean/10 p-2 hidden group-hover:block z-20 min-w-[150px]">
                    {user.measurements.map(m => (
                      <button 
                        key={m.id} 
                        onClick={() => handleSelectProfile(m)}
                        className="w-full text-left p-2 text-xs hover:bg-ocean/5 rounded-lg"
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className="text-slate-500 text-sm mb-6">Enter your details in inches for a perfect fit.</p>
            <div className="space-y-4">
              {[
                { label: 'Chest', key: 'chest' },
                { label: 'Shoulder', key: 'shoulder' },
                { label: 'Sleeve Length', key: 'sleeveLength' },
                { label: 'Waist', key: 'waist' },
                { label: 'Length', key: 'length' }
              ].map(item => (
                <div key={item.key} className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.label}</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={measurements[item.key] || ''}
                    onChange={(e) => setMeasurements({ ...measurements, [item.key]: e.target.value })}
                    placeholder="0.0" 
                    className="bg-white border border-ocean/10 rounded-xl p-3 text-sm focus:outline-none focus:border-ocean" 
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={() => setStep(1)} className="flex-1 border border-ocean text-ocean py-4 rounded-2xl font-bold uppercase tracking-widest">Back</button>
              <button onClick={() => setStep(3)} className="flex-1 bg-ocean text-white py-4 rounded-2xl font-bold uppercase tracking-widest">Submit</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-ocean mb-2">Request Received!</h3>
            <p className="text-slate-500 text-sm mb-8">Our master tailor will review your measurements and contact you shortly.</p>
            <button onClick={() => {setStep(1); setSelectedFabric(null); setMeasurements({});}} className="bg-ocean text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest">Back to Home</button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const CartScreen = ({ cart, updateQty, removeFromCart, onCheckout }: { 
  cart: (Product & { qty: number })[], 
  updateQty: (id: string, delta: number) => void,
  removeFromCart: (id: string) => void,
  onCheckout: () => void
}) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-24 h-24 bg-ocean/5 text-ocean/20 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} />
        </div>
        <h3 className="text-xl font-serif font-bold text-ocean mb-2">Your cart is empty</h3>
        <p className="text-slate-500 text-sm mb-8">Looks like you haven't added anything to your cart yet.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-6 pb-32"
    >
      <div className="space-y-4 py-6">
        {cart.map(item => (
          <div key={item.id} className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-ocean/5">
            <img src={item.image} className="w-20 h-20 object-cover rounded-xl" referrerPolicy="no-referrer" />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                <p className="text-ocean text-xs font-bold">₹{item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 bg-pearl rounded-lg px-2 py-1">
                  <button onClick={() => updateQty(item.id, -1)} className="text-ocean"><Minus size={14} /></button>
                  <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="text-ocean"><Plus size={14} /></button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-20 left-0 right-0 bg-white p-6 border-t border-ocean/10 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Total Amount</span>
          <span className="text-xl font-bold text-ocean">₹{total.toLocaleString()}</span>
        </div>
        <button onClick={onCheckout} className="w-full bg-ocean text-white py-4 rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-ocean/20">
          Proceed to Checkout
        </button>
      </div>
    </motion.div>
  );
};

const CheckoutScreen = ({ user, onComplete }: { user: UserProfile | null, onComplete: () => void }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(user?.addresses[0] || null);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="fixed inset-0 bg-pearl z-[60] overflow-y-auto"
    >
      <Header title="Checkout" showBack onBack={() => onComplete()} />
      <div className="p-6 space-y-8">
        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ocean/60 mb-4">Shipping Address</h3>
          {user && user.addresses.length > 0 ? (
            <div className="space-y-3">
              {user.addresses.map(addr => (
                <button 
                  key={addr.id} 
                  onClick={() => setSelectedAddress(addr)}
                  className={`w-full text-left bg-white p-4 rounded-2xl border flex gap-4 transition-all ${selectedAddress?.id === addr.id ? 'border-ocean bg-ocean/5' : 'border-ocean/5'}`}
                >
                  <MapPin className="text-ocean shrink-0" size={20} />
                  <div>
                    <p className="font-bold text-sm">{addr.label}</p>
                    <p className="text-slate-500 text-xs mt-1">{addr.address}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-white p-4 rounded-2xl border border-ocean/5 flex gap-4">
              <MapPin className="text-ocean shrink-0" size={20} />
              <div>
                <p className="font-bold text-sm">Guest Address</p>
                <p className="text-slate-500 text-xs mt-1">123, Pearl Residency, Ocean Drive, Mumbai, 400001</p>
              </div>
            </div>
          )}
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ocean/60 mb-4">Payment Method</h3>
          <div className="space-y-3">
            {['Credit/Debit Card', 'UPI', 'Net Banking', 'Cash on Delivery'].map((method, i) => (
              <div key={method} className={`bg-white p-4 rounded-2xl border flex items-center justify-between ${i === 0 ? 'border-ocean bg-ocean/5' : 'border-ocean/5'}`}>
                <div className="flex items-center gap-3">
                  {i === 0 ? <CreditCard size={18} className="text-ocean" /> : <div className="w-[18px]" />}
                  <span className="text-sm font-medium">{method}</span>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${i === 0 ? 'border-ocean bg-ocean' : 'border-ocean/20'}`} />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-ocean text-white p-6 rounded-3xl indian-pattern relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Order Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>₹12,999</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
              <div className="flex justify-between pt-2 border-t border-white/20 font-bold text-lg"><span>Total</span><span>₹12,999</span></div>
            </div>
          </div>
        </section>

        <button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-ocean text-white py-4 rounded-2xl font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-3"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Pay Now <ChevronRight size={18} /></>
          )}
        </button>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState<(Product & { qty: number })[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setActiveTab('cart');
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleOrderComplete = () => {
    setCart([]);
    setShowCheckout(false);
    setOrderSuccess(true);
    setActiveTab('home');
    setTimeout(() => setOrderSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-pearl font-sans selection:bg-ocean/20">
      <Header title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} />
      
      <main className="max-w-md mx-auto relative">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <HomeScreen key="home" onCategorySelect={() => setActiveTab('shop')} />}
          {activeTab === 'shop' && <ShopScreen key="shop" addToCart={addToCart} />}
          {activeTab === 'tailoring' && <TailoringScreen key="tailor" user={user} />}
          {activeTab === 'cart' && <CartScreen key="cart" cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} onCheckout={() => setShowCheckout(true)} />}
          {activeTab === 'account' && (
            user ? (
              <ProfileScreen 
                key="profile" 
                user={user} 
                onLogout={() => setUser(null)} 
                onUpdateUser={setUser}
              />
            ) : (
              <AuthScreen key="auth" onLogin={setUser} />
            )
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCheckout && (
            <CheckoutScreen user={user} onComplete={handleOrderComplete} />
          )}
        </AnimatePresence>

        {orderSuccess && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 left-6 right-6 bg-green-600 text-white p-4 rounded-2xl shadow-xl z-[70] flex items-center gap-3"
          >
            <CheckCircle2 size={24} />
            <span className="font-bold text-sm">Order placed successfully!</span>
          </motion.div>
        )}
      </main>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
