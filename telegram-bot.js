// Telegram Bot Integration for Booking Notifications
class TelegramBot {
    constructor() {
        // В реальном приложении токен бота должен храниться в переменных окружения
        this.botToken = 'YOUR_BOT_TOKEN'; // Замените на реальный токен бота
        this.apiUrl = `https://api.telegram.org/bot${this.botToken}`;
        
        // Получаем данные пользователя Telegram WebApp
        this.initTelegramWebApp();
    }

    // Инициализация Telegram WebApp
    initTelegramWebApp() {
        if (window.Telegram && window.Telegram.WebApp) {
            this.tg = window.Telegram.WebApp;
            this.tg.ready();
            
            // Получаем информацию о пользователе
            this.user = this.tg.initDataUnsafe?.user;
            
            // Настраиваем основную кнопку
            this.tg.MainButton.setText('Закрыть');
            this.tg.MainButton.onClick(() => {
                this.tg.close();
            });
        } else {
            console.log('Telegram WebApp не доступен - работаем в режиме браузера');
        }
    }

    // Отправка уведомления о подтверждении записи
    async sendBookingConfirmation(bookingData) {
        if (!this.user || !this.user.id) {
            console.log('Пользователь Telegram не найден - показываем обычное уведомление');
            this.showLocalNotification(bookingData);
            return;
        }

        const message = this.formatBookingMessage(bookingData);
        
        try {
            const response = await fetch(`${this.apiUrl}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.user.id,
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            if (response.ok) {
                console.log('Уведомление отправлено в Telegram');
                this.showSuccessMessage();
            } else {
                throw new Error('Ошибка отправки сообщения');
            }
        } catch (error) {
            console.error('Ошибка отправки уведомления:', error);
            this.showLocalNotification(bookingData);
        }
    }

    // Форматирование сообщения о записи
    formatBookingMessage(bookingData) {
        const { service, date, day, month, time, address, car } = bookingData;
        
        return `🎉 <b>Запись успешно подтверждена!</b>

🚗 <b>Автомобиль:</b> ${car.brand} ${car.model} (${car.regNumber})
🛠 <b>Услуга:</b> ${service}
📅 <b>Дата:</b> ${day}, ${date} ${month}
⏰ <b>Время:</b> ${time}
📍 <b>Адрес:</b> ${address}

✅ Ваша запись принята в обработку. Ожидайте подтверждения от мойки.

📱 Следите за обновлениями в приложении Slot My Car.`;
    }

    // Показать локальное уведомление (если Telegram недоступен)
    showLocalNotification(bookingData) {
        const { service, date, day, month, time, address, car } = bookingData;
        
        const message = `🎉 Запись успешно подтверждена!

🚗 Автомобиль: ${car.brand} ${car.model} (${car.regNumber})
🛠 Услуга: ${service}
📅 Дата: ${day}, ${date} ${month}
⏰ Время: ${time}
📍 Адрес: ${address}

✅ Ваша запись принята в обработку.`;

        // Создаем красивое модальное окно для уведомления
        this.showCustomAlert(message);
    }

    // Показать сообщение об успешной отправке
    showSuccessMessage() {
        if (this.tg) {
            this.tg.showAlert('✅ Запись подтверждена! Уведомление отправлено в Telegram.');
        } else {
            alert('✅ Запись подтверждена! Уведомление отправлено в Telegram.');
        }
    }

    // Создание кастомного модального окна для уведомлений
    showCustomAlert(message) {
        // Создаем модальное окно
        const modal = document.createElement('div');
        modal.className = 'notification-modal';
        modal.innerHTML = `
            <div class="notification-content">
                <div class="notification-header">
                    <h3>🎉 Запись подтверждена!</h3>
                    <button class="notification-close">&times;</button>
                </div>
                <div class="notification-body">
                    <pre>${message}</pre>
                </div>
                <div class="notification-actions">
                    <button class="btn-primary notification-ok">Понятно</button>
                </div>
            </div>
        `;

        // Добавляем стили
        const style = document.createElement('style');
        style.textContent = `
            .notification-modal {
                display: flex;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(10px);
                z-index: 2000;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }

            .notification-content {
                background: var(--card-background);
                backdrop-filter: blur(20px);
                border: 1px solid var(--border-color);
                border-radius: var(--ios-radius-large);
                width: 90%;
                max-width: 400px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                animation: slideUp 0.3s ease;
            }

            .notification-header {
                padding: 20px 20px 16px;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: rgba(255, 255, 255, 0.02);
            }

            .notification-header h3 {
                font-size: 18px;
                font-weight: 600;
                color: var(--text-primary);
                margin: 0;
            }

            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                padding: 8px;
                border-radius: var(--ios-radius-small);
                font-size: 20px;
                line-height: 1;
            }

            .notification-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: var(--text-primary);
            }

            .notification-body {
                padding: 20px;
            }

            .notification-body pre {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                white-space: pre-wrap;
                margin: 0;
                color: var(--text-primary);
                font-size: 14px;
                line-height: 1.5;
            }

            .notification-actions {
                padding: 0 20px 20px;
                display: flex;
                justify-content: center;
            }

            .notification-ok {
                padding: 12px 24px;
                background: var(--accent-color);
                color: white;
                border: none;
                border-radius: var(--ios-radius-medium);
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 2px 8px rgba(239, 75, 76, 0.3);
            }

            .notification-ok:hover {
                background: #d63031;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(239, 75, 76, 0.4);
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(modal);

        // Обработчики закрытия
        const closeBtn = modal.querySelector('.notification-close');
        const okBtn = modal.querySelector('.notification-ok');
        
        const closeModal = () => {
            modal.remove();
            style.remove();
        };

        closeBtn.addEventListener('click', closeModal);
        okBtn.addEventListener('click', closeModal);
        
        // Закрытие по клику вне модального окна
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Отправка уведомления об отмене записи
    async sendCancellationNotification(bookingData) {
        if (!this.user || !this.user.id) {
            alert('Запись отменена');
            return;
        }

        const message = `❌ <b>Запись отменена</b>

🚗 <b>Автомобиль:</b> ${bookingData.car.brand} ${bookingData.car.model}
🛠 <b>Услуга:</b> ${bookingData.service}
📅 <b>Дата:</b> ${bookingData.day}, ${bookingData.date} ${bookingData.month}
⏰ <b>Время:</b> ${bookingData.time}

ℹ️ Вы можете создать новую запись в любое время.`;

        try {
            await fetch(`${this.apiUrl}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.user.id,
                    text: message,
                    parse_mode: 'HTML'
                })
            });
        } catch (error) {
            console.error('Ошибка отправки уведомления об отмене:', error);
        }
    }

    // Получить информацию о пользователе
    getUserInfo() {
        return this.user || null;
    }

    // Проверить доступность Telegram WebApp
    isTelegramWebApp() {
        return !!(window.Telegram && window.Telegram.WebApp);
    }
}

// Экспорт для использования в других файлах
window.TelegramBot = TelegramBot;
