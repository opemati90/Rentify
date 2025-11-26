import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Home, Search, Heart, User, MapPin, Star, 
  Filter, ChevronLeft, Share, Wifi, CheckCircle,
  Plus, DollarSign, MessageSquare, Phone, Sparkles, X, ChevronRight,
  BedDouble, Bath, Square, ShieldCheck, LogOut,
  Mail, Facebook, Linkedin, ArrowRight, Smartphone, Lock
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  type: 'Apartment' | 'House' | 'Villa' | 'Studio' | 'Room' | 'Duplex';
  beds: number;
  baths: number;
  sqft: number;
  host: {
    name: string;
    avatar: string;
    verified: boolean;
    responseTime: string;
    trustScore: number;
  };
  amenities: string[];
  description: string;
  images: string[];
  // Sublet-specific fields
  availableFrom: string;
  availableTo: string;
  minLeaseDuration: number; // in months
  maxLeaseDuration: number;
  roommates: number;
  utilitiesIncluded: boolean;
  furnished: boolean;
  depositRequired: number;
  featured: boolean;
};

type Message = {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  propertyId: string;
  propertyTitle: string;
  content: string;
  timestamp: Date;
  read: boolean;
};

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  verified: boolean;
  trustScore: number;
  role: 'renter' | 'owner' | 'admin';
  joinDate: string;
  listings: string[];
  bookings: string[];
};

// Application State Flow
type AppFlowState = 
  | 'welcome' 
  | 'auth_signup' 
  | 'auth_login' 
  | 'verification' 
  | 'tutorial' 
  | 'main';

// --- Mock Data ---
const SAMPLE_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Seaside Retreat',
    location: 'Sibgong, Sylhet, UK',
    price: 1200,
    rating: 5.0,
    reviews: 18,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    type: 'Apartment',
    beds: 4,
    baths: 5,
    sqft: 1200,
    host: {
      name: 'Nelson Sajib',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      verified: true,
      responseTime: '< 1 hour',
      trustScore: 98
    },
    amenities: ['Wifi', 'Kitchen', 'Workspace', 'Parking', 'Gym', 'Pool'],
    description: 'Perfect for students and young professionals. This modern apartment features high-speed wifi ideal for remote work or studying. Walking distance to university campus and public transit.',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    availableFrom: '2025-01-15',
    availableTo: '2025-08-31',
    minLeaseDuration: 3,
    maxLeaseDuration: 8,
    roommates: 1,
    utilitiesIncluded: true,
    furnished: true,
    depositRequired: 1200,
    featured: true
  },
  {
    id: '2',
    title: 'Lovely Bird',
    location: 'Zindabazar, Sylhet, UK',
    price: 950,
    rating: 4.85,
    reviews: 65,
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    type: 'House',
    beds: 3,
    baths: 2,
    sqft: 980,
    host: {
      name: 'Sarah M.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      verified: true,
      responseTime: '< 2 hours',
      trustScore: 92
    },
    amenities: ['Wifi', 'Parking', 'Garden', 'Laundry'],
    description: 'Cozy house perfect for interns or students. Quiet neighborhood with easy access to downtown. Pet-friendly with backyard space.',
    images: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    availableFrom: '2025-02-01',
    availableTo: '2025-12-31',
    minLeaseDuration: 4,
    maxLeaseDuration: 11,
    roommates: 2,
    utilitiesIncluded: false,
    furnished: true,
    depositRequired: 950,
    featured: false
  },
  {
    id: '3',
    title: 'Downtown Studio',
    location: 'Manchester, UK',
    price: 650,
    rating: 4.75,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    type: 'Studio',
    beds: 1,
    baths: 1,
    sqft: 450,
    host: {
      name: 'Mikael J.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      verified: true,
      responseTime: '< 3 hours',
      trustScore: 85
    },
    amenities: ['Wifi', 'Gym Access', 'Dishwasher', 'Balcony'],
    description: 'Compact and efficient living in the city center. Perfect for solo travelers or students. All utilities included in rent.',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    availableFrom: '2025-01-01',
    availableTo: '2025-06-30',
    minLeaseDuration: 2,
    maxLeaseDuration: 6,
    roommates: 0,
    utilitiesIncluded: true,
    furnished: true,
    depositRequired: 650,
    featured: true
  },
  {
    id: '4',
    title: 'Shared Room in Student House',
    location: 'Birmingham, UK',
    price: 420,
    rating: 4.6,
    reviews: 28,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    type: 'Room',
    beds: 1,
    baths: 1,
    sqft: 180,
    host: {
      name: 'Elena R.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      verified: true,
      responseTime: '< 4 hours',
      trustScore: 88
    },
    amenities: ['Wifi', 'Shared Kitchen', 'Parking', 'Study Room'],
    description: 'Budget-friendly option for students. Share a house with 4 other students. Close to university campus and bus stops.',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    availableFrom: '2025-09-01',
    availableTo: '2026-06-30',
    minLeaseDuration: 6,
    maxLeaseDuration: 10,
    roommates: 4,
    utilitiesIncluded: true,
    furnished: true,
    depositRequired: 420,
    featured: false
  },
  {
    id: '5',
    title: 'Modern Duplex Apartment',
    location: 'London, UK',
    price: 1800,
    rating: 4.95,
    reviews: 73,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    type: 'Duplex',
    beds: 3,
    baths: 2,
    sqft: 1400,
    host: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      verified: true,
      responseTime: '< 30 mins',
      trustScore: 96
    },
    amenities: ['Wifi', 'Workspace', 'Parking', 'Terrace', 'AC', 'Heater'],
    description: 'Stunning two-floor apartment perfect for young professionals. Modern finishes, private terrace, and amazing city views.',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    availableFrom: '2025-03-01',
    availableTo: '2025-09-30',
    minLeaseDuration: 3,
    maxLeaseDuration: 7,
    roommates: 0,
    utilitiesIncluded: false,
    furnished: true,
    depositRequired: 3600,
    featured: true
  }
];

