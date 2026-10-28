import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Video, 
  SlidersHorizontal, 
  TrendingUp, 
  Star, 
  ShieldCheck, 
  Zap, 
  Layers
} from 'lucide-react';

import { CreatorProfile, SampleVideo, VideoOrder, UserSession } from './types';
import { MOCK_CREATORS, INITIAL_ORDERS, DEMO_CLIENT, DEMO_CREATOR } from './data/mockData';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CreatorCard } from './components/CreatorCard';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { OrderModal } from './components/OrderModal';
import { ClientAuthModal, CreatorAuthModal } from './components/AuthModals';
import { ClientDashboard } from './components/ClientDashboard';
import { CreatorDashboard } from './components/CreatorDashboard';
import { PaymentMethodsExplainer } from './components/PaymentMethodsExplainer';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';

export default function App() {
  // Theme state: defaults to dark mode with smooth cyan & blue-violet styling
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('reelstore_theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('reelstore_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('reelstore_theme', 'light');
    }
  }, [darkMode]);

  // Active view: 'marketplace' | 'client_dashboard' | 'creator_dashboard' | 'payment_info' | 'how_it_works'
  const [activeView, setActiveView] = useState<'marketplace' | 'client_dashboard' | 'creator_dashboard' | 'payment_info' | 'how_it_works'>('marketplace');

  // User session state
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('reelstore_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleSetUser = (user: UserSession | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem('reelstore_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('reelstore_user');
    }
  };

  // Orders State (loaded from localStorage or INITIAL_ORDERS with stale URL sanitation)
  const [orders, setOrders] = useState<VideoOrder[]>(() => {
    try {
      const saved = localStorage.getItem('reelstore_orders');
      if (saved) {
        const parsed: VideoOrder[] = JSON.parse(saved);
        const sanitized = parsed.map(o => ({
          ...o,
          draftVideoUrl: o.draftVideoUrl?.includes('mixkit.co') ? '/assets/videos/aromatic_perfume_ad.mp4' : (o.draftVideoUrl || '/assets/videos/aromatic_perfume_ad.mp4'),
          finalVideoUrl: o.finalVideoUrl?.includes('mixkit.co') ? '/assets/videos/aromatic_perfume_ad.mp4' : o.finalVideoUrl
        }));
        // Ensure the featured luxury 3D perfume ad order is present
        if (!sanitized.some(o => o.id === 'ord-9921')) {
          return [INITIAL_ORDERS[0], ...sanitized];
        }
        return sanitized;
      }
    } catch {
      // fallback
    }
    return INITIAL_ORDERS;
  });

  const saveOrders = (updatedOrders: VideoOrder[]) => {
    setOrders(updatedOrders);
    localStorage.setItem('reelstore_orders', JSON.stringify(updatedOrders));
  };

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price_asc' | 'delivery'>('rating');

  // Modals state
  const [selectedCreatorForOrder, setSelectedCreatorForOrder] = useState<CreatorProfile | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<{ video: SampleVideo; creator: CreatorProfile } | null>(null);
  const [isClientAuthOpen, setIsClientAuthOpen] = useState(false);
  const [isCreatorAuthOpen, setIsCreatorAuthOpen] = useState(false);

  // Quick Switcher handler
  const handleQuickSwitchUser = (type: 'client' | 'creator' | 'guest') => {
    if (type === 'client') {
      handleSetUser(DEMO_CLIENT);
      setActiveView('client_dashboard');
    } else if (type === 'creator') {
      handleSetUser(DEMO_CREATOR);
      setActiveView('creator_dashboard');
    } else {
      handleSetUser(null);
      setActiveView('marketplace');
    }
  };

  // Add new order
  const handleOrderCreated = (newOrder: VideoOrder) => {
    const updated = [newOrder, ...orders];
    saveOrders(updated);
  };

  // Client approvals & revisions
  const handleApproveOrder = (orderId: string) => {
    const updated = orders.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          status: 'completed' as const,
          feedbackNotes: 'تم اعتماد الفيديو النهائي بنجاح من قبل العميل وتم تحويل المقابل المالي للصانع.'
        };
      }
      return ord;
    });
    saveOrders(updated);
  };

  const handleRequestRevision = (orderId: string, revisionNotes: string) => {
    const updated = orders.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          status: 'revision_requested' as const,
          revisionsLeft: Math.max(0, ord.revisionsLeft - 1),
          feedbackNotes: `طلب العميل تعديل: ${revisionNotes}`
        };
      }
      return ord;
    });
    saveOrders(updated);
  };

  // Creator draft submission
  const handleSubmitDraft = (orderId: string, videoUrl: string, notes: string) => {
    const updated = orders.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          status: 'draft_ready' as const,
          draftVideoUrl: videoUrl,
          feedbackNotes: notes
        };
      }
      return ord;
    });
    saveOrders(updated);
  };

  // Filtered creators list
  const filteredCreators = MOCK_CREATORS.filter(creator => {
    const matchCategory = selectedCategory === 'all' || creator.category === selectedCategory;
    const matchQuery = 
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchQuery;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price_asc') return a.startingPrice - b.startingPrice;
    if (sortBy === 'delivery') return a.turnaroundHours - b.turnaroundHours;
    return 0;
  });

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-[#070b14] text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300 font-['Cairo',sans-serif]`}>
      
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentUser={currentUser}
        onOpenClientAuth={() => setIsClientAuthOpen(true)}
        onOpenCreatorAuth={() => setIsCreatorAuthOpen(true)}
        onSelectView={setActiveView}
        activeView={activeView}
        onSwitchUser={handleQuickSwitchUser}
        onLogout={() => handleSetUser(null)}
        orderCount={orders.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: Marketplace & Discovery */}
        {activeView === 'marketplace' && (
          <>
            {/* Animated Hero Section */}
            <Hero
              onExploreClick={() => {
                const el = document.getElementById('creators-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenCreatorAuth={() => setIsCreatorAuthOpen(true)}
              onSelectCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />

            {/* Creators Catalog Section */}
            <section id="creators-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              
              {/* Filter & Search Bar */}
              <div className="mb-8 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                
                {/* Search input */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن صانع فيديو، أو تخصص (مثال: UGC، موشن جرافيك، ممثل، عطور، كافيهات)..."
                    className="w-full px-4 py-3 pr-11 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
                </div>

                {/* Sort selector */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <SlidersHorizontal className="w-4 h-4 text-cyan-500" />
                    الترتيب حسب:
                  </span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="rating">الأعلى تقييماً ⭐</option>
                    <option value="price_asc">الأقل سعراً أولاً 💰</option>
                    <option value="delivery">الأسرع تسليماً ⚡</option>
                  </select>
                </div>

              </div>

              {/* Creators Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCreators.map(creator => (
                  <CreatorCard
                    key={creator.id}
                    creator={creator}
                    onSelectCreator={c => setSelectedCreatorForOrder(c)}
                    onPlayVideo={(v, c) => setActiveVideoModal({ video: v, creator: c })}
                  />
                ))}
              </div>

              {filteredCreators.length === 0 && (
                <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <Video className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <h3 className="font-bold text-base text-slate-800 dark:text-slate-200 mb-1">
                    لم نجد صناع إعلانات يطابقون بحثك
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    جرب البحث بكلمات مختلفة أو إزالة الفلتر لتصفح جميع المحترفين
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition"
                  >
                    عرض كل صناع الإعلانات
                  </button>
                </div>
              )}

            </section>
          </>
        )}

        {/* VIEW 2: Client Dashboard */}
        {activeView === 'client_dashboard' && (
          <ClientDashboard
            orders={orders}
            currentUser={currentUser || DEMO_CLIENT}
            onExploreMore={() => setActiveView('marketplace')}
            onApproveOrder={handleApproveOrder}
            onRequestRevision={handleRequestRevision}
            onPreviewVideo={(v, c) => setActiveVideoModal({ video: v, creator: c })}
            creators={MOCK_CREATORS}
          />
        )}

        {/* VIEW 3: Creator Dashboard */}
        {activeView === 'creator_dashboard' && (
          <CreatorDashboard
            orders={orders}
            currentUser={currentUser || DEMO_CREATOR}
            onSubmitDraft={handleSubmitDraft}
          />
        )}

        {/* VIEW 4: Payment Methods Explainer */}
        {activeView === 'payment_info' && (
          <PaymentMethodsExplainer
            onBackToExplore={() => setActiveView('marketplace')}
          />
        )}

        {/* VIEW 5: How It Works */}
        {activeView === 'how_it_works' && (
          <HowItWorks
            onStartOrder={() => setActiveView('marketplace')}
          />
        )}

      </main>

      {/* Footer */}
      <Footer
        onSelectView={setActiveView}
        onOpenClientAuth={() => setIsClientAuthOpen(true)}
        onOpenCreatorAuth={() => setIsCreatorAuthOpen(true)}
      />

      {/* MODALS */}
      {/* 1. Order & Payment Modal */}
      <OrderModal
        creator={selectedCreatorForOrder}
        currentUser={currentUser}
        onClose={() => setSelectedCreatorForOrder(null)}
        onOrderCreated={handleOrderCreated}
        onOpenClientAuth={() => setIsClientAuthOpen(true)}
      />

      {/* 2. Video Player Modal for 9:16 Vertical Reels */}
      <VideoPlayerModal
        video={activeVideoModal?.video || null}
        creator={activeVideoModal?.creator || null}
        onClose={() => setActiveVideoModal(null)}
        onOrderFromCreator={creator => {
          setActiveVideoModal(null);
          setSelectedCreatorForOrder(creator);
        }}
      />

      {/* 3. Dedicated Client Login / Register Modal */}
      <ClientAuthModal
        isOpen={isClientAuthOpen}
        onClose={() => setIsClientAuthOpen(false)}
        onSuccess={user => {
          handleSetUser(user);
          setActiveView('client_dashboard');
        }}
        onSwitchToCreator={() => setIsCreatorAuthOpen(true)}
      />

      {/* 4. Dedicated Creator Login / Register Modal */}
      <CreatorAuthModal
        isOpen={isCreatorAuthOpen}
        onClose={() => setIsCreatorAuthOpen(false)}
        onSuccess={user => {
          handleSetUser(user);
          setActiveView('creator_dashboard');
        }}
        onSwitchToClient={() => setIsClientAuthOpen(true)}
      />

    </div>
  );
}
