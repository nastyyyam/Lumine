// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Обработка отправки формы
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Здесь можно добавить логику отправки формы
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    });
}

// Добавление класса active для текущего пункта меню при прокрутке
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav__list a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Карусель в секции О кафе
(function() {
    const images = document.querySelectorAll('.about__carousel .carousel__image');
    const dots = document.querySelectorAll('.about__carousel .carousel__dot');
    const left = document.querySelector('.about__carousel .carousel__arrow--left');
    const right = document.querySelector('.about__carousel .carousel__arrow--right');
    let current = 0;

    function show(idx) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === idx);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
        current = idx;
    }

    left.addEventListener('click', () => {
        show((current - 1 + images.length) % images.length);
    });
    right.addEventListener('click', () => {
        show((current + 1) % images.length);
    });
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => show(i));
    });
})();

// Карусель событий и модальное окно
(function() {
    const cards = Array.from(document.querySelectorAll('.event-card'));
    const cardsContainer = document.querySelector('.events__cards');
    const left = document.querySelector('.events__arrow--left');
    const right = document.querySelector('.events__arrow--right');
    const visible = 3;
    let start = 0;

    function renderCarousel() {
        cardsContainer.innerHTML = '';
        for (let i = 0; i < visible; i++) {
            const idx = (start + i) % cards.length;
            cardsContainer.appendChild(cards[idx]);
        }
    }

    left.addEventListener('click', () => {
        start = (start - visible + cards.length) % cards.length;
        renderCarousel();
    });
    right.addEventListener('click', () => {
        start = (start + visible) % cards.length;
        renderCarousel();
    });

    renderCarousel();

    // Модальное окно
    const modal = document.getElementById('eventModal');
    const modalImg = modal.querySelector('.event-modal__img');
    const modalTitle = modal.querySelector('.event-modal__title');
    const modalDate = modal.querySelector('.event-modal__date');
    const modalDesc = modal.querySelector('.event-modal__desc');
    const modalDetails = modal.querySelector('.event-modal__details');
    const modalBack = modal.querySelector('.event-modal__back');
    // Данные событий (пример)
    const eventDetails = [
        {
            img: 'assets/Events/Живая музыка.jpg',
            title: 'Живая музыка в кафе Lumine – только по Пятницам и Субботам!',
            date: '01.05.2025',
            desc: 'Мы запускаем новый формат вечеров с живой музыкой – камерные концерты, душевные каверы и авторские композиции в исполнении талантливых музыкантов.',
            details: `<div style='margin:1.2em 0;'>
                <span style='display:inline-block;margin-bottom:0.5em;vertical-align:middle;'><img src='assets/et_calendar.svg' class='event-modal__icon' alt='calendar'> По пятницам и субботам</span><br>
                <span style='display:inline-block;margin-bottom:0.5em;vertical-align:middle;'><img src='assets/mdi-light_clock.svg' class='event-modal__icon' alt='clock'> С 19:00 - 21:00</span><br>
                <span style='display:inline-block;vertical-align:middle;'><img src='assets/location.svg' class='event-modal__icon' alt='location'> г. Самара, ул Фрунзе 97</span>
            </div>`
        },
        {
            img: 'assets/Events/Детское меню для самых маленьких.png',
            title: 'Детское меню – вкусно, полезно и весело!',
            date: '26.05.2025',
            desc: 'Дорогие родители!<br><br>Теперь в нашем кафе ваши малыши смогут не только вкусно поесть, но и получить море радости!<br><br>Мы создали специальное детское меню – полезные и аппетитные блюда, которые понравятся даже самым привередливым маленьким гурманам.',
            details: ''
        },
        {
            img: 'assets/Events/Семейные выходные.png',
            title: 'Семейный выходной в Lumine – уютные традиции для больших и маленьких!',
            date: '19.05.2025',
            desc: 'Дорогие родители и их непоседы!<br><br>Приглашаем вас провести незабываемый семейный день 31 мая и 1 июня в нашем кафе!<br>Что вас ждет:<br>- семейное меню по специальной цене<br>- творческие мастер-классы – лепка, рисование и кулинарные уроки для детей<br>- фотозона – сохраните теплые моменты в семейном альбоме',
            details: ''
        },
        {
            img: 'assets/Events/Подарки на День Рождения.png',
            title: 'Подарки на День Рождения!',
            date: '21.04.2025',
            desc: 'Кафе Lumine  дарит всем именинникам:<br><br>- десерт чизкейк<br>- фирменный коктейль<br><br>И, конечно, поздравление от команды!',
            details: ''
        },
        {
            img: 'assets/Events/Кулинарный мастер - класс.jpg',
            title: 'Кулинарный мастер-класс – раскройте свой вкус к творчеству!',
            date: '25.05.2025',
            desc: 'Дорогие гурманы и любители кулинарных экспериментов!<br><br>Приглашаем вас на уникальный мастер-класс, где вы не просто узнаете секреты шеф-повара, а станете настоящим творцом вкуса!<br><br>Дата: 07.06.2025<br>Время: 13:00<br>Продолжительность: 2 часа<br>Стоимость: 500 рублей',
            details: ''
        }
    ];
    // Назначаем обработчик на все карточки (делегирование)
    cards.forEach((card, i) => {
        card.onclick = () => {
            const ev = eventDetails[i];
            modalImg.src = ev.img;
            modalTitle.innerHTML = ev.title;
            modalDate.textContent = ev.date;
            modalDesc.innerHTML = ev.desc;
            modalDetails.innerHTML = ev.details;
            modal.classList.add('active');
        };
    });
    modalBack.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
})();

