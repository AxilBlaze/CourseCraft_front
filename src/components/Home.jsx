import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dashboard from "../assets/dashboard.png";
import aiTutor from "../assets/aiTutor.png";
import LearningPath from "../assets/LearningPath.png";
import courseCraftLogo from "../assets/CourseCraft.webp";

// Authentication Components
const AuthModal = ({ isOpen, onClose, type, onSwitchType }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(`${type} attempt:`, formData);
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-purple-900/90 to-black/90 backdrop-blur-lg p-8 rounded-2xl border border-white/20 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-6">
            <img src="/logo.png" alt="CourseCraft" className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              {type === 'signin' ? 'Welcome Back!' : 'Join CourseCraft'}
            </h2>
            <p className="text-gray-300">
              {type === 'signin' ? 'Sign in to continue your learning journey' : 'Create your account to get started'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {type === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your username"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            {type === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {type === 'signin' ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                type === 'signin' ? 'Sign In' : 'Create Account'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              {type === 'signin' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => onSwitchType(type === 'signin' ? 'register' : 'signin')}
                className="text-purple-400 hover:text-purple-300 font-semibold"
              >
                {type === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [authModal, setAuthModal] = useState({ isOpen: false, type: 'signin' });

  const handleButtonClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      navigate("/StartLearning");
    }, 500);
  };

  const openAuthModal = (type) => {
    setAuthModal({ isOpen: true, type });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, type: 'signin' });
  };

  const switchAuthType = (type) => {
    setAuthModal({ isOpen: true, type });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100, null],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Header with Auth Buttons */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex justify-between items-center px-4 py-0"
      >
        <div className="flex items-center space-x-5">
          <img src="/logo.png" alt="CourseCraft" className="w-20 h-20" />
          <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            CourseCraft
          </span>
        </div>
        
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openAuthModal('signin')}
            className="px-6 py-2 text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Sign In
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openAuthModal('register')}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            Register
          </motion.button>
      </div>
      </motion.header>

            {/* Main Content */}
      <div className="relative z-10 flex h-[calc(100vh-80px)] overflow-hidden">
        {/* Left Side - Testimonials */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="fixed left-0 top-[90px] bottom-0 w-72 bg-white/5 backdrop-blur-lg border-r border-white/10 p-4 overflow-hidden"
        >
          <div className="mb-4">
            <h2 className="text-xl font-bold text-center mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Student Success
            </h2>
            <p className="text-xs text-gray-300 text-center">
              What our learners are saying
            </p>
      </div>

          <div className="space-y-3 h-[calc(100vh-200px)] overflow-hidden">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Developer",
                avatar: "👩‍💻",
                rating: 5,
                text: "CourseCraft's AI tutor helped me transition from marketing to tech in just 6 months!",
                course: "Web Development"
              },
              {
                name: "Michael Chen",
                role: "Data Scientist",
                avatar: "👨‍🔬",
                rating: 5,
                text: "The personalized learning paths are incredible. I mastered ML faster than I ever imagined.",
                course: "Data Science"
              },
              {
                name: "Emily Rodriguez",
                role: "UX Designer",
                avatar: "👩‍🎨",
                rating: 5,
                text: "Interactive sessions and real-time feedback made learning design principles so engaging.",
                course: "UI/UX Design"
              },
              {
                name: "David Kim",
                role: "Mobile Developer",
                avatar: "👨‍💼",
                rating: 5,
                text: "Built my first app in 3 weeks! The AI tutor explained complex concepts so clearly.",
                course: "Mobile Development"
              },
              {
                name: "Lisa Thompson",
                role: "Cloud Engineer",
                avatar: "👩‍🔧",
                rating: 5,
                text: "From zero to AWS certified in 2 months. The adaptive learning is game-changing.",
                course: "Cloud Computing"
              },
              {
                name: "Alex Rivera",
                role: "Cybersecurity Analyst",
                avatar: "👨‍🛡️",
                rating: 5,
                text: "Hands-on security labs and personalized guidance helped me land my dream job.",
                course: "Cybersecurity"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="group cursor-pointer"
              >
                <div className="p-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 hover:border-white/20">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg shadow-lg flex-shrink-0">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 truncate">
                          {testimonial.name}
                        </h3>
                        <div className="flex text-yellow-400 text-xs">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-purple-400 mb-1 truncate">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-gray-300 group-hover:text-gray-200 transition-colors duration-300 line-clamp-2 leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <p className="text-xs text-purple-400 mt-1 font-medium">
                        {testimonial.course}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Testimonials Button */}
          <div className="absolute bottom-4 left-4 right-4">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              View All Reviews
            </motion.button>
          </div>
        </motion.div>

        {/* Center - Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-6 mx-72 mt-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-8"
        >


          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
          >
            CourseCraft
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl md:text-3xl font-semibold mb-4 text-gray-200"
          >
            Your Personalized AI Tutor
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Master any subject with AI-powered personalized learning paths, 
            interactive tutoring, and adaptive content designed just for you.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleButtonClick}
            className={`px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-500 transform ${
              isClicked ? "scale-90 opacity-0" : ""
            }`}
          >
            Start Learning Journey
          </motion.button>
        </motion.div>

                {/* Feature Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8"
        >
          {[
            { 
              name: "Dashboard", 
              path: "/dashboard", 
              icon: dashboard,
              description: "Track your progress and achievements",
              gradient: "from-blue-500 to-purple-600"
            },
            { 
              name: "AI Tutor", 
              path: "/AITutor", 
              icon: aiTutor,
              description: "Get instant help from your AI assistant",
              gradient: "from-purple-500 to-pink-600"
            },
            { 
              name: "Learning Path", 
              path: "/LearningPath", 
              icon: LearningPath,
              description: "Follow personalized learning routes",
              gradient: "from-pink-500 to-red-600"
            }
          ].map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 + index * 0.2 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group"
            >
              <NavLink
                to={item.path}
                className="block p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-500"
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 p-3 bg-gradient-to-r ${item.gradient} rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
            <img 
              src={item.icon} 
              alt={item.name} 
                      className="w-full h-full object-contain filter brightness-0 invert" 
            />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors duration-300">
              {item.name}
            </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
          </NavLink>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          {[
            { number: "10K+", label: "Students" },
            { number: "500+", label: "Courses" },
            { number: "98%", label: "Success" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 2.6 + index * 0.2, type: "spring" }}
              className="text-center p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
            >
              <div className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
        </div>

        {/* Right Side - Course Categories */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="fixed right-0 top-[90px] bottom-0 w-72 bg-white/5 backdrop-blur-lg border-l border-white/10 p-4 overflow-hidden"
        >
          <div className="mb-4">
            <h2 className="text-xl font-bold text-center mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Explore Courses
            </h2>
            <p className="text-xs text-gray-300 text-center">
              Discover learning paths tailored for you
            </p>
          </div>

          <div className="space-y-3 h-[calc(100vh-200px)] overflow-hidden">
            {[
              {
                icon: "📊",
                title: "Data Science",
                description: "Analytics, ML & Statistics",
                gradient: "from-blue-500 to-cyan-500",
                courses: "120+ Courses"
              },
              {
                icon: "💻",
                title: "Web Development",
                description: "Frontend & Backend",
                gradient: "from-green-500 to-emerald-500",
                courses: "85+ Courses"
              },
              {
                icon: "🤖",
                title: "AI & Machine Learning",
                description: "Neural Networks & Deep Learning",
                gradient: "from-purple-500 to-violet-500",
                courses: "95+ Courses"
              },
              {
                icon: "🏆",
                title: "Competitive Programming",
                description: "Algorithms & Problem Solving",
                gradient: "from-orange-500 to-red-500",
                courses: "60+ Courses"
              },
              {
                icon: "📱",
                title: "Mobile Development",
                description: "iOS, Android & Cross-platform",
                gradient: "from-pink-500 to-rose-500",
                courses: "70+ Courses"
              },
              {
                icon: "☁️",
                title: "Cloud Computing",
                description: "AWS, Azure & DevOps",
                gradient: "from-indigo-500 to-blue-500",
                courses: "55+ Courses"
              },
              {
                icon: "🎨",
                title: "UI/UX Design",
                description: "Design Thinking & Prototyping",
                gradient: "from-teal-500 to-cyan-500",
                courses: "40+ Courses"
              },
              {
                icon: "🔐",
                title: "Cybersecurity",
                description: "Ethical Hacking & Security",
                gradient: "from-red-500 to-pink-500",
                courses: "35+ Courses"
              }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="group cursor-pointer"
              >
                <div className="p-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 hover:border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${category.gradient} flex items-center justify-center text-lg shadow-lg`}>
                      {category.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 truncate">
                        {category.title}
                      </h3>
                      <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 truncate">
                        {category.description}
                      </p>
                      <p className="text-xs text-purple-400 mt-0.5">
                        {category.courses}
                      </p>
                    </div>
                    <div className="text-white/50 group-hover:text-white/80 transition-colors duration-300 text-sm">
                      →
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Courses Button */}
          <div className="absolute bottom-4 left-4 right-4">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              View All Courses
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        type={authModal.type}
        onSwitchType={switchAuthType}
      />
    </div>
  );
};

export default Home;
