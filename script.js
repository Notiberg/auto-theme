// Modal functionality
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const modalDesc = document.getElementById("modal-desc");
const closeModal = document.querySelector(".close");
const bookBtn = document.querySelector(".book-btn");
const timeModal = document.getElementById("time-modal");
const timeCloseModal = timeModal.querySelector(".close");
const confirmBtn = document.querySelector(".confirm-btn");
const monthElement = document.querySelector(".month");
const arrowLeft = document.querySelector(".arrow:first-child");
const arrowRight = document.querySelector(".arrow:last-child");
const calendarDates = document.querySelector(".calendar-dates");

document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("click", () => {
        modalTitle.textContent = card.dataset.title;
        modalPrice.textContent = card.dataset.price;
        modalDesc.textContent = card.dataset.desc;
        modal.style.display = "block";
    });
});

closeModal.onclick = () => modal.style.display = "none";
timeCloseModal.onclick = () => timeModal.style.display = "none";

window.onclick = (e) => {
    if (e.target == modal) modal.style.display = "none";
    if (e.target == timeModal) timeModal.style.display = "none";
}

bookBtn.onclick = () => {
    timeModal.style.display = "block";
    modal.style.display = "none";
};

confirmBtn.onclick = () => {
    alert('Запись подтверждена');
    timeModal.style.display = "none";
};

// Date selection
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const months = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

function updateCalendar() {
    monthElement.textContent = `${months[currentMonth]} ${currentYear}`;
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    calendarDates.innerHTML = "";
    for (let i = 0; i < startingDay; i++) {
        calendarDates.innerHTML += '<div class="empty"></div>';
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const dateDiv = document.createElement("div");
        dateDiv.textContent = i;
        const date = new Date(currentYear, currentMonth, i);
        if (date.toDateString() === new Date().toDateString()) {
            dateDiv.classList.add("current");
        }
        dateDiv.addEventListener("click", () => {
            document.querySelectorAll('.calendar-dates div').forEach(d => d.classList.remove('selected'));
            dateDiv.classList.add('selected');
        });
        calendarDates.appendChild(dateDiv);
    }
}

arrowLeft.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
});

arrowRight.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
});

updateCalendar();

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

document.querySelectorAll(".filter-btn").forEach(btn => {
    if (btn.textContent === "Фильтры") {
        btn.addEventListener("click", () => {
            let additional = document.querySelector('.additional-filters');
            additional.style.display = additional.style.display === 'none' ? 'flex' : 'none';
            btn.classList.toggle('active');
        });
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
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        if (page === 'index') {
            window.location.href = 'index.html';
        } else if (page === 'map') {
            window.location.href = 'maps.html';
        }
    });
});