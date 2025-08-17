import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Clock, Users, Star, BookOpen, Award, TrendingUp, Shield, CheckCircle } from 'lucide-react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

// API endpoints
const API_BASE_URL = 'http://localhost:3000/api';
const COURSES_API = `${API_BASE_URL}/courses`;

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
      
      // Try to fetch by slug first, then by ID if slug is numeric
      let url = `${COURSES_API}/${slug}`;
      
      console.log('Fetching course from:', url); // For debugging
      
      const response = await fetch(url);
      if (!response.ok) {
        // If slug doesn't work and it's numeric, try as ID
        if (!isNaN(slug)) {
          url = `${COURSES_API}/${slug}`;
          const idResponse = await fetch(url);
          if (!idResponse.ok) throw new Error('Course not found');
          const courseData = await idResponse.json();
          setCourse(courseData);
        } else {
          throw new Error('Course not found');
        }
      } else {
        const courseData = await response.json();
        setCourse(courseData);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching course:', err);
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
            <Link 
              to={`/?category=${course.categorySlug || course.category?.toLowerCase()}`} 
              className="text-blue-600 hover:text-blue-800"
            >
              {course.category || course.categoryName || 'Courses'}
            </Link>
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
                  src={course.image || course.thumbnail || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop"} 
                  alt={course.title}
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(course.level || 'Beginner')}`}>
                      {course.level || 'Beginner'}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {course.category || course.categoryName || 'General'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>
                
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {course.fullDescription || course.description || course.shortDescription || 'No description available'}
                </p>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                      <Users className="text-blue-600" size={20} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {course.students ? course.students.toLocaleString() : '1,000+'}
                    </div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2">
                      <Star className="text-yellow-600 fill-current" size={20} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{course.rating || 4.5}</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                      <Clock className="text-green-600" size={20} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{course.duration || '30 hours'}</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                      <Award className="text-purple-600" size={20} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {course.certificate || course.hasCertificate ? 'Yes' : 'No'}
                    </div>
                    <div className="text-sm text-gray-600">Certificate</div>
                  </div>
                </div>
                
                {/* What you'll learn section */}
                {(course.whatYoullLearn || course.learningOutcomes || course.objectives) && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                      <BookOpen className="text-blue-600" size={24} />
                      What you'll learn
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(course.whatYoullLearn || course.learningOutcomes || course.objectives || []).map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Prerequisites section */}
                {(course.prerequisites || course.requirements) && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Shield className="text-blue-600" size={20} />
                      Prerequisites
                    </h3>
                    <p className="text-gray-600 bg-blue-50 p-4 rounded-lg">
                      {course.prerequisites || course.requirements}
                    </p>
                  </div>
                )}
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
                <div className="text-gray-500 text-sm line-through">
                  Usually ${course.originalPrice || course.price || '49.99'}
                </div>
                <div className="text-green-600 text-sm font-semibold">100% Off Limited Time</div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Users size={16} />
                    Instructor:
                  </span>
                  <span className="font-medium text-blue-600">
                    {course.instructor || course.instructorName || 'Expert Instructor'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Clock size={16} />
                    Duration:
                  </span>
                  <span className="font-medium">{course.duration || '30 hours'}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 flex items-center gap-2">
                    <TrendingUp size={16} />
                    Level:
                  </span>
                  <span className={`font-medium px-2 py-1 rounded text-sm ${getLevelColor(course.level || 'Beginner')}`}>
                    {course.level || 'Beginner'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Language:</span>
                  <span className="font-medium">{course.language || 'English'}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Updated:</span>
                  <span className="font-medium">
                    {course.lastUpdated || course.updatedAt || new Date().getFullYear()}
                  </span>
                </div>
              </div>
              
              <a
                href={course.udemyLink || course.courseUrl || course.url || '#'}
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
              
              {/* Course Tags */}
              {(course.tags && course.tags.length > 0) && (
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
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;