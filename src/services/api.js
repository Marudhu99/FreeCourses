// API Service for real-time course data
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes cache
  }

  // Generic fetch with error handling and caching
  async fetchWithCache(url, options = {}) {
    const cacheKey = `${url}_${JSON.stringify(options)}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      return data;
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }

  // Fetch all courses with optional filters
  async getCourses(filters = {}) {
    const queryParams = new URLSearchParams();
    
    if (filters.category && filters.category !== 'All') {
      queryParams.append('category', filters.category);
    }
    if (filters.search) {
      queryParams.append('search', filters.search);
    }
    if (filters.level) {
      queryParams.append('level', filters.level);
    }
    if (filters.limit) {
      queryParams.append('limit', filters.limit);
    }
    if (filters.offset) {
      queryParams.append('offset', filters.offset);
    }

    const url = `${API_BASE_URL}/courses${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.fetchWithCache(url);
  }

  // Fetch single course by ID
  async getCourse(id) {
    const url = `${API_BASE_URL}/courses/${id}`;
    return this.fetchWithCache(url);
  }

  // Fetch categories
  async getCategories() {
    const url = `${API_BASE_URL}/categories`;
    return this.fetchWithCache(url);
  }

  // Fetch featured courses
  async getFeaturedCourses(limit = 6) {
    const url = `${API_BASE_URL}/courses/featured?limit=${limit}`;
    return this.fetchWithCache(url);
  }

  // Search courses with real-time suggestions
  async searchCourses(query, limit = 10) {
    if (!query || query.length < 2) return [];
    
    const url = `${API_BASE_URL}/courses/search?q=${encodeURIComponent(query)}&limit=${limit}`;
    return this.fetchWithCache(url);
  }

  // Get course statistics
  async getCourseStats() {
    const url = `${API_BASE_URL}/stats`;
    return this.fetchWithCache(url);
  }

  // Clear cache (useful for real-time updates)
  clearCache() {
    this.cache.clear();
  }

  // Clear specific cache entry
  clearCacheEntry(key) {
    this.cache.delete(key);
  }
}

// WebSocket service for real-time updates
class WebSocketService {
  constructor() {
    this.ws = null;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
  }

  connect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:3001';
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
      this.attemptReconnect();
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  handleMessage(data) {
    const { type, payload } = data;
    const listeners = this.listeners.get(type) || [];
    listeners.forEach(callback => callback(payload));
  }

  subscribe(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);

    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(eventType) || [];
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }

  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Create singleton instances
export const apiService = new ApiService();
export const wsService = new WebSocketService();

