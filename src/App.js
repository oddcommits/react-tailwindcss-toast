import React from 'react';
import { useToast } from './Toast';
import { useToast as useToast2 } from "./Toast2";

function App() {
  const toast = useToast();
  const toast2 = useToast2();

  return (
    <>
      <div className='mb-16'>
        <button className="block px-4 py-2 bg-green-500 text-white rounded m-4" onClick={() => {toast.success("Success. Check you inbox.")}}>Show Success Toast</button>
        <button className="block px-4 py-2 bg-red-500 text-white rounded m-4" onClick={() => {toast.error("Error to send email. Try again later.")}}>Show Error Toast</button>
        <button className="block px-4 py-2 bg-yellow-500 text-white rounded m-4" onClick={() => {toast.warn("Warning.")}}>Show Warning Toast</button>
        <button className="block px-4 py-2 bg-gray-500 text-white rounded m-4" onClick={() => {toast.info("Information.")}}>Show Information Toast</button>
      </div>
      <div>
        <button className="block px-4 py-2 bg-black text-white rounded m-4" onClick={() => {toast2.success("Success. Check you inbox.")}}>Show Success Toast v2</button>
        <button className="block px-4 py-2 bg-black text-white rounded m-4" onClick={() => {toast2.error("Error to send email. Try again later.")}}>Show Error Toast v2</button>
        <button className="block px-4 py-2 bg-black text-white rounded m-4" onClick={() => {toast2.warn("Warning.")}}>Show Warning Toast v2</button>
        <button className="block px-4 py-2 bg-black text-white rounded m-4" onClick={() => {toast2.info("Information.")}}>Show Information Toast v2</button>
      </div>
    </>
  );
}

export default App;