// --- Shared Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', icon: Icon, fullWidth = false }: any) => {
  const baseStyle = `flex items-center justify-center px-6 py-4 rounded-full font-semibold transition-all duration-200 active:scale-95 text-base ${fullWidth ? 'w-full' : ''}`;
  const variants = {
    primary: "bg-brand-500 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-600",
    secondary: "bg-white text-slate-900 border border-slate-200 shadow-sm hover:bg-slate-50",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
    outline: "bg-transparent border border-slate-300 text-slate-700 hover:border-slate-800",
    social: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 relative"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}>
      {Icon && <Icon size={20} className="mr-2" />}
      {children}
    </button>
  );
};

const Input = ({ label, value, onChange, placeholder, type = "text", multiline = false, icon: Icon }: any) => (
  <div className="mb-4">
    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">{label}</label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={20} />
        </div>
      )}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800 min-h-[100px] ${Icon ? 'pl-11' : ''}`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800 ${Icon ? 'pl-11' : ''}`}
        />
      )}
    </div>
  </div>
);

const SocialButton = ({ icon, label, onClick }: any) => (
  <button onClick={onClick} className="flex-1 flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors">
    {icon}
    <span className="sr-only">{label}</span>
  </button>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// --- Root App ---

const App = () => {
  const [appState, setAppState] = useState<AppFlowState>('welcome');

  // Navigation Helpers
  const goToAuth = (mode: 'signup' | 'login') => setAppState(mode === 'signup' ? 'auth_signup' : 'auth_login');
  const goToVerification = () => setAppState('verification');
  const goToTutorial = () => setAppState('tutorial');
  const goToMain = () => setAppState('main');

  return (
    <div className="h-full w-full max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative sm:border-x sm:border-slate-200">
      {appState === 'welcome' && <WelcomeScreen onGetStarted={() => goToAuth('signup')} onLogin={() => goToAuth('login')} />}
      {(appState === 'auth_signup' || appState === 'auth_login') && (
        <AuthScreen mode={appState === 'auth_signup' ? 'signup' : 'login'} onComplete={goToVerification} onSwitchMode={goToAuth} />
      )}
      {appState === 'verification' && <VerificationScreen onComplete={goToTutorial} />}
      {appState === 'tutorial' && <TutorialScreen onComplete={goToMain} />}
      {appState === 'main' && <MainApp />}
    </div>
  );
};

// --- Onboarding Screens ---

const WelcomeScreen = ({ onGetStarted, onLogin }: any) => {
  return (
    <div className="h-full flex flex-col relative bg-white animate-fade-in">
      <div className="flex-1 relative">
        <img 
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
          alt="Apartment" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-10 left-6 right-6 text-white">
           <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-brand-500/40">
             <Home className="text-white" size={32} />
           </div>
           <h1 className="text-4xl font-bold mb-4 leading-tight">Rent Your<br/>Perfect Home 🏠</h1>
           <p className="text-slate-200 text-lg opacity-90 mb-2">Find and list verified sublets in minutes.</p>
        </div>
      </div>
      
      <div className="px-6 py-8 pb-12 bg-white rounded-t-3xl -mt-6 relative z-10 flex flex-col gap-4">
        <Button onClick={onGetStarted} fullWidth>Get Started</Button>
        <Button onClick={onLogin} variant="secondary" fullWidth>Log In</Button>
      </div>
    </div>
  );
};

const AuthScreen = ({ mode, onComplete, onSwitchMode }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="h-full flex flex-col bg-white animate-slide-in px-6 pt-safe">
      <div className="pt-8 mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-slate-500">
          {mode === 'signup' 
            ? 'Sign up to start your journey' 
            : 'Enter your details to sign in'}
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <Input 
          label="Email" 
          placeholder="hello@example.com" 
          value={email} 
          onChange={setEmail} 
          icon={Mail}
        />
        <Input 
          label="Password" 
          type="password" 
          placeholder="••••••••" 
          value={password} 
          onChange={setPassword}
          icon={Lock}
        />
        {mode === 'login' && (
          <div className="flex justify-end">
            <button className="text-brand-500 text-sm font-semibold">Forgot Password?</button>
          </div>
        )}
      </div>

      <Button onClick={onComplete} fullWidth className="mb-8">
        {mode === 'signup' ? 'Sign Up' : 'Log In'}
      </Button>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-100"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-slate-400">Or continue with</span>
        </div>
      </div>

      <div className="flex gap-4 mb-auto">
        <SocialButton icon={<GoogleIcon />} label="Google" onClick={() => {}} />
        <SocialButton icon={<Facebook className="text-[#1877F2]" />} label="Facebook" onClick={() => {}} />
        <SocialButton icon={<Linkedin className="text-[#0A66C2]" />} label="LinkedIn" onClick={() => {}} />
      </div>

      <div className="py-6 text-center">
        <p className="text-slate-600">
          {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
          <button 
            onClick={() => onSwitchMode(mode === 'signup' ? 'login' : 'signup')} 
            className="text-brand-600 font-bold ml-1"
          >
            {mode === 'signup' ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

const VerificationScreen = ({ onComplete }: any) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto focus next input
    if (value && index < 3) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white animate-slide-in px-6 pt-safe">
      <div className="pt-8 mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {step === 'phone' ? 'Verify Phone' : 'Enter Code'}
        </h1>
        <p className="text-slate-500">
          {step === 'phone' 
            ? 'We will send you a verification code to confirm your identity.' 
            : `Code sent to ${phone}. Enter it below.`}
        </p>
      </div>

      <div className="flex-1">
        {step === 'phone' ? (
          <div className="space-y-6">
            <Input 
              label="Phone Number" 
              placeholder="+1 234 567 8900" 
              value={phone} 
              onChange={setPhone}
              icon={Smartphone}
            />
            <Button onClick={() => setStep('code')} fullWidth>Send Code</Button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between gap-4 px-4">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  id={`code-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(idx, e.target.value)}
                  className="w-14 h-16 rounded-2xl border-2 border-slate-200 text-center text-2xl font-bold focus:border-brand-500 focus:outline-none transition-all"
                />
              ))}
            </div>
            <div className="text-center text-sm text-slate-500">
              Didn't receive code? <button className="text-brand-500 font-bold">Resend</button>
            </div>
            <Button onClick={onComplete} fullWidth>Verify & Continue</Button>
          </div>
        )}
      </div>
    </div>
  );
};

