// Конфигурация персонализированных страниц сервисов
const servicesConfig = {
    'Акваматик': {
        id: 'akvamatik',
        title: 'АКВАМАТИК',
        subtitle: 'Бережное отношение к вашему автомобилю не оставят вас равнодушными',
        logo: 'А',
        colors: {
            primary: '#1E90FF',      // Синий цвет для Акваматик
            secondary: '#87CEEB',    // Светло-синий
            accent: '#FF6B35',       // Оранжевый акцент
            background: '#0F1419',   // Темный фон
            text: '#FFFFFF'          // Белый текст
        },
        workingHours: '9:00 - 23:00',
        rating: {
            score: 4.2,
            reviews: 156
        },
        tags: ['#мойка', '#детейлинг', '#быстро', '#Москва'],
        services: [
            {
                id: 1,
                name: 'Экспресс мойка',
                description: 'Быстрая мойка кузова автомобиля',
                price: 950,
                duration: 30,
                category: 'wash',
                tags: ['мойка', 'быстро']
            },
            {
                id: 2,
                name: 'Комплексная мойка',
                description: 'Полная мойка кузова с сушкой',
                price: 1500,
                duration: 45,
                category: 'wash',
                tags: ['мойка', 'комплекс']
            },
            {
                id: 3,
                name: 'Мойка с воском',
                description: 'Мойка с нанесением защитного воска',
                price: 2200,
                duration: 60,
                category: 'detailing',
                tags: ['мойка', 'детейлинг', 'воск']
            },
            {
                id: 4,
                name: 'Химчистка салона',
                description: 'Глубокая очистка салона автомобиля',
                price: 3500,
                duration: 90,
                category: 'interior',
                tags: ['химчистка', 'салон']
            }
        ],
        addresses: [
            { id: 'akva1', name: 'Акваматик Пресня', address: '2-я Звенигородская, 13с43' },
            { id: 'akva2', name: 'Акваматик Сокол', address: 'Ленинградский пр-т, 75к1' }
        ]
    },
    
    'Koch24': {
        id: 'koch24',
        title: 'Koch24',
        subtitle: 'Комплексный уход за автомобилем',
        logo: 'K',
        colors: {
            primary: '#8B0000',      // Темно-красный для Koch24
            secondary: '#DC143C',    // Красный
            accent: '#FFD700',       // Золотой акцент
            background: '#0A0A0A',   // Черный фон
            text: '#FFFFFF'          // Белый текст
        },
        workingHours: 'Круглосуточно',
        rating: {
            score: 4.8,
            reviews: 89
        },
        tags: ['#мойка', '#детейлинг', '#комплекс', '#Москва'],
        services: [
            {
                id: 1,
                name: 'Премиум мойка',
                description: 'Профессиональная мойка премиум класса',
                price: 1750,
                duration: 45,
                category: 'wash',
                tags: ['мойка', 'премиум']
            },
            {
                id: 2,
                name: 'Детейлинг кузова',
                description: 'Полировка и защита лакокрасочного покрытия',
                price: 4500,
                duration: 120,
                category: 'detailing',
                tags: ['детейлинг', 'полировка']
            },
            {
                id: 3,
                name: 'Керамическое покрытие',
                description: 'Нанесение керамического защитного покрытия',
                price: 8500,
                duration: 180,
                category: 'detailing',
                tags: ['детейлинг', 'керамика', 'защита']
            },
            {
                id: 4,
                name: 'Комплексный уход',
                description: 'Полный комплекс услуг по уходу за автомобилем',
                price: 6200,
                duration: 150,
                category: 'complex',
                tags: ['комплекс', 'детейлинг', 'мойка']
            }
        ],
        addresses: [
            { id: 'koch1', name: 'Koch24 Центр', address: 'Звенигородское ш., 11' },
            { id: 'koch2', name: 'Koch24 Запад', address: 'Кутузовский пр-т, 36' }
        ]
    },
    
    'Chisto': {
        id: 'chisto',
        title: 'Chisto',
        subtitle: 'Глубокая очистка салона автомобиля',
        logo: 'C',
        colors: {
            primary: '#228B22',      // Зеленый для Chisto
            secondary: '#32CD32',    // Лайм-зеленый
            accent: '#FF4500',       // Красно-оранжевый акцент
            background: '#0D1B0D',   // Темно-зеленый фон
            text: '#FFFFFF'          // Белый текст
        },
        workingHours: '8:00 - 22:00',
        rating: {
            score: 4.5,
            reviews: 203
        },
        tags: ['#химчистка', '#салон', '#полировка', '#Москва'],
        services: [
            {
                id: 1,
                name: 'Химчистка сидений',
                description: 'Профессиональная химчистка автомобильных сидений',
                price: 800,
                duration: 60,
                category: 'interior',
                tags: ['химчистка', 'сиденья']
            },
            {
                id: 2,
                name: 'Полная химчистка салона',
                description: 'Комплексная химчистка всего салона',
                price: 2500,
                duration: 90,
                category: 'interior',
                tags: ['химчистка', 'салон', 'комплекс']
            },
            {
                id: 3,
                name: 'Чистка кожаного салона',
                description: 'Специализированная чистка кожаных поверхностей',
                price: 3200,
                duration: 75,
                category: 'interior',
                tags: ['химчистка', 'кожа', 'салон']
            },
            {
                id: 4,
                name: 'Полировка пластика',
                description: 'Восстановление и полировка пластиковых деталей',
                price: 1200,
                duration: 45,
                category: 'interior',
                tags: ['полировка', 'пластик', 'салон']
            }
        ],
        addresses: [
            { id: 'chisto1', name: 'Chisto Шелепиха', address: 'Шелепихинская наб., 42к1' },
            { id: 'chisto2', name: 'Chisto Дмитровка', address: 'Дмитровский пр-д, 1' }
        ]
    }
};

// Экспорт конфигурации для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = servicesConfig;
}
