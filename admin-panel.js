document.addEventListener('DOMContentLoaded', function() {
    // Initialize admin panel
    initializeAdminPanel();
    
    function initializeAdminPanel() {
        initializeNavigation();
        initializeMobileMenu();
        initializeLogout();
        initializeChartFilters();
        initializeRefreshButtons();
    }
    
    // Navigation functionality
    function initializeNavigation() {
        const navItems = document.querySelectorAll('.nav-item[data-section]');
        const pageTitle = document.querySelector('.page-title');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all items
                navItems.forEach(nav => nav.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Update page title
                const section = item.dataset.section;
                const sectionName = item.querySelector('span').textContent;
                pageTitle.textContent = sectionName;
                
                // Here you could add logic to show/hide different sections
                console.log(`Switched to section: ${section}`);
            });
        });
    }
    
    // Mobile menu toggle
    function initializeMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.querySelector('.admin-sidebar');
        
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
            
            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                        sidebar.classList.remove('open');
                    }
                }
            });
        }
    }
    
    // Logout functionality
    function initializeLogout() {
        const logoutBtn = document.getElementById('logoutAdmin');
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (confirm('Вы уверены, что хотите выйти из панели администратора?')) {
                    // Clear admin session
                    sessionStorage.removeItem('adminLoginSuccess');
                    
                    // Reset user role in localStorage
                    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
                    userData.role = 'Клиент';
                    userData.isAdmin = false;
                    localStorage.setItem('userData', JSON.stringify(userData));
                    
                    // Redirect back to settings
                    window.location.href = 'settings.html';
                }
            });
        }
    }
    
    // Chart filters
    function initializeChartFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Here you could add logic to update the chart
                console.log(`Chart filter changed to: ${btn.textContent}`);
                
                // Animate bars for demo
                animateChartBars();
            });
        });
    }
    
    // Refresh buttons
    function initializeRefreshButtons() {
        const refreshBtns = document.querySelectorAll('.refresh-btn');
        
        refreshBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Add rotation animation
                const icon = btn.querySelector('i');
                icon.style.transform = 'rotate(360deg)';
                
                setTimeout(() => {
                    icon.style.transform = 'rotate(0deg)';
                }, 500);
                
                // Here you could add logic to refresh data
                console.log('Refreshing data...');
            });
        });
    }
    
    // Animate chart bars
    function animateChartBars() {
        const bars = document.querySelectorAll('.bar');
        
        bars.forEach((bar, index) => {
            setTimeout(() => {
                const randomHeight = Math.random() * 80 + 20; // 20% to 100%
                bar.style.height = randomHeight + '%';
            }, index * 100);
        });
    }
    
    // Task item interactions
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            taskItems.forEach(task => task.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            console.log(`Searching for: ${searchTerm}`);
            
            // Here you could add search logic
        });
    }
    
    // Notification button
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            console.log('Notifications clicked');
            // Here you could show notifications dropdown
        });
    }
    
    // Initialize with some animations
    setTimeout(() => {
        animateChartBars();
    }, 1000);
    
    // Auto-refresh demo (every 30 seconds)
    setInterval(() => {
        if (document.querySelector('.filter-btn.active').textContent === 'Weekly') {
            animateChartBars();
        }
    }, 30000);
});
