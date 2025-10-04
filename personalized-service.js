// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const serviceType = document.body.getAttribute('data-service');
    if (serviceType && servicesConfig[getServiceKey(serviceType)]) {
        initializePersonalizedService(serviceType);
    }
    
    // Глобальная инициализация фильтров как запасной вариант
    setTimeout(() => {
        console.log('Global filter initialization...');
        const filterToggleBtn = document.querySelector('.filter-toggle-btn');
        const filterButtons = document.querySelector('.filter-buttons');
        
        if (filterToggleBtn && filterButtons && !filterToggleBtn.hasAttribute('data-initialized')) {
            console.log('Adding global filter listener');
            filterToggleBtn.setAttribute('data-initialized', 'true');
            
            filterToggleBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Global filter toggle clicked!');
                
                filterButtons.classList.toggle('show-filters');
                
                if (filterButtons.classList.contains('show-filters')) {
                    this.classList.add('active');
                } else {
                    this.classList.remove('active');
                }
            });
        }
    }, 1000);
});

// Функция для получения ключа сервиса
function getServiceKey(serviceType) {
    const mapping = {
        'meatwash': 'meatwash',
        'akvamatik': 'Акваматик',
        'koch24': 'Koch24',
        'chisto': 'Chisto'
    };
    return mapping[serviceType] || serviceType;
}

// Функция для получения имени сервиса по типу
function getServiceNameByType(type) {
    const mapping = {
        'meatwash': 'meatwash',
        'akvamatik': 'Акваматик',
        'koch24': 'Koch24',
        'chisto': 'Chisto'
    };
    return mapping[type] || type;
}

// Инициализация персонализированного сервиса
function initializePersonalizedService(serviceType) {
    const serviceName = getServiceKey(serviceType);
    const config = servicesConfig[serviceName];
    
    if (!config) {
        console.error('Service configuration not found for:', serviceType);
        return;
    }
    // Инициализируем страницу
    initializeServicePage(config);
    
    // Загружаем услуги
    loadServices(config);
    
    // Инициализируем фильтры
    initializeFilters();
    
    // Принудительная инициализация через задержку
    setTimeout(() => {
        console.log('Re-initializing filters after delay...');
        initializeFilters();
    }, 500);
    
    // Инициализируем поиск
    initializeSearch();
    
    // Инициализируем модальное окно бронирования
    initializeBookingModal(config);
}

// Инициализация страницы сервиса
function initializeServicePage(config) {
    // Обновляем заголовок и подзаголовок
    const serviceTitle = document.getElementById('service-title');
    const serviceSubtitle = document.getElementById('service-subtitle');
    const serviceLogo = document.getElementById('service-logo');
    const workingHours = document.getElementById('working-hours');
    const serviceRating = document.getElementById('service-rating');
    const serviceTags = document.getElementById('service-tags');
    
    if (serviceTitle && !serviceTitle.querySelector('.logo-image')) serviceTitle.textContent = config.title;
    if (serviceSubtitle) serviceSubtitle.textContent = config.subtitle;
    if (serviceLogo) serviceLogo.textContent = config.logo;
    if (workingHours) workingHours.textContent = config.workingHours;
    if (serviceRating) serviceRating.textContent = `${config.rating.score} (${config.rating.reviews})`;
    
    // Обновляем звезды рейтинга
    const starsContainer = document.getElementById('service-stars');
    if (starsContainer) {
        updateStars(starsContainer, config.rating.score);
    }
    
    // Обновляем теги
    if (serviceTags) {
        serviceTags.innerHTML = config.tags.map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');
    }
    
    // Обновляем заголовок страницы
    document.title = `${config.title} - ${config.subtitle}`;
}

// Функция для обновления звезд рейтинга
function updateStars(container, rating) {
    const stars = container.querySelectorAll('.star');
    const fullStars = Math.floor(rating);
    
    stars.forEach((star, index) => {
        if (index < fullStars) {
            star.classList.add('filled');
        } else {
            star.classList.remove('filled');
        }
    });
}

