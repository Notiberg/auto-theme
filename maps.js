// Navigation functionality
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        
        // Убираем активное состояние со всех кнопок
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        
        // Добавляем активное состояние к нажатой кнопке
        item.classList.add('active');
        
        if (page === 'index') {
            window.location.href = 'index.html';
        } else if (page === 'map') {
            // Already on map page, no action needed
        }
    });
});

// Переменные для модального окна бронирования
const mapServicesModal = document.getElementById('map-services-modal');
const mapBookingModal = document.getElementById('map-booking-modal');
const mapBookingTitle = document.getElementById('map-booking-title');
const mapBookingPrice = document.getElementById('map-booking-price');
const mapBookingDesc = document.getElementById('map-booking-desc');
const mapBookingAddress = document.getElementById('map-booking-address');
const mapConfirmBooking = document.getElementById('map-confirm-booking');

// Данные об услугах для разных типов сервисов
const servicesData = {
    'Акваматик': {
        'мойка-кузова': {
            title: 'МОЙКА КУЗОВА (КЛАСС 2)',
            price: '900 ₽',
            description: '2-х - 3-х фазная мойка Вашего автомобиля. Профессиональная мойка кузова с использованием качественных моющих средств.'
        },
        'комплексная-мойка': {
            title: 'КОМПЛЕКСНАЯ МОЙКА',
            price: '1200 ₽',
            description: 'Комплексная мойка кузова с сушкой, мойка колёс и арок, обработка резинок и пластика.'
        },
        'химчистка': {
            title: 'ХИМЧИСТКА САЛОНА',
            price: '1800 ₽',
            description: 'Красота и свежий воздух в Вашем автомобиле. Глубокая очистка салона, ковриков и обивки.'
        }
    },
    'Koch24': {
        'детейлинг-базовый': {
            title: 'ДЕТЕЙЛИНГ БАЗОВЫЙ',
            price: '1500 ₽',
            description: 'Базовый комплекс детейлинга включает тщательную мойку, полировку кузова и обработку пластиковых элементов.'
        },
        'детейлинг-премиум': {
            title: 'ДЕТЕЙЛИНГ ПРЕМИУМ',
            price: '2500 ₽',
            description: 'Премиальный уход за автомобилем с использованием профессиональных средств.'
        }
    },
    'Chisto': {
        'премиум-косн': {
            title: 'Премиум КОСН',
            price: '980 ₽',
            description: 'Очистка колесных дисков с чернением резины. Турбосушка и мойка ковриков.'
        },
        'евромойка': {
            title: 'Евромойка',
            price: '600 ₽',
            description: 'Мойка ковриков вашего автомобиля.'
        }
    }
};

// Данные адресов для разных типов сервисов
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

