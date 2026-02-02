import React from "react";
import "./Button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

/**
 * BUTTON COMPONENT
 * - Simple wrapper around native <button> with custom styling
 * - Allows passing additional class names and button props
 * - Wraps children in span for consistent text styling
 */
const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <button className={`btn ${className}`} {...props}>
      <span className="btn__text">{children}</span>
    </button>
  );
};

export default Button;

