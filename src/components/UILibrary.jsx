import React, { useState } from "react";

// Button Component
export const Button = ({ children, variant = "primary", onClick, className = "" }) => {
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    ghost: "border border-blue-500 text-blue-500 hover:bg-blue-50",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  return (
    <button 
      onClick={onClick} 
      className={`px-4 py-2 rounded-lg transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Card Component
export const Card = ({ title, subtitle, children, className = "" }) => {
  return (
    <div className={`p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg ${className}`}>
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
};

// Input Component
export const Input = ({ label, value, onChange, placeholder = "", className = "", type = "text" }) => {
  return (
    <label className="block">
      {label && <div className="text-sm font-medium mb-1">{label}</div>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl px-4 py-2 border border-slate-200 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-900 ${className}`}
      />
    </label>
  );
};

// Badge Component
export const Badge = ({ children, size = "md", className = "" }) => {
  const sizes = { sm: "px-2 py-0.5 text-xs", md: "px-3 py-1 text-sm" };
  return (
    <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-800 ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

// Avatar Component
export const Avatar = ({ src, alt = "avatar", size = 40, className = "" }) => {
  return <img src={src} alt={alt} width={size} height={size} className={`rounded-full object-cover ${className}`} />;
};

// Toggle Component
export const Toggle = ({ checked, onChange }) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-indigo-600' : 'bg-slate-300'}`}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
    </button>
  );
};

// Modal Component
export const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 max-w-lg w-full rounded-2xl bg-white p-6 shadow-lg">
        {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
        <div className="mb-4">{children}</div>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>OK</Button>
        </div>
      </div>
    </div>
  );
};

// Navbar Component
export const Navbar = ({ brand, children }) => {
  return (
    <header className="w-full bg-white dark:bg-slate-900 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-xl font-bold">{brand}</div>
        </div>
        <nav className="flex items-center gap-3">{children}</nav>
      </div>
    </header>
  );
};

// InfoCard Component
export const InfoCard = ({ title, description, icon, footer }) => {
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <div className="flex items-center gap-4">
        {icon && <div className="text-blue-500">{icon}</div>}
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      {footer && (
        <div className="mt-4 pt-4 border-t text-sm text-gray-500 dark:text-gray-400">
          {footer}
        </div>
      )}
    </div>
  );
};

// Toast Component
export const Toast = ({ message, type = "success", onClose }) => {
  const types = {
    success: "bg-green-100 text-green-800 border-green-200",
    error: "bg-red-100 text-red-800 border-red-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    info: "bg-blue-100 text-blue-800 border-blue-200"
  };

  return (
    <div className={`fixed bottom-4 right-4 max-w-sm p-4 rounded-xl border ${types[type]} shadow-lg animate-fade-in-up`}>
      <div className="flex items-center justify-between">
        <p>{message}</p>
        <button onClick={onClose} className="ml-4 hover:opacity-75">
          ×
        </button>
      </div>
    </div>
  );
};

// Alert Component
export const Alert = ({ title, message, type = "info" }) => {
  const types = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    error: "bg-red-50 border-red-200 text-red-800"
  };

  return (
    <div className={`rounded-xl p-4 border ${types[type]}`}>
      {title && <h4 className="font-semibold mb-1">{title}</h4>}
      <p className="text-sm opacity-90">{message}</p>
    </div>
  );
};

// Dropdown Component
export const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white dark:bg-slate-800 
        appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {label && <option value="">{label}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

// Tabs Component
export const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              py-2 px-1 border-b-2 font-medium text-sm transition-colors
              ${activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

// Pagination Component
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 
        disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800"
      >
        Previous
      </button>
      
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`
            w-8 h-8 rounded-lg flex items-center justify-center
            ${currentPage === i + 1
              ? 'bg-indigo-500 text-white'
              : 'hover:bg-slate-50 dark:hover:bg-slate-800'
            }
          `}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 
        disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800"
      >
        Next
      </button>
    </div>
  );
};

// Default export for demo purposes
const TailwindComponentsDemo = () => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <Navbar brand={<span>My UI Library</span>}>
        <Badge>New</Badge>
        <Button variant="ghost">Docs</Button>
      </Navbar>
      {/* Rest of your demo code */}
    </div>
  );
};

export default TailwindComponentsDemo;