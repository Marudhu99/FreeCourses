import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, Clock, Users, Star, BookOpen, Award, Shield, Play } from 'lucide-react';

// API endpoints - replace with your actual API URLs
const API_BASE_URL = 'https://your-api-domain.com/api'; // Replace with your actual API base URL
const COURSES_API = `${API_BASE_URL}/courses`;
const CATEGORIES_API = `${API_BASE_URL}/categories`;

// API call functions
const fetchCategories = async () => {
  try {
    const response = await fetch(CATEGORIES_API);
    if (!response.ok) throw new Error('Failed to fetch categories');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Fallback categories if API fails
    return [
      { id: 1, name: 'Development', slug: 'development' },
      { id: 2, name: 'Marketing', slug: 'marketing' },
      { id: 3, name: 'Design', slug: 'design' },
      { id: 4, name: 'Business', slug: 'business' }
    ];
  }
};

const fetchCourses = async (categorySlug = null) => {
  try {
    let url = COURSES_API;
    
    if (categorySlug && categorySlug !== 'all') {
      url += `?category=${categorySlug}`;
    }
    
    console.log('Fetching courses from:', url); // For debugging
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch courses');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    // Fallback data if API fails
    return [
      {
        id: 1,
        title: "Complete Web Development Bootcamp",
        slug: "complete-web-development-bootcamp",
        description: "Learn HTML, CSS, JavaScript, React, Node.js and become a full-stack developer",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
        category: "Development",
        categorySlug: "development",
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
        slug: "digital-marketing-masterclass",
        description: "Complete guide to SEO, social media marketing, and online advertising strategies",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
        category: "Marketing",
        categorySlug: "marketing",
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
        slug: "ui-ux-design-fundamentals",
        description: "Learn user interface and user experience design principles and tools",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=200&fit=crop",
        category: "Design",
        categorySlug: "design",
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
        slug: "python-for-data-science",
        description: "Complete Python programming course focused on data analysis and machine learning",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop",
        category: "Development",
        categorySlug: "development",
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
        slug: "business-strategy-and-leadership",
        description: "Develop leadership skills and learn strategic business planning techniques",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
        category: "Business",
        categorySlug: "business",
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
        slug: "mobile-app-development-with-flutter",
        description: "Build cross-platform mobile apps for iOS and Android using Flutter and Dart",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
        category: "Development",
        categorySlug: "development",
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
  }
};

const App = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Handle URL parameters on component mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    const searchFromUrl = searchParams.get('search');
    
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
    
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [searchParams]);

  // Load courses when category changes (API call)
  useEffect(() => {
    loadCourses(selectedCategory);
    updateURL();
  }, [selectedCategory]);

  // Handle client-side search filtering
  useEffect(() => {
    let filtered = courses;

    // Client-side search filtering
    if (searchTerm) {
      filtered = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
    updateURL();
  }, [courses, searchTerm]);

  const loadCategories = async () => {
    setIsCategoriesLoading(true);
    try {
      const categoriesData = await fetchCategories();
      // Add "All" option at the beginning
      const allCategories = [
        { id: 0, name: 'All Categories', slug: 'all' },
        ...categoriesData
      ];
      setCategories(allCategories);
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  const loadCourses = async (categorySlug = null) => {
    setIsLoading(true);
    try {
      const coursesData = await fetchCourses(categorySlug);
      setCourses(coursesData);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateURL = () => {
    const params = new URLSearchParams();
    
    if (selectedCategory && selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }
    
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    
    const newSearch = params.toString();
    if (newSearch !== searchParams.toString()) {
      setSearchParams(params);
    }
  };

  const handleCategoryChange = (categorySlug) => {
    setSelectedCategory(categorySlug);
    // Clear search when category changes to show all courses in that category
    setSearchTerm('');
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSearchParams({});
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const CourseCard = ({ course }) => (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 sm:h-52 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3 flex gap-2">
          <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            FREE
          </span>
          {course.certificate && (
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
              <Award size={12} className="inline mr-1" />
              Certificate
            </span>
          )}
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium">
            {course.category}
          </span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={14} className="fill-current" />
            <span className="text-sm font-semibold text-gray-700">{course.rating}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock size={12} className="text-blue-500" />
              <span className="font-medium">{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={12} className="text-green-500" />
              <span className="font-medium">{course.students.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">By {course.instructor}</p>
          <div className="flex flex-wrap gap-1">
            {course.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-md border"
              >
                {tag}
              </span>
            ))}
            {course.tags.length > 3 && (
              <span className="text-xs text-gray-400">+{course.tags.length - 3} more</span>
            )}
          </div>
        </div>
        
        <button
          onClick={() => navigate(`/course/${course.slug}`)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Play size={16} className="inline mr-2" />
          View Course Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
              Free Udemy Courses
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover premium courses at zero cost. Boost your skills with verified instructors and earn certificates.
            </p>
            
            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-8 mt-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Shield className="text-green-500" size={16} />
                <span>Verified Courses</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="text-blue-500" size={16} />
                <span>Certificates Included</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="text-purple-500" size={16} />
                <span>50K+ Students</span>
              </div>
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-4xl mx-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search courses, instructors, or skills..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm bg-white/80 backdrop-blur-sm"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Filter size={20} className="text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                disabled={isCategoriesLoading}
                className="px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm bg-white/80 backdrop-blur-sm disabled:opacity-50"
              >
                {isCategoriesLoading ? (
                  <option>Loading categories...</option>
                ) : (
                  categories.map(category => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-6 text-gray-600 text-lg">Loading amazing courses for you...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
                {filteredCourses.length} Premium Course{filteredCourses.length !== 1 ? 's' : ''} Available
                {selectedCategory !== 'all' && (
                  <span className="text-lg font-normal text-gray-600 ml-2">
                    in {categories.find(cat => cat.slug === selectedCategory)?.name}
                  </span>
                )}
                {searchTerm && (
                  <span className="text-lg font-normal text-gray-600 ml-2">
                    for "{searchTerm}"
                  </span>
                )}
              </h2>
              <div className="text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                Updated daily • All courses verified
              </div>
            </div>
            
            {filteredCourses.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="text-gray-400" size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No courses found</h3>
                <p className="text-gray-600 text-lg mb-6">
                  {searchTerm 
                    ? `No courses found for "${searchTerm}" in ${selectedCategory === 'all' ? 'all categories' : categories.find(cat => cat.slug === selectedCategory)?.name}`
                    : 'Try adjusting your search or filter criteria'
                  }
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;