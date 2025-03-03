export const dataString = `
[
    {
        "title": "Подключение",
        "variants": [
            {
                "title": "Стандартное подключение",
                "description": "Техник сделает аккуратное техническое отверстие при необходимости (бесплатно)\\nБесплатная настройка оборудования (роутер, приставка)\\nДемонстрация работы ЛК пользователю, помощь при оплате банковской картой",
                "color": "#CCCCCC",
                "price_default": 0,
                "options": [
                    {
                        "title": "Протяжка кабеля",
                        "price": 400
                    },
                    {
                        "title": "8 жил",
                        "price": 500
                    }
                ],
                "select": []
            },
            {
                "title": "LUX подключение",
                "description": "Техник аккуратно, сохранив текущий ремонт, проложит и спрячет кабель в плинтусах, потолке и т.д.\\nПодключение розеток, разводка кабеля по квартире, предоставление необходимого количества патч кордов.",
                "color": "#2FCB5A",
                "price_default": 500,
                "options": [],
                "select": [
                    {
                        "title": "Цена подключения изменяется в зависимости от количества комнат:",
                        "items": [
                            {
                                "title": "1 комната",
                                "price": 0
                            },
                            {
                                "title": "2 комнаты",
                                "price": 500
                            },
                            {
                                "title": "коттедж",
                                "price": 5000
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "title": "Роутер",
        "variants": [
            {
                "title": "Keenetic Lite III",
                "description": "Интернет-центр для выделенной линии Ethernet с точкой доступа Wi-Fi 300 Мбит/с, управляемым коммутатором Ethernet и переключателем режимов работы",
                "color": "#CCCCCC",
                "price_default": 2000,
                "options": [],
                "select": []
            },
            {
                "title": "DLink DIR-615",
                "description": "Используя беспроводной маршрутизатор DIR-615, Вы сможете быстро организовать беспроводную сеть дома и в офисе, предоставив доступ к сети Интернет компьютерам и мобильным устройствам практически в любой точке (в зоне действия беспроводной сети)",
                "color": "#2FCB5A",
                "price_default": 1000,
                "options": [],
                "select": []
            },
            {
                "title": "Не нужно",
                "description": "Уже есть роутер",
                "color": "#DF4140",
                "price_default": 0,
                "options": [],
                "select": []
            }
        ]
    }
]
`