// Загрузка услуг
function loadServices(config) {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = '';
    
    config.services.forEach(service => {
        const serviceElement = createServiceElement(service, config);
        servicesGrid.appendChild(serviceElement);
    });
}

// Создание элемента услуги
function createServiceElement(service, config) {
    const serviceDiv = document.createElement('div');
    serviceDiv.className = 'service-item';
    serviceDiv.setAttribute('data-category', service.category);
    serviceDiv.setAttribute('data-price', service.price);
    serviceDiv.setAttribute('data-duration', service.duration);
    
    // Добавляем специальные классы для категорий услуг
    if (config.id === 'meatwash') {
        // Логика для MeatWash
        if (service.category === 'detailing' && service.price > 7000) {
            serviceDiv.classList.add('premium');
        }
    } else {
        // Логика для других сервисов
        if (service.price > 5000) {
            serviceDiv.classList.add('premium');
        }
        if (service.category === 'interior' && config.id === 'chisto') {
            serviceDiv.classList.add('eco-friendly');
        }
    }
    
    // Функция для форматирования описания с поддержкой списков
    function formatDescription(description) {
        // Разделяем описание по точке с запятой и создаем список
        if (description.includes(';')) {
            const parts = description.split(';').map(part => part.trim()).filter(part => part.length > 0);
            if (parts.length > 1) {
                const intro = parts[0];
                const listItems = parts.slice(1);
                return `
                    <div class="description-intro">${intro}:</div>
                    <ul class="description-list">
                        ${listItems.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                `;
            }
        }
        return description;
    }

    serviceDiv.innerHTML = `
        <h3>${service.name}</h3>
        <div class="service-description">${formatDescription(service.description)}</div>
        <div class="price-duration-row">
            <div class="service-price">${service.price} ₽</div>
            <div class="service-duration">${service.duration} минут</div>
        </div>
        <div class="service-tags">
            ${service.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
        </div>
        <button class="book-btn">
            Записаться
        </button>
    `;
    
    // Добавляем обработчик события после создания элемента
    const bookBtn = serviceDiv.querySelector('.book-btn');
    if (bookBtn) {
        bookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Book button clicked for service:', service.name);
            openBookingModal(service.name, service.price, service.duration);
        });
    }
    
    return serviceDiv;
}

// Инициализация фильтров - точная копия из script.js
function initializeFilters() {
    console.log('Initializing filters...');
    
    // Toggle filter buttons
    const filterToggleBtn = document.querySelector('.filter-toggle-btn');
    const filterButtons = document.querySelector('.filter-buttons');
    
    console.log('Filter elements:', { filterToggleBtn, filterButtons });
    
    if (filterToggleBtn && filterButtons) {
        console.log('Adding click listener to filter toggle button');
        
        // Убираем все предыдущие обработчики
        const newBtn = filterToggleBtn.cloneNode(true);
        filterToggleBtn.parentNode.replaceChild(newBtn, filterToggleBtn);
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Filter toggle clicked!');
            
            filterButtons.classList.toggle('show-filters');
            console.log('Filter buttons classes:', filterButtons.className);
            
            const contentElement = document.querySelector('.content') || document.querySelector('.services-content');
            if (contentElement) {
                contentElement.classList.toggle('filters-open');
                console.log('Content element classes:', contentElement.className);
            }
            
            if (filterButtons.classList.contains('show-filters')) {
                this.classList.add('active');
                console.log('Filters shown');
            } else {
                this.classList.remove('active');
                console.log('Filters hidden');
            }
        });
    } else {
        console.error('Filter elements not found!');
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
    
    // Handle dropdown item selection
    const dropdowns2 = document.querySelectorAll('.dropdown');
    dropdowns2.forEach(dropdown => {
        const content = dropdown.querySelector('.dropdown-content');
        const btn = dropdown.querySelector('.filter-btn');
        
        if (content && btn) {
            content.addEventListener('click', function(e) {
                if (e.target.tagName === 'DIV') {
                    const value = e.target.textContent;
                    const valueSpan = btn.querySelector('.value');
                    
                    if (valueSpan) {
                        valueSpan.textContent = value === 'Все' ? '' : value;
                    }
                    
                    dropdown.classList.remove('show');
                    if (typeof applyFilters === 'function') {
                        applyFilters();
                    }
                }
            });
        }
    });
    
    // All button functionality
    const allBtn = document.getElementById('all-btn');
    if (allBtn) {
        allBtn.addEventListener('click', function() {
            if (typeof resetAllFilters === 'function') {
                resetAllFilters();
            }
        });
    }
}

