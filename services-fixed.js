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

    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // Initialize Telegram Bot
    const telegramBot = new TelegramBot();

    // Get service type from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const serviceType = urlParams.get('type') || 'Акваматик';
    const serviceTitle = urlParams.get('title') || 'Услуги';

    // Set page title to show the service name
    document.getElementById('service-category-title').textContent = serviceType;

    // Populate service cards
    const serviceGrid = document.getElementById('services-grid');
    if (serviceGrid && serviceData[serviceType]) {
        serviceGrid.innerHTML = '';
        
        serviceData[serviceType].forEach((service, index) => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.innerHTML = `
                <div class="service-info">
                    <h3 class="service-title">${service.title}</h3>
                    <p class="service-description">${service.desc}</p>
                    <div class="service-meta">
                        <span class="price">${service.price}</span>
                        <span class="duration">${service.duration} мин</span>
                    </div>
                </div>
                <button class="book-btn" data-service="${service.title}" data-price="${service.price}" data-duration="${service.duration}">
                    Записаться
                </button>
            `;
            serviceGrid.appendChild(serviceCard);
        });

        // Add click handlers for booking buttons
        const bookButtons = document.querySelectorAll('.book-btn');
        bookButtons.forEach(button => {
            button.addEventListener('click', function() {
                const serviceName = this.getAttribute('data-service');
                const servicePrice = this.getAttribute('data-price');
                const serviceDuration = this.getAttribute('data-duration');
                
                openBookingModal(serviceName, servicePrice, serviceDuration);
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

    // Date generation functionality
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
            
            const dayNames = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
            
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
    }

    // Open booking modal
    function openBookingModal(serviceName, servicePrice, serviceDuration) {
        const bookingModal = document.getElementById('booking-modal');
        if (!bookingModal) return;

        document.getElementById('booking-title').textContent = serviceName;
        document.getElementById('booking-price').textContent = servicePrice;
        document.getElementById('booking-duration').textContent = `${serviceDuration} мин`;
        
        bookingModal.style.display = 'block';
        
        // Generate dates and initialize components
        generateDates();
        initializeTimeSlots();
        updateAddressOptions(serviceType);
    }

    // Close booking modal
    function closeBookingModal() {
        const bookingModal = document.getElementById('booking-modal');
        if (bookingModal) {
            bookingModal.style.display = 'none';
        }
    }

    // Modal close handlers
    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeBookingModal);
    }

    const bookingModal = document.getElementById('booking-modal');
    if (bookingModal) {
        bookingModal.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                closeBookingModal();
            }
        });

        // Booking confirmation
        const confirmBookingBtn = document.querySelector('.confirm-booking-btn');
        if (confirmBookingBtn) {
            confirmBookingBtn.addEventListener('click', function() {
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
                
                // Get current car information (from profile or default)
                const currentCar = {
                    brand: 'BMW',
                    model: 'X5', 
                    regNumber: 'Р927СО777'
                };

                // Prepare booking data for Telegram notification
                const bookingData = {
                    service: document.getElementById('booking-title').textContent,
                    date: date,
                    day: day,
                    month: months[currentMonth],
                    time: time,
                    address: address,
                    car: currentCar
                };

                // Send Telegram notification
                telegramBot.sendBookingConfirmation(bookingData);
                
                bookingModal.style.display = 'none';
            });
        }
    }

    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
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

    // Filter and search functionality
    function initializeFiltersAndSearch() {
        // Toggle filter buttons
        const filterToggleBtn = document.querySelector('.filter-toggle-btn');
        const filterOptions = document.querySelector('.filter-options');
        
        if (filterToggleBtn && filterOptions) {
            filterToggleBtn.addEventListener('click', function() {
                filterOptions.classList.toggle('show');
                this.classList.toggle('active');
            });
        }

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const serviceCards = document.querySelectorAll('.service-card');
                
                serviceCards.forEach(card => {
                    const title = card.querySelector('.service-title').textContent.toLowerCase();
                    const description = card.querySelector('.service-description').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }

        // Filter functionality
        const priceFilter = document.getElementById('price-filter');
        const durationFilter = document.getElementById('duration-filter');
        
        if (priceFilter && durationFilter) {
            [priceFilter, durationFilter].forEach(filter => {
                filter.addEventListener('change', applyFilters);
            });
        }
    }

    function applyFilters() {
        const priceValue = document.getElementById('price-filter').value;
        const durationValue = document.getElementById('duration-filter').value;
        const serviceCards = document.querySelectorAll('.service-card');
        
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

    // Initialize filters and search
    initializeFiltersAndSearch();
});
