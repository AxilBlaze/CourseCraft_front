import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const pages = [
  "Personalized Learning Paths",
  "Real-time Adaptation to Performance",
  "Enhanced Engagement and Motivation",
  "Efficient Use of Study Time",
  "Data-Driven Insights for Improvement"
];

export default function AdaptiveLearning() {
  const [currentPage, setCurrentPage] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setShowDashboard(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700">
      {!showDashboard ? (
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, rotateY: -90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 90 }}
          transition={{ duration: 0.8 }}
          className="w-80 h-56 bg-white shadow-lg rounded-lg p-6 flex items-center justify-center text-center text-lg"
        >
          {pages[currentPage]}
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center space-y-6"
        >
          <h1 className="text-2xl font-bold">Welcome to Your AI Learning Dashboard</h1>
          <Button onClick={() => alert("Navigating to AI Tutor...")}>Go to AI Tutor</Button>
          <Button onClick={() => alert("Navigating to Dashboard...")}>Go to Dashboard</Button>
        </motion.div>
      )}

      {!showDashboard && (
        <Button onClick={handleNextPage} className="mt-6">Next Page</Button>
      )}
    </div>
  );
}
