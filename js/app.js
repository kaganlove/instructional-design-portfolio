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

    // Check if S3 files exist when launching local projects
    const s3Links = document.querySelectorAll('[id^="link-s3-"]');
    s3Links.forEach(link => {
        link.addEventListener('click', (e) => {
            const url = link.getAttribute('href');
            // If checking locally, let's warn if files are not present
            fetch(url, { method: 'HEAD' })
                .then(res => {
                    if (!res.ok) {
                        e.preventDefault();
                        showPlaceholderWarning(link.closest('.project-card').querySelector('.project-title').textContent);
                    }
                })
                .catch(() => {
                    // Fail to fetch usually means file doesn't exist locally
                    e.preventDefault();
                    showPlaceholderWarning(link.closest('.project-card').querySelector('.project-title').textContent);
                });
        });
    });

    function showPlaceholderWarning(projectTitle) {
        const dialogOverlay = document.createElement('div');
        dialogOverlay.style.position = 'fixed';
        dialogOverlay.style.top = '0';
        dialogOverlay.style.left = '0';
        dialogOverlay.style.width = '100vw';
        dialogOverlay.style.height = '100vh';
        dialogOverlay.style.background = 'rgba(0,0,0,0.7)';
        dialogOverlay.style.display = 'flex';
        dialogOverlay.style.justifyContent = 'center';
        dialogOverlay.style.alignItems = 'center';
        dialogOverlay.style.zIndex = '9999';
        
        const dialogBox = document.createElement('div');
        dialogBox.className = 'glass-card';
        dialogBox.style.maxWidth = '450px';
        dialogBox.style.padding = '32px';
        dialogBox.style.textAlign = 'center';
        
        dialogBox.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:16px;"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <h3 style="margin-bottom:12px;">S3 Project Integration Needed</h3>
            <p style="font-size:0.95rem; color:hsl(var(--text-secondary-hsl)); margin-bottom:24px;">
                The resources for <strong>"${projectTitle}"</strong> are not loaded in the repository yet. 
                Please copy your published Storyline/Rise output folder into the <code>s3-projects/</code> directory.
            </p>
            <button class="btn btn-primary" style="margin:0 auto;">Got it</button>
        `;
        
        dialogBox.querySelector('button').addEventListener('click', () => {
            dialogOverlay.remove();
        });
        
        dialogOverlay.appendChild(dialogBox);
        document.body.appendChild(dialogOverlay);
    }
});
