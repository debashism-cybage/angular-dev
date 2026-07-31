```javascript
import React, { useState, useRef } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const passwordInputRef = useRef(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFocus = () => {
    setPasswordFocused(true);
  };

  const handleBlur = () => {
    setPasswordFocused(false);
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              ref={passwordInputRef}
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="form-input"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {passwordFocused && (
              <button
                type="button"
                className="eye-icon"
                aria-label={passwordVisible ? "Hide password" : "Show password"}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? 'visibility_off' : 'visibility'}
              </button>
            )}
          </div>
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
```

```css
/* src/pages/LoginPage.css */

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-input {
  padding: 10px;
  font-size: 16px;
  width: calc(100% - 30px);
}

.password-container {
  position: relative;
  display: flex;
  align-items: center;
}

.eye-icon {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 0;
  outline: none;
  z-index: 10;
}

.login-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
```