// Sample data fallback (remove when API is ready)
export const sampleCoursesData = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and become a full-stack developer",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
    category: "Development",
    tags: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
    instructor: "John Smith",
    duration: "40 hours",
    students: 15420,
    rating: 4.8,
    udemyLink: "https://udemy.com/course/example-1",
    fullDescription: "Master web development with this comprehensive bootcamp. You'll learn everything from basic HTML and CSS to advanced React and Node.js concepts. Perfect for beginners who want to become professional developers.",
    prerequisites: "Basic computer skills",
    level: "Beginner",
    language: "English",
    lastUpdated: "2024",
    certificate: true,
    whatYoullLearn: [
      "Build responsive websites with HTML and CSS",
      "Create interactive web applications with JavaScript",
      "Develop modern frontends with React",
      "Build backend APIs with Node.js",
      "Deploy applications to production"
    ]
  },
  {
    id: 2,
    title: "Digital Marketing Masterclass",
    description: "Complete guide to SEO, social media marketing, and online advertising strategies",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
    category: "Marketing",
    tags: ["SEO", "Social Media", "Google Ads", "Content Marketing"],
    instructor: "Sarah Johnson",
    duration: "25 hours",
    students: 8930,
    rating: 4.7,
    udemyLink: "https://udemy.com/course/example-2",
    fullDescription: "Transform your business with proven digital marketing strategies. Learn SEO, social media marketing, Google Ads, and content marketing from industry experts.",
    prerequisites: "No prior experience needed",
    level: "Intermediate",
    language: "English",
    lastUpdated: "2024",
    certificate: true,
    whatYoullLearn: [
      "Master SEO techniques for better rankings",
      "Create effective social media campaigns",
      "Set up and optimize Google Ads",
      "Develop content marketing strategies",
      "Track and analyze marketing performance"
    ]
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    description: "Learn user interface and user experience design principles and tools",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=200&fit=crop",
    category: "Design",
    tags: ["UI Design", "UX Research", "Figma", "Prototyping"],
    instructor: "Mike Chen",
    duration: "30 hours",
    students: 12340,
    rating: 4.9,
    udemyLink: "https://udemy.com/course/example-3",
    fullDescription: "Create stunning user interfaces and exceptional user experiences. Master design thinking, wireframing, prototyping, and user testing methodologies.",
    prerequisites: "Creative mindset, no technical skills required",
    level: "Beginner",
    language: "English",
    lastUpdated: "2024",
    certificate: true,
    whatYoullLearn: [
      "Understand UX design principles",
      "Create wireframes and prototypes",
      "Master Figma for design work",
      "Conduct user research and testing",
      "Build a professional design portfolio"
    ]
  },
  {
    id: 4,
    title: "Python for Data Science",
    description: "Complete Python programming course focused on data analysis and machine learning",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop",
    category: "Development",
    tags: ["Python", "Data Science", "Machine Learning", "Pandas"],
    instructor: "Dr. Emma Wilson",
    duration: "45 hours",
    students: 20180,
    rating: 4.8,
    udemyLink: "https://udemy.com/course/example-4",
    fullDescription: "Dive into Python programming for data science and machine learning. Learn pandas, numpy, matplotlib, and scikit-learn through hands-on projects.",
    prerequisites: "Basic programming knowledge helpful but not required",
    level: "Intermediate",
    language: "English",
    lastUpdated: "2024",
    certificate: true,
    whatYoullLearn: [
      "Master Python programming fundamentals",
      "Analyze data with pandas and numpy",
      "Create visualizations with matplotlib",
      "Build machine learning models",
      "Work on real-world data science projects"
    ]
  },
  {
    id: 5,
    title: "Business Strategy and Leadership",
    description: "Develop leadership skills and learn strategic business planning techniques",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
    category: "Business",
    tags: ["Leadership", "Strategy", "Management", "Business Planning"],
    instructor: "Robert Brown",
    duration: "20 hours",
    students: 6750,
    rating: 4.6,
    udemyLink: "https://udemy.com/course/example-5",
    fullDescription: "Transform your leadership abilities and master strategic business thinking. Perfect for managers, entrepreneurs, and aspiring leaders.",
    prerequisites: "Some work experience preferred",
    level: "Advanced",
    language: "English",
    lastUpdated: "2024",
    certificate: true,
    whatYoullLearn: [
      "Develop effective leadership skills",
      "Create comprehensive business strategies",
      "Master team management techniques",
      "Learn decision-making frameworks",
      "Build organizational culture"
    ]
  },
  {
    id: 6,
    title: "Mobile App Development with Flutter",
    description: "Build cross-platform mobile apps for iOS and Android using Flutter and Dart",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
    category: "Development",
    tags: ["Flutter", "Dart", "Mobile Development", "iOS", "Android"],
    instructor: "Lisa Park",
    duration: "35 hours",
    students: 11230,
    rating: 4.7,
    udemyLink: "https://udemy.com/course/example-6",
    fullDescription: "Create beautiful, native mobile applications for both iOS and Android using Google's Flutter framework and Dart programming language.",
    prerequisites: "Basic programming experience recommended",
    level: "Intermediate",
    language: "English",
    lastUpdated: "2024",
    certificate: true,
    whatYoullLearn: [
      "Master Flutter framework and Dart language",
      "Build responsive mobile interfaces",
      "Integrate APIs and databases",
      "Publish apps to app stores",
      "Implement advanced mobile features"
    ]
  }
];

// Utility functions for data fetching with fallback
export const fetchCoursesWithFallback = async (filters = {}) => {
  try {
    // Try to fetch from API first
    return await apiService.getCourses(filters);
  } catch (error) {
    console.warn('API not available, using sample data:', error.message);
    
    // Fallback to sample data with client-side filtering
    let filteredData = [...sampleCoursesData];
    
    if (filters.category && filters.category !== 'All') {
      filteredData = filteredData.filter(course => course.category === filters.category);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredData = filteredData.filter(course =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        course.instructor.toLowerCase().includes(searchTerm)
      );
    }
    
    return {
      courses: filteredData,
      total: filteredData.length,
      categories: ['All', ...new Set(sampleCoursesData.map(course => course.category))]
    };
  }
};

export const fetchCourseWithFallback = async (id) => {
  try {
    return await apiService.getCourse(id);
  } catch (error) {
    console.warn('API not available, using sample data:', error.message);
    return sampleCoursesData.find(course => course.id === parseInt(id));
  }
};