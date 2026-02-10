import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  // Styles inspired by colorful playful UI: large border radius, distinct "3D" shadow
  const baseStyles = "font-bold rounded-2xl transition-all duration-200 transform hover:-translate-y-1 active:scale-95 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-button hover:shadow-button-hover active:shadow-button-active";
  
  const variants = {
    primary: "bg-primary text-white border-2 border-transparent", // Purple
    secondary: "bg-secondary text-white border-2 border-transparent", // Green
    accent: "bg-accent text-white border-2 border-transparent", // Orange
    danger: "bg-danger text-white border-2 border-transparent", // Red
    outline: "bg-white border-4 border-primary text-primary hover:bg-purple-50",
    ghost: "bg-transparent text-gray-500 shadow-none hover:shadow-none hover:bg-gray-100 hover:scale-100 hover:translate-y-0 active:translate-y-0",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-lg",
    lg: "px-8 py-4 text-xl",
    xl: "px-10 py-6 text-2xl",
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;