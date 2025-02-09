import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Rewards = ({ rewards }) => {
  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-purple-600 mb-2">Your Rewards</h3>
      <motion.ul
        className="list-disc list-inside text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {rewards.length > 0 ? (
          rewards.map((reward, index) => (
            <motion.li
              key={index}
              className="flex items-center mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <span className="text-green-500 text-xl mr-2">🎉</span>
              {reward}
            </motion.li>
          ))
        ) : (
          <li className="text-gray-500">No rewards yet!</li>
        )}
      </motion.ul>
    </div>
  );
};

Rewards.propTypes = {
  rewards: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function GamifiedLearning({ onRestart }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [rewards, setRewards] = useState([]);

  const questions = [
    {
      question: "What is React?",
      options: ["A framework", "A library", "A database", "A language"],
      answer: "A library",
    },
    {
      question: "What is JSX?",
      options: ["A syntax extension", "A component", "A hook", "A state"],
      answer: "A syntax extension",
    },
  ];

  const handleAnswer = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
      setRewards([...rewards, `🏆 Reward for Question ${currentQuestion + 1}`]);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setProgress(((nextQuestion + 1) / questions.length) * 100);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 text-center shadow-xl bg-white rounded-lg">
        {completed ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-yellow-500">🎉 Quiz Completed!</h2>
            <p className="text-lg mt-2">Your score: {score} / {questions.length}</p>
            <Rewards rewards={rewards} />
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={onRestart}>Restart</button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h2>
            <div className="grid grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button 
                  key={index} 
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" 
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-4 w-full bg-gray-300 rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
