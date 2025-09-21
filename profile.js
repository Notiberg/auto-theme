document.addEventListener('DOMContentLoaded', function() {
    // Car data storage with service history
    let cars = [
        {
            id: 0,
            brand: 'BMW',
            model: 'X5',
            regNumber: 'Р927СО777',
            class: 'Класс 3',
            serviceHistory: [
                {
                    date: '15 дек 2024',
                    serviceName: 'Комплексная мойка',
                    provider: 'Акваматик - Пресня',
                    price: 1200
                },
                {
                    date: '28 ноя 2024',
                    serviceName: 'Детейлинг премиум',
                    provider: 'Koch24 - Детейлинг Центр',
                    price: 2500
                },
                {
                    date: '10 ноя 2024',
                    serviceName: 'Премиум КОСН ALL',
                    provider: 'Chisto - Клин Мастер',
                    price: 1500
                },
                {
                    date: '25 окт 2024',
                    serviceName: 'Мойка кузова (Класс 3)',
                    provider: 'Акваматик - Илевен',
                    price: 1100
                }
            ]
        },
        {
            id: 1,
            brand: 'Mercedes',
            model: 'C-Class',
            regNumber: 'В521АР888',
            class: 'Класс 2',
            serviceHistory: [
                {
                    date: '12 дек 2024',
                    serviceName: 'Мойка кузова (Класс 2)',
                    provider: 'Акваматик - Центр',
                    price: 950
                },
                {
                    date: '20 ноя 2024',
                    serviceName: 'Полировка фар',
                    provider: 'AutoShine - Детейлинг',
                    price: 800
                },
                {
                    date: '05 ноя 2024',
                    serviceName: 'Химчистка салона',
                    provider: 'CleanCar - Сервис',
                    price: 1800
                }
            ]
        },
        {
            id: 2,
            brand: 'Audi',
            model: 'Q7',
            regNumber: 'О472КБ999',
            class: 'Класс 4',
            serviceHistory: [
                {
                    date: '18 дек 2024',
                    serviceName: 'Мойка кузова (Класс 4)',
                    provider: 'Premium Wash',
                    price: 1350
                },
                {
                    date: '30 ноя 2024',
                    serviceName: 'Детейлинг экстерьера',
                    provider: 'Elite Car Care',
                    price: 3200
                },
                {
                    date: '15 ноя 2024',
                    serviceName: 'Комплексная мойка',
                    provider: 'Акваматик - VIP',
                    price: 1500
                },
                {
                    date: '28 окт 2024',
                    serviceName: 'Защитное покрытие',
                    provider: 'ProDetailing',
                    price: 4500
                },
                {
                    date: '10 окт 2024',
                    serviceName: 'Химчистка салона',
                    provider: 'LuxClean',
                    price: 2200
                }
            ]
        }
    ];

    let currentCarIndex = 0;
    let editingCarId = null;

    // Initialize car selector
    function initializeCarSelector() {
        const carSelector = document.getElementById('carSelector');
        if (carSelector) {
            carSelector.innerHTML = '';
            cars.forEach((car, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `${car.brand} ${car.model} - ${car.regNumber}`;
                carSelector.appendChild(option);
            });
            carSelector.value = currentCarIndex;
        }
    }

    // Update service history display
    function updateServiceHistory() {
        const currentCar = cars[currentCarIndex];
        if (!currentCar) return;

        const serviceHistoryContainer = document.getElementById('serviceHistory');
        const totalServicesElement = document.getElementById('totalServices');
        const totalAmountElement = document.getElementById('totalAmount');

        // Clear existing history
        serviceHistoryContainer.innerHTML = '';

        // Calculate totals
        const totalServices = currentCar.serviceHistory.length;
        const totalAmount = currentCar.serviceHistory.reduce((sum, service) => sum + service.price, 0);

        // Update summary
        totalServicesElement.textContent = totalServices;
        totalAmountElement.textContent = `${totalAmount.toLocaleString()} ₽`;

        // Populate service history
        currentCar.serviceHistory.forEach(service => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="service-date">${service.date}</div>
                <div class="service-info">
                    <div class="service-name">${service.serviceName}</div>
                    <div class="service-provider">${service.provider}</div>
                </div>
                <div class="service-price">${service.price.toLocaleString()} ₽</div>
            `;
            
            // Add click functionality
            historyItem.addEventListener('click', function() {
                alert(`Детали услуги: ${service.serviceName}\nПоставщик: ${service.provider}\nДата: ${service.date}\nСтоимость: ${service.price} ₽`);
            });
            
            serviceHistoryContainer.appendChild(historyItem);
        });
    }

    // Update car display
    function updateCarDisplay() {
        const currentCar = cars[currentCarIndex];
        if (!currentCar) return;

        document.getElementById('carBrand').textContent = currentCar.brand;
        document.getElementById('carModel').textContent = currentCar.model;
        document.getElementById('carRegNumber').textContent = currentCar.regNumber;
        
        const carClassElement = document.getElementById('carClass');
        const classNumber = currentCar.class.match(/\d+/)[0];
        carClassElement.textContent = currentCar.class;
        carClassElement.className = `class-value class-${classNumber}`;

        // Update service history when car changes
        updateServiceHistory();
    }

    // Car selector change handler
    const carSelector = document.getElementById('carSelector');
    if (carSelector) {
        carSelector.addEventListener('change', function() {
            currentCarIndex = parseInt(this.value);
            updateCarDisplay();
        });
    }

    // Modal functionality
    const carModal = document.getElementById('carModal');
    const addCarBtn = document.getElementById('addCarBtn');
    const editCarBtn = document.getElementById('editCarBtn');
    const closeCarModal = document.getElementById('closeCarModal');
    const cancelCarBtn = document.getElementById('cancelCarBtn');
    const carForm = document.getElementById('carForm');
    const deleteCarBtn = document.getElementById('deleteCarBtn');

    function openModal(isEdit = false, carId = null) {
        editingCarId = carId;
        const modalTitle = document.getElementById('modalTitle');
        
        if (isEdit && carId !== null) {
            modalTitle.textContent = 'Редактировать автомобиль';
            const car = cars.find(c => c.id === carId);
            if (car) {
                document.getElementById('carBrandInput').value = car.brand;
                document.getElementById('carModelInput').value = car.model;
                document.getElementById('carRegNumberInput').value = car.regNumber;
                document.getElementById('carClassInput').value = car.class;
            }
            deleteCarBtn.style.display = cars.length > 1 ? 'block' : 'none';
        } else {
            modalTitle.textContent = 'Добавить автомобиль';
            carForm.reset();
            deleteCarBtn.style.display = 'none';
        }
        
        carModal.style.display = 'block';
    }

    function closeModal() {
        carModal.style.display = 'none';
        carForm.reset();
        editingCarId = null;
    }

    // Event listeners
    if (addCarBtn) {
        addCarBtn.addEventListener('click', () => openModal(false));
    }

    if (editCarBtn) {
        editCarBtn.addEventListener('click', () => {
            const currentCar = cars[currentCarIndex];
            openModal(true, currentCar.id);
        });
    }

    if (closeCarModal) {
        closeCarModal.addEventListener('click', closeModal);
    }

    if (cancelCarBtn) {
        cancelCarBtn.addEventListener('click', closeModal);
    }

    // Click outside modal to close
    carModal.addEventListener('click', function(e) {
        if (e.target === carModal) {
            closeModal();
        }
    });

    // Form submission
    if (carForm) {
        carForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const brand = document.getElementById('carBrandInput').value;
            const model = document.getElementById('carModelInput').value;
            const regNumber = document.getElementById('carRegNumberInput').value;
            const carClass = document.getElementById('carClassInput').value;

            if (editingCarId !== null) {
                // Edit existing car
                const carIndex = cars.findIndex(c => c.id === editingCarId);
                if (carIndex !== -1) {
                    cars[carIndex] = {
                        ...cars[carIndex],
                        brand,
                        model,
                        regNumber,
                        class: carClass
                    };
                }
            } else {
                // Add new car
                const newId = Math.max(...cars.map(c => c.id)) + 1;
                cars.push({
                    id: newId,
                    brand,
                    model,
                    regNumber,
                    class: carClass,
                    serviceHistory: []
                });
                currentCarIndex = cars.length - 1;
            }

            initializeCarSelector();
            updateCarDisplay();
            closeModal();
        });
    }

    // Delete car functionality
    if (deleteCarBtn) {
        deleteCarBtn.addEventListener('click', function() {
            if (cars.length <= 1) {
                alert('Нельзя удалить единственный автомобиль');
                return;
            }

            if (confirm('Вы уверены, что хотите удалить этот автомобиль?')) {
                cars = cars.filter(c => c.id !== editingCarId);
                
                // Adjust current car index if needed
                if (currentCarIndex >= cars.length) {
                    currentCarIndex = cars.length - 1;
                }

                initializeCarSelector();
                updateCarDisplay();
                closeModal();
            }
        });
    }

    // Initialize
    initializeCarSelector();
    updateCarDisplay();

    // Settings button functionality
    const settingsBtn = document.querySelector('.settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            // Placeholder for settings functionality
            alert('Настройки профиля (функционал будет добавлен позже)');
        });
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
                    // Already on profile page
                    break;
            }
        });
    });

    // Car class determination based on brand and model
    function determineCarClass(brand, model) {
        const carClassData = {
            'BMW': {
                'X1': 2, 'X3': 3, 'X5': 3, 'X7': 4,
                '1 Series': 1, '3 Series': 2, '5 Series': 3, '7 Series': 4
            },
            'Mercedes': {
                'A-Class': 1, 'C-Class': 2, 'E-Class': 3, 'S-Class': 4,
                'GLA': 2, 'GLC': 3, 'GLE': 3, 'GLS': 4
            },
            'Audi': {
                'A1': 1, 'A3': 2, 'A4': 2, 'A6': 3, 'A8': 4,
                'Q3': 2, 'Q5': 3, 'Q7': 4, 'Q8': 4
            },
            'Toyota': {
                'Corolla': 1, 'Camry': 2, 'Avalon': 3,
                'RAV4': 2, 'Highlander': 3, 'Land Cruiser': 4
            },
            'Volkswagen': {
                'Polo': 1, 'Golf': 1, 'Jetta': 2, 'Passat': 2,
                'Tiguan': 2, 'Touareg': 3
            }
        };

        if (carClassData[brand] && carClassData[brand][model]) {
            return carClassData[brand][model];
        }
        
        // Default class based on brand prestige
        const prestigeBrands = ['BMW', 'Mercedes', 'Audi', 'Lexus', 'Porsche'];
        const midRangeBrands = ['Toyota', 'Honda', 'Mazda', 'Subaru'];
        
        if (prestigeBrands.includes(brand)) {
            return 3; // Default to class 3 for prestige brands
        } else if (midRangeBrands.includes(brand)) {
            return 2; // Default to class 2 for mid-range brands
        } else {
            return 1; // Default to class 1 for other brands
        }
    }

    // Update car class display (if needed for dynamic updates)
    function updateCarClass(brand, model) {
        const classValue = document.querySelector('.class-value');
        if (classValue) {
            const carClass = determineCarClass(brand, model);
            
            // Remove existing class
            classValue.classList.remove('class-1', 'class-2', 'class-3', 'class-4');
            
            // Add new class
            classValue.classList.add(`class-${carClass}`);
            classValue.textContent = `Класс ${carClass}`;
        }
    }

    // Service history item click functionality
    const historyItems = document.querySelectorAll('.history-item');
    historyItems.forEach(item => {
        item.addEventListener('click', function() {
            // Placeholder for service details functionality
            const serviceName = this.querySelector('.service-name').textContent;
            alert(`Детали услуги: ${serviceName}\n(функционал будет добавлен позже)`);
        });
    });
});