// Применение фильтров
function applyFilters() {
    const priceFilter = document.querySelector('.dropdown .filter-btn .value').textContent;
    const durationFilter = document.querySelectorAll('.dropdown .filter-btn .value')[1]?.textContent;
    const categoryFilter = document.querySelectorAll('.dropdown .filter-btn .value')[2]?.textContent;
    
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        let show = true;
        
        // Price filter
        if (priceFilter && priceFilter !== 'Все') {
            const price = parseInt(item.getAttribute('data-price'));
            const maxPrice = parseInt(priceFilter.replace(/\D/g, ''));
            
            if (priceFilter.includes('Свыше')) {
                show = show && price > maxPrice;
            } else {
                show = show && price <= maxPrice;
            }
        }
        
        // Duration filter
        if (durationFilter && durationFilter !== 'Все') {
            const duration = parseInt(item.getAttribute('data-duration'));
            const maxDuration = parseInt(durationFilter.replace(/\D/g, ''));
            
            if (durationFilter.includes('Свыше')) {
                show = show && duration > maxDuration;
            } else {
                show = show && duration <= maxDuration;
            }
        }
        
        // Category filter
        if (categoryFilter && categoryFilter !== 'Все') {
            const category = item.getAttribute('data-category');
            const filterMap = {
                'Мойка': 'wash',
                'Детейлинг': 'detailing',
                'Комплекс': 'complex',
                'Салон': 'interior',
                'Химчистка': 'interior',
                'Полировка': 'polish'
            };
            
            show = show && category === filterMap[categoryFilter];
        }
        
        item.style.display = show ? 'block' : 'none';
    });
}

// Сброс всех фильтров
function resetAllFilters() {
    const valueSpans = document.querySelectorAll('.dropdown .filter-btn .value');
    valueSpans.forEach(span => {
        span.textContent = '';
    });
    
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.style.display = 'block';
    });
    
    // Clear search
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.value = '';
    }
}

// Инициализация поиска
function initializeSearch() {
    const searchInput = document.querySelector('.search-bar input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const serviceItems = document.querySelectorAll('.service-item');
        
        serviceItems.forEach(item => {
            const name = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('.service-description').textContent.toLowerCase();
            const tags = Array.from(item.querySelectorAll('.service-tags .tag'))
                .map(tag => tag.textContent.toLowerCase());
            
            const matches = name.includes(query) || 
                          description.includes(query) || 
                          tags.some(tag => tag.includes(query));
            
            item.style.display = matches ? 'block' : 'none';
        });
    });
}

// Открытие модального окна бронирования
window.openBookingModal = function openBookingModal(serviceName, price, duration) {
    console.log('openBookingModal called with:', { serviceName, price, duration });
    
    const modal = document.getElementById('booking-modal');
    const bookingTitle = document.getElementById('booking-title');
    const bookingPrice = document.getElementById('booking-price');
    
    console.log('Modal elements found:', { modal: !!modal, bookingTitle: !!bookingTitle, bookingPrice: !!bookingPrice });
    
    if (modal && bookingTitle && bookingPrice) {
        bookingTitle.textContent = serviceName;
        bookingPrice.textContent = `${price} ₽`;
        
        modal.style.display = 'block';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        console.log('Modal opened successfully');
        
        // Generate dates with small delay to ensure modal is rendered
        setTimeout(() => {
            generateDates();
        }, 100);
    } else {
        console.error('Modal elements not found!', { modal, bookingTitle, bookingPrice });
    }
}

