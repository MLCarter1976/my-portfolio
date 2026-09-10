/*
 * scripts.js - All interactive behavior for the Student Portfolio
 * This file connects to index.html (structure) and styles.css (styling)
 * It adds functionality like the theme toggle
 */

// ===== Theme Toggle Functionality =====
// This code runs when the page loads and sets up the theme toggle button

document.addEventListener('DOMContentLoaded', function() {
    // Get the theme toggle button element from index.html
    const themeToggle = document.getElementById('themeToggle');
    
    // Get the saved theme preference from browser storage (localStorage)
    // If user previously chose dark mode, it will be remembered
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme based on saved preference or system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️'; // Sun icon for light mode
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙'; // Moon icon for dark mode
    }
    
    // Add click event listener to the theme toggle button
    themeToggle.addEventListener('click', toggleTheme);
    
    // ===== Smooth Scroll for Anchor Links =====
    // This handles the "Learn More About Me" button in the hero section
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if the link points to an element on the page
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// ===== Toggle Theme Function =====
// This function switches between light and dark modes
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    // Check if dark mode is currently active
    if (body.classList.contains('dark-mode')) {
        // Switch to light mode
        body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙'; // Show moon icon
        localStorage.setItem('theme', 'light'); // Save preference
    } else {
        // Switch to dark mode
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️'; // Show sun icon
        localStorage.setItem('theme', 'dark'); // Save preference
    }
}

// ===== How the Files Work Together =====
/*
 * 
 * INDEX.HTML (Structure):
 * - Contains all the HTML elements (sections, headings, buttons, etc.)
 * - Includes <link> tag that loads styles.css
 * - Includes <script> tag that loads this scripts.js file
 * - Has id="themeToggle" button that this scripts.js interacts with
 * - Uses semantic HTML tags (<header>, <main>, <section>, <footer>)
 * 
 * STYLES.CSS (Styling):
 * - Defines all colors, fonts, spacing, and layout
 * - Uses CSS custom properties (variables) like --bg-primary, --text-primary
 * - Has a dark-mode class that changes these variables
 * - Includes responsive design for mobile devices
 * - Adds hover effects and animations
 * 
 * SCRIPTS.JS (Behavior - This File):
 * - Listens for clicks on the theme toggle button
 * - Toggles the "dark-mode" class on the <body> element
 * - When dark-mode class is added/removed, CSS variables change automatically
 * - Saves user's theme choice in localStorage so it persists
 * - Handles smooth scrolling for anchor links
 * - Respects system color scheme preferences
 * 
 * WORKFLOW:
 * 1. User clicks theme button → toggleTheme() function runs
 * 2. Function adds/removes "dark-mode" class from <body>
 * 3. CSS detects the class change and uses different variables
 * 4. All colors instantly change throughout the page
 * 5. Preference is saved so it appears on next visit
 * 
 */
