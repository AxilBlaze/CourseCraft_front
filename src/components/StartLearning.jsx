import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SkillSelection from "./SkillSelection";
import FlowChart from "./FlowChart";
import Rewards from "./Rewards";
import TeachingResources from "./TeachingResources";
import PerformanceDashboard from './PerformanceDashboard';

const Tooltip = ({ content, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute left-0 right-0 mt-2 p-4 bg-gray-900/95 backdrop-blur-sm 
                     rounded-xl border border-white/10 shadow-xl z-10"
        >
          <div className="max-w-2xl space-y-4">
            <p className="text-gray-300 text-sm">
              {content.description}
            </p>
            
            {content.resources && (
              <div>
                <h4 className="text-white text-sm font-semibold mb-2">
                  Resources:
                </h4>
                <ul className="space-y-1">
                  {content.resources.map((resource) => (
                    <li key={resource.name}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 text-sm 
                                 transition-colors inline-flex items-center gap-1"
                      >
                        {resource.name}
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SubtopicTooltip = ({ content, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute z-20 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64
                     bg-gray-900/95 backdrop-blur-sm rounded-lg border border-white/10 shadow-xl p-4"
        >
          <p className="text-sm text-gray-300 mb-2">{content.description}</p>
          {content.resources && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-purple-400">Learn more:</p>
              <div className="flex flex-col gap-1">
                {content.resources.map((resource) => (
                  <a
                    key={resource.url}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-purple-300 hover:text-purple-200 flex items-center gap-1"
                  >
                    {resource.name}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const StartLearning = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [rewards, setRewards] = useState([]);

  const studentPurposes = [
    {
      icon: "📚",
      title: "Learn a New Skill",
      description: "Gain knowledge in a specific subject or field.",
    },
    {
      icon: "🎯",
      title: "Prepare for an Exam",
      description: "Study for school, university, or certification exams.",
    },
    {
      icon: "🚀",
      title: "Advance My Career",
      description: "Improve skills for job opportunities or promotions.",
    },
    {
      icon: "🏆",
      title: "Gamified Learning Experience",
      description: "Enjoy interactive and engaging learning with achievements.",
      rewards: [],
    },
  ];

  const teacherPurposes = [
    {
      icon: "🏫",
      title: "Enhance My Teaching Methods",
      description: "Use AI-driven tools to improve my teaching.",
      resources: [
        { name: "Edutopia", url: "https://www.edutopia.org/" },
        { name: "Khan Academy", url: "https://www.khanacademy.org/" },
        { name: "Coursera for Educators", url: "https://www.coursera.org/educators" },
        { name: "Teaching Strategies", url: "https://www.teachingstrategies.com/" },
      ],
    },
    {
      icon: "👨‍🏫",
      title: "Create & Share Courses",
      description: "Design learning materials and track student progress.",
    },
    {
      icon: "📊",
      title: "Monitor Student Performance",
      description: "Get insights into student learning behavior.",
      studentData: [
        { name: "Purnima", score: 85 },
        { name: "Sandeep", score: 90 },
        { name: "Aranya", score: 78 },
        { name: "Abhay", score: 92 },
      ],
    },
   
  ];

  const RoleSelection = () => (
    <div className="flex flex-col items-center space-y-8">
      <h2 className="text-3xl font-bold text-white mb-8">Choose Your Role</h2>
      <div className="flex gap-8">
        {["Student", "Teacher"].map((role) => (
          <motion.button
            key={role}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedRole(role.toLowerCase())}
            className="w-64 h-64 rounded-2xl bg-white/10 backdrop-blur-lg hover:bg-white/20 
                       flex flex-col items-center justify-center p-6 transition-all duration-300"
          >
            <span className="text-5xl mb-4">
              {role === "Student" ? "👨‍🎓" : "👨‍🏫"}
            </span>
            <h3 className="text-2xl font-semibold text-white">{role}</h3>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const LearningPathContent = () => {
    const [hoveredTopic, setHoveredTopic] = useState(null);
    const [expandedSection, setExpandedSection] = useState(null);
    const [expandedTopics, setExpandedTopics] = useState({});
    const [hoveredSubtopic, setHoveredSubtopic] = useState(null);

    // Fix the learningPaths structure
    const learningPaths = {
      sections: [
        {
          title: "Fundamentals",
          content: {
            HTML: {
              description: "HTML is the standard markup language for creating web pages and web applications.",
              resources: [
                { name: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                { name: "W3Schools", url: "https://www.w3schools.com/html/" }
              ],
              topics: [
                {
                  title: "Syntax",
                  description: "Understanding the basic structure and rules of HTML syntax.",
                  resources: [
                    { name: "MDN Syntax Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" }
                  ]
                },
                {
                  title: "Forms",
                  description: "Forms allow users to input data and interact with web applications.",
                  resources: [
                    { name: "MDN Forms Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms" }
                  ]
                },
                {
                  title: "Basic Tags",
                  description: "Get familiar with the basic HTML tags",
                  resources: [
                    { name: "MDN - HTML elements reference", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element" },
                    { name: "W3Schools - HTML elements reference", url: "https://www.w3schools.com/tags/default.asp" },
                    { name: "Elated - First 10 HTML tags", url: "https://www.elated.com/first-10-html-tags/" }
                  ]
                }
              ]
            },
            CSS: {
              description: "CSS is a style sheet language used for describing the presentation of a document written in HTML.",
              resources: [
                { name: "CSS-Tricks", url: "https://css-tricks.com" },
                { name: "MDN CSS Guide", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" }
              ],
              topics: [
                {
                  title: "Syntax",
                  description: "Understanding CSS syntax and rules",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax"
                },
                {
                  title: "Selectors",
                  description: "Selectors are patterns used to select elements in HTML or XML documents.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors"
                },
                {
                  title: "Specificity",
                  description: "Specificity is a rule used in CSS to determine which style rules are applied to an element.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity"
                },
                {
                  title: "Pseudo Selectors",
                  description: "Pseudo-classes are used to define a special state of an element.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes"
                },
                {
                  title: "Box Model",
                  description: "The CSS box model is a fundamental concept in CSS that defines the layout of elements on a web page.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing"
                },
                {
                  title: "Margin Collapsing",
                  description: "Margin collapsing occurs when adjacent margins collapse into a single margin.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing"
                },
                {
                  title: "Colors",
                  description: "CSS color properties define how colors are applied to HTML elements.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/color"
                },
                {
                  title: "Calc",
                  description: "The calc() function is used to perform calculations to determine CSS property values.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/calc"
                },
                {
                  title: "Layout",
                  description: "CSS layout techniques include block, inline, flex, grid, and CSS frameworks.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook"
                },
                {
                  title: "Flex",
                  description: "Flexbox is a layout model in CSS that allows for efficient layout of items.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout"
                },
                {
                  title: "Grid",
                  description: "CSS Grid Layout is a two-dimensional layout system in CSS.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout"
                },
                {
                  title: "Transforms",
                  description: "CSS transforms allow elements to be rotated, scaled, translated, or skewed.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/transform"
                },
                {
                  title: "Animations",
                  description: "CSS animations allow for smooth transitions between styles.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/animation"
                },
                {
                  title: "Responsive Design",
                  description: "Responsive design ensures that web pages look good on all devices.",
                  url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design"
                },
                {
                  title: "Media Queries",
                  description: "Media queries allow content to adapt to different screen sizes and orientations.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries"
                },
                {
                  title: "Relative Units",
                  description: "Relative units are used to size elements based on the size of the parent element.",
                  url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units"
                },
                {
                  title: "Images",
                  description: "CSS background images are used to add visual interest to web pages.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Backgrounds_and_Borders"
                },
                {
                  title: "CSS Variables",
                  description: "CSS variables are used to store values that can be reused throughout a document.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties"
                }
              ]
            },
            JavaScript: {
              description: "JavaScript is a programming language that enables interactive web pages.",
              resources: [
                { name: "JavaScript.info", url: "https://javascript.info" },
                { name: "MDN JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
              ],
              topics: [
                {
                  title: "Syntax",
                  description: "Basic rules and structure of JavaScript code.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types"
                },
                {
                  title: "Spread",
                  description: "The spread operator (...) expands elements in an iterable.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax"
                },
                {
                  title: "Destructuring",
                  description: "A syntax for unpacking values from arrays or objects.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment"
                },
                {
                  title: "DOM",
                  description: "The Document Object Model represents the page structure.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model"
                },
                {
                  title: "DOM Manipulation",
                  description: "Methods to dynamically update HTML and CSS using JavaScript.",
                  url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents"
                },
                {
                  title: "Objects",
                  description: "JavaScript objects store collections of key-value pairs.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object"
                },
                {
                  title: "Prototype",
                  description: "The mechanism by which JavaScript objects inherit features.",
                  url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance"
                },
                {
                  title: "Classes",
                  description: "ES6 feature for defining reusable object templates.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes"
                },
                {
                  title: "Regex",
                  description: "Regular expressions for pattern matching in strings.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions"
                },
                {
                  title: "Promises",
                  description: "Asynchronous code handling with resolve/reject mechanisms.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
                },
                {
                  title: "Fetch",
                  description: "API for making network requests.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
                },
                {
                  title: "Web Applications",
                  description: "Building interactive and dynamic web apps using JavaScript.",
                  url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs"
                },
                {
                  title: "Modules",
                  description: "JavaScript module system for organizing code.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules"
                },
                {
                  title: "Intl",
                  description: "Internationalization API for formatting dates, numbers, and strings.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl"
                },
                {
                  title: "Canvas",
                  description: "Rendering graphics and animations with the HTML5 canvas element.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API"
                },
                {
                  title: "Events",
                  description: "Handling user interactions such as clicks and keypresses.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/Events"
                },
                {
                  title: "Async Programming",
                  description: "Handling asynchronous operations using callbacks, promises, and async/await.",
                  url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous"
                }
              ]
            },
            "Accessibility": {
              description: "Accessibility is the practice of making your websites usable by everyone, including people with disabilities.",
              resources: [
                { name: "MDN Accessibility", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility" },
                { name: "WebAIM - Web Accessibility", url: "https://webaim.org/" },
                { name: "W3C Accessibility Guidelines (WCAG)", url: "https://www.w3.org/WAI/standards-guidelines/wcag/" }
              ],
              topics: [
                {
                  name: "The Why of Accessibility",
                  description: "Understanding why accessibility matters and its impact on users.",
                  url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/"
                },
                {
                  name: "Screen Readers",
                  description: "Assistive technologies that read aloud web content for visually impaired users.",
                  url: "https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics#screen_readers"
                },
                {
                  name: "Accessibility Tree",
                  description: "A browser-generated representation of the DOM for assistive technologies.",
                  url: "https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_Tree"
                },
                {
                  name: "ARIA",
                  description: "Accessible Rich Internet Applications (ARIA) provides extra information to assistive technologies.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA"
                },
                {
                  name: "Accessible HTML",
                  description: "Using semantic HTML elements to improve accessibility.",
                  url: "https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML"
                },
                {
                  name: "Alt Text",
                  description: "Text descriptions for images to help visually impaired users.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#alt"
                },
                {
                  name: "Accessibility CSS",
                  description: "CSS techniques to enhance accessibility, such as contrast and focus indicators.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/CSS_and_JavaScript"
                },
                {
                  name: "Accessibility Forms",
                  description: "Best practices for making forms accessible, including labels and validation messages.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Forms"
                },
                {
                  name: "UI States",
                  description: "Ensuring that dynamic UI states are communicated to assistive technologies.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live"
                },
                {
                  name: "Keyboard Accessibility",
                  description: "Ensuring that users can navigate and interact using only a keyboard.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets"
                },
                {
                  name: "Accessible Colors",
                  description: "Using color contrast and alternative indicators for color-blind users.",
                  url: "https://www.w3.org/WAI/test-evaluate/contrast/"
                },
                {
                  name: "Audits",
                  description: "Testing accessibility using tools like Lighthouse and WAVE.",
                  url: "https://developers.google.com/web/tools/lighthouse/audits/accessibility"
                }
              ]
            }
          }
        },
        {
          title: "Browser",
          content: {
            BrowserAPIs: {
              description: "The browser environment provides APIs and mechanisms for executing JavaScript and rendering web pages.",
              resources: [
                { name: "JavaScript.info - Browser", url: "https://javascript.info/browser-environment" },
                { name: "MDN Web Docs - Browser APIs", url: "https://developer.mozilla.org/en-US/docs/Web/API" }
              ],
              topics: [
                {
                  title: "DOM",
                  description: "The Document Object Model represents the structure of a webpage and allows JavaScript to manipulate it.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model"
                },
                {
                  title: "BOM",
                  description: "The Browser Object Model provides additional objects for interacting with the browser (e.g., window, navigator).",
                  url: "https://developer.mozilla.org/en-US/docs/Glossary/BOM"
                },
                {
                  title: "Window Object",
                  description: "The global object representing the browser window, providing methods for opening, resizing, and controlling windows.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/Window"
                },
                {
                  title: "Navigator",
                  description: "Provides information about the user's browser and device.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator"
                },
                {
                  title: "Location",
                  description: "Represents the URL of the current page and allows navigation.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/Location"
                },
                {
                  title: "History API",
                  description: "Allows manipulation of the browser's session history.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/History"
                },
                {
                  title: "Cookies",
                  description: "Small pieces of data stored by the browser for session tracking and authentication.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies"
                },
                {
                  title: "LocalStorage & SessionStorage",
                  description: "Client-side storage solutions for persisting data across sessions.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
                },
                {
                  title: "Fetch API",
                  description: "Used for making network requests and handling responses asynchronously.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
                },
                {
                  title: "WebSockets",
                  description: "A protocol for two-way real-time communication between a browser and a server.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API"
                },
                {
                  title: "Service Workers",
                  description: "Background scripts that enable features like push notifications and offline caching.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API"
                },
                {
                  title: "Performance API",
                  description: "Tools for measuring and optimizing website performance.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/Performance_API"
                },
                {
                  title: "WebRTC",
                  description: "Enables real-time audio, video, and data sharing directly between browsers.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API"
                },
                {
                  title: "Push Notifications",
                  description: "Allows web apps to send notifications even when the page is not open.",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/Push_API"
                }
              ]
            }
          }
        },
        
        {
          title: "Security",
          content: {
            Security: {
              description: "Security is the practice of making your websites secure.",
              resources: [
                { name: "MDN Security", url: "https://developer.mozilla.org/en-US/docs/Web/Security" }
              ],
              topics: ["HTTPS", "Browser Sandbox", "OWASP", "Cross-Site Scripting", "Clickjacking", "Content Security Policy"]
            }
          }
        },
        {
          title: "Audits",
          content: {
            Audits: {
              description: "Audits are a way to audit your websites.",
              resources: [
                { name: "MDN Audits", url: "https://developer.mozilla.org/en-US/docs/Web/Audits" }
              ],
              topics: ["Performance Budgets", "Lighthouse", "Chrome DevTools"]
            }
          }
        },
        {
          title: "Build Tools",
          content: {
            BuildTools: {
              description: "Build tools are a way to build your websites.",
              resources: [
                { name: "MDN Build Tools", url: "https://developer.mozilla.org/en-US/docs/Web/Build_Tools" }
              ],
              topics: ["Package Managers", "NPM", "Yarn", "Module Bundlers", "Rollup", "Webpack", "Parcel", "Snowpack", "Prettier", "ESLint", "Task Runners", "NPM Scripts", "Transpilers", "Babel", "Typescript", "CSS Pre-processors", "SASS", "postCSS", "Node.js"]
            }
          }
        },
        
        {
          title: "Testing",
          content: {
            Testing: {
              description: "Testing is a way to test your websites.",
              resources: [
                { name: "MDN Testing", url: "https://developer.mozilla.org/en-US/docs/Web/Testing" }
              ],
              topics: ["Testing Methodologies", "Unit Testing", "Integration Testing", "Acceptance Testing", "Performance Testing", "Black Box Testing", "White Box Testing", "Manual Testing", "A/B Testing", "Continuous Integration", "Automated Testing", "Usability Testing", "Ava", "Mocha", "Karma", "Test Runners", "Jasmine", "Cypress"]
            }
          }
        },
        {
          title: "Team Collaboration",
          content: {
            TeamCollaboration: {
              description: "Team collaboration is a way to collaborate with your team.",
              resources: [
                { name: "MDN Team Collaboration", url: "https://developer.mozilla.org/en-US/docs/Web/Team_Collaboration" }
              ],
              topics: ["Git", "GitHub", "GitLab", "Bitbucket"]
            }
          }
        },
        
        {
          title: "Design",
          content: {
            Design: {
              description: "Design is a way to design your websites.",
              resources: [
                { name: "MDN Design", url: "https://developer.mozilla.org/en-US/docs/Web/Design" }
              ],
              topics: ["Color Theory", "Color Wheel", "Typography", "Font Size", "Line Spacing", "C.R.A.P", "Contrast", "Repetition", "Alignment", "Proximity", "Consistency", "Error Handling", "Accessibility", "Loading", "Mobile First", "Hit Targets", "Material Designs"]
            }
          }
        },
        
        
        {
          title: "Databases and Servers",
          content: {
            Databases: {
              description: "Databases are a way to store your data.",
              resources: [
                { name: "MDN Databases", url: "https://developer.mozilla.org/en-US/docs/Web/Databases" }
              ],
              topics: ["SQL", "MySQL", "MongoDB", "Redis", "PostgreSQL", "Data Modeling", "ER diagrams", "Keys", "Data Integrity", "Indexing", "Normal Forms", "Transactions", "ACID", "Serializability", "Locks", "DeadLocks", "IBM Cloud Object Storage", "IBM Cloudant", "Precedence graph"]
            },
            Servers: {
              description: "Servers are a way to serve your data.",
              resources: [
                { name: "MDN Servers", url: "https://developer.mozilla.org/en-US/docs/Web/Servers" }
              ],
              topics: ["Architectural Models", "Client-Server", "Proxy Server", "Docker", "Peer-to-Peer", "Middleware", "Request-Reply Protocol", "TCP", "Rest API", "CRUD", "GraphQL", "Express", "UDP", "GNU/Linux", "SSH"]
            }
          }
        },
        {
          title: "Web Components",
          content: {
            webComponents: {
              description: "Web Components are a set of web platform APIs that allow you to create reusable custom elements.",
              resources: [
                { name: "WebComponents.org", url: "https://www.webcomponents.org" },
                { name: "MDN Web Components", url: "https://developer.mozilla.org/en-US/docs/Web/Web_Components" }
              ],
              topics: [
                "Custom Elements",
                "HTML Templates",
                "Shadow DOM",
                "Shadow Parts",
                "Slots",
                "Constructable Stylesheets",
                "Form Participation"
              ]
            }
          }
        }
      ]
    };

    

    const getContent = () => {
      if (selectedRole === "student") {
        switch (selectedPurpose.title) {
          case "Learn a New Skill":
            return {
              title: "Learn a New Skill",
              description: "Choose your learning path",
              sections: learningPaths.sections
            };
          case "Prepare for an Exam":
            return {
              topics: [
                { title: "Practice Tests", icon: "📝" },
                { title: "Study Materials", icon: "📚" },
                { title: "Mock Exams", icon: "✍️" }
              ],
              description: "Prepare effectively for your upcoming exams"
            };
          case "Advance My Career":
            return {
              title: "Select Skills to Advance Your Career",
              description: "Choose the skills you want to gain:",
              skills: [
                { name: "JavaScript", selected: false },
                { name: "React", selected: false },
                { name: "Node.js", selected: false },
                { name: "CSS", selected: false },
                { name: "Python", selected: false },
                // Add more skills as needed
              ],
            };
          case "Gamified Learning Experience":
            return {
              title: "Gamified Learning Experience",
              description: "Enjoy interactive and engaging learning with achievements.",
              rewards: [],
            };
          // Add cases for other purposes...
          default:
            return {
              topics: [],
              description: "Select a learning path to begin"
            };
        }
      } else if (selectedRole === "teacher") {
        switch (selectedPurpose.title) {
          case "Create & Share Courses":
            return {
              topics: [
                { title: "Course Builder", icon: "🏗️" },
                { title: "Content Library", icon: "📚" },
                { title: "Assessment Tools", icon: "📊" }
              ],
              description: "Create engaging courses for your students"
            };
          case "Enhance My Teaching Methods":
            return {
              title: "Enhance My Teaching Methods",
              description: "Use AI-driven tools to improve your teaching.",
              resources: selectedPurpose.resources
            };
          case "Monitor Student Performance":
            return {
              title: "Monitor Student Performance",
              description: "Get insights into student learning behavior.",
              studentData: selectedPurpose.studentData,
            };
          // Add other teacher purpose cases...
          default:
            return {
              topics: [],
              description: "Select a teaching tool to begin"
            };
        }
      }
      return {
        topics: [],
        description: "Select a learning path to begin"
      };
    };

    const content = getContent();

    // Add function to toggle topic expansion
    const toggleTopicExpansion = (topicKey) => {
      setExpandedTopics(prev => ({
        ...prev,
        [topicKey]: !prev[topicKey]
      }));
    };

    // Update the topic rendering to include links
    const renderTopic = (topic) => (
      <a
        href={topic.url}
        target="_blank"
        rel="noopener noreferrer"
        key={topic.title || topic}
        className="bg-white/5 px-3 py-1 rounded-full text-sm text-gray-300 
                   hover:bg-white/10 transition-colors relative inline-flex items-center gap-1"
      >
        {topic.title || topic}
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    );

    const handleSkillsSelected = (selectedSkills) => {
      setSelectedSkills(selectedSkills); // Store selected skills in state
      // Logic to draw the flowchart based on selected skills
    };

    const completeModule = (moduleName) => {
      setSelectedSkills((prev) => [...prev, moduleName]);
      // Add a reward for completing the module
      setRewards((prev) => [...prev, `Completed ${moduleName}`]);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl mx-auto"
      >
        <button
          onClick={() => setSelectedPurpose(null)}
          className="mb-8 text-purple-400 hover:text-purple-300 flex items-center gap-2"
        >
          ← Back to purposes
        </button>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            {content.title || selectedPurpose.title}
          </h2>
          <p className="text-gray-300 text-lg">
            {content.description}
          </p>
        </div>

        {content.skills ? (
          <SkillSelection skills={content.skills} onSkillsSelected={handleSkillsSelected} />
        ) : content.sections && content.sections.length > 0 ? (
          content.sections.map((section, index) => (
            <div key={section.title} className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6 flex justify-between items-center">
                {section.title}
                {Object.keys(section.content).length > 3 && (
                  <button
                    onClick={() => setExpandedSection(expandedSection === section.title ? null : section.title)}
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    {expandedSection === section.title ? 'Show Less' : `+${Object.keys(section.content).length - 3} More`}
                  </button>
                )}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(section.content)
                  .slice(0, expandedSection === section.title ? undefined : 3)
                  .map(([key, item]) => (
                    <motion.div
                      key={key}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative bg-white/10 backdrop-blur-lg rounded-xl p-6
                               hover:bg-white/20 transition-all duration-300 border border-white/10"
                      onMouseEnter={() => setHoveredTopic(key)}
                      onMouseLeave={() => setHoveredTopic(null)}
                    >
                      <h4 className="text-xl font-semibold text-white mb-4">{key}</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.topics
                          .slice(0, expandedTopics[key] ? undefined : 4)
                          .map((topic) => renderTopic(topic))}
                        {item.topics.length > 4 && (
                          <button
                            onClick={() => toggleTopicExpansion(key)}
                            className="text-sm text-purple-400 hover:text-purple-300"
                          >
                            {expandedTopics[key] 
                              ? 'Show Less' 
                              : `+${item.topics.length - 4} more`}
                          </button>
                        )}
                      </div>
                      <Tooltip
                        content={item}
                        isVisible={hoveredTopic === key}
                      />
                    </motion.div>
                  ))}
              </div>
              {index < content.sections.length - 1 && (
                <div className="my-8 border-b border-white/10" />
              )}
            </div>
          ))
        ) : content.topics && content.topics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {content.topics.map((topic) => (
              <motion.div
                key={topic.title}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 cursor-pointer
                           hover:bg-white/20 transition-all duration-300 border border-white/10"
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl mb-4">{topic.icon}</span>
                  <h3 className="text-xl font-semibold text-white mb-2">{topic.title}</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 
                             rounded-lg text-sm font-medium text-white mt-4"
                  >
                    Start Learning
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-300">
         
          </div>
        )}

        {content.title === "Gamified Learning Experience" && (
          <Rewards rewards={content.rewards} />
        )}

        {content.title === "Enhance My Teaching Methods" && (
          <TeachingResources resources={content.resources} />
        )}

        {content.title === "Monitor Student Performance" && (
          <PerformanceDashboard studentData={content.studentData} />
        )}
      </motion.div>
    );
  };

  const PurposeSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <button
        onClick={() => setSelectedRole(null)}
        className="mb-8 text-purple-400 hover:text-purple-300 flex items-center gap-2"
      >
        ← Back to role selection
      </button>
      
      <h2 className="text-3xl font-bold text-white mb-8">
        Why do you want to join us?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(selectedRole === "student" ? studentPurposes : teacherPurposes).map((purpose) => (
          <motion.button
            key={purpose.title}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedPurpose(purpose)}
            className="bg-white/10 backdrop-blur-lg hover:bg-white/20 rounded-xl p-6 text-left
                       transition-all duration-300 border border-white/10"
          >
            <span className="text-4xl mb-4 block">{purpose.icon}</span>
            <h3 className="text-xl font-semibold text-white mb-2">
              {purpose.title}
            </h3>
            <p className="text-gray-300">{purpose.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        {selectedPurpose ? (
          <LearningPathContent />
        ) : selectedRole ? (
          <PurposeSelection />
        ) : (
          <RoleSelection />
        )}
      </div>
    </div>
  );
};

export default StartLearning;