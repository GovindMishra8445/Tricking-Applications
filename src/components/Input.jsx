import React from "react";

const Input = ({
  id,
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <p className="error">{error}</p>
    </div>
  );
};

export default Input;
