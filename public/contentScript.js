// Check for dark mode in chrome storage and apply it when the page loads
chrome.storage.local.get('darkMode', (result) => {
    if (result.darkMode) {
      applyDarkModeStyles();
    }
  });
  
  // Function to apply dark mode styles
  function applyDarkModeStyles() {
    const elementsToChange = document.querySelectorAll(
      'body, h1, h2, p, div, section, input, textarea, button, a'
    );
    
    elementsToChange.forEach(el => {
      if (el instanceof HTMLElement) {
        // Apply dark mode styles
        el.style.backgroundColor = '#121212';
        el.style.color = '#e0e0e0';
      }
  
      // Adjust specific input and textarea background/text colors
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'BUTTON') {
        el.style.backgroundColor = '#333'; // Darker background for inputs
        el.style.color = '#fff'; // Ensure text is white in inputs
        el.style.borderColor = '#555'; // Make borders a visible contrast
      }
  
      // Adjust links
      if (el.tagName === 'A') {
        el.style.color = '#80d4ff'; // Set links to a more readable blue color
      }
    });
  }
  