// Карта и метки
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, доступен ли ymaps
    if (typeof ymaps === 'undefined') {
        console.error('Yandex Maps API не загружен');
        return;
    }
    
    ymaps.ready(function () {
        const myMap = new ymaps.Map('map', {
            center: [55.76, 37.64],
            zoom: 10,
            controls: ['zoomControl', 'fullscreenControl']
        });

        // Центры разных типов сервисов с координатами
        const centers = [
            { 
                name: 'Акваматик - Пресня', 
                address: 'ул. 2-я Звенигородская 13с43, Москва',
                coords: [55.7585, 37.5442],
                type: 'Акваматик'
            },
            { 
                name: 'Акваматик - Илевен', 
                address: 'Звенигородское ш., 11, Москва',
                coords: [55.762110, 37.551993],
                type: 'Акваматик'
            },
            { 
                name: 'Koch24 - Детейлинг Центр', 
                address: 'Ленинградский пр-т, 25, Москва',
                coords: [55.767454, 37.498494],
                type: 'Koch24'
            },
            { 
                name: 'Chisto - Клин Мастер', 
                address: 'Профсоюзная ул., 78, Москва',
                coords: [55.808535, 37.578126],
                type: 'Chisto'
            }
        ];

        const buildServiceCardsHtml = (serviceType) => {
            const services = servicesData[serviceType] || {};
            
            return Object.keys(services).map(key => {
                const service = services[key];
                return `
                    <div class="service-card" data-service="${key}" data-service-type="${serviceType}" style="width:100%; cursor: pointer;">
                        <h3>${service.title}</h3>
                        <div class="price">Стоимость: ${service.price}</div>
                        <div class="description">${service.description}</div>
                    </div>
                `;
            }).join('');
        };

        // Добавляем метки напрямую с координатами
        centers.forEach(item => {
            const placemark = new ymaps.Placemark(item.coords, {
                hintContent: item.name
            }, {
                preset: 'islands#icon',
                iconColor: '#EF4B4C',
                // Отключаем balloon (всплывающее окно)
                balloonPanelMaxMapArea: 0
            });

            placemark.events.add('click', () => {
                // Предотвращаем показ balloon
                placemark.balloon.close();
                
                // Переходим на страницу сервисов с услугами Акваматик
                window.location.href = 'services.html?type=Акваматик&title=Акваматик';
            });

            myMap.geoObjects.add(placemark);
        });

        // Вычисляем границы по координатам centers
        const lats = centers.map(c => c.coords[0]);
        const lngs = centers.map(c => c.coords[1]);
        const minLat = Math.min.apply(null, lats);
        const maxLat = Math.max.apply(null, lats);
        const minLng = Math.min.apply(null, lngs);
        const maxLng = Math.max.apply(null, lngs);
        const bounds = [[minLat, minLng], [maxLat, maxLng]];

        // Настраиваем карту, чтобы показать все метки
        if (minLat === maxLat && minLng === maxLng) {
            myMap.setCenter([minLat, minLng], 14, { checkZoomRange: true });
        } else {
            myMap.setBounds(bounds, { checkZoomRange: true, zoomMargin: 40 });
        }

        // Закрытие модала по крестику и по клику вне
        const modal = document.getElementById('map-services-modal');
        if (modal) {
            const closeEl = modal.querySelector('.close');
            closeEl && (closeEl.onclick = () => modal.style.display = 'none');
            window.addEventListener('click', (e) => {
                if (e.target === modal) modal.style.display = 'none';
            });
        }
        
        // Добавляем обработчики для карточек услуг
        modal.addEventListener('click', (e) => {
            const serviceCard = e.target.closest('.service-card');
            if (serviceCard) {
                const serviceKey = serviceCard.dataset.service;
                const serviceType = serviceCard.dataset.serviceType;
                const service = servicesData[serviceType] && servicesData[serviceType][serviceKey];
                
                if (service) {
                    // Закрываем текущее модальное окно
                    modal.style.display = 'none';
                    
                    // Открываем модальное окно бронирования
                    mapBookingTitle.textContent = service.title;
                    mapBookingPrice.textContent = `Цена: ${service.price}`;
                    
                    // Отображаем адрес мойки в заголовке
                    const modalTitle = document.getElementById('map-modal-title');
                    mapBookingAddress.textContent = modalTitle.textContent;
                    
                    // Обновляем адреса в селекте (всегда используем Акваматик для карты)
                    updateAddressOptions('Акваматик');
                    
                    // Сохраняем тип сервиса для дальнейшего использования (всегда Акваматик для карты)
                    mapBookingModal.setAttribute('data-service-type', 'Акваматик');
                    
                    mapBookingModal.style.display = 'block';
                }
            }
        });
    });
});

// Обработчики для модального окна бронирования
if (mapBookingModal) {
    const closeEl = mapBookingModal.querySelector('.close');
    closeEl && (closeEl.onclick = () => mapBookingModal.style.display = 'none');
    
    window.addEventListener('click', (e) => {
        if (e.target === mapBookingModal) mapBookingModal.style.display = 'none';
    });
}

// Обработчик для подтверждения записи
if (mapConfirmBooking) {
    mapConfirmBooking.addEventListener('click', () => {
        const selectedDate = mapBookingModal.querySelector(".date-item.selected");
        const selectedTime = mapBookingModal.querySelector(".time-slot.selected");
        const selectedAddress = mapBookingModal.querySelector(".address-select");
        
        if (selectedDate && selectedTime && selectedAddress.value) {
            const dayNumber = selectedDate.querySelector(".number").textContent;
            const monthName = mapBookingModal.querySelector(".date-month").textContent;
            const addressText = selectedAddress.options[selectedAddress.selectedIndex].text;
            const serviceTitle = mapBookingTitle.textContent;
            const servicePrice = mapBookingPrice.textContent;
            
            // Показываем красивое уведомление
            showBookingNotification({
                service: serviceTitle,
                price: servicePrice,
                date: `${dayNumber} ${monthName}`,
                time: selectedTime.textContent,
                address: addressText
            });
            
            mapBookingModal.style.display = "none";
        } else {
            let missingFields = [];
            if (!selectedDate) missingFields.push("дату");
            if (!selectedTime) missingFields.push("время");
            if (!selectedAddress.value) missingFields.push("адрес мойки");
            
            alert(`Пожалуйста, выберите: ${missingFields.join(", ")}`);
        }
    });
}

