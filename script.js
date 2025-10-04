document.addEventListener('DOMContentLoaded', function() {
    // Toggle filter buttons
    const filterToggleBtn = document.querySelector('.filter-toggle-btn');
    const filterButtons = document.querySelector('.filter-buttons');
    
    if (filterToggleBtn && filterButtons) {
        filterToggleBtn.addEventListener('click', function() {
        filterButtons.classList.toggle('show-filters');
        
        // Добавляем класс к хедеру для показа фильтров
        const headerElement = document.querySelector('.glass-header');
        if (headerElement) {
            headerElement.classList.toggle('filters-open');
        }
        
        const contentElement = document.querySelector('.content') || document.querySelector('.services-content');
        if (contentElement) {
            contentElement.classList.toggle('filters-open');
        }
        
        if (filterButtons.classList.contains('show-filters')) {
            this.classList.add('active');
        } else {
            this.classList.remove('active');
        }
        });
    }
    
    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.filter-btn');
        
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown').forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('show');
                }
            });
            
            // Позиционируем выпадающее меню под конкретной кнопкой
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            if (dropdownContent) {
                const btnRect = btn.getBoundingClientRect();
                const screenWidth = window.innerWidth;
                
                console.log('Button position:', btnRect, 'Screen width:', screenWidth);
                
                dropdownContent.style.position = 'fixed';
                dropdownContent.style.top = (btnRect.bottom + 2) + 'px';
                
                // Для мобильных устройств центрируем меню под кнопкой
                if (screenWidth <= 767) {
                    const menuWidth = 120; // Фиксированная ширина для мобильных
                    const centerPosition = btnRect.left + (btnRect.width / 2) - (menuWidth / 2);
                    const rightEdge = centerPosition + menuWidth;
                    
                    // Проверяем, не выходит ли меню за правый край экрана
                    let finalLeft;
                    if (rightEdge > screenWidth - 10) {
                        finalLeft = screenWidth - menuWidth - 10;
                    } else if (centerPosition < 10) {
                        finalLeft = 10;
                    } else {
                        finalLeft = centerPosition;
                    }
                    
                    // Принудительно устанавливаем стили с !important через CSS
                    dropdownContent.style.setProperty('left', finalLeft + 'px', 'important');
                    dropdownContent.style.setProperty('width', menuWidth + 'px', 'important');
                    dropdownContent.style.setProperty('min-width', 'auto', 'important');
                    dropdownContent.style.setProperty('max-width', 'none', 'important');
                } else {
                    // Для больших экранов выравниваем по левому краю кнопки
                    dropdownContent.style.setProperty('left', btnRect.left + 'px', 'important');
                    dropdownContent.style.setProperty('min-width', btnRect.width + 'px', 'important');
                    dropdownContent.style.setProperty('width', 'auto', 'important');
                }
                
                dropdownContent.style.transform = 'none';
                console.log('Dropdown positioned at:', dropdownContent.style.top, dropdownContent.style.left);
            }
            
            dropdown.classList.toggle('show');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    });

    // Tag click functionality - auto-fill search bar
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tag')) {
            const searchInput = document.querySelector('.search-bar input');
            const tagText = e.target.textContent.trim();
            searchInput.value = tagText;
            searchInput.focus();
        }
    });

    // Filter buttons active state
    const filterBtns = document.querySelectorAll('.filter-btn:not(.dropdown .filter-btn)');
    const allBtn = document.getElementById('all-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // If "Все" button is clicked, reset all filters
            if (this.id === 'all-btn') {
                resetAllFilters();
            }
        });
    });
    
    // Function to reset all filters
    function resetAllFilters() {
        const priceDropdown = document.querySelectorAll('.dropdown')[0];
        const durationDropdown = document.querySelectorAll('.dropdown')[1];
        const tagDropdown = document.querySelectorAll('.dropdown')[2];
        
        if (priceDropdown) {
            priceDropdown.querySelector('.value').textContent = '';
        }
        if (durationDropdown) {
            durationDropdown.querySelector('.value').textContent = '';
        }
        if (tagDropdown) {
            tagDropdown.querySelector('.value').textContent = '';
        }
        
        // Show all service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.style.display = 'flex';
        });
        
        // Clear search input
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.value = '';
        }
    }
    
    // Function to check if any filters are active and update "Все" button state
    function updateAllButtonState() {
        const priceDropdown = document.querySelectorAll('.dropdown')[0];
        const durationDropdown = document.querySelectorAll('.dropdown')[1];
        const tagDropdown = document.querySelectorAll('.dropdown')[2];
        const allBtn = document.getElementById('all-btn');
        
        if (!allBtn || !priceDropdown || !durationDropdown || !tagDropdown) return;
        
        const priceValue = priceDropdown.querySelector('.value').textContent;
        const durationValue = durationDropdown.querySelector('.value').textContent;
        const tagValue = tagDropdown.querySelector('.value').textContent;
        const searchValue = document.querySelector('.search-bar input')?.value || '';
        
        const hasActiveFilters = priceValue || durationValue || tagValue || searchValue;
        
        if (hasActiveFilters) {
            allBtn.classList.remove('active');
        } else {
            allBtn.classList.add('active');
        }
    }

    // Service data for different categories (removed tags, rating, reviews)
    const serviceData = {
        'Акваматик': [
            {title: 'МОЙКА КУЗОВА (КЛАСС 1)', price: '800 ₽', desc: 'Базовая мойка кузова автомобиля с использованием качественных моющих средств. Включает предварительную мойку, основную мойку и ополаскивание.', duration: '25'},
            {title: 'МОЙКА КУЗОВА (КЛАСС 2)', price: '950 ₽', desc: '2-х - 3-х фазная мойка Вашего автомобиля. Профессиональная мойка кузова с использованием качественных моющих средств и защитных составов.', duration: '30'},
            {title: 'КОМПЛЕКСНАЯ МОЙКА', price: '1200 ₽', desc: 'Комплексная мойка кузова с сушкой, мойка колёс и арок, обработка резинок и пластика. Полный комплекс наружной мойки автомобиля.', duration: '50'}
        ],
        'Koch24': [
            {title: 'ДЕТЕЙЛИНГ БАЗОВЫЙ', price: '1500 ₽', desc: 'Базовый комплекс детейлинга включает тщательную мойку, полировку кузова и обработку пластиковых элементов. Идеально для регулярного ухода.', duration: '60'},
            {title: 'ДЕТЕЙЛИНГ ПРЕМИУМ', price: '2500 ₽', desc: 'Премиальный уход за автомобилем с использованием профессиональных средств. Включает глубокую полировку, защитные покрытия и детальную проработку салона.', duration: '90'},
            {title: 'ДЕТЕЙЛИНГ КОМПЛЕКС', price: '3500 ₽', desc: 'Полный комплекс услуг по уходу за интерьером и экстерьером автомобиля. Премиальный уровень обслуживания с гарантией качества.', duration: '120'}
        ],
        'Chisto': [
            {title: 'Премиум КОСН', price: '980 ₽', desc: 'Очистка колесных дисков с чернением резины. Турбосушка и мойка ковриков вашего атомобиля', duration: '60'},
            {title: 'Премиум КОСН ALL', price: '1500 ₽', desc: 'Очистка колесных дисков с чернением резины. Турбосушка и мойка ковриков вашего автомобиля. Пылесос салона и очистка стекол изнутри, также протирка торпедо и обшивки дверей входят в услугу.', duration: '90'},
            {title: 'Евромойка', price: '600 ₽', desc: 'Мойка ковриков вашего автомобиля', duration: '120'},
            {title: 'Евромойка ALL', price: '1050 ₽', desc: 'Мойка ковриков вашего автомобиля. Пылесос салона и очистка стекол изнутри, также протирка торпедо и обшивки дверей входят в услугу.', duration: '90'}
        ]
    };
    
    // Address data for different service types
    const addressData = {
        'Акваматик': [
            {value: "presnya", text: "Пресня - 2-я Звенигородская, 13с43"},
            {value: "ileven", text: "Илевен - Звенигородское ш., 11"},
            {value: "freedom", text: "ФРИДОМ - Шелепихинская наб., 42к1"},
            {value: "d1", text: "Д1 - Дмитровский пр-д, 1"}
        ],
        'Koch24': [
            {value: "detailing_center", text: "Детейлинг Центр - Ленинградский пр-т, 25"},
            {value: "premium_detail", text: "Премиум Детейл - Садовое кольцо, 15к2"},
            {value: "auto_spa", text: "Авто СПА - Кутузовский пр-т, 33"},
            {value: "detail_pro", text: "Детейл Про - Варшавское ш., 42"}
        ],
        'Chisto': [
            {value: "clean_master", text: "Клин Мастер - Профсоюзная ул., 78"},
            {value: "interior_pro", text: "Интерьер Про - Ломоносовский пр-т, 12"},
            {value: "salon_clean", text: "Салон Клин - Рублевское ш., 56"},
            {value: "chem_expert", text: "Хим Эксперт - Каширское ш., 89"}
        ]
    };
    
    // Function to generate star rating HTML
    function generateStarRating(rating, reviews) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let starsHtml = '';
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHtml += '<span class="star filled">★</span>';
            } else if (i === fullStars && hasHalfStar) {
                starsHtml += '<span class="star filled">★</span>';
            } else {
                starsHtml += '<span class="star">★</span>';
        }
    }
    
        return `
            <div class="rating">
                <div class="stars">${starsHtml}</div>
                <span class="rating-text">${rating} (${reviews})</span>
            </div>
        `;
    }
    
    
    // Service cards functionality
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Add tag click functionality to search
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tag')) {
            e.preventDefault();
            e.stopPropagation();
            
            const tagText = e.target.textContent.replace('#', '');
            const searchInput = document.querySelector('.search-bar input');
            
            if (searchInput) {
                searchInput.value = tagText;
                searchInput.focus();
                
                // Trigger search functionality
                const event = new Event('input', { bubbles: true });
                searchInput.dispatchEvent(event);
            }
            
            // Don't open modal when clicking tags
            return false;
        }
    });

    // Navigate to personalized service pages when service card is clicked
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking on a tag
            if (e.target.classList.contains('tag')) {
                return;
            }
            
            const serviceType = this.classList[1];
            const title = this.getAttribute('data-title');
            
            // Map service names to their personalized pages
            const servicePageMap = {
                'Акваматик': 'meatwash.html',
                'Koch24': 'koch24.html',
                'Chisto': 'chisto.html'
            };
            
            // Navigate to personalized service page or fallback to general services page
            const targetPage = servicePageMap[title] || `services.html?type=${encodeURIComponent(serviceType)}&title=${encodeURIComponent(title)}`;
            window.location.href = targetPage;
        });
    });
    
    
    
    
    
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            serviceCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const tags = card.querySelector('.service-tags');
                const tagText = tags ? tags.textContent.toLowerCase() : '';
                
                if (title.includes(searchTerm) || tagText.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            
            updateAllButtonState();
        });
    }
    
    // Filter by price, duration and tags
    const priceDropdown = document.querySelectorAll('.dropdown')[0];
    const durationDropdown = document.querySelectorAll('.dropdown')[1];
    const tagDropdown = document.querySelectorAll('.dropdown')[2];
    
    if (priceDropdown) {
        priceDropdown.querySelectorAll('.dropdown-content div').forEach(item => {
            item.addEventListener('click', function() {
                const priceText = this.textContent;
                priceDropdown.querySelector('.value').textContent = priceText !== 'Все' ? priceText : '';
                filterServices();
                updateAllButtonState();
    });
});
    }
    
    if (durationDropdown) {
        durationDropdown.querySelectorAll('.dropdown-content div').forEach(item => {
            item.addEventListener('click', function() {
                const durationText = this.textContent;
                durationDropdown.querySelector('.value').textContent = durationText !== 'Все' ? durationText : '';
                filterServices();
                updateAllButtonState();
    });
});
    }
    
    if (tagDropdown) {
        tagDropdown.querySelectorAll('.dropdown-content div').forEach(item => {
            item.addEventListener('click', function() {
                const tagText = this.textContent;
                tagDropdown.querySelector('.value').textContent = tagText !== 'Все' ? ': ' + tagText : '';
                filterServices();
                updateAllButtonState();
            });
        });
    }
    
    function filterServices() {
        const priceDropdown = document.querySelectorAll('.dropdown')[0];
        const durationDropdown = document.querySelectorAll('.dropdown')[1];
        const tagDropdown = document.querySelectorAll('.dropdown')[2];
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (!priceDropdown || !durationDropdown || !tagDropdown) return;
        
        const priceValue = priceDropdown.querySelector('.value').textContent;
        const durationValue = durationDropdown.querySelector('.value').textContent;
        const tagValue = tagDropdown.querySelector('.value').textContent.replace(': ', '');
        
        let maxPrice = Infinity;
        let maxDuration = Infinity;
        
        if (priceValue.includes('До 1000')) maxPrice = 1000;
        else if (priceValue.includes('До 3000')) maxPrice = 3000;
        else if (priceValue.includes('До 5000')) maxPrice = 5000;
        
        if (durationValue.includes('До 30 мин')) maxDuration = 30;
        else if (durationValue.includes('До 45 минут')) maxDuration = 45;
        else if (durationValue.includes('До 1 часа')) maxDuration = 60;
        
        serviceCards.forEach(card => {
            const price = parseInt(card.getAttribute('data-price-num'));
            const duration = parseInt(card.getAttribute('data-duration'));
            const tags = card.querySelector('.service-tags');
            const tagText = tags ? tags.textContent.toLowerCase() : '';
            
            const priceMatch = price <= maxPrice;
            const durationMatch = duration <= maxDuration;
            const tagMatch = !tagValue || tagText.includes(tagValue.toLowerCase());
            
            if (priceMatch && durationMatch && tagMatch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        
            const page = this.getAttribute('data-page');
            if (page === 'map') {
                window.location.href = 'maps.html';
            } else if (page === 'index') {
                window.location.href = 'index.html';
            } else if (page === 'profile') {
                window.location.href = 'profile.html';
            }
        });
    });
});