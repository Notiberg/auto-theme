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

// Данные об услугах
const servicesData = {
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
    },
    'полировка': {
        title: 'ПОЛИРОВКА КУЗОВА',
        price: '2000 ₽',
        description: 'Ваш автомобиль будет выглядеть как новый. Профессиональная полировка кузова для восстановления блеска и устранения мелких дефектов.'
    },
    'мойка-двигателя': {
        title: 'МОЙКА ДВИГАТЕЛЯ',
        price: '800 ₽',
        description: 'Профессиональная мойка двигателя и подкапотного пространства. Безопасная очистка с использованием специальных средств.'
    },
    'мойка-стекол': {
        title: 'МОЙКА СТЕКОЛ',
        price: '300 ₽',
        description: 'Профессиональная мойка всех стёкол автомобиля. Удаление разводов и обеспечение идеальной видимости.'
    }
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

        // Адреса центров GetWash с точными координатами
        const centers = [
            { 
                name: 'Центр на Пресне', 
                address: 'ул. 2-я Звенигородская 13с43, Москва',
                coords: [55.7585, 37.5442]
            },
            { 
                name: 'Центр в ЖК Илевен', 
                address: 'Звенигородское ш., 11, Москва',
                coords: [55.762110, 37.551993]
            },
            { 
                name: 'Центр в ЖК ФРИДОМ', 
                address: 'Шелепихинская наб., 42к1, Москва',
                coords: [55.767454, 37.498494]
            },
            { 
                name: 'Центр в ЖК Д1', 
                address: 'Дмитровский пр-д, 1, Москва',
                coords: [55.808535, 37.578126]
            }
        ];

        const buildServiceCardsHtml = () => {
            const services = [
                { key: 'мойка-кузова', title: 'МОЙКА КУЗОВА (КЛАСС 2)', price: '900 ₽', description: '2-х - 3-х фазная мойка Вашего автомобиля.' },
                { key: 'комплексная-мойка', title: 'КОМПЛЕКСНАЯ МОЙКА', price: '1200 ₽', description: 'Мойка с сушкой, колёса и арки, обработка резинок.' },
                { key: 'химчистка', title: 'ХИМЧИСТКА САЛОНА', price: '1800 ₽', description: 'Глубокая очистка салона и ковриков.' },
                { key: 'полировка', title: 'ПОЛИРОВКА КУЗОВА', price: '2000 ₽', description: 'Восстановление блеска, устранение мелких дефектов.' },
                { key: 'мойка-двигателя', title: 'МОЙКА ДВИГАТЕЛЯ', price: '800 ₽', description: 'Безопасная очистка подкапотного пространства.' },
                { key: 'мойка-стекол', title: 'МОЙКА СТЕКОЛ', price: '300 ₽', description: 'Чистые стёкла без разводов, идеальная видимость.' }
            ];
            
            return services.map(service => `
                <div class="service-card" data-service="${service.key}" style="width:100%; cursor: pointer;">
                    <h3>${service.title}</h3>
                    <div class="price">Стоимость: ${service.price}</div>
                    <div class="description">${service.description}</div>
                </div>
            `).join('');
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
                
                // Переходим на страницу сервисов для Акваматика
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
                const service = servicesData[serviceKey];
                if (service) {
                    // Закрываем текущее модальное окно
                    modal.style.display = 'none';
                    
                    // Открываем модальное окно бронирования
                    mapBookingTitle.textContent = service.title;
                    mapBookingPrice.textContent = `Цена: ${service.price}`;
                    mapBookingDesc.textContent = service.description;
                    
                    // Отображаем адрес мойки в заголовке
                    // Нужно получить адрес из заголовка модального окна
                    const modalTitle = document.getElementById('map-modal-title');
                    mapBookingAddress.textContent = modalTitle.textContent;
                    
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
            alert(`Запись подтверждена!\nДата: ${dayNumber} ${monthName}\nВремя: ${selectedTime.textContent}\nАдрес: ${addressText}`);
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
