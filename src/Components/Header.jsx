import React, { useState } from "react";
import { Search, Menu, X, ChevronDown, User, BookOpen, Briefcase, Palette, Code, Heart, Monitor, Camera, TrendingUp, MessageCircle, Users, ExternalLink, Sparkles, Zap, Star } from "lucide-react";

const categories = [
  { icon: <Briefcase className="w-5 h-5" />, label: "Business", color: "from-blue-500 to-blue-600", count: "2,345 courses" },
  { icon: <Palette className="w-5 h-5" />, label: "Design", color: "from-pink-500 to-rose-600", count: "1,789 courses" },
  { icon: <Code className="w-5 h-5" />, label: "Development", color: "from-green-500 to-emerald-600", count: "3,567 courses" },
  { icon: <Heart className="w-5 h-5" />, label: "Health & Fitness", color: "from-red-500 to-pink-600", count: "987 courses" },
  { icon: <BookOpen className="w-5 h-5" />, label: "Music", color: "from-purple-500 to-violet-600", count: "1,234 courses" },
  { icon: <Monitor className="w-5 h-5" />, label: "Office Productivity", color: "from-indigo-500 to-blue-600", count: "876 courses" },
  { icon: <Camera className="w-5 h-5" />, label: "Photography & Video", color: "from-orange-500 to-red-600", count: "1,456 courses" },
  { icon: <TrendingUp className="w-5 h-5" />, label: "Sales", color: "from-yellow-500 to-orange-600", count: "654 courses" },
];

export default function Header() {
  const [showCategories, setShowCategories] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleTelegramJoin = () => {
    window.open('https://t.me/your_telegram_group', '_blank');
  };

  const handleWhatsAppJoin = () => {
    window.open('https://chat.whatsapp.com/your_whatsapp_invite', '_blank');
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-2xl">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-2 overflow-hidden">
        <div className="flex animate-pulse">
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="mx-8 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              🎉 Limited Time: Get 70% OFF on all premium courses!
            </span>
            <span className="mx-8 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              ⚡ Join 50,000+ learners in our community
            </span>
            <span className="mx-8 flex items-center gap-2">
              <Star className="w-4 h-4" />
              🌟 New courses added weekly - Stay ahead of the curve!
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="relative group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-110">
                <span className="text-white font-black text-xl">MB</span>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-bounce flex items-center justify-center">
                <span className="text-white text-xs font-bold">+</span>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <div className="flex flex-col">
                <div>
                  <span className="text-3xl font-black bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">Mass</span>
                  <span className="text-3xl font-black bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">Brand</span>
                </div>
                <span className="text-xs text-gray-500 font-medium tracking-wide">Learn • Grow • Succeed</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-3xl mx-6 lg:mx-10">
            <div className={`relative transition-all duration-500 ${searchFocused ? 'transform scale-105' : ''}`}>
              <div className="flex items-center bg-gray-50 rounded-3xl border-2 border-transparent hover:border-purple-200 focus-within:border-purple-500 focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-purple-100 transition-all duration-500">
                {/* Category Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center gap-2 px-6 py-4 text-gray-600 hover:text-purple-600 transition-all duration-300 border-r border-gray-200 group"
                    onClick={() => setShowCategories(!showCategories)}
                  >
                    <Menu className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="hidden md:block text-sm font-semibold">Categories</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showCategories ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Enhanced Large Dropdown */}
                  {showCategories && (
                    <>
                      <div className="fixed inset-0 z-40 bg-black/20 " onClick={() => setShowCategories(false)}></div>
                      <div className="absolute left-0 top-full mt-3 w-[600px] bg-white rounded-3xl shadow-3xl border border-gray-100 z-50 overflow-hidden">
                        <div className="p-6 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 border-b border-gray-100">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                              <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="font-black text-xl text-gray-900">Explore Categories</h3>
                          </div>
                          <p className="text-gray-600 font-medium">Discover premium courses crafted by industry experts</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 p-6">
                          {categories.map((cat, index) => (
                            <button
                              key={cat.label}
                              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-purple-50 transition-all duration-300 group border border-transparent hover:border-purple-100"
                              onClick={() => setShowCategories(false)}
                              style={{ animationDelay: `${index * 0.05}s` }}
                            >
                              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${cat.color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                {cat.icon}
                              </div>
                              <div className="flex-1 text-left">
                                <div className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors text-lg">{cat.label}</div>
                                <div className="text-sm text-gray-500 font-medium">{cat.count}</div>
                              </div>
                              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            </button>
                          ))}
                        </div>
                        <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-center">
                          <button className="w-full text-white hover:text-purple-100 font-bold text-lg transition-colors duration-300 flex items-center justify-center gap-2">
                            <Users className="w-5 h-5" />
                            Browse All 50+ Categories →
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search 10,000+ courses, skills, certifications..."
                  className="flex-1 px-6 py-4 bg-transparent outline-none text-gray-700 placeholder-gray-500 font-medium text-lg"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                
                {/* Search Button */}
                <button className="m-2 p-3 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white rounded-2xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 group">
                  <Search className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Social Groups & Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Social Group Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleTelegramJoin}
                className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 group-hover:animate-bounce" />
                <span className="font-semibold text-sm">Telegram</span>
              </button>
              
              <button
                onClick={handleWhatsAppJoin}
                className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 group-hover:animate-bounce" />
                <span className="font-semibold text-sm">WhatsApp</span>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center gap-8 ml-4">
              {[
                { linkName: "Home", link: "/" },
                { linkName: "Courses", link: "/courses" },
                { linkName: "About", link: "/about" },
                { linkName: "Contact", link: "/contact" }
              ].map((item) => (
                <a 
                  key={item.linkName}
                  href={item.link} 
                  className="relative py-2 text-gray-700 hover:text-purple-600 font-bold text-lg transition-all duration-300 group"
                >
                  {item.linkName}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-500"></div>
                </a>
              ))}
            </nav>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Enhanced Category Bar */}
      <div className="hidden md:block bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 py-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-center gap-10">
            {categories.slice(0, 6).map((cat, index) => (
              <button
                key={cat.label}
                className="group flex items-center gap-3 text-white/90 hover:text-white transition-all duration-500 relative transform hover:scale-110"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-r ${cat.color} flex items-center justify-center text-white shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}>
                  {cat.icon}
                </div>
                <span className="font-bold text-lg group-hover:text-purple-300 transition-colors duration-300">{cat.label}</span>
                <div className="absolute -bottom-3 left-0 w-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full group-hover:w-full transition-all duration-700"></div>
              </button>
            ))}
            <button className="text-white/70 hover:text-purple-300 text-lg font-bold flex items-center gap-2 group">
              <span>More</span>
              <ChevronDown className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
            </button>
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
            {[
              { linkName: "Home", link: "/" },
              { linkName: "Courses", link: "/courses" },
              { linkName: "About", link: "/about" },
              { linkName: "Contact", link: "/contact" }
            ].map((item) => (
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
                  key={cat.label}
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