// --- Booking Modal ---
const bookingModal = document.getElementById('bookingModal');
const bookingBtn = document.querySelector('.hero__btn');
const bookingClose = document.getElementById('bookingClose');
const bookingForm = document.getElementById('bookingForm');
const calendarBtn = document.getElementById('calendarBtn');
const calendarPopup = document.getElementById('calendarPopup');
const dateInput = bookingForm.querySelector('input[name="date"]');

// Открытие модального окна
if (bookingBtn && bookingModal) {
    bookingBtn.addEventListener('click', () => {
        bookingModal.classList.add('active');
    });
}
// Закрытие модального окна
if (bookingClose && bookingModal) {
    bookingClose.addEventListener('click', () => {
        bookingModal.classList.remove('active');
        bookingForm.reset();
        hideCalendar();
        clearBookingErrors();
    });
}
bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        bookingModal.classList.remove('active');
        bookingForm.reset();
        hideCalendar();
        clearBookingErrors();
    }
});

// --- Календарь ---
function pad2(n) { return n < 10 ? '0' + n : n; }
function formatDate(d) {
    return pad2(d.getDate()) + '-' + pad2(d.getMonth() + 1) + '-' + d.getFullYear();
}
function renderCalendar(selectedDate) {
    let selected = null;
    if (selectedDate && /^\d{2}-\d{2}-\d{4}$/.test(selectedDate)) {
        const [d, m, y] = selectedDate.split('-');
        selected = new Date(y, m - 1, d);
    }
    const now = selected || new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = new Date();
    let html = '<div style="text-align:center;font-weight:600;margin-bottom:8px;">' +
        '<button type="button" class="cal-prev">&#60;</button> '
        + now.toLocaleString('ru', { month: 'long', year: 'numeric' }) +
        ' <button type="button" class="cal-next">&#62;</button></div>';
    html += '<table><thead><tr>';
    ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].forEach(d=>{html+='<th>'+d+'</th>'});
    html += '</tr></thead><tbody>';
    let d = new Date(year, month, 1);
    let firstDay = (d.getDay() + 6) % 7;
    let daysInMonth = new Date(year, month+1, 0).getDate();
    let row = '<tr>';
    for(let i=0;i<firstDay;i++) row += '<td></td>';
    for(let day=1;day<=daysInMonth;day++){
        d.setDate(day);
        if((firstDay+day-1)%7===0 && day!==1){ html+=row+'</tr>'; row='<tr>'; }
        let isToday = d.toDateString() === today.toDateString();
        let isSelected = selected && d.toDateString() === selected.toDateString();
        let isPast = d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        row += `<td class="cal-day${isToday?' cal-today':''}${isSelected?' cal-selected':''}${isPast?' cal-disabled':''}" data-date="${formatDate(d)}"${isPast?' style=\"color:#ccc;cursor:not-allowed;\"':''}>${day}</td>`;
    }
    row += '</tr>';
    html += row + '</tbody></table>';
    calendarPopup.innerHTML = html;
    // Навигация по месяцам
    calendarPopup.querySelector('.cal-prev').onclick = () => {
        let prev = new Date(year, month-1, 1);
        renderCalendar(formatDate(prev));
    };
    calendarPopup.querySelector('.cal-next').onclick = () => {
        let next = new Date(year, month+1, 1);
        renderCalendar(formatDate(next));
    };
    // Выбор дня
    calendarPopup.querySelectorAll('.cal-day').forEach(td => {
        if (td.classList.contains('cal-disabled')) return;
        td.onclick = () => {
            dateInput.value = td.getAttribute('data-date');
            hideCalendar();
        };
    });
}
function showCalendar() {
    renderCalendar(dateInput.value);
    calendarPopup.classList.add('active');
}
function hideCalendar() {
    calendarPopup.classList.remove('active');
}
calendarBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (calendarPopup.classList.contains('active')) hideCalendar();
    else showCalendar();
});
dateInput.addEventListener('focus', showCalendar);
document.addEventListener('click', (e) => {
    if (!calendarPopup.contains(e.target) && e.target !== calendarBtn && e.target !== dateInput) {
        hideCalendar();
    }
});