// Инициализация модального окна бронирования
function initializeBookingModal(config) {
    const modal = document.getElementById('booking-modal');
    const closeBtn = modal?.querySelector('.close');
    const backBtn = modal?.querySelector('.back-btn');
    
    // Populate addresses
    const addressSelect = document.getElementById('address-select');
    if (addressSelect && config.addresses) {
        addressSelect.innerHTML = '<option value="">Выберите адрес мойки</option>';
        config.addresses.forEach(address => {
            const option = document.createElement('option');
            option.value = address.id;
            option.textContent = `${address.name} - ${address.address}`;
            addressSelect.appendChild(option);
        });
    }
    
    // Закрытие модального окна при клике на кнопки
    if (closeBtn) {
        closeBtn.addEventListener('click', closeBookingModal);
    }
    
    if (backBtn) {
        backBtn.addEventListener('click', closeBookingModal);
    }
    
    // Обработчик для кнопки подтверждения записи
    const confirmBtn = document.querySelector('.confirm-booking-btn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', handleBookingConfirmation);
    }
    
    // Click outside to close
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeBookingModal();
            }
            // Prevent event propagation
            e.stopPropagation();
        });
    }
    
    // Time slot selection
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            timeSlots.forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Старый обработчик удален - используется новый handleBookingConfirmation
}

// Закрытие модального окна
function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        console.log('Modal closed');
    }
}

// Показать окно подтверждения записи
function showConfirmationModal(bookingData) {
    const modal = document.getElementById('confirmation-modal');
    if (!modal) return;

    // Заполняем данные
    document.getElementById('conf-date').textContent = bookingData.date || 'Не выбрана';
    document.getElementById('conf-time').textContent = bookingData.time || 'Не выбрано';
    document.getElementById('conf-address').textContent = bookingData.address || 'Не выбран';
    document.getElementById('conf-service-name').textContent = bookingData.serviceName || 'Не указана';
    document.getElementById('conf-price').textContent = bookingData.price || 'Не указана';
    
    // Попытка получить информацию об автомобиле из localStorage
    const userCar = localStorage.getItem('userCar') || 'Не указан';
    document.getElementById('conf-car').textContent = userCar;

    // Показываем модальное окно
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Автоматически закрываем через 7 секунд
    setTimeout(() => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }, 7000);
}

// Обработка подтверждения записи
function handleBookingConfirmation() {
    const selectedDate = document.querySelector('.date-item.selected');
    const selectedTime = document.querySelector('.time-slot.selected');
    const selectedAddress = document.getElementById('address-select');
    const serviceName = document.getElementById('booking-title').textContent;
    const servicePrice = document.getElementById('booking-price').textContent;

    if (!selectedDate || !selectedTime || !selectedAddress.value) {
        alert('⚠️ Пожалуйста, выберите дату, время и адрес');
        return;
    }

    // Собираем данные для подтверждения
    const bookingData = {
        date: selectedDate.querySelector('.day-number').textContent + ' ' + 
              selectedDate.querySelector('.month-name').textContent,
        time: selectedTime.textContent,
        address: selectedAddress.options[selectedAddress.selectedIndex].text,
        serviceName: serviceName,
        price: servicePrice
    };

    // Закрываем модальное окно бронирования
    closeBookingModal();

    // Показываем окно подтверждения
    setTimeout(() => {
        showConfirmationModal(bookingData);
    }, 300);
}

// Генерация дат
function generateDates() {
    const dateScroll = document.getElementById('date-scroll');
    if (!dateScroll) {
        console.log('date-scroll element not found');
        return;
    }
    
    dateScroll.innerHTML = '';
    
    const today = new Date();
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    
    for (let i = 0; i < 60; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const dateItem = document.createElement('div');
        dateItem.className = 'date-item';
        if (i === 0) dateItem.classList.add('selected');
        
        dateItem.innerHTML = `
            <div class="day-name">${days[date.getDay()]}</div>
            <div class="day-number">${date.getDate()}</div>
            <div class="month-name">${months[date.getMonth()]}</div>
        `;
        
        dateItem.addEventListener('click', function() {
            document.querySelectorAll('.date-item').forEach(item => {
                item.classList.remove('selected');
            });
            this.classList.add('selected');
        });
        
        dateScroll.appendChild(dateItem);
    }
}

// Инициализация навигации
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
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
}
