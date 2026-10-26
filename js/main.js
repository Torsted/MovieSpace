// 1. Массив тестовых данных (минимум 5 фильмов)
const moviesData = [
    { id: 1, title: "Интерстеллар", genre: "Фантастика", rating: 8.6, year: 2014, desc: "Путешествие исследователей сквозь червоточину времени.", img: "Img/interstellar.jpg" },
    { id: 2, title: "Начало", genre: "Фантастика", rating: 8.7, year: 2010, desc: "Внедрение идей в подсознание спящих людей.", img: "Img/inception.jpg" },
    { id: 3, title: "Побег из Шоушенка", genre: "Драма", rating: 9.1, year: 1994, desc: "История надежды, дружбы и стойкости в стенах тюрьмы.", img: "Img/shawshank.jpg" },
    { id: 4, title: "Темный рыцарь", genre: "Экшен", rating: 8.5, year: 2008, desc: "Противостояние Бэтмена и хаотичного Джокера.", img: "Img/dark_knight.jpg" },
    { id: 5, title: "Криминальное чтиво", genre: "Криминал", rating: 8.6, year: 1994, desc: "Философские беседы бандитов и переплетенные новеллы Тарантино.", img: "Img/pulp_fiction.jpg" }
];


// DOM Элементы
const movieGrid = document.getElementById('movie-grid');
const searchInput = document.getElementById('search-input');
const genreFilter = document.getElementById('genre-filter');
const modal = document.getElementById('movie-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal__close');
const bookingForm = document.getElementById('booking-form');

// 2. Функция рендеринга карточек (Изменение DOM)
function renderMovies(movies) {
    movieGrid.innerHTML = '';
    if (movies.length === 0) {
        movieGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">Фильмы не найдены</p>';
        return;
    }
    
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${movie.img}" alt="Постер к фильму ${movie.title}">
            <div class="movie-card__info">
                <h3 class="movie-card__title">${movie.title}</h3>
                <p class="movie-card__genre">${movie.genre} • ⭐ ${movie.rating}</p>
            </div>
        `;
        // Обработка клика — Открытие модального окна (Взаимодействие 1)
        card.addEventListener('click', () => openModal(movie));
        movieGrid.appendChild(card);
    });
}

// 3. Взаимодействие 2: Поиск и Фильтрация
function filterMovies() {
    const searchText = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;

    const filtered = moviesData.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchText);
        const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
        return matchesSearch && matchesGenre;
    });

    renderMovies(filtered);
}

searchInput.addEventListener('input', filterMovies);
genreFilter.addEventListener('change', filterMovies);

// 4. Модальное окно (Взаимодействие 1 продолжение)
function openModal(movie) {
    modalBody.innerHTML = `
        <h2>${movie.title} (${movie.year})</h2>
        <p style="color: var(--primary-color); font-weight: bold; margin: 10px 0;">Жанр: ${movie.genre} | Рейтинг: ⭐ ${movie.rating}</p>
        <p>${movie.desc}</p>
    `;
    modal.classList.add('active');
}

modalClose.addEventListener('click', () => modal.classList.remove('active'));
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
});

// 5. Взаимодействие 3: Кастомная клиентская валидация формы и отправка (submit)
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Валидация Имени
    const nameInput = document.getElementById('user-name');
    const nameError = document.getElementById('name-error');
    if (nameInput.value.trim().length < 3) {
        nameError.textContent = 'Имя должно содержать минимум 3 символа.';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    // Валидация Email
    const emailInput = document.getElementById('user-email');
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Введите корректный email адрес.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Валидация даты
    const dateInput = document.getElementById('session-date');
    const dateError = document.getElementById('date-error');
    if (!dateInput.value) {
        dateError.textContent = 'Пожалуйста, выберите дату сеанса.';
        isValid = false;
    } else {
        dateError.textContent = '';
    }

    if (isValid) {
        alert('Успешно! Билеты забронированы.');
        bookingForm.reset();
    }
});

// Инициализация при загрузке
renderMovies(moviesData);
