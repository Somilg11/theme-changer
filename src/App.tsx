import './App.css';
import moonIcon from "/moonicon.png";
import { useState, useEffect } from 'react';

declare global {
  interface Window {
    chrome: typeof chrome;
  }
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Check the current theme from chrome storage when the popup loads
  useEffect(() => {
    if (window.chrome?.storage?.local) {
      window.chrome.storage.local.get('darkMode', (result: { darkMode: boolean }) => {
        if (result.darkMode) {
          setIsDarkMode(true);
        }
      });
    }
  }, []);

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    // Save the new mode in chrome storage
    window.chrome.storage.local.set({ darkMode: newMode });

    // Get the currently active tab
    const [tab] = await window.chrome.tabs.query({ active: true, currentWindow: true });

    // Inject the dark mode styles across all pages
    window.chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: newMode ? applyDarkModeStyles : removeDarkModeStyles
    });
  };

  // Function to apply dark mode
  function applyDarkModeStyles() {
    const elementsToChange = document.querySelectorAll<HTMLElement>(
      'body, h1, h2, p, div, section, input, textarea, button, a'
    );

    elementsToChange.forEach(el => {
      el.style.backgroundColor = '#121212';
      el.style.color = '#e0e0e0';

      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'BUTTON') {
        el.style.backgroundColor = '#333';
        el.style.color = '#fff';
        el.style.borderColor = '#555';
      }

      if (el.tagName === 'A') {
        el.style.color = '#80d4ff';
      }
    });
  }

  // Function to remove dark mode
  function removeDarkModeStyles() {
    const elementsToChange = document.querySelectorAll<HTMLElement>(
      'body, h1, h2, p, div, section, input, textarea, button, a'
    );

    elementsToChange.forEach(el => {
      el.style.backgroundColor = '';
      el.style.color = '';

      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'BUTTON') {
        el.style.backgroundColor = '';
        el.style.color = '';
        el.style.borderColor = '';
      }

      if (el.tagName === 'A') {
        el.style.color = '';
      }
    });
  }

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={moonIcon} className="moon icon" alt="Moon logo" height={40} />
        </a>
      </div>
      <h1 style={{ fontSize: "20px" }}>Theme Changer</h1>
      <div className="card">
        <button onClick={toggleTheme}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
      <p>
        if you like it, consider ,
        <a href="http://buymeacoffee.com/gsomil93q" target="_blank" rel="noopener noreferrer">
           contribute.
        </a>
        ☕
      </p>
    </>
  );
}

export default App;
