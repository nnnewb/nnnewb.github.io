const toggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeSound = document.getElementById('theme-sound');

// Function to update the theme icon based on the current theme
const updateThemeIcon = (isDarkMode) => {
  const themeMode = isDarkMode ? 'darkMode' : 'lightMode';
  const iconPath = themeIcon.querySelector('use').getAttribute('href').replace(/#.*$/, `#${themeMode}`);
  themeIcon.querySelector('use').setAttribute('href', iconPath);
};

function sendMessage(message) {
  const iframe = document.querySelector('iframe.giscus-frame');
  if (!iframe) return;
  iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
}

// Function to update the theme based on the current mode
const updateTheme = (isDarkMode) => {
  const theme = isDarkMode ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(isDarkMode);
  // giscus theme
  sendMessage({
    setConfig: {
      theme: isDarkMode ? 'noborder_dark' : 'noborder_light',
    },
  });
};

// Function to toggle the theme
const toggleTheme = () => {
  const isDarkMode = toggleButton.checked;
  updateTheme(isDarkMode);
  themeSound.play();
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

  // Add transition class to body for smooth transition
  document.body.classList.add('theme-transition');
  setTimeout(() => {
    document.body.classList.remove('theme-transition');
  }, 300);
};

// Event listener for theme toggle
toggleButton.addEventListener('change', toggleTheme);

// Function to initialize the theme based on the stored preference
const initializeTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDarkMode = storedTheme === 'dark' || (!storedTheme && prefersDark);
  toggleButton.checked = isDarkMode;
  updateTheme(isDarkMode);
  const el = document.getElementById('giscus_script');
  if (el) {
    el.setAttribute('data-theme', isDarkMode ? 'noborder_dark' : 'noborder_light');
  }
};

// Initialize the theme
initializeTheme();

// Listen for changes in system preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', initializeTheme);
