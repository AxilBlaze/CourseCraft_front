import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SkillSelection = ({ skills, onSkillsSelected }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = () => {
    onSkillsSelected(selectedSkills);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-4">Select Skills</h3>
      <div className="flex flex-col space-y-2">
        {skills.map((skill) => (
          <label key={skill.name} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedSkills.includes(skill.name)}
              onChange={() => toggleSkill(skill.name)}
            />
            <span className="ml-2 text-gray-300">{skill.name}</span>
          </label>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-purple-500 text-white rounded"
      >
        Show Learning Path
      </button>
    </div>
  );
};

SkillSelection.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      selected: PropTypes.bool,
    })
  ).isRequired,
  onSkillsSelected: PropTypes.func.isRequired,
};

export default SkillSelection; 