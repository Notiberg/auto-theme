document.addEventListener('DOMContentLoaded', function() {
    // Initialize admin panel
    initializeAdminPanel();
    
    function initializeAdminPanel() {
        initializeNavigation();
        initializeMobileMenu();
        initializeLogout();
        initializeChartFilters();
        initializeRefreshButtons();
        initializeNotifications();
        initializeCalendar();
        initializeFinance();
    }
    
    // Navigation functionality
    function initializeNavigation() {
        const navItems = document.querySelectorAll('.nav-item[data-section]');
        const pageTitle = document.querySelector('.page-title');
        const contentSections = document.querySelectorAll('.content-section');
        
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
                
                // Hide all content sections
                contentSections.forEach(contentSection => {
                    contentSection.classList.remove('active');
                });
                
                // Show the selected section
                const targetSection = document.getElementById(`${section}-section`);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
                
                // Close mobile sidebar if open
                const sidebar = document.querySelector('.admin-sidebar');
                if (sidebar && window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                }
                
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
            // Switch to notifications section
            const navItems = document.querySelectorAll('.nav-item[data-section]');
            const notificationsNav = document.querySelector('.nav-item[data-section="notifications"]');
            const pageTitle = document.querySelector('.page-title');
            const contentSections = document.querySelectorAll('.content-section');
            
            if (notificationsNav) {
                // Remove active class from all nav items
                navItems.forEach(nav => nav.classList.remove('active'));
                
                // Add active class to notifications nav
                notificationsNav.classList.add('active');
                
                // Update page title
                pageTitle.textContent = 'Уведомления';
                
                // Hide all content sections
                contentSections.forEach(section => section.classList.remove('active'));
                
                // Show notifications section
                const notificationsSection = document.getElementById('notifications-section');
                if (notificationsSection) {
                    notificationsSection.classList.add('active');
                }
                
                // Close mobile sidebar if open
                const sidebar = document.querySelector('.admin-sidebar');
                if (sidebar && window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                }
                
                console.log('Switched to notifications section');
            }
        });
    }
    
    // Initialize with some animations
    setTimeout(() => {
        animateChartBars();
    }, 1000);
    
    // Auto-refresh demo (every 30 seconds)
    setInterval(() => {
        if (document.querySelector('.filter-btn.active')) {
            animateChartBars();
        }
    }, 30000);
    
    // Notifications functionality
    function initializeNotifications() {
        const markAllReadBtn = document.querySelector('.btn-primary');
        if (markAllReadBtn && markAllReadBtn.textContent.includes('прочитанные')) {
            markAllReadBtn.addEventListener('click', () => {
                const unreadItems = document.querySelectorAll('.notification-item.unread');
                unreadItems.forEach(item => {
                    item.classList.remove('unread');
                });
                console.log('All notifications marked as read');
            });
        }
    }
    
    // Calendar functionality
    function initializeCalendar() {
        const calendarNavs = document.querySelectorAll('.calendar-nav');
        const calendarDays = document.querySelectorAll('.calendar-day:not(.header)');
        
        calendarNavs.forEach(nav => {
            nav.addEventListener('click', () => {
                console.log('Calendar navigation clicked');
                // Here you could add logic to change months
            });
        });
        
        calendarDays.forEach(day => {
            day.addEventListener('click', () => {
                // Remove active class from all days
                calendarDays.forEach(d => d.classList.remove('selected'));
                
                // Add active class to clicked day
                day.classList.add('selected');
                
                console.log(`Selected day: ${day.textContent}`);
            });
        });
        
        // Add appointment button
        const addAppointmentBtn = document.querySelector('.btn-primary');
        if (addAppointmentBtn && addAppointmentBtn.textContent.includes('Добавить')) {
            addAppointmentBtn.addEventListener('click', () => {
                console.log('Add appointment clicked');
                // Here you could open a modal to add new appointment
            });
        }
    }
    
    // Finance functionality
    function initializeFinance() {
        const financeFilters = document.querySelectorAll('.finance-filters .filter-btn');
        
        financeFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                financeFilters.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Update finance data based on filter
                updateFinanceData(btn.textContent);
                
                console.log(`Finance filter changed to: ${btn.textContent}`);
            });
        });
    }
    
    // Update finance data
    function updateFinanceData(period) {
        const financeCards = document.querySelectorAll('.finance-card');
        
        // Demo data for different periods
        const data = {
            'День': {
                income: '45,200₽',
                expenses: '8,500₽',
                profit: '36,700₽'
            },
            'Неделя': {
                income: '316,400₽',
                expenses: '59,500₽',
                profit: '256,900₽'
            },
            'Месяц': {
                income: '1,356,800₽',
                expenses: '254,300₽',
                profit: '1,102,500₽'
            }
        };
        
        // Chart labels for different periods
        const chartLabels = {
            'День': ['9:00', '12:00', '15:00', '18:00', '21:00', '24:00', '3:00'],
            'Неделя': ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            'Месяц': ['1', '5', '10', '15', '20', '25', '30']
        };
        
        if (data[period]) {
            const values = Object.values(data[period]);
            financeCards.forEach((card, index) => {
                const h3 = card.querySelector('h3');
                if (h3 && values[index]) {
                    h3.textContent = values[index];
                }
            });
            
            // Update chart labels
            const financeLabels = document.querySelectorAll('.finance-label');
            const labels = chartLabels[period];
            if (labels && financeLabels.length > 0) {
                financeLabels.forEach((label, index) => {
                    if (labels[index]) {
                        label.textContent = labels[index];
                    }
                });
            }
            
            // Animate chart bars
            animateChartBars();
        }
    }
});
