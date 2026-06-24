document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    
    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        document.documentElement.classList.add('light-theme');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        document.documentElement.classList.remove('light-theme');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
    
    themeToggleBtn.addEventListener('click', () => {
        const isLight = document.documentElement.classList.toggle('light-theme');
        
        if (isLight) {
            localStorage.setItem('theme', 'light');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            localStorage.setItem('theme', 'dark');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    });

    // Portfolio Project Filtering
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            const filterValue = tab.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue || (filterValue === 'storyline' && category === 'storyline')) {
                    card.style.display = 'flex';
                    // Trigger fade in animation
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow
                    card.style.animation = 'fadeIn 0.3s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
