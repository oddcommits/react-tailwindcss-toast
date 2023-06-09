import React from 'react';
import { useToast } from './Toast';

function App() {
  const {success, error, warn, info} = useToast();

  return (
    <div>
      <button className="block px-4 py-2 bg-green-500 text-white rounded m-4" onClick={() => {success("Success Toast")}}>Show Success Toast</button>
      <button className="block px-4 py-2 bg-red-500 text-white rounded m-4" onClick={() => {error("Error Toast")}}>Show Error Toast</button>
      <button className="block px-4 py-2 bg-yellow-500 text-white rounded m-4" onClick={() => {warn("Warning Toast")}}>Show Warning Toast</button>
      <button className="block px-4 py-2 bg-gray-500 text-white rounded m-4" onClick={() => {info("Information Toast")}}>Show Information Toast</button>
    </div>
  );
}

export default App;
