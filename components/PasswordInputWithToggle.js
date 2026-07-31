```javascript
import React, { useState } from'react';
import './PasswordInputWithToggle.css';

const PasswordInputWithToggle = ({ label, name, placeholder, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input-container">
      <label htmlFor={name}>{label}</label>
      <div className="password-input-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setShowPassword(false)}
          onBlur={() => setShowPassword(false)}
        />
        <button
          type="button"
          className="toggle-password-button"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
};

export default PasswordInputWithToggle;
```

```css
/* PasswordInputWithToggle.css */

.password-input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input-wrapper input {
  padding-right: 40px;
}

.toggle-password-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  font-size: 0.9rem;
}
```