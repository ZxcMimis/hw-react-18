import React, { useState, useContext, useRef, createContext } from 'react';
import './App.css'; 

const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null); 
  const usernameInputRef = useRef(null);

  const handleLogin = () => {
    const username = usernameInputRef.current.value;
    
    if (username.trim() !== '') {
      setUser({ name: username });
      usernameInputRef.current.value = '';
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const contextValue = {
    user: user,
    logout: handleLogout
  };

  return (
    <UserContext.Provider value={contextValue}>
      <div className="app">
        
        {!user ? (
          <LoginComponent 
            inputRef={usernameInputRef}
            onLoginClick={handleLogin}
          />
        ) : (
          <Header />
        )}
        
        <Content />
      </div>
    </UserContext.Provider>
  );
}

function LoginComponent({ inputRef, onLoginClick }) {
  
  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div className="login-container">
      <h3>Будь ласка, увійдіть</h3>
      <input
        ref={inputRef}
        type="text"
        placeholder="Введіть ваше ім'я..."
      />
      <button onClick={onLoginClick}>Увійти</button>
      
      <button onClick={focusInput} className="secondary">
        Фокус (useRef)
      </button>
    </div>
  );
}

function Header() {
  const { user, logout } = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <header>
      <span>Привіт, {user.name}! (з useContext)</span>
      <button onClick={logout} className="secondary">Вийти</button>
    </header>
  );
}

function Content() {
  const { user } = useContext(UserContext);

  return (
    <div className="content">
      {user ? (
        <p>Це захищений контент, який бачите лише ви, {user.name}.</p>
      ) : (
        <p>Це загальнодоступний контент. Будь ласка, увійдіть, щоб побачити більше.</p>
      )}
    </div>
  );
}

export default App;