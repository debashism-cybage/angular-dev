```javascript
import React, { useState } from 'react';
import './PasswordInputField.css';

const PasswordInputField = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="password-input-container">
      <input
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handlePasswordChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Enter your password"
      />
      {isFocused && (
        <button
          className="eye-icon"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? 'visibility_off' : 'visibility'}
        </button>
      )}
    </div>
  );
};

export default PasswordInputField;
```

```css
/* PasswordInputField.css */
.password-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

input[type="text"], input[type="password"] {
  padding-right: 30px;
}

.eye-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  font-size: 1.2rem;
}
```