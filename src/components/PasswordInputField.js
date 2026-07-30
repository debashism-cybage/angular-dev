```javascript
import React, { useState } from'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInputField = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input-container">
      <input
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handlePasswordChange}
        onFocus={() => setShowPassword(false)}
        onBlur={() => setShowPassword(false)}
        className="password-input"
        placeholder="Enter password"
        aria-label="Password"
      />
      <button
        type="button"
        className="password-toggle-button"
        onClick={togglePasswordVisibility}
        onBlur={() => setShowPassword(false)}
        tabIndex={-1}
        aria-pressed={showPassword}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default PasswordInputField;

// src/components/PasswordInputField.css

.password-input-container {
  position: relative;
  display: inline-block;
}

.password-input {
  padding-right: 30px;
  width: 100%;
}

.password-toggle-button {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  transition: color 0.2s;
  z-index: 1;
}
```