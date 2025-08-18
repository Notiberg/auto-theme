// Navigation functionality
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        if (page === 'index') {
            window.location.href = 'index.html';
        } else if (page === 'map') {
            // Already on map page, no action needed
        }
    });
});

// Navigation functionality
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        if (page === 'index') {
            window.location.href = 'index.html';
        } else if (page === 'map') {
            // Already on map page, no action needed
        }
    });
});

// Placeholder for Yandex Map (to be configured later)
document.addEventListener('DOMContentLoaded', () => {
    // Map initialization will be added here based on your further instructions
    console.log('Yandex Map placeholder ready');
    // Initialize Yandex Map
    ymaps.ready(function () {
        const myMap = new ymaps.Map("map", {
            center: [55.76, 37.64], // Example coordinates (Moscow)
            zoom: 10
        });
    });
});