const TutorialScreen = ({ onComplete }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1556912172-45b7abe8d7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Find Verified Sublets",
      desc: "Browse hundreds of verified listings tailored for students and travelers."
    },
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "List Your Space",
      desc: "Earn money by listing your spare room or apartment in just a few taps."
    },
    {
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Trusted Community",
      desc: "Connect with verified users and build trust through reviews and ratings."
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white animate-fade-in relative">
      <div className="flex-1 relative overflow-hidden">
        <div 
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div key={idx} className="min-w-full h-full relative">
              <img src={slide.image} className="w-full h-full object-cover" alt={slide.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-10 pt-6 bg-white rounded-t-3xl -mt-10 relative z-10">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-brand-500' : 'w-2 bg-slate-200'
              }`} 
            />
          ))}
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">
          {slides[currentSlide].title}
        </h2>
        <p className="text-slate-500 text-center text-sm leading-relaxed mb-8 px-4">
          {slides[currentSlide].desc}
        </p>

        <Button onClick={handleNext} fullWidth>
          {currentSlide === slides.length - 1 ? 'Start Exploring' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

// --- Main Application Logic (Existing Logic Wrapped) ---

const MainApp = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'saved' | 'profile'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [likedProperties, setLikedProperties] = useState<Set<string>>(new Set());
  const [isCreatingListing, setIsCreatingListing] = useState(false);

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newLiked = new Set(likedProperties);
    if (newLiked.has(id)) newLiked.delete(id);
    else newLiked.add(id);
    setLikedProperties(newLiked);
  };

  if (isCreatingListing) {
    return <CreateListingView onBack={() => setIsCreatingListing(false)} onComplete={() => setIsCreatingListing(false)} />;
  }

  if (selectedProperty) {
    return (
      <PropertyDetailView 
        property={selectedProperty} 
        onBack={() => setSelectedProperty(null)}
        isLiked={likedProperties.has(selectedProperty.id)}
        onToggleLike={() => toggleLike(selectedProperty.id)}
      />
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-50 animate-fade-in">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {activeTab === 'home' && (
          <HomeTab onOpenProperty={setSelectedProperty} likedProperties={likedProperties} onToggleLike={toggleLike} />
        )}
        {activeTab === 'search' && (
          <SearchTab onOpenProperty={setSelectedProperty} likedProperties={likedProperties} onToggleLike={toggleLike} />
        )}
        {activeTab === 'saved' && (
          <SavedTab onOpenProperty={setSelectedProperty} likedProperties={likedProperties} onToggleLike={toggleLike} />
        )}
        {activeTab === 'profile' && (
          <ProfileTab onCreateListing={() => setIsCreatingListing(true)} />
        )}
      </div>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 px-6 py-3 pb-safe z-40 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <NavIcon icon={Home} label="Home" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavIcon icon={Search} label="Search" isActive={activeTab === 'search'} onClick={() => setActiveTab('search')} />
        <NavIcon icon={Heart} label="Saved" isActive={activeTab === 'saved'} onClick={() => setActiveTab('saved')} />
        <NavIcon icon={User} label="Profile" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
      </div>
    </div>
  );
};

const NavIcon = ({ icon: Icon, label, isActive, onClick }: any) => (
  <button 
    onClick={onClick} 
    className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-brand-600 -translate-y-1' : 'text-slate-400'}`}
  >
    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
    <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity absolute -bottom-2`}>{label}</span>
  </button>
);

// --- Sub-Components for Main App ---

const HomeTab = ({ onOpenProperty, likedProperties, onToggleLike }: any) => {
  const [category, setCategory] = useState('All');
  const categories = ['All', 'Apartment', 'House', 'Villa', 'Studio', 'Room'];

  return (
    <div className="pt-safe pt-6 px-0">
      <div className="px-6 mb-6 flex justify-between items-start">
        <div>
          <p className="text-slate-500 text-xs font-medium mb-1 uppercase tracking-wide">Location</p>
          <div className="flex items-center text-slate-900 font-bold text-lg">
            <MapPin size={18} className="text-brand-500 mr-1.5" />
            Helsinki, Finland
            <ChevronRight size={16} className="text-slate-400 ml-1" />
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm relative">
          <User size={20} className="text-slate-700" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-brand-500 rounded-full border-2 border-white"></div>
        </button>
      </div>

      <div className="px-6 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 active:scale-[0.98] transition-transform">
          <Search size={20} className="text-slate-400" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-700">Find your best stay</p>
          </div>
          <button className="bg-slate-900 p-2 rounded-xl text-white">
            <Filter size={16} />
          </button>
        </div>
      </div>

      <div className="mb-8 overflow-x-auto no-scrollbar px-6 flex gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              category === cat 
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25' 
                : 'bg-white text-slate-600 border border-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mb-8">
        <div className="px-6 flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-slate-900">Featured</h2>
          <button className="text-brand-600 text-sm font-semibold">See all</button>
        </div>
        <div className="overflow-x-auto no-scrollbar px-6 flex gap-5 pb-4">
          {SAMPLE_PROPERTIES.map((prop) => (
            <div key={prop.id} className="min-w-[280px] w-[280px]">
              <PropertyCard 
                property={prop} 
                onClick={() => onOpenProperty(prop)} 
                isLiked={likedProperties.has(prop.id)}
                onToggleLike={(e: any) => onToggleLike(prop.id, e)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">New Listings</h2>
        <div className="flex flex-col gap-4">
          {SAMPLE_PROPERTIES.slice(0, 3).reverse().map((prop) => (
            <PropertyCardHorizontal 
              key={`h-${prop.id}`} 
              property={prop} 
              onClick={() => onOpenProperty(prop)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const SearchTab = ({ onOpenProperty, likedProperties, onToggleLike }: any) => {
  return (
    <div className="pt-safe pt-6 px-6 pb-24 h-full flex flex-col">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Explore</h1>
      <div className="relative mb-6">
        <input 
          type="text" 
          placeholder="Search by location..." 
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-sm"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
        <Badge color="gray">Price: $50-$150</Badge>
        <Badge color="gray">2+ Beds</Badge>
        <Badge color="gray">Instant Book</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 overflow-y-auto no-scrollbar pb-24">
        {SAMPLE_PROPERTIES.map((prop) => (
          <PropertyCardHorizontal 
            key={prop.id} 
            property={prop} 
            onClick={() => onOpenProperty(prop)}
            big
          />
        ))}
        {SAMPLE_PROPERTIES.map((prop) => (
          <PropertyCardHorizontal 
            key={`${prop.id}-dup`} 
            property={{...prop, id: `${prop.id}-dup`}}
            onClick={() => onOpenProperty(prop)}
            big
          />
        ))}
      </div>
    </div>
  );
};

const SavedTab = ({ onOpenProperty, likedProperties, onToggleLike }: any) => {
  const savedProps = SAMPLE_PROPERTIES.filter(p => likedProperties.has(p.id));

  return (
    <div className="pt-safe pt-6 px-6 h-full flex flex-col">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Saved</h1>
      {savedProps.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-60">
          <Heart size={48} className="text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900">No favorites yet</h3>
          <p className="text-slate-500">Start exploring and save your favorite stays here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 pb-24">
          {savedProps.map(prop => (
             <PropertyCardHorizontal 
             key={`saved-${prop.id}`} 
             property={prop} 
             onClick={() => onOpenProperty(prop)}
           />
          ))}
        </div>
      )}
    </div>
  );
};

const ProfileTab = ({ onCreateListing }: any) => {
  return (
    <div className="pt-safe pt-8 px-6 pb-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover" 
            alt="Profile"
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white">
            <CheckCircle size={12} strokeWidth={3} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Nur Alam</h2>
          <p className="text-slate-500 text-sm">Member since 2021</p>
          <div className="mt-1 flex gap-2">
            <Badge color="blue">Identity Verified</Badge>
          </div>
        </div>
      </div>

      <div className="bg-brand-50 rounded-2xl p-6 mb-8 flex items-center justify-between border border-brand-100">
        <div>
          <h3 className="font-bold text-brand-900 mb-1">List your place</h3>
          <p className="text-brand-700/80 text-sm mb-3">Earn money by renting your extra space.</p>
          <button 
            onClick={onCreateListing}
            className="bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-brand-600 transition-colors"
          >
            Create Listing
          </button>
        </div>
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-500 shadow-sm">
          <Plus size={32} />
        </div>
      </div>

      <div className="space-y-2">
        <ProfileMenuItem icon={User} label="Personal Information" />
        <ProfileMenuItem icon={CheckCircle} label="Verifications" />
        <ProfileMenuItem icon={DollarSign} label="Payments and Payouts" />
        <ProfileMenuItem icon={MessageSquare} label="Message Templates" />
        <div className="h-px bg-slate-100 my-4" />
        <ProfileMenuItem icon={LogOut} label="Log Out" danger />
      </div>
    </div>
  );
};

const PropertyDetailView = ({ property, onBack, isLiked, onToggleLike }: any) => {
  return (
    <div className="h-full bg-white flex flex-col relative z-50 animate-slide-in">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Header Image */}
        <div className="relative h-72">
          <img src={property.image} className="w-full h-full object-cover" alt="Detail" />
          <div className="absolute top-0 left-0 right-0 p-6 pt-safe flex justify-between items-start bg-gradient-to-b from-black/40 to-transparent">
            <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <Share size={20} />
              </button>
              <button onClick={onToggleLike} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <Heart size={20} className={isLiked ? "fill-brand-500 text-brand-500" : ""} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="-mt-8 relative bg-white rounded-t-3xl px-6 pt-8">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">{property.title}</h1>
              <p className="text-slate-500 flex items-center text-sm">
                <MapPin size={14} className="mr-1" />
                {property.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 py-6 border-b border-slate-100 justify-between">
            <div className="flex flex-col items-center">
               <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-500 mb-1">
                 <Star size={20} className="fill-brand-500" />
               </div>
               <span className="font-bold text-sm">{property.rating}</span>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-500 mb-1">
                 <BedDouble size={20} />
               </div>
               <span className="font-bold text-sm">{property.beds}</span>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-500 mb-1">
                 <Bath size={20} />
               </div>
               <span className="font-bold text-sm">{property.baths}</span>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-500 mb-1">
                 <Square size={20} />
               </div>
               <span className="font-bold text-sm">{property.sqft}</span>
            </div>
          </div>

          {/* Host */}
          <div className="py-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={property.host.avatar} className="w-12 h-12 rounded-full object-cover" alt="Host" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{property.host.name}</h3>
                <p className="text-xs text-slate-500">Host • {property.host.verified ? 'Verified' : 'Member'}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <MessageSquare size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <Phone size={18} />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="py-6 border-b border-slate-100">
            <h3 className="font-bold text-lg mb-3 text-slate-900">Description</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {property.description}
            </p>
          </div>
          
          <div className="h-12" /> {/* Spacer */}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="bg-white border-t border-slate-100 p-6 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-xs mb-1">Total Price</p>
          <div className="flex items-end gap-1">
            <span className="text-2xl font-bold text-brand-600">${property.price}</span>
            <span className="text-slate-400 text-sm mb-1">/ night</span>
          </div>
        </div>
        <Button className="px-8">Book Now</Button>
      </div>
    </div>
  );
};

const CreateListingView = ({ onBack, onComplete }: any) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Apartment',
    price: '',
    amenities: [] as string[],
    description: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const amenitiesList = ['Wifi', 'Kitchen', 'Pool', 'Parking', 'Gym', 'AC', 'Heater', 'Washer'];

  const toggleAmenity = (am: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(am) 
        ? prev.amenities.filter(a => a !== am)
        : [...prev.amenities, am]
    }));
  };

  const handleGenerateDescription = async () => {
    if (!formData.title || !formData.type) return;
    setIsGenerating(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `Write a short, catchy, and professional description (max 80 words) for a rental property listing.
      Title: ${formData.title}
      Type: ${formData.type}
      Amenities: ${formData.amenities.join(', ')}
      Price: $${formData.price}/night
      Make it sound inviting for a potential tenant.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      const text = response.text;
      if (text) {
        setFormData(prev => ({ ...prev, description: text }));
      }
    } catch (e) {
      console.error("Failed to generate description", e);
      // Fallback
      setFormData(prev => ({ ...prev, description: `Welcome to this beautiful ${prev.type.toLowerCase()}! Featuring ${prev.amenities.join(', ')} and much more. A perfect place to stay.` }));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full bg-white flex flex-col z-50 overflow-hidden animate-slide-in">
      <div className="px-6 py-4 pt-safe border-b border-slate-100 flex items-center justify-between bg-white z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-slate-800">
          <X size={24} />
        </button>
        <div className="flex gap-1">
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-2 h-2 rounded-full transition-colors ${step >= i ? 'bg-brand-500' : 'bg-slate-200'}`} />
          ))}
        </div>
        <div className="w-8" /> 
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        {step === 1 && (
          <div className="animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Tell us about your place</h2>
            <p className="text-slate-500 mb-8">Share some basic details to get started.</p>
            
            <div className="space-y-6">
              <Input 
                label="Property Title" 
                placeholder="e.g. Sunny Downtown Apartment" 
                value={formData.title}
                onChange={(v: string) => setFormData({...formData, title: v})}
              />
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">Property Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Apartment', 'House', 'Villa', 'Studio'].map(type => (
                    <button
                      key={type}
                      onClick={() => setFormData({...formData, type})}
                      className={`py-3 rounded-xl border font-medium text-sm transition-all ${
                        formData.type === type 
                          ? 'border-brand-500 bg-brand-50 text-brand-700' 
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <Input 
                label="Price per Night ($)" 
                placeholder="100" 
                type="number"
                value={formData.price}
                onChange={(v: string) => setFormData({...formData, price: v})}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Amenities & Perks</h2>
            <p className="text-slate-500 mb-8">What makes your place special?</p>
            
            <div className="grid grid-cols-2 gap-4">
              {amenitiesList.map(am => (
                <button
                  key={am}
                  onClick={() => toggleAmenity(am)}
                  className={`flex items-center p-4 rounded-xl border transition-all ${
                    formData.amenities.includes(am)
                      ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded mr-3 flex items-center justify-center border ${formData.amenities.includes(am) ? 'bg-brand-500 border-brand-500' : 'border-slate-300'}`}>
                    {formData.amenities.includes(am) && <CheckCircle size={14} className="text-white" />}
                  </div>
                  <span className="font-medium text-sm">{am}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Description</h2>
            <p className="text-slate-500 mb-6">Create a captivating description.</p>

            <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-brand-700">
                  <Sparkles size={18} />
                  <span className="font-bold text-sm">AI Magic Writer</span>
                </div>
                <button 
                  onClick={handleGenerateDescription}
                  disabled={isGenerating || !formData.title}
                  className="text-xs font-semibold bg-white text-brand-600 px-3 py-1.5 rounded-lg border border-brand-200 shadow-sm hover:bg-brand-50 disabled:opacity-50"
                >
                  {isGenerating ? 'Writing...' : 'Auto-Generate'}
                </button>
              </div>
              <p className="text-xs text-slate-500 mb-0">
                Let our AI write the perfect description based on your selected amenities and title.
              </p>
            </div>

            <Input 
              label="Description" 
              placeholder="Your generated description will appear here..." 
              value={formData.description}
              onChange={(v: string) => setFormData({...formData, description: v})}
              multiline
            />
            
            <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
               <ShieldCheck size={20} className="text-slate-400 mt-0.5" />
               <p className="text-xs text-slate-500 leading-relaxed">
                 By publishing this listing, you agree to our host terms and conditions. Your property will be verified within 24 hours.
               </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-slate-100 bg-white pb-safe">
        <div className="flex gap-4">
          {step > 1 && (
            <Button variant="secondary" onClick={() => setStep(step - 1)} className="flex-1">Back</Button>
          )}
          <Button 
            onClick={() => step < 3 ? setStep(step + 1) : onComplete()} 
            className="flex-1"
          >
            {step === 3 ? 'Publish Listing' : 'Next Step'}
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const Badge = ({ children, color = 'blue' }: any) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    rose: 'bg-rose-100 text-rose-700',
    gray: 'bg-slate-100 text-slate-600',
  };
  return (
    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${colors[color as keyof typeof colors]}`}>
      {children}
    </span>
  );
};

const ProfileMenuItem = ({ icon: Icon, label, danger }: any) => (
  <button className={`w-full flex items-center justify-between p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all ${danger ? 'text-red-500' : 'text-slate-700'}`}>
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${danger ? 'bg-red-50' : 'bg-slate-100'}`}>
        <Icon size={20} />
      </div>
      <span className="font-medium">{label}</span>
    </div>
    <ChevronRight size={18} className="text-slate-300" />
  </button>
);

const PropertyCard = ({ property, onClick, isLiked, onToggleLike }: any) => (
  <div onClick={onClick} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm active:scale-[0.98] transition-all cursor-pointer relative">
    <div className="aspect-[4/3] overflow-hidden relative">
      <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
      <button 
        onClick={onToggleLike}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-90 transition-transform"
      >
        <Heart size={16} className={isLiked ? "fill-brand-500 text-brand-500" : "text-slate-600"} />
      </button>
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
        <Star size={12} className="fill-yellow-400 text-yellow-400" />
        <span className="text-xs font-bold text-slate-800">{property.rating}</span>
      </div>
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-bold text-slate-900 truncate pr-2">{property.title}</h3>
      </div>
      <div className="flex items-center text-slate-500 text-xs mb-3">
        <MapPin size={12} className="mr-1" />
        {property.location}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-brand-600 font-bold">
          ${property.price} <span className="text-slate-400 font-normal text-xs">/ night</span>
        </p>
        <p className="text-xs text-slate-400">{property.type}</p>
      </div>
    </div>
  </div>
);

const PropertyCardHorizontal = ({ property, onClick, big }: any) => (
  <div onClick={onClick} className={`flex bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm p-2 gap-4 cursor-pointer active:scale-[0.98] transition-transform ${big ? 'items-start' : 'items-center'}`}>
    <div className={`${big ? 'w-32 h-32' : 'w-24 h-24'} rounded-xl overflow-hidden flex-shrink-0 bg-slate-100`}>
      <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 py-1 pr-2 flex flex-col justify-center h-full">
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{property.title}</h3>
        {!big && (
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
            <Star size={10} className="fill-yellow-400 text-yellow-400" />
            {property.rating}
          </div>
        )}
      </div>
      <p className="text-xs text-slate-500 mb-2">{property.location}</p>
      
      {big && (
        <div className="flex items-center gap-3 mb-3">
          <Badge color="gray">{property.beds} Beds</Badge>
          <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            {property.rating}
          </div>
        </div>
      )}
      
      {!big && (
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-1 text-slate-400 text-[10px]">
            <BedDouble size={12} /> {property.beds}
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-[10px]">
            <Bath size={12} /> {property.baths}
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-[10px]">
            <Square size={12} /> {property.sqft}
          </div>
        </div>
      )}

      <div className="mt-auto">
        <span className="text-brand-600 font-bold text-sm">${property.price}</span>
        <span className="text-slate-400 text-[10px]"> / night</span>
      </div>
    </div>
  </div>
);

const root = createRoot(document.getElementById('root')!);
root.render(<App />);