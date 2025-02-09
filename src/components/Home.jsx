import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FlipBook from "react-pageflip"; 
import dashboard from "../assets/dashboard.png";
import aiTutor from "../assets/aiTutor.png";
import LearningPath from "../assets/LearningPath.png";
import courseCraftLogo from "../assets/CourseCraft.webp"; // Import the logo

// When making API calls, use the environment variable like this:
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Example API call:
const fetchData = async () => {
  try {
    const response = await fetch(`${backendUrl}/api/your-endpoint`);
    const data = await response.json();
    // Handle the data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const Home = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [showHome, setShowHome] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      navigate("/StartLearning");
    }, 500); // Delay for transition effect
  };

  useEffect(() => {
    setTimeout(() => setShowHome(true), 5000); // Flipbook animation duration
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-black text-white flex flex-col items-center justify-center p-6 relative">
      {/* Bright Light Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[40rem] h-[40rem] bg-white rounded-full opacity-50 blur-[10rem]"></div>
      </div>

      {/* Violet Shading on Right Edge */}
      <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-purple-700 opacity-60 blur-[8rem]"></div>
      
      {/* CourseCraft Title & Logo */}
      <div className="flex flex-col items-center mb-6">
        <img src={courseCraftLogo} alt="CourseCraft" className="w-24 h-24 md:w-32 md:h-32 mb-2" />
        <h1 className="text-4xl font-extrabold text-white">CourseCraft</h1>
      </div>

      {/* Main Header */}
      <div className="max-w-6xl text-center mt-4">
        <h1 className="text-4xl font-bold">Your personalized AI tutor for all domains</h1>
        <p className="text-xl text-white-200 font-bold mt-2">Explore and start using our platform</p>
        
        {/* Start Learning Button */}
        <button
          onClick={handleButtonClick}
          className={`mt-6 px-6 py-2 rounded-full text-white font-medium border border-white transition-all duration-500 transform ${
            isClicked ? "scale-90 opacity-0" : "hover:bg-white hover:text-black hover:scale-105"
          } bg-black`}
        >
          Start Learning
        </button>
      </div>

      {/* Large Clickable Icons */}
      <div className="mt-10 flex space-x-6">
        {[
          { name: "Dashboard", path: "/dashboard", icon: dashboard },
          { name: "AI Tutor", path: "/AITutor", icon: aiTutor },
          { name: "Learning Path", path: "/LearningPath", icon: LearningPath }
        ].map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="group flex flex-col items-center bg-black p-6 rounded-xl text-center 
                      transition-all duration-500 ease-in-out hover:bg-gray-800 w-40 shadow-lg
                      hover:shadow-[0px_0px_15px_3px_rgba(255,255,255,0.6)] transform hover:scale-105 active:scale-95"
          >
            <img 
              src={item.icon} 
              alt={item.name} 
              className="mb-2 w-12 h-12 transition-transform duration-500 group-hover:scale-110" 
            />
            <h3 className="text-lg font-bold text-white transition-colors duration-500 group-hover:text-blue-400">
              {item.name}
            </h3>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Home;
