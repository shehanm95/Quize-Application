export interface QuizQuestion {
  id?: number | string;
  question: string;
  options: string[];
  correctIndex: number; // 0, 1, 2, or 3
  explanation?: string;
}

export const SAMPLE_QUIZ_JSON: QuizQuestion[] = [
  {
    id: 1,
    question: "Which React hook is primarily used to declare and manage local component state?",
    options: [
      "useEffect",
      "useState",
      "useContext",
      "useMemo"
    ],
    correctIndex: 1,
    explanation: "useState is the core hook in functional components to manage local reactive state and trigger re-renders upon updates."
  },
  {
    id: 2,
    question: "What is the primary architectural advantage of using Vite over older bundlers during development?",
    options: [
      "Ultra-fast dev server powered by native browser ES Modules (ESM)",
      "It acts as a built-in SQL database engine",
      "It only compiles HTML without JavaScript execution",
      "It eliminates the need for styling files"
    ],
    correctIndex: 0,
    explanation: "Vite serves source code over native ESM, avoiding full-bundle overhead and enabling instant Hot Module Replacement (HMR)."
  },
  {
    id: 3,
    question: "In React Router, which router component connects the UI with the standard HTML5 History API?",
    options: [
      "HashRouter",
      "BrowserRouter",
      "StaticRouter",
      "MemoryRouter"
    ],
    correctIndex: 1,
    explanation: "BrowserRouter utilizes HTML5 history methods (pushState, replaceState) to keep the UI synchronized with the URL without page reloads."
  },
  {
    id: 4,
    question: "Which of the following is considered a non-primitive (reference) data type in JavaScript?",
    options: [
      "String",
      "Boolean",
      "Object",
      "Number"
    ],
    correctIndex: 2,
    explanation: "Objects (including Arrays and Functions) are reference types in JavaScript, whereas String, Number, and Boolean are primitives."
  },
  {
    id: 5,
    question: "In CSS Flexbox with row direction, which property aligns flex items along the horizontal main axis?",
    options: [
      "align-items: center;",
      "justify-content: center;",
      "text-align: middle;",
      "align-content: center;"
    ],
    correctIndex: 1,
    explanation: "justify-content aligns children along the main axis (horizontal in flex-direction: row), while align-items aligns along the cross axis."
  },
  {
    id: 6,
    question: "What is the key benefit TypeScript provides on top of standard JavaScript?",
    options: [
      "Compile-time static type checking and enhanced IDE autocompletion",
      "Automatic server-side database configuration",
      "Hosting websites offline without a network connection",
      "Eliminating the need to write CSS rules"
    ],
    correctIndex: 0,
    explanation: "TypeScript introduces a static type system that detects syntax and logical errors at compile time before execution."
  },
  {
    id: 7,
    question: "Which standard HTML5 semantic element is used to embed video content natively?",
    options: [
      "<media>",
      "<movie>",
      "<video>",
      "<player>"
    ],
    correctIndex: 2,
    explanation: "The <video> tag is the native HTML5 standard for video streaming and media playback without external plugins."
  },
  {
    id: 8,
    question: "What does the HTTP 404 response status code indicate?",
    options: [
      "Internal Server Error",
      "Not Found (The requested resource could not be found)",
      "OK (Request succeeded)",
      "Unauthorized Access"
    ],
    correctIndex: 1,
    explanation: "HTTP 404 Not Found indicates that the server cannot locate the requested URL or resource."
  },
  {
    id: 9,
    question: "Which React hook is specifically designed to perform asynchronous side effects like data fetching?",
    options: [
      "useEffect",
      "useRef",
      "useCallback",
      "useId"
    ],
    correctIndex: 0,
    explanation: "useEffect is invoked after render and is the designated hook for handling subscriptions, DOM mutations, and API requests."
  },
  {
    id: 10,
    question: "Which Git command creates a new branch and immediately switches to it?",
    options: [
      "git branch -c <name>",
      "git checkout -b <name>",
      "git merge <name>",
      "git commit -b <name>"
    ],
    correctIndex: 1,
    explanation: "git checkout -b <name> (or git switch -c <name>) creates a new branch and switches your working directory to it in one step."
  }
];
