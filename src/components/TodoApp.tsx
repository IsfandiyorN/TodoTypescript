import React, { useReducer, useState } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Action = 
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number };

const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};

const TodoApp: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', text });
      setText('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="rounded-2xl w-full max-w-4xl p-8 space-y-4 bg-zinc-900">
        <div className="mx-40 flex items-center space-x-2">
          <input
            className=" max-w-md flex-grow px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
            type="text"
            placeholder="Add a new task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="p-2 rounded-lg bg-purple-600"
            onClick={handleAddTodo}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
        <div className='max-w-md mx-40 '>
          <h2 className="text-xl">Tasks to do - {todos.filter(todo => !todo.completed).length}</h2>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`mt-10 flex justify-between items-center p-4 rounded-lg bg-gray-800 ${
                  todo.completed ? 'line-through' : ''
                }`}
              >
                <span>{todo.text}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
                    className="p-2 rounded-lg bg-green-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'DELETE_TODO', id: todo.id })}
                    className="p-2 rounded-lg bg-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
