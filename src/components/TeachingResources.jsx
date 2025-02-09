import React from 'react';
import PropTypes from 'prop-types';
import Chatbot from './Chatbot';

const TeachingResources = ({ resources }) => {
  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-purple-600 mb-2">Teaching Resources</h3>
      <ul className="list-disc list-inside text-gray-700">
        {resources.map((resource) => (
          <li key={resource.name}>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {resource.name}
            </a>
          </li>
        ))}
      </ul>
      <Chatbot />
    </div>
  );
};

TeachingResources.propTypes = {
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TeachingResources; 