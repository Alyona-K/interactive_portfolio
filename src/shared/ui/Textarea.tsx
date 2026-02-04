import React from "react";
import "./Textarea.scss";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  wrapperClassName?: string;
  fieldClassName?: string;
  labelClassName?: string;
}

/**
 * --- RESPONSIBILITY ---
 * Custom textarea component with optional label.
 * Allows extending native textarea props and custom class names.
 */
const Textarea: React.FC<TextareaProps> = ({
  label,
  id,
  wrapperClassName = "",
  fieldClassName = "",
  labelClassName = "",
  ...props
}) => {
  // --- RENDER WRAPPER AND TEXTAREA FIELD ---
  return (
    <div className={`custom-textarea ${wrapperClassName}`}>
      <textarea
        className={`custom-textarea__field ${fieldClassName}`}
        id={id}
        {...props}
      />
      {/* --- OPTIONAL LABEL --- */}
      {label && (
        <label
          className={`custom-textarea__label ${labelClassName}`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Textarea;
