import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { QuizQuestion } from '../types';
import { SAMPLE_QUIZ_JSON } from '../types';

export function Answer() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Load questions from localStorage or fallback to default sample
  useEffect(() => {
    const saved = localStorage.getItem('quiz_questions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setQuestions(parsed);
          return;
        }
      } catch {
        // Fallback
      }
    }
    setQuestions(SAMPLE_QUIZ_JSON);
  }, []);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIsCompleted(false);
  };

  // If no questions found
  if (questions.length === 0) {
    return (
      <div className="mobile-view">
        <div className="card-box text-center">
          <h2 className="header-title">No Questions Available</h2>
          <p className="header-sub">Please navigate to the Add tab to load or paste questions.</p>
          <Link to="/add" className="btn-mobile-primary" style={{ marginTop: '16px' }}>
            ➕ Go to Add
          </Link>
        </div>
      </div>
    );
  }

  // Quiz Finished / Summary Screen
  if (isCompleted) {
    const total = questions.length;
    const percentage = Math.round((correctCount / total) * 100);

    return (
      <div className="mobile-view">
        <div className="card-box result-summary-box text-center">
          <div className="result-badge">
            <span className="result-score-large">{correctCount}</span>
            <span className="result-score-total">/ {total}</span>
          </div>

          <h2 className="header-title" style={{ marginTop: '14px' }}>
            {percentage >= 80 ? '🎉 Excellent Score!' : percentage >= 50 ? '👍 Good Effort!' : '💪 Keep Practicing!'}
          </h2>

          <p className="header-sub" style={{ fontSize: '1rem', marginTop: '6px' }}>
            You answered <strong>{correctCount}</strong> out of <strong>{total}</strong> questions correctly.
            <br />
            Accuracy: <strong>{percentage}%</strong>
          </p>

          <div className="result-action-buttons">
            <button onClick={handleRestart} className="btn-mobile-primary">
              🔄 Retake Quiz
            </button>
            <Link to="/add" className="btn-mobile-secondary">
              ➕ Add New Questions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Active Question Answering Screen
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="mobile-view">
      {/* Top Progress & Counter */}
      <div className="quiz-top-info">
        <div className="counter-chip">
          Question {currentIndex + 1} of {questions.length}
        </div>
        <div className="score-chip">
          Score: {correctCount}
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Question Card */}
      <div className="card-box question-card">
        <h2 className="question-title">
          {currentIndex + 1}. {currentQ.question}
        </h2>

        {/* 4 Options */}
        <div className="options-container">
          {currentQ.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            let optionStatus = '';

            if (isAnswered) {
              if (idx === currentQ.correctIndex) {
                optionStatus = 'is-correct';
              } else if (idx === selectedOption) {
                optionStatus = 'is-wrong';
              }
            } else if (selectedOption === idx) {
              optionStatus = 'is-selected';
            }

            return (
              <button
                key={idx}
                className={`option-card ${optionStatus}`}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
              >
                <span className="option-indicator">{letter}</span>
                <span className="option-label">{option}</span>
                {isAnswered && idx === currentQ.correctIndex && (
                  <span className="status-icon">✓</span>
                )}
                {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                  <span className="status-icon">✕</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Card (Appears after selecting an answer) */}
        {isAnswered && (
          <div
            className={`explanation-box ${selectedOption === currentQ.correctIndex ? 'exp-correct' : 'exp-wrong'
              }`}
          >
            <div className="exp-header">
              {selectedOption === currentQ.correctIndex ? (
                <span>✅ Correct!</span>
              ) : (
                <span>❌ Incorrect!</span>
              )}
            </div>
            <p className="exp-text">
              <strong>Explanation:</strong> {currentQ.explanation || 'No explanation provided.'}
            </p>
          </div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <button onClick={handleNext} className="btn-mobile-primary next-button">
            {currentIndex + 1 < questions.length ? 'Next Question →' : 'View Results 🏆'}
          </button>
        )}
      </div>
    </div>
  );
}
