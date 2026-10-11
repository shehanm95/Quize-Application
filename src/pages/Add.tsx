import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { QuizQuestion } from '../types';
import { SAMPLE_QUIZ_JSON } from '../types';

export function Add() {
  const navigate = useNavigate();
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLoadSample = () => {
    setJsonInput(JSON.stringify(SAMPLE_QUIZ_JSON, null, 2));
    setError(null);
  };

  const handleClear = () => {
    setJsonInput('');
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!jsonInput.trim()) {
      setError('Please paste or enter a JSON object list.');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);

      if (!Array.isArray(parsed) || parsed.length === 0) {
        setError('The JSON input must be an array (list) containing at least one question object.');
        return;
      }

      // Normalize & validate each question
      const validatedQuestions: QuizQuestion[] = parsed.map((item, index) => {
        if (!item.question || typeof item.question !== 'string') {
          throw new Error(`Question #${index + 1} is missing a valid "question" string.`);
        }

        if (!Array.isArray(item.options) || item.options.length < 2) {
          throw new Error(`Question #${index + 1} must have an "options" array with at least 2 choices.`);
        }

        // Determine correct index
        let correctIdx = 0;
        if (typeof item.correctIndex === 'number') {
          correctIdx = item.correctIndex;
        } else if (typeof item.answer === 'number') {
          correctIdx = item.answer;
        } else if (typeof item.answer === 'string') {
          const found = item.options.indexOf(item.answer);
          correctIdx = found !== -1 ? found : 0;
        }

        return {
          id: item.id || index + 1,
          question: item.question.trim(),
          options: item.options.map((opt: unknown) => String(opt).trim()),
          correctIndex: correctIdx,
          explanation: item.explanation ? String(item.explanation).trim() : 'No explanation provided.',
        };
      });

      // Save to localStorage
      localStorage.setItem('quiz_questions', JSON.stringify(validatedQuestions));

      // Navigate to answer page
      navigate('/answer');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid JSON format. Please verify syntax and structure.');
      }
    }
  };

  return (
    <div className="mobile-view">
      <div className="page-header">
        <h1 className="header-title">Add Questions</h1>
        <p className="header-sub">Paste your JSON Object List below and submit to start the quiz.</p>
      </div>

      <form onSubmit={handleSubmit} className="card-box">
        {/* Gemini AI Question Generator Link Button */}
        <a
          href="https://gemini.google.com/gem/1EKuJLK4BBlekaGzz2OD9l9zJV5V9RI-I?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-generate-ai"
          id="btn-generate-notes"
        >
          <span className="ai-icon">✨</span>
          <span className="ai-text">Generate Questions by Your Notes</span>
          <span className="external-badge">Open ↗</span>
        </a>

        <div className="textarea-header">
          <label htmlFor="json-input" className="label-bold">
            JSON Object List
          </label>
          <div className="action-buttons">
            <button
              type="button"
              onClick={handleLoadSample}
              className="btn-text-action"
            >
              📋 Load Sample
            </button>
            {jsonInput && (
              <button
                type="button"
                onClick={handleClear}
                className="btn-text-action text-muted"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <textarea
          id="json-input"
          rows={14}
          value={jsonInput}
          onChange={(e) => {
            setJsonInput(e.target.value);
            if (error) setError(null);
          }}
          placeholder={`[
  {
    "id": 1,
    "question": "Your question text here...",
    "options": ["Choice A", "Choice B", "Choice C", "Choice D"],
    "correctIndex": 0,
    "explanation": "Detailed explanation of why this answer is correct..."
  }
]`}
          className="mobile-textarea"
          spellCheck={false}
        />

        {error && (
          <div className="alert-box alert-error">
            <span>⚠️ {error}</span>
          </div>
        )}

        <button type="submit" className="btn-mobile-primary">
          🚀 Submit & Start Quiz
        </button>
      </form>

      {/* JSON Format Guide */}
      <div className="card-box guide-box">
        <h3 className="guide-title">💡 Required JSON Format:</h3>
        <pre className="code-snippet">
{`[
  {
    "id": 1,
    "question": "Question text goes here",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    "correctIndex": 1, // 0 = first option, 1 = second option, etc.
    "explanation": "Explanation explaining the answer"
  }
]`}
        </pre>
      </div>
    </div>
  );
}
