import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Clock, Users, Star, BookOpen, Award, TrendingUp, Shield, CheckCircle } from 'lucide-react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const CourseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourseDetail();
  }, [slug]);

  const fetchCourseDetail = async () => {
    try {
      setLoading(true);
      // API call for course details (commented for now)
      /*
      const response = await fetch(`/api/courses/${slug}`);
      if (!response.ok) throw new Error('Course not found');
      const courseData = await response.json();
      setCourse(courseData);
      */
      
      // Simulate API call with sample data
      const coursesData = [
        {
          id: 1,
          title: "Complete Web Development Bootcamp",
          slug: "complete-web-development-bootcamp",
          description: "Learn HTML, CSS, JavaScript, React, Node.js and become a full-stack developer",
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
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
          slug: "digital-marketing-masterclass",
          description: "Complete guide to SEO, social media marketing, and online advertising strategies",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
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
          slug: "ui-ux-design-fundamentals",
          description: "Learn user interface and user experience design principles and tools",
          image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop",
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
          slug: "python-for-data-science",
          description: "Complete Python programming course focused on data analysis and machine learning",
          image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop",
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
          slug: "business-strategy-and-leadership",
          description: "Develop leadership skills and learn strategic business planning techniques",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
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
          slug: "mobile-app-development-with-flutter",
          description: "Build cross-platform mobile apps for iOS and Android using Flutter and Dart",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
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

      setTimeout(() => {
        const foundCourse = coursesData.find(c => c.slug === slug);
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setError('Course not found');
        }
        setLoading(false);
      }, 500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-6 text-gray-600 text-lg">Loading course details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'The course you are looking for does not exist.'}</p>
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
            >
              Back to Courses
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to={`/?category=${course.category}`} className="text-blue-600 hover:text-blue-800">{course.category}</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 truncate">{course.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {course.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>
                
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {course.fullDescription}
                </p>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                      <Users className="text-blue-600" size={20} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{course.students.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2">
                      <Star className="text-yellow-600 fill-current" size={20} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{course.rating}</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                      <Clock className="text-green-600" size={20} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{course.duration}</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                      <Award className="text-purple-600" size={20} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">Yes</div>
                    <div className="text-sm text-gray-600">Certificate</div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <BookOpen className="text-blue-600" size={24} />
                    What you'll learn
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.whatYoullLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Shield className="text-blue-600" size={20} />
                    Prerequisites
                  </h3>
                  <p className="text-gray-600 bg-blue-50 p-4 rounded-lg">{course.prerequisites}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">
                  FREE
                </div>
                <div className="text-gray-500 text-sm line-through">Usually $49.99</div>
                <div className="text-green-600 text-sm font-semibold">100% Off Limited Time</div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Users size={16} />
                    Instructor:
                  </span>
                  <span className="font-medium text-blue-600">{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Clock size={16} />
                    Duration:
                  </span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 flex items-center gap-2">
                    <TrendingUp size={16} />
                    Level:
                  </span>
                  <span className={`font-medium px-2 py-1 rounded text-sm ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Language:</span>
                  <span className="font-medium">{course.language}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Updated:</span>
                  <span className="font-medium">{course.lastUpdated}</span>
                </div>
              </div>
              
              <a
                href={course.udemyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
              >
                <ExternalLink size={18} />
                Enroll on Udemy
              </a>

              <Link
                to="/"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                Back to Courses
              </Link>

              <div className="mt-6 p-4 bg-green-50 rounded-xl">
                <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                  <Shield size={16} />
                  Trust & Safety
                </div>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>✓ Verified instructor</li>
                  <li>✓ 30-day money-back guarantee</li>
                  <li>✓ Lifetime access</li>
                  <li>✓ Mobile and TV access</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BookOpen size={16} />
                  Course Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full font-medium hover:from-blue-100 hover:to-blue-200 hover:text-blue-700 transition-colors duration-200 cursor-pointer"
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
      
      <Footer />
    </div>
  );
};

export default CourseDetail;