// --- Валидация и отправка формы ---
function clearBookingErrors() {
    bookingForm.querySelectorAll('.booking-form__input').forEach(inp => {
        inp.classList.remove('booking-form__input--error');
    });
    bookingForm.querySelectorAll('.booking-form__error').forEach(e => {
        e.style.display = 'none';
    });
}
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    clearBookingErrors();
    let valid = true;
    const inputs = bookingForm.querySelectorAll('.booking-form__input');
    inputs.forEach((inp, idx) => {
        if (!inp.value.trim()) {
            inp.classList.add('booking-form__input--error');
            bookingForm.querySelectorAll('.booking-form__error')[idx].style.display = 'block';
            valid = false;
        }
    });
    if (!valid) return;
    // Собираем данные
    const data = {};
    inputs.forEach(inp => { data[inp.name] = inp.value; });
    // Сохраняем в localStorage
    let bookings = JSON.parse(localStorage.getItem('lumine_bookings') || '[]');
    bookings.push({
        name: data.name,
        phone: data.phone,
        date: data.date,
        time: data.time
    });
    localStorage.setItem('lumine_bookings', JSON.stringify(bookings));
    console.log('Бронирование отправлено:', data);
    bookingModal.classList.remove('active');
    bookingForm.reset();
    hideCalendar();
    clearBookingErrors();
    alert('Спасибо! Ваша заявка отправлена.');
});

// --- Генерация времени для select ---
const timeSelect = bookingForm.querySelector('select[name="time"]');
function generateTimeOptions() {
    let options = '<option value="" disabled selected>Выберите время</option>';
    for (let h = 10; h <= 22; h++) {
        options += `<option value="${h.toString().padStart(2,'0')}:00">${h.toString().padStart(2,'0')}:00</option>`;
        options += `<option value="${h.toString().padStart(2,'0')}:30">${h.toString().padStart(2,'0')}:30</option>`;
    }
    options += `<option value="23:00">23:00</option>`;
    timeSelect.innerHTML = options;
}
generateTimeOptions();

// --- Основное меню: открытие/закрытие ---
const mainMenuBtn = document.getElementById('mainMenuBtn');
const mainMenuPanel = document.getElementById('mainMenuPanel');
if (mainMenuBtn && mainMenuPanel) {
    mainMenuBtn.addEventListener('click', function() {
        mainMenuPanel.classList.add('active');
    });
}

// --- Выпадающее меню категорий ---
const dropdownBtn = document.getElementById('categoryDropdownBtn');
const dropdownList = document.getElementById('categoryDropdownList');
if (dropdownBtn && dropdownList) {
    dropdownBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownList.classList.toggle('show');
        dropdownBtn.classList.toggle('active');
    });
    document.addEventListener('click', function() {
        dropdownList.classList.remove('show');
        dropdownBtn.classList.remove('active');
    });
    dropdownList.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', function(e) {
            const targetId = this.getAttribute('data-target');
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            dropdownList.classList.remove('show');
            dropdownBtn.classList.remove('active');
        });
    });
}

// --- Переключение между основным меню и меню новинок ---
const noveltyMenuBtn = document.querySelectorAll('.menu__btn')[1]; // Вторая кнопка — Новинки
const noveltyMenuPanel = document.getElementById('noveltyMenuPanel');

const barMenuBtn = document.querySelectorAll('.menu__btn')[2]; // Третья кнопка — Барное меню
const barMenuPanel = document.getElementById('barMenuPanel');

if (mainMenuBtn && mainMenuPanel && noveltyMenuBtn && noveltyMenuPanel && barMenuBtn && barMenuPanel) {
    mainMenuBtn.addEventListener('click', function() {
        mainMenuPanel.classList.add('active');
        noveltyMenuPanel.style.display = 'none';
        barMenuPanel.style.display = 'none';
    });
    noveltyMenuBtn.addEventListener('click', function() {
        noveltyMenuPanel.style.display = (noveltyMenuPanel.style.display === 'block') ? 'none' : 'block';
        if (noveltyMenuPanel.style.display === 'block') {
            mainMenuPanel.classList.remove('active');
            barMenuPanel.style.display = 'none';
        }
    });
    barMenuBtn.addEventListener('click', function() {
        barMenuPanel.style.display = (barMenuPanel.style.display === 'block') ? 'none' : 'block';
        if (barMenuPanel.style.display === 'block') {
            mainMenuPanel.classList.remove('active');
            noveltyMenuPanel.style.display = 'none';
        }
    });
} 