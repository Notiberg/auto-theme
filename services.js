document.addEventListener('DOMContentLoaded', function() {
    // Service data for different categories
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
        'Koch 24': [
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

    // Get service type from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const serviceType = urlParams.get('type') || 'АКВАМАТИК';
    const serviceTitle = urlParams.get('title') || 'Услуги';

    // Set page title to show the service name
    document.getElementById('service-category-title').textContent = serviceType;

    // Populate services
    const servicesGrid = document.getElementById('services-grid');
    const services = serviceData[serviceType] || [];

    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card services-page-card';
        serviceCard.setAttribute('data-price', service.price);
        serviceCard.setAttribute('data-duration', service.duration);
        serviceCard.innerHTML = `
            <div class="service-content">
                <h3>${service.title}</h3>
                <div class="price-duration">
                    <span class="price">${service.price}</span>
                    <span class="duration">${service.duration} мин</span>
                </div>
                <div class="service-description">${service.desc}</div>
            </div>
        `;

        serviceCard.addEventListener('click', function() {
            openBookingModal(service, serviceType);
        });

        servicesGrid.appendChild(serviceCard);
    });

    // Booking modal functionality
    const bookingModal = document.getElementById('booking-modal');
    const closeButtons = document.querySelectorAll('.close');
    const backBtn = document.querySelector('.back-btn');

    function openBookingModal(service, serviceType) {
        document.getElementById('booking-title').textContent = service.title;
        
        updateAddressOptions(serviceType);
        generateDates();
        bookingModal.style.display = 'block';
    }

    // Close modal functionality
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            bookingModal.style.display = 'none';
        });
    });

    if (backBtn) {
        backBtn.addEventListener('click', function() {
            bookingModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === bookingModal) {
            bookingModal.style.display = 'none';
        }
    });

    function generateDates() {
        const dateScroll = document.getElementById('date-scroll');
        if (!dateScroll) return;
        
        dateScroll.innerHTML = '';
        
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 3);
        
        for (let i = 0; i < 90; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const dayOfWeek = date.getDay();
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
            
            const dateItem = document.createElement('div');
            dateItem.className = 'date-item';
            dateItem.setAttribute('data-date', `${year}-${month + 1}-${day}`);
            dateItem.setAttribute('data-month', month);
            dateItem.setAttribute('data-year', year);
            
            if (day === 1) {
                dateItem.classList.add('month-separator');
            }
            
            if (date.toDateString() === today.toDateString()) {
                dateItem.classList.add('today');
                dateItem.classList.add('selected');
            }
            
            if (date < today.setHours(0, 0, 0, 0)) {
                dateItem.classList.add('past-date');
                dateItem.style.opacity = '0.5';
                dateItem.style.pointerEvents = 'none';
            }
            
            dateItem.innerHTML = `
                <div class="day">${dayNames[dayOfWeek]}</div>
                <div class="number">${day}</div>
            `;
            
            dateItem.addEventListener('click', function() {
                document.querySelectorAll('.date-item').forEach(d => d.classList.remove('selected'));
                this.classList.add('selected');
            });
            
            dateScroll.appendChild(dateItem);
        }
        
        dateScroll.addEventListener('scroll', updateMonthOnScroll);

        setTimeout(() => {
            const selectedDate = dateScroll.querySelector('.date-item.selected');
            if (selectedDate) {
                selectedDate.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }, 100);
    }
    
    function updateMonthOnScroll() {
        const dateScroll = document.getElementById('date-scroll');
        const currentMonthEl = document.querySelector('.current-month');
        if (!dateScroll || !currentMonthEl) return;
        
        const scrollLeft = dateScroll.scrollLeft;
        const itemWidth = 88;
        const visibleIndex = Math.round(scrollLeft / itemWidth);
        
        const visibleItem = dateScroll.children[visibleIndex];
        if (visibleItem) {
            const monthIndex = parseInt(visibleItem.getAttribute('data-month'));
            if (monthIndex !== undefined && monthIndex !== null) {
                currentMonthEl.textContent = months[monthIndex];
            }
        }
    }

    // Time slots functionality
    function initializeTimeSlots() {
        const timeSlots = document.querySelectorAll('.time-slot');
        timeSlots.forEach(slot => {
            slot.addEventListener('click', function() {
                timeSlots.forEach(s => s.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }

    // Function to update address options based on service type
    function updateAddressOptions(serviceType) {
        const addressSelect = document.querySelector('.address-select');
        if (!addressSelect) return;
        
        addressSelect.innerHTML = '<option value="">Выберите адрес</option>';
        
        const addresses = addressData[serviceType] || [];
        addresses.forEach(address => {
            const option = document.createElement('option');
            option.value = address.value;
            option.textContent = address.text;
            addressSelect.appendChild(option);
        });
    }

    // Date generation functionality
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                   'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    
    const dayNames = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    
    function generateDates() {
        const dateScroll = document.getElementById('date-scroll');
        if (!dateScroll) return;
        
        dateScroll.innerHTML = '';
        
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 3);
        
        for (let i = 0; i < 90; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const dayOfWeek = date.getDay();
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
            
            const dateItem = document.createElement('div');
            dateItem.className = 'date-item';
            dateItem.setAttribute('data-date', `${year}-${month + 1}-${day}`);
            dateItem.setAttribute('data-month', month);
            dateItem.setAttribute('data-year', year);
            
            if (day === 1) {
                dateItem.classList.add('month-separator');
            }
            
            if (date.toDateString() === today.toDateString()) {
                dateItem.classList.add('today');
                dateItem.classList.add('selected');
            }
            
            if (date < today.setHours(0, 0, 0, 0)) {
                dateItem.classList.add('past-date');
                dateItem.style.opacity = '0.5';
                dateItem.style.pointerEvents = 'none';
            }
            
            dateItem.innerHTML = `
                <div class="day">${dayNames[dayOfWeek]}</div>
                <div class="number">${day}</div>
            `;
            
            dateItem.addEventListener('click', function() {
                document.querySelectorAll('.date-item').forEach(d => d.classList.remove('selected'));
                this.classList.add('selected');
            });
            
            dateScroll.appendChild(dateItem);
        }
        
        dateScroll.addEventListener('scroll', updateMonthOnScroll);

        setTimeout(() => {
            const selectedDate = dateScroll.querySelector('.date-item.selected');
            if (selectedDate) {
                selectedDate.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }, 100);
    }
    
    function updateMonthOnScroll() {
        const dateScroll = document.getElementById('date-scroll');
        const currentMonthEl = document.querySelector('.current-month');
        if (!dateScroll || !currentMonthEl) return;
        
        const scrollLeft = dateScroll.scrollLeft;
        const itemWidth = 88;
        const visibleIndex = Math.round(scrollLeft / itemWidth);
        
        const visibleItem = dateScroll.children[visibleIndex];
        if (visibleItem) {
            const monthIndex = parseInt(visibleItem.getAttribute('data-month'));
            if (monthIndex !== undefined && monthIndex !== null) {
                currentMonthEl.textContent = months[monthIndex];
            }
        }
    }

    // Confirm booking button
    const confirmBtn = document.querySelector('.confirm-booking-btn');
    
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            const selectedDate = document.querySelector('.date-item.selected');
            const selectedTime = document.querySelector('.time-slot.selected');
            const selectedAddress = document.querySelector('.address-select').value;
            
            if (!selectedDate || !selectedTime || !selectedAddress) {
                alert('Пожалуйста, выберите дату, время и адрес мойки');
                return;
            }
            
            const date = selectedDate.querySelector('.number').textContent;
            const day = selectedDate.querySelector('.day').textContent;
            const time = selectedTime.textContent;
            const address = document.querySelector('.address-select option:checked').text;
            
            // Send Telegram notification
            sendTelegramNotification({
                service: document.getElementById('booking-title').textContent,
                date: `${day}, ${date} ${months[currentMonth]}`,
                time: time,
                address: address
            });
            
            bookingModal.style.display = 'none';
        });
    }

    // Telegram notification function
    function sendTelegramNotification(bookingData) {
        // Check if Telegram Web App is available
        if (window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            
            // Format notification message
            const message = `🚗 Запись подтверждена!\n\n` +
                          `📋 Услуга: ${bookingData.service}\n` +
                          `📅 Дата: ${bookingData.date}\n` +
                          `⏰ Время: ${bookingData.time}\n` +
                          `📍 Адрес: ${bookingData.address}\n\n` +
                          `✅ Ваша запись успешно оформлена!\n` +
                          `Мы напомним вам за час до визита.`;
            
            // Show confirmation popup
            tg.showPopup({
                title: '✅ Запись подтверждена!',
                message: message,
                buttons: [
                    {
                        id: 'ok',
                        type: 'default',
                        text: 'Отлично!'
                    }
                ]
            }, function(buttonId) {
                if (buttonId === 'ok') {
                    // Send data to bot for notification
                    tg.sendData(JSON.stringify({
                        action: 'booking_confirmed',
                        booking: bookingData,
                        timestamp: new Date().toISOString()
                    }));
                }
            });
            
            // Haptic feedback
            if (tg.HapticFeedback) {
                tg.HapticFeedback.notificationOccurred('success');
            }
            
        } else {
            // Fallback for non-Telegram environment
            alert(`🚗 Запись подтверждена!\n\n` +
                  `📋 Услуга: ${bookingData.service}\n` +
                  `📅 Дата: ${bookingData.date}\n` +
                  `⏰ Время: ${bookingData.time}\n` +
                  `📍 Адрес: ${bookingData.address}\n\n` +
                  `✅ Ваша запись успешно оформлена!`);
        }
    }

    // Navigation functionality - set home as active
    const navItems = document.querySelectorAll('.nav-item');
    
    // Set home button as active
    const homeNavItem = document.querySelector('.nav-item[data-page="index"]');
    if (homeNavItem) {
        homeNavItem.classList.add('active');
    }
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Navigate to appropriate page
            switch(page) {
                case 'index':
                    window.location.href = 'index.html';
                    break;
                case 'map':
                    window.location.href = 'maps.html';
                    break;
                case 'profile':
                    window.location.href = 'profile.html';
                    break;
            }
        });
    });

    // Initialize time slots
    initializeTimeSlots();

    // Filter and search functionality
    initializeFiltersAndSearch();

    function initializeFiltersAndSearch() {
        // Toggle filter buttons
        const filterToggleBtn = document.querySelector('.filter-toggle-btn');
        const filterButtons = document.querySelector('.filter-buttons');
        
        if (filterToggleBtn && filterButtons) {
            filterToggleBtn.addEventListener('click', function() {
                filterButtons.classList.toggle('show-filters');
                document.querySelector('.services-content').classList.toggle('filters-open');
                
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
            
            if (btn) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    document.querySelectorAll('.dropdown').forEach(d => {
                        if (d !== dropdown) {
                            d.classList.remove('show');
                        }
                    });
                    
                    dropdown.classList.toggle('show');
                });
            }
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function() {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
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
        
        // Search functionality
        const searchInput = document.querySelector('.search-bar input');
        
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                const serviceCards = document.querySelectorAll('.services-page-card');
                serviceCards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const desc = card.querySelector('.service-description').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                updateAllButtonState();
            });
        }
        
        // Filter by price and duration
        const priceDropdown = document.querySelectorAll('.dropdown')[0];
        const durationDropdown = document.querySelectorAll('.dropdown')[1];
        
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
    }
    
    function resetAllFilters() {
        const priceDropdown = document.querySelectorAll('.dropdown')[0];
        const durationDropdown = document.querySelectorAll('.dropdown')[1];
        
        if (priceDropdown) {
            priceDropdown.querySelector('.value').textContent = '';
        }
        if (durationDropdown) {
            durationDropdown.querySelector('.value').textContent = '';
        }
        
        // Show all service cards
        const serviceCards = document.querySelectorAll('.services-page-card');
        serviceCards.forEach(card => {
            card.style.display = 'block';
        });
        
        // Clear search input
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.value = '';
        }
    }
    
    function updateAllButtonState() {
        const priceDropdown = document.querySelectorAll('.dropdown')[0];
        const durationDropdown = document.querySelectorAll('.dropdown')[1];
        const allBtn = document.getElementById('all-btn');
        
        if (!allBtn || !priceDropdown || !durationDropdown) return;
        
        const priceValue = priceDropdown.querySelector('.value').textContent;
        const durationValue = durationDropdown.querySelector('.value').textContent;
        const searchValue = document.querySelector('.search-bar input')?.value || '';
        
        const hasActiveFilters = priceValue || durationValue || searchValue;
        
        if (hasActiveFilters) {
            allBtn.classList.remove('active');
        } else {
            allBtn.classList.add('active');
        }
    }
    
    function filterServices() {
        const priceDropdown = document.querySelectorAll('.dropdown')[0];
        const durationDropdown = document.querySelectorAll('.dropdown')[1];
        const serviceCards = document.querySelectorAll('.services-page-card');
        
        if (!priceDropdown || !durationDropdown) return;
        
        const priceValue = priceDropdown.querySelector('.value').textContent;
        const durationValue = durationDropdown.querySelector('.value').textContent;
        
        let maxPrice = Infinity;
        let maxDuration = Infinity;
        
        if (priceValue.includes('До 1000')) maxPrice = 1000;
        else if (priceValue.includes('До 2000')) maxPrice = 2000;
        else if (priceValue.includes('До 3000')) maxPrice = 3000;
        
        if (durationValue.includes('До 30 мин')) maxDuration = 30;
        else if (durationValue.includes('До 60 минут')) maxDuration = 60;
        else if (durationValue.includes('До 90 минут')) maxDuration = 90;
        
        serviceCards.forEach(card => {
            const priceText = card.querySelector('.price').textContent;
            const durationText = card.querySelector('.duration').textContent;
            
            const price = parseInt(priceText.replace(/[^0-9]/g, ''));
            const duration = parseInt(durationText.replace(/[^0-9]/g, ''));
            
            const priceMatch = price <= maxPrice;
            const durationMatch = duration <= maxDuration;
            
            if (priceMatch && durationMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});
