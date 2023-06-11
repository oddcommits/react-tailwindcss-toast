import React, { createContext, useContext, useReducer, useCallback, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  CheckCircleIcon,
  ShieldExclamationIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const ToastContext = createContext();

const ToastReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, action.payload];

    case "REMOVE_TOAST":
      return state.filter((toast) => toast.ID !== action.payload);

    default:
      return state;
  }
};

export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ToastReducer, []);

  const addToast = useCallback((type, content, duration) => {
    const ID = Math.random();

    dispatch({
      type: "ADD_TOAST",
      payload: { ID, type, content, duration },
    });
    setTimeout(() => dispatch({ type: "REMOVE_TOAST", payload: ID }), duration);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {ReactDOM.createPortal(<ToastContainer toasts={state} />, document.body)}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const { addToast } = useContext(ToastContext);

  return {
    success: (content, duration = 3000) => addToast("success", content, duration + 1000),
    error: (content, duration = 3000) => addToast("error", content, duration + 1000),
    warn: (content, duration = 3000) => addToast("warning", content, duration + 1000),
    info: (content, duration = 3000) => addToast("info", content, duration + 1000),
  };
};

const ToastContainer = ({ toasts }) => {
  return (
    <div className="fixed right-0 top-0 z-40 space-y-2 p-4">
      {toasts.map(({ ID, type, content, duration }) => (
        <Toast key={ID} type={type} content={content} duration={duration} />
      ))}
    </div>
  );
};

const Toast = ({ type, content, duration }) => {
  const [opacity, setOpacity] = useState('opacity-0');

  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setOpacity('opacity-100');
    }, 0); // Delay for fade-in
    
    const fadeOutTimer = setTimeout(() => {
      setOpacity('opacity-0');
    }, duration - 1000); // Delay for fade-out

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
    };
  }, [duration]);

  return (
    <div
      className={`flex items-center font-medium justify-between rounded-xl px-6 py-4 shadow-lg bg-black font-bold w-fit ml-auto transition-opacity duration-1000 ease-in ${opacity}`}
    >
      {toastTypeToIcon(type)}
      <span className="ml-3 text-white">{content}</span>
    </div>
  );
};

const toastTypeToIcon = (type) => {
  switch (type) {
    case "success":
      return <CheckCircleIcon className="h-5 w-5 stroke-2 stroke-white" />;

    case "error":
      return <ShieldExclamationIcon className="h-5 w-5 stroke-2 stroke-red-500" />;

    case "warning":
      return <ExclamationCircleIcon className="h-5 w-5 stroke-2 stroke-yellow-500" />;

    case "info":
      return <InformationCircleIcon className="h-5 w-5 stroke-2 stroke-cyan-500" />;

    default:
      return <InformationCircleIcon className="h-5 w-5 stroke-2 stroke-gray-500" />;
  }
};
