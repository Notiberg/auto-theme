// Конфигурация персонализированных страниц сервисов
const servicesConfig = {
    'meatwash': {
        id: 'meatwash',
        title: 'MeatWash',
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
            score: '5.0',
            reviews: 172
        },
        tags: ['#мойка', '#детейлинг', '#уход', '#Москва'],
        services: [
            {
                id: 1,
                name: 'Трехфазный стандартный комплекс (салон полностью)',
                description: 'В данную услугу входит; Трехфазная «NANO» мойка кузова; Чистка стекол изнутри салона; Продувка воздуховодов и внутренних элементов салона сжатым воздухом; Пылесос; Влажная уборка пластиковых и кожаных элементов салона; Чернение шин Shine Systems BlackStar Matt',
                price: 2850,
                duration: '50-60',
                category: 'wash',
                tags: ['комплекс', 'мойка', 'салон']
            },
            {
                id: 2,
                name: 'Детейлинг мойка в 4 фазы с обезжириванием кузова',
                description: 'В данную услугу входит; Трехфазный «NANO» комплекс; Обезжиривание кузова / Удаление реагента; Обработка ЛКП защитным составом; Химчистка колесных дисков и выхлопных труб',
                price: 4450,
                duration: '60-90',
                category: 'wash',
                tags: ['мойка', 'детейлинг']
            },
            {
                id: 3,
                name: 'Детейлинг мойка "ПРЕМИУМ"',
                description: 'В данную услугу входит; Детейлинг мойка в 4 фазы с обезжириванием кузова и удалением реагента; Удаление битума; Очистка от металлических вкраплений METAL OFF; Обработка ЛКП КВАРЦЕВЫМ защитным составом; Легкая химчистка салона; Кондиционер кожи сидений; Ароматизация «Сухой туман»/Озонация салона (Антибактериальная обработка салона); Химчистка колесных дисков и выхлопных труб; Чернение шин; Уборка багажника',
                price: 8950,
                duration: '60-90',
                category: 'detailing',
                tags: ['мойка', 'детейлинг', 'премиум']
            },
            {
                id: 4,
                name: 'Кварц',
                description: 'Кварцевое защитное покрытие "FastQuartz"',
                price: 2500,
                duration: 30,
                category: 'detailing',
                tags: ['кварц', 'кузов', 'детейлинг']
            },
            {
                id: 5,
                name: 'Кондиционер кожи',
                description: 'Кондиционер кожи «Премиум»"',
                price: 2000,
                duration: 20,
                category: 'interior',
                tags: ['кондиционер', 'салон', 'детейлинг']
            },{
                id: 6,
                name: 'Антидождь передней полусферы',
                description: 'Двухкомпонентное нанопокрытие для стекла Shine Systems NanoGlass K1+K2',
                price: 3000,
                duration: 15,
                category: 'detailing',
                tags: ['антидождь', 'кузов', 'детейлинг']
            },{
                id: 7,
                name: 'Антидождь всех стекол аавтомобиля',
                description: 'Двухкомпонентное нанопокрытие для стекла Shine Systems NanoGlass K1+K2',
                price: 5500,
                duration: 30,
                category: 'detailing',
                tags: ['антидождь', 'кузов', 'детейлинг']
            },{
                id: 8,
                name: 'Мойка двигателя и подкапотного пространства с консервацией',
                description: 'Мойка двигателя и подкапотного пространства гелем-диэлектриком Shine Systems MotorCleaner с последующей консервацией составом Shine Systems MotorCare.',
                price: 6000,
                duration: 30,
                category: 'wash',
                tags: ['двигаетль', 'мойка']
            },
        ],
        addresses: [
            { id: 'akva1', name: 'Meat Wash', address: 'ул. Мясницкая, 11' },
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
