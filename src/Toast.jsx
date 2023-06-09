import React, { createContext, useContext, useReducer, useCallback } from "react";
import ReactDOM from "react-dom";
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const ToastContext = createContext();

const ToastReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, action.payload];
    case "REMOVE_TOAST":
      return state.filter((toast) => toast.id !== action.payload);
    default:
      return state;
  }
};

export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ToastReducer, []);

  const addToast = useCallback((type, content, duration) => {
    const id = Math.random();
    dispatch({
      type: "ADD_TOAST",
      payload: { id, type, content, duration },
    });
    setTimeout(() => dispatch({ type: "REMOVE_TOAST", payload: id }), duration);
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({ type: "REMOVE_TOAST", payload: id });
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {ReactDOM.createPortal(<ToastContainer toasts={state} removeToast={removeToast} />, document.body)}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const { addToast } = useContext(ToastContext);
  return {
    success: (content, duration = 3000) => addToast("success", content, duration),
    error: (content, duration = 3000) => addToast("error", content, duration),
    warn: (content, duration = 3000) => addToast("warning", content, duration),
    info: (content, duration = 3000) => addToast("info", content, duration),
  };
};

const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed right-0 top-0 space-y-4 p-4">
    {toasts.map(({ id, type, content }) => (
      <div key={id} className={`flex items-center justify-between rounded-lg p-4 shadow-lg ${toastTypeToColor(type)}`}>
        <div className="flex items-center">
          {toastTypeToIcon(type)}
          <span className="ml-2">{content}</span>
        </div>
        <XMarkIcon className="ml-2 w-4 h-4 cursor-pointer" onClick={() => removeToast(id)} />
      </div>
    ))}
  </div>
);

const toastTypeToIcon = (type) => {
  switch (type) {
    case "success":
      return <CheckCircleIcon className="w-6 h-6 text-white"/>;
    case "error":
      return <ExclamationTriangleIcon className="w-6 h-6 text-white"/>;
    case "warning":
      return <ExclamationCircleIcon className="w-6 h-6 text-black"/>;
    case "info":
      return <InformationCircleIcon className="w-6 h-6 text-white"/>;
    default:
      return <InformationCircleIcon className="w-6 h-6 text-white"/>;
  }
};

const toastTypeToColor = (type) => {
  switch (type) {
    case "success":
      return "bg-green-500 text-white";
    case "error":
      return "bg-red-500 text-white";
    case "warning":
      return "bg-yellow-500 text-black";
    case "info":
      return "bg-blue-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};