// Функция для обновления адресов в селекте
function updateAddressOptions(serviceType) {
    const addressSelect = mapBookingModal.querySelector('.address-select');
    if (!addressSelect) return;
    
    addressSelect.innerHTML = '<option value="">Выберите адрес мойки</option>';
    
    const addresses = addressData[serviceType] || [];
    addresses.forEach(address => {
        const option = document.createElement('option');
        option.value = address.value;
        option.textContent = address.text;
        addressSelect.appendChild(option);
    });
}

// Функция для показа красивого уведомления
function showBookingNotification(bookingData) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'booking-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-header">
                <div class="success-icon">✅</div>
                <h3>Запись подтверждена!</h3>
            </div>
            <div class="notification-body">
                <div class="booking-details">
                    <div class="detail-item">
                        <span class="detail-label">Услуга:</span>
                        <span class="detail-value">${bookingData.service}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Цена:</span>
                        <span class="detail-value">${bookingData.price}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Дата:</span>
                        <span class="detail-value">${bookingData.date}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Время:</span>
                        <span class="detail-value">${bookingData.time}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Адрес:</span>
                        <span class="detail-value">${bookingData.address}</span>
                    </div>
                </div>
                <div class="notification-message">
                    Ваша запись успешно оформлена! Мы напомним вам за час до визита.
                </div>
            </div>
            <button class="notification-close-btn">Отлично!</button>
        </div>
    `;
    
    // Добавляем уведомление в DOM
    document.body.appendChild(notification);
    
    // Показываем уведомление с анимацией
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Обработчик закрытия уведомления
    const closeBtn = notification.querySelector('.notification-close-btn');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Обработчики для выбора даты и времени
document.addEventListener('DOMContentLoaded', () => {
    // Обработчики для выбора даты
    if (mapBookingModal) {
        const dateItems = mapBookingModal.querySelectorAll('.date-item');
        dateItems.forEach(item => {
            item.addEventListener('click', () => {
                dateItems.forEach(d => d.classList.remove('selected'));
                item.classList.add('selected');
            });
        });
        
        // Обработчики для выбора времени
        const timeSlots = mapBookingModal.querySelectorAll('.time-slot');
        timeSlots.forEach(slot => {
            slot.addEventListener('click', () => {
                timeSlots.forEach(s => s.classList.remove('selected'));
                slot.classList.add('selected');
            });
        });
        
        // Обработчики для навигации по месяцам
        const prevMonthArrow = mapBookingModal.querySelector('.prev-month');
        const nextMonthArrow = mapBookingModal.querySelector('.next-month');
        const currentMonthElement = mapBookingModal.querySelector('.date-month');
        
        if (prevMonthArrow && nextMonthArrow && currentMonthElement) {
            let currentMonthIndex = new Date().getMonth();
            const months = [
                "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
            ];
            
            prevMonthArrow.addEventListener('click', () => {
                const today = new Date();
                const currentDate = new Date(new Date().getFullYear(), currentMonthIndex, 1);
                
                if (currentDate > today) {
                    currentMonthIndex--;
                    if (currentMonthIndex < 0) {
                        currentMonthIndex = 11;
                    }
                    currentMonthElement.textContent = months[currentMonthIndex];
                }
            });
            
            nextMonthArrow.addEventListener('click', () => {
                currentMonthIndex++;
                if (currentMonthIndex > 11) {
                    currentMonthIndex = 0;
                }
                currentMonthElement.textContent = months[currentMonthIndex];
            });
        }
    }
});

// Обработчики для модального окна услуг
if (mapServicesModal) {
    const closeEl = mapServicesModal.querySelector('.close');
    closeEl && (closeEl.onclick = () => mapServicesModal.style.display = 'none');
    
    window.addEventListener('click', (e) => {
        if (e.target === mapServicesModal) mapServicesModal.style.display = 'none';
    });

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
                    // Already on map page
                    break;
                case 'profile':
                    window.location.href = 'profile.html';
                    break;
            }
        });
    });
}
