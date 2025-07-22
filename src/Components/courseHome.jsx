import React, { useState, useEffect } from 'react';
import { Search, Filter, ExternalLink, Clock, Users, Star, ArrowLeft } from 'lucide-react';

// Sample JSON data - replace this with your actual JSON file data
const coursesData = [
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
    whatYoullLearn: [
      "Master Flutter framework and Dart language",
      "Build responsive mobile interfaces",
      "Integrate APIs and databases",
      "Publish apps to app stores",
      "Implement advanced mobile features"
    ]
  }
];

const App = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Get unique categories
  const categories = ['All', ...new Set(coursesData.map(course => course.category))];

  useEffect(() => {
    // Simulate loading from JSON file
    setTimeout(() => {
      setCourses(coursesData);
      setFilteredCourses(coursesData);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedCategory]);

  const CourseCard = ({ course }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            FREE
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            {course.category}
          </span>
        </div>
        
        <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={12} />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setSelectedCourse(course)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          View Course
        </button>
      </div>
    </div>
  );

  const CoursePage = ({ course }) => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft size={20} />
            Back to Courses
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-64 object-cover"
              />
              
              <div className="p-8">
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>
                
                <p className="text-gray-600 text-lg mb-6">
                  {course.fullDescription}
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">What you'll learn</h3>
                  <ul className="space-y-2">
                    {course.whatYoullLearn.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
                  <p className="text-gray-600">{course.prerequisites}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">FREE</div>
                <div className="text-gray-500 text-sm">Usually $49.99</div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Instructor:</span>
                  <span className="font-medium">{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Students:</span>
                  <span className="font-medium">{course.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                </div>
              </div>
              
              <a
                href={course.udemyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                Go to Udemy
                <ExternalLink size={18} />
              </a>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (selectedCourse) {
    return <CoursePage course={selectedCourse} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Free Udemy Courses
            </h1>
            <p className="text-xl text-gray-600">
              Discover amazing free courses to boost your skills
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading courses...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {filteredCourses.length} Course{filteredCourses.length !== 1 ? 's' : ''} Found
              </h2>
            </div>
            
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No courses found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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