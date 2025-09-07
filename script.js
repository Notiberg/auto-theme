document.addEventListener('DOMContentLoaded', function() {
    // Toggle filter buttons
    const filterToggleBtn = document.querySelector('.filter-toggle-btn');
    const filterButtons = document.querySelector('.filter-buttons');
    
    filterToggleBtn.addEventListener('click', function() {
        filterButtons.classList.toggle('show-filters');
        document.querySelector('.content').classList.toggle('filters-open');
        
        if (filterButtons.classList.contains('show-filters')) {
            this.classList.add('active');
        } else {
            this.classList.remove('active');
        }
    });
    
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
        'мойка': [
            {title: 'МОЙКА КУЗОВА (КЛАСС 1)', price: '800 ₽', desc: 'Базовая мойка кузова автомобиля с использованием качественных моющих средств. Включает предварительную мойку, основную мойку и ополаскивание.', duration: '25'},
            {title: 'МОЙКА КУЗОВА (КЛАСС 2)', price: '950 ₽', desc: '2-х - 3-х фазная мойка Вашего автомобиля. Профессиональная мойка кузова с использованием качественных моющих средств и защитных составов.', duration: '30'},
            {title: 'КОМПЛЕКСНАЯ МОЙКА', price: '1200 ₽', desc: 'Комплексная мойка кузова с сушкой, мойка колёс и арок, обработка резинок и пластика. Полный комплекс наружной мойки автомобиля.', duration: '50'}
        ],
        'детейлинг': [
            {title: 'ДЕТЕЙЛИНГ БАЗОВЫЙ', price: '1500 ₽', desc: 'Базовый комплекс детейлинга включает тщательную мойку, полировку кузова и обработку пластиковых элементов. Идеально для регулярного ухода.', duration: '60'},
            {title: 'ДЕТЕЙЛИНГ ПРЕМИУМ', price: '2500 ₽', desc: 'Премиальный уход за автомобилем с использованием профессиональных средств. Включает глубокую полировку, защитные покрытия и детальную проработку салона.', duration: '90'},
            {title: 'ДЕТЕЙЛИНГ КОМПЛЕКС', price: '3500 ₽', desc: 'Полный комплекс услуг по уходу за интерьером и экстерьером автомобиля. Премиальный уровень обслуживания с гарантией качества.', duration: '120'}
        ],
        'химчистка': [
            {title: 'Премиум КОСН', price: '980 ₽', desc: 'Очистка колесных дисков с чернением резины. Турбосушка и мойка ковриков вашего атомобиля', duration: '60'},
            {title: 'Премиум КОСН ALL', price: '1500 ₽', desc: 'Очистка колесных дисков с чернением резины. Турбосушка и мойка ковриков вашего автомобиля. Пылесос салона и очистка стекол изнутри, также протирка торпедо и обшивки дверей входят в услугу.', duration: '90'},
            {title: 'Евромойка', price: '600 ₽', desc: 'Мойка ковриков вашего автомобиля', duration: '120'},
            {title: 'Евромойка ALL', price: '1050 ₽', desc: 'Мойка ковриков вашего автомобиля. Пылесос салона и очистка стекол изнутри, также протирка торпедо и обшивки дверей входят в услугу.', duration: '90'}
        ]
    };
    
    // Address data for different service types
    const addressData = {
        'мойка': [
            {value: "presnya", text: "Пресня - 2-я Звенигородская, 13с43"},
            {value: "ileven", text: "Илевен - Звенигородское ш., 11"},
            {value: "freedom", text: "ФРИДОМ - Шелепихинская наб., 42к1"},
            {value: "d1", text: "Д1 - Дмитровский пр-д, 1"}
        ],
        'детейлинг': [
            {value: "detailing_center", text: "Детейлинг Центр - Ленинградский пр-т, 25"},
            {value: "premium_detail", text: "Премиум Детейл - Садовое кольцо, 15к2"},
            {value: "auto_spa", text: "Авто СПА - Кутузовский пр-т, 33"},
            {value: "detail_pro", text: "Детейл Про - Варшавское ш., 42"}
        ],
        'химчистка': [
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
        startDate.setDate(today.getDate() - 3); // Show a few days before today
        
        // Generate 90 days starting from a few days ago
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
            
            // Add month separator for first day of month
            if (day === 1) {
                dateItem.classList.add('month-separator');
            }
            
            // Mark today as selected by default
            if (date.toDateString() === today.toDateString()) {
                dateItem.classList.add('selected');
            }
            
            // Skip past dates (make them non-clickable)
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
        
        // Add scroll event listener to update month display
        dateScroll.addEventListener('scroll', updateMonthOnScroll);

        // Scroll to current date
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
        const itemWidth = 88; // Approximate width of date item + gap
        const visibleIndex = Math.round(scrollLeft / itemWidth);
        
        const visibleItem = dateScroll.children[visibleIndex];
        if (visibleItem) {
            const monthIndex = parseInt(visibleItem.getAttribute('data-month'));
            if (monthIndex !== undefined && monthIndex !== null) {
                currentMonthEl.textContent = months[monthIndex];
            }
        }
    }
    
    function updateMonthDisplay() {
        const currentMonthEl = document.querySelector('.current-month');
        if (currentMonthEl) {
            currentMonthEl.textContent = months[currentMonth];
        }
        generateDates();
    }
    
    // Initialize current month display
    function initializeMonthDisplay() {
        const currentMonthEl = document.querySelector('.current-month');
        if (currentMonthEl) {
            currentMonthEl.textContent = months[new Date().getMonth()];
        }
    }
    
    // Modal functionality
    const modal = document.getElementById('modal');
    const bookingModal = document.getElementById('booking-modal');
    const closeButtons = document.querySelectorAll('.close');
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

    // Open service selection modal
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking on a tag
            if (e.target.classList.contains('tag')) {
                return;
            }
            
            const serviceType = this.classList[1];
            const title = this.getAttribute('data-title');
            
            document.getElementById('modal-title').textContent = 'Выберите услугу';
            
            // Clear previous services
            const modalServices = document.getElementById('modal-services');
            modalServices.innerHTML = '';
            
            // Add services of the selected type
            const services = serviceData[serviceType] || [];
            services.forEach(service => {
                const serviceCard = document.createElement('div');
                serviceCard.className = 'service-card modal-service-card';
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
                
                serviceCard.addEventListener('click', function(e) {
                    e.stopPropagation();
                    modal.style.display = 'none';
                    
                    // Set booking modal data
                    document.getElementById('booking-title').textContent = service.title;
                    document.getElementById('booking-price').textContent = service.price;
                    
                    // Update modal service name to match the selected service
                    const modalServiceName = document.getElementById('modal-service-name');
                    if (modalServiceName) {
                        modalServiceName.textContent = service.title;
                    }

                    // Set description
                    const bookingDesc = document.getElementById('booking-desc');
                    bookingDesc.textContent = service.desc;
                    
                    // Update address options based on service type
                    updateAddressOptions(serviceType);
                    
                    // Generate dates and show booking modal
                    generateDates();
                    bookingModal.style.display = 'block';
                });
                
                modalServices.appendChild(serviceCard);
            });
            
            modal.style.display = 'block';
        });
    });
    
    // Close modals
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.style.display = 'none';
            bookingModal.style.display = 'none';
        });
    });
    
    // Back button functionality
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            bookingModal.style.display = 'none';
            modal.style.display = 'block';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
        if (event.target === bookingModal) {
            bookingModal.style.display = 'none';
    }
    });
    
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
    
    // Month navigation
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            if (currentMonth === 0) {
                currentMonth = 11;
                currentYear--;
            } else {
                currentMonth--;
            }
            updateMonthDisplay();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            if (currentMonth === 11) {
                currentMonth = 0;
                currentYear++;
            } else {
                currentMonth++;
            }
            updateMonthDisplay();
        });
    }
    
    // Initialize time slots
    initializeTimeSlots();
    
    // Function to update address options based on service type
    function updateAddressOptions(serviceType) {
        const addressSelect = document.querySelector('.address-select');
        if (!addressSelect) return;
        
        // Clear existing options except the first one
        addressSelect.innerHTML = '<option value="">Выберите адрес</option>';
        
        // Add addresses for the specific service type
        const addresses = addressData[serviceType] || [];
        addresses.forEach(address => {
            const option = document.createElement('option');
            option.value = address.value;
            option.textContent = address.text;
            addressSelect.appendChild(option);
});
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
            
            alert(`Запись подтверждена!\n\nУслуга: ${document.getElementById('booking-title').textContent}\nДата: ${day}, ${date} ${months[currentMonth]}\nВремя: ${time}\nАдрес: ${address}`);
            
            // Close modal
            bookingModal.style.display = 'none';
        });
    }
    
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
                // Check if maps.html exists, if not stay on current page
                fetch('maps.html')
                    .then(response => {
                        if (response.ok) {
            window.location.href = 'maps.html';
                        } else {
                            // If maps.html doesn't exist, show alert or handle gracefully
                            alert('Карта временно недоступна');
                            // Reset active state to home
                            navItems.forEach(nav => nav.classList.remove('active'));
                            document.querySelector('[data-page="index"]').classList.add('active');
                        }
                    })
                    .catch(() => {
                        // If fetch fails, show alert
                        alert('Карта временно недоступна');
                        // Reset active state to home
                        navItems.forEach(nav => nav.classList.remove('active'));
                        document.querySelector('[data-page="index"]').classList.add('active');
                    });
        }
    });
});
});