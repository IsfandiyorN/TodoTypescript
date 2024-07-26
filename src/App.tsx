// src/App.tsx
import React from 'react';
import TodoApp from './components/TodoApp';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
};

export default App;
