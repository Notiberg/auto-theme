// Modal functionality
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const modalDesc = document.getElementById("modal-desc");
const closeModal = document.querySelector(".close");
const timeModal = document.getElementById("time-modal");
const timeCloseModal = timeModal.querySelector(".close");
const confirmBtn = document.querySelector(".confirm-btn");
const monthElement = document.querySelector(".month");
const arrowLeft = document.querySelector(".arrow:first-child");
const arrowRight = document.querySelector(".arrow:last-child");
const calendarDates = document.querySelector(".calendar-dates");

// Новые элементы для выбора даты и времени
const dateItems = document.querySelectorAll(".date-item");
const timeSlots = document.querySelectorAll(".time-slot");
const confirmBookingBtn = document.querySelector(".confirm-booking-btn");
const currentMonthElement = document.querySelector(".current-month");
const dateNavArrows = document.querySelectorAll(".date-nav .arrow");
const dateScroll = document.querySelector(".date-scroll");

document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("click", () => {
        modalTitle.textContent = card.dataset.title;
        modalPrice.textContent = "Цена: " + card.dataset.price;
        modalDesc.textContent = card.dataset.desc;
        modal.style.display = "block";
        updateDateDisplay(); // Обновляем даты при открытии модального окна
    });
});

closeModal.onclick = () => modal.style.display = "none";
timeCloseModal.onclick = () => timeModal.style.display = "none";

window.onclick = (e) => {
    if (e.target == modal) modal.style.display = "none";
    if (e.target == timeModal) timeModal.style.display = "none";
}

// Функциональность для выбора даты
function updateDateDisplay() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Обновляем название месяца
    currentMonthElement.textContent = months[currentMonthIndex];
    
    // Очищаем контейнер с датами
    dateScroll.innerHTML = '';
    
    // Создаем сплошной объект с датами всех месяцев, начиная с текущей даты
    const monthsToShow = [];
    
    // Добавляем текущий месяц, начиная с сегодняшнего дня
    monthsToShow.push({ month: currentMonth, year: currentYear, startDay: today.getDate() });
    
    // Добавляем все последующие месяцы текущего года
    for (let month = currentMonth + 1; month < 12; month++) {
        monthsToShow.push({ month: month, year: currentYear, startDay: 1 });
    }
    
    // Добавляем все месяцы следующих лет (например, на 2 года вперед)
    for (let year = currentYear + 1; year <= currentYear + 2; year++) {
        for (let month = 0; month < 12; month++) {
            monthsToShow.push({ month: month, year: year, startDay: 1 });
        }
    }
    
    // Добавляем даты для каждого месяца
    monthsToShow.forEach((monthData, monthIndex) => {
        const daysInMonth = new Date(monthData.year, monthData.month + 1, 0).getDate();
        
        // Добавляем разделительную линию перед первым числом месяца (если это не первый месяц)
        if (monthData.startDay === 1 && monthIndex > 0) {
            const separator = document.createElement('div');
            separator.className = 'month-separator';
            dateScroll.appendChild(separator);
        }
        
        // Добавляем все даты месяца, начиная с указанного дня
        for (let i = monthData.startDay; i <= daysInMonth; i++) {
            const dateDiv = document.createElement('div');
            dateDiv.className = 'date-item';
            dateDiv.dataset.month = monthData.month;
            dateDiv.dataset.year = monthData.year;
            dateDiv.dataset.day = i;
            
            const currentDate = new Date(monthData.year, monthData.month, i);
            const dayOfWeek = currentDate.getDay();
            const dayNames = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
            
            // Если это сегодняшний день, добавляем класс для красного текста
            if (i === today.getDate() && monthData.month === currentMonth && monthData.year === currentYear) {
                dateDiv.classList.add('today');
            }
            
            dateDiv.innerHTML = `
                <div class="day">${dayNames[dayOfWeek]}</div>
                <div class="number">${i}</div>
            `;
            
            // Добавляем обработчик клика
            dateDiv.addEventListener('click', () => {
                document.querySelectorAll('.date-item').forEach(d => d.classList.remove('selected'));
                dateDiv.classList.add('selected');
            });
            
            dateScroll.appendChild(dateDiv);
        }
    });
    
    // Устанавливаем прокрутку в начало (к сегодняшней дате)
    dateScroll.scrollLeft = 0;
}

// Функциональность для выбора времени
timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
        timeSlots.forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
    });
});

// Функциональность для подтверждения записи
confirmBookingBtn.addEventListener('click', () => {
    const selectedDate = document.querySelector(".date-item.selected");
    const selectedTime = document.querySelector(".time-slot.selected");
    
    if (selectedDate && selectedTime) {
        const dayNumber = selectedDate.querySelector(".number").textContent;
        const monthName = currentMonthElement.textContent;
        alert(`Запись подтверждена!\nДата: ${dayNumber} ${monthName}\nВремя: ${selectedTime.textContent}`);
        modal.style.display = "none";
    } else {
        alert("Пожалуйста, выберите дату и время");
    }
});

// Навигация по месяцам
let currentMonthIndex = new Date().getMonth(); // Текущий месяц
const months = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

function updateCurrentMonth() {
    currentMonthElement.textContent = months[currentMonthIndex];
    updateDateDisplay(); // Обновляем даты при смене месяца
}

// Убираем обработчик для стрелки влево, так как она больше не нужна
// dateNavArrows[0].addEventListener("click", () => {
//     // Убираем возможность перехода к прошлым месяцам
//     // currentMonthIndex--;
//     // if (currentMonthIndex < 0) {
//     //     currentMonthIndex = 11;
//     // }
//     // updateCurrentMonth();
// });

