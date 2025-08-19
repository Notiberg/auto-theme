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

// Карта и метки
document.addEventListener('DOMContentLoaded', () => {
    ymaps.ready(function () {
        const myMap = new ymaps.Map('map', {
            center: [55.76, 37.64],
            zoom: 10
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
            return `
                <div class=\"service-card\" style=\"width:100%\">
                    <h3>МОЙКА КУЗОВА (КЛАСС 2)</h3>
                    <div class=\"price\">Стоимость: 900 ₽</div>
                    <div class=\"description\">2-х - 3-х фазная мойка Вашего автомобиля.</div>
                </div>
                <div class=\"service-card\" style=\"width:100%\">
                    <h3>КОМПЛЕКСНАЯ МОЙКА</h3>
                    <div class=\"price\">Стоимость: 1200 ₽</div>
                    <div class=\"description\">Мойка с сушкой, колёса и арки, обработка резинок.</div>
                </div>
                <div class=\"service-card\" style=\"width:100%\">
                    <h3>ХИМЧИСТКА САЛОНА</h3>
                    <div class=\"price\">Стоимость: 1800 ₽</div>
                    <div class=\"description\">Глубокая очистка салона и ковриков.</div>
                </div>
                <div class=\"service-card\" style=\"width:100%\">
                    <h3>ПОЛИРОВКА КУЗОВА</h3>
                    <div class=\"price\">Стоимость: 2000 ₽</div>
                    <div class=\"description\">Восстановление блеска, устранение мелких дефектов.</div>
                </div>
                <div class=\"service-card\" style=\"width:100%\">
                    <h3>МОЙКА ДВИГАТЕЛЯ</h3>
                    <div class=\"price\">Стоимость: 800 ₽</div>
                    <div class=\"description\">Безопасная очистка подкапотного пространства.</div>
                </div>
                <div class=\"service-card\" style=\"width:100%\">
                    <h3>МОЙКА СТЕКОЛ</h3>
                    <div class=\"price\">Стоимость: 300 ₽</div>
                    <div class=\"description\">Чистые стёкла без разводов, идеальная видимость.</div>
                </div>
            `;
        };

        // Добавляем метки напрямую с координатами
        centers.forEach(item => {
            const placemark = new ymaps.Placemark(item.coords, {
                balloonContentHeader: item.name,
                balloonContentBody: item.address,
                hintContent: item.name
            }, {
                preset: 'islands#icon',
                iconColor: '#EF4B4C'
            });

            placemark.events.add('click', () => {
                const modal = document.getElementById('map-services-modal');
                const title = document.getElementById('map-modal-title');
                const list = document.getElementById('map-modal-services');
                title.textContent = item.address;
                list.innerHTML = buildServiceCardsHtml();
                modal.style.display = 'block';
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
    });
});
