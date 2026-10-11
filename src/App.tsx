import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Add } from './pages/Add';
import { Answer } from './pages/Answer';
import './App.css';

function App() {
  return (
    <div className="app-root">
      {/* Navigation Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-logo">⚡</span>
            <span className="brand-name">Quiz App</span>
          </div>

          <nav className="nav-tabs">
            <NavLink
              to="/add"
              className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
              id="tab-add"
            >
              ➕ Add
            </NavLink>
            <NavLink
              to="/answer"
              className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
              id="tab-answer"
            >
              📝 Answer
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content with Only 'Add' and 'Answer' Routes */}
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/add" replace />} />
          <Route path="/add" element={<Add />} />
          <Route path="/answer" element={<Answer />} />
          <Route path="*" element={<Navigate to="/add" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
