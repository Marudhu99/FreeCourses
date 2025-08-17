import React, { useState, useEffect } from "react";
import { Search, Menu, X, ChevronDown, User, BookOpen, Briefcase, Palette, Code, Heart, Monitor, Camera, TrendingUp, MessageCircle, Users, ExternalLink, Sparkles, Zap, Star } from "lucide-react";

// Static categories data - TODO: Replace with API call
const staticCategories = [
  { id: 1, icon: <Briefcase className="w-5 h-5" />, label: "Business", color: "from-blue-500 to-blue-600", count: "2,345 courses" },
  { id: 2, icon: <Palette className="w-5 h-5" />, label: "Design", color: "from-pink-500 to-rose-600", count: "1,789 courses" },
  { id: 3, icon: <Code className="w-5 h-5" />, label: "Development", color: "from-green-500 to-emerald-600", count: "3,567 courses" },
  { id: 4, icon: <Heart className="w-5 h-5" />, label: "Health & Fitness", color: "from-red-500 to-pink-600", count: "987 courses" },
  { id: 5, icon: <BookOpen className="w-5 h-5" />, label: "Music", color: "from-purple-500 to-violet-600", count: "1,234 courses" },
  { id: 6, icon: <TrendingUp className="w-5 h-5" />, label: "Sales", color: "from-yellow-500 to-orange-600", count: "654 courses" },
  { id: 7, icon: <Monitor className="w-5 h-5" />, label: "Technology", color: "from-indigo-500 to-purple-600", count: "2,123 courses" },
  { id: 8, icon: <Camera className="w-5 h-5" />, label: "Photography", color: "from-orange-500 to-red-600", count: "876 courses" },
];

export default function Header() {
  const [showCategories, setShowCategories] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // TODO: Replace with actual API call
  // const fetchCategories = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch('/api/categories');
  //     const data = await response.json();
  //     setCategories(data);
  //   } catch (error) {
  //     console.error('Error fetching categories:', error);
  //     // Fallback to static categories
  //     setCategories(staticCategories);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Initialize categories
  useEffect(() => {
    // TODO: Uncomment when API is ready
    // fetchCategories();
    
    // Using static data for now
    setCategories(staticCategories);
  }, []);

  const handleTelegramJoin = () => {
    window.open('https://t.me/your_telegram_group', '_blank');
  };

  const handleWhatsAppJoin = () => {
    window.open('https://chat.whatsapp.com/your_whatsapp_invite', '_blank');
  };

  const navigationLinks = [
    { linkName: "Home", link: "/" },
    { linkName: "Courses", link: "/courses" },
    { linkName: "About", link: "/about" },
    { linkName: "Contact", link: "/contact" }
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-2xl">
      {/* Main Navigation */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="relative group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-110">
                <span className="text-white font-black text-xl">KB</span>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-bounce flex items-center justify-center">
                <span className="text-white text-xs font-bold">+</span>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <div className="flex flex-col">
                <div>
                  <span className="text-2xl xl:text-3xl font-black bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">Korelium</span>
                </div>
                <span className="text-xs text-gray-500 font-medium tracking-wide">Learn • Grow • Succeed</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Optimized for Laptop View */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-6 flex-shrink-0">
            {/* Navigation Links - Responsive Sizing */}
            <nav className="flex items-center gap-4 xl:gap-8 ml-2 lg:ml-4">
              {navigationLinks.map((item) => (
                <a 
                  key={item.linkName}
                  href={item.link} 
                  className="relative py-2 text-gray-700 hover:text-purple-600 font-bold text-sm lg:text-base xl:text-lg transition-all duration-300 group whitespace-nowrap"
                >
                  {item.linkName}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-500"></div>
                </a>
              ))}
            </nav>
          </div>

           {/* Social Group Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleTelegramJoin}
                className="group flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-3 h-3 lg:w-4 lg:h-4 group-hover:animate-bounce" />
                <span className="font-semibold text-xs lg:text-sm">Telegram</span>
              </button>
              
              <button
                onClick={handleWhatsAppJoin}
                className="group flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-3 h-3 lg:w-4 lg:h-4 group-hover:animate-bounce" />
                <span className="font-semibold text-xs lg:text-sm">WhatsApp</span>
              </button>
            </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 flex-shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Enhanced Category Bar - Responsive Grid */}
      <div className="hidden md:block bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 py-4 lg:py-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
          <div className="flex items-center justify-center gap-4 lg:gap-6 xl:gap-10 flex-wrap">
            {categories.slice(0, 6).map((cat, index) => (
              <button
                key={cat.id || index}
                className="group flex items-center gap-2 lg:gap-3 text-white/90 hover:text-white transition-all duration-500 relative transform hover:scale-110"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-xl lg:rounded-2xl bg-gradient-to-r ${cat.color} flex items-center justify-center text-white shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}>
                  {cat.icon}
                </div>
                <span className="font-bold text-sm lg:text-lg group-hover:text-purple-300 transition-colors duration-300 whitespace-nowrap">{cat.label}</span>
                <div className="absolute -bottom-2 lg:-bottom-3 left-0 w-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full group-hover:w-full transition-all duration-700"></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-40">
          {/* Social Groups Mobile */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Join Our Community</h4>
            <div className="flex gap-3">
              <button
                onClick={handleTelegramJoin}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Telegram Group
              </button>
              <button
                onClick={handleWhatsAppJoin}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Group
              </button>
            </div>
          </div>

          {/* Navigation Links Mobile */}
          <div className="p-4 space-y-3">
            {navigationLinks.map((item) => (
              <a
                key={item.linkName}
                href={item.link}
                className="block py-3 px-4 text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-bold text-lg transition-all duration-300 rounded-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.linkName}
              </a>
            ))}
          </div>
          
          {/* Mobile Categories */}
          <div className="border-t border-gray-100 p-4 bg-gradient-to-br from-gray-50 to-purple-50">
            <h4 className="font-black text-gray-900 mb-4 text-lg">Popular Categories</h4>
            <div className="grid grid-cols-1 gap-3">
              {categories.slice(0, 6).map((cat) => (
                <button
                  key={cat.id}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-purple-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${cat.color} flex items-center justify-center text-white shadow-lg`}>
                    {cat.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-bold text-gray-700 text-lg">{cat.label}</span>
                    <div className="text-sm text-gray-500">{cat.count}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}