// Обработчик для стрелки вправо (следующий месяц)
dateNavArrows[0].addEventListener("click", () => {
    currentMonthIndex++;
    if (currentMonthIndex > 11) {
        currentMonthIndex = 0;
        // Если переходим в следующий год, можно добавить логику
    }
    updateCurrentMonth();
});

// Добавляем обработчик прокрутки для автоматической смены месяцев
let scrollTimeout;
dateScroll.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const scrollLeft = dateScroll.scrollLeft;
        const scrollWidth = dateScroll.scrollWidth;
        const clientWidth = dateScroll.clientWidth;
        
        // Находим текущую позицию прокрутки
        const scrollPosition = scrollLeft + clientWidth / 2;
        
        // Определяем, какой месяц должен быть активным на основе позиции прокрутки
        const dateItems = document.querySelectorAll('.date-item');
        
        dateItems.forEach((item, index) => {
            const itemLeft = index * (60 + 8); // 60px ширина + 8px отступ
            const itemRight = itemLeft + 60;
            
            if (scrollPosition >= itemLeft && scrollPosition <= itemRight) {
                const month = parseInt(item.dataset.month);
                const year = parseInt(item.dataset.year);
                
                // Если месяц изменился, обновляем интерфейс
                if (month !== currentMonthIndex) {
                    currentMonthIndex = month;
                    currentMonthElement.textContent = months[currentMonthIndex];
                }
            }
        });
        
        // Если прокрутили к первому числу месяца (левая часть), обновляем месяц
        if (scrollLeft < 100) {
            const firstVisibleItem = dateItems[0];
            if (firstVisibleItem) {
                const month = parseInt(firstVisibleItem.dataset.month);
                if (month !== currentMonthIndex) {
                    currentMonthIndex = month;
                    currentMonthElement.textContent = months[currentMonthIndex];
                }
            }
        }
    }, 100); // Уменьшенная задержка для более быстрой реакции
});

// Filter buttons
const allBtn = document.getElementById("all-btn");
const serviceCards = document.querySelectorAll(".service-card");

let activeCategory = '';
let activePrice = 0;
let activeDuration = 0;

function applyFilters() {
    serviceCards.forEach(card => {
        let show = true;
        if (activeCategory && !card.classList.contains(activeCategory)) show = false;
        let price = parseInt(card.dataset.priceNum);
        if (activePrice > 0 && price > activePrice) show = false;
        let duration = parseInt(card.dataset.duration);
        if (activeDuration > 0 && duration > activeDuration) show = false;
        card.style.display = show ? "block" : "none";
    });
}

allBtn.addEventListener("click", () => {
    setActiveButton(allBtn);
    activeCategory = '';
    activePrice = 0;
    activeDuration = 0;
    document.querySelectorAll('.dropdown .value').forEach(val => val.textContent = '');
    serviceCards.forEach(card => card.style.display = "block");
});

// Обработчик для кнопки фильтров
document.querySelector(".filter-toggle-btn").addEventListener("click", () => {
    const filterButtons = document.querySelector('.filter-buttons');
    const additional = document.querySelector('.additional-filters');
    const filterToggleBtn = document.querySelector('.filter-toggle-btn');
    const content = document.querySelector('.content');
    
    // Переключаем видимость всех фильтров
    filterButtons.classList.toggle('show-filters');
    additional.classList.toggle('show');
    
    // Переключаем активное состояние кнопки
    filterToggleBtn.classList.toggle('active');
    
    // Переключаем класс для контента
    content.classList.toggle('filters-open');
    
    // Если фильтры скрываются, сбрасываем все активные фильтры
    if (!filterButtons.classList.contains('show-filters')) {
        // Сбрасываем все фильтры
        activeCategory = '';
        activePrice = 0;
        activeDuration = 0;
        document.querySelectorAll('.dropdown .value').forEach(val => val.textContent = '');
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        allBtn.classList.add('active');
        serviceCards.forEach(card => card.style.display = "block");
        
        // Закрываем все выпадающие списки
        document.querySelectorAll('.dropdown').forEach(dd => dd.classList.remove('show'));
    }
});

document.querySelectorAll(".filter-btn:not(.dropdown .filter-btn)").forEach(btn => {
    if (btn.id !== "all-btn" && btn.textContent !== "Фильтры") {
        btn.addEventListener("click", () => {
            const category = btn.textContent.toLowerCase();
            setActiveButton(btn);
            activeCategory = category;
            applyFilters();
        });
    }
});

document.querySelectorAll('.dropdown .filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = btn.parentElement;
        dropdown.classList.toggle('show');
    });
});

document.querySelectorAll('.dropdown-content div').forEach(item => {
    item.addEventListener('click', () => {
        const dropdown = item.parentElement.parentElement;
        dropdown.classList.remove('show');
        const btn = dropdown.querySelector('.filter-btn');
        const type = btn.querySelector('.label').textContent.trim().toLowerCase();
        const valueText = item.textContent;
        let valueSpan = dropdown.querySelector('.value');
        if (valueText === 'Все') {
            if (type === 'стоимость') activePrice = 0;
            else activeDuration = 0;
            valueSpan.textContent = '';
        } else {
            let maxValue = parseInt(valueText.replace('До ', '').replace(/ .*/, ''));
            if (type === 'длительность' && valueText.includes('час')) maxValue *= 60;
            if (type === 'стоимость') activePrice = maxValue;
            else activeDuration = maxValue;
            valueSpan.textContent = ': ' + valueText;
        }
        applyFilters();
    });
});

window.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(dd => dd.classList.remove('show'));
    }
});

function setActiveButton(activeBtn) {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    activeBtn.classList.add("active");
}

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
            window.location.href = 'maps.html';
        }
    });
});