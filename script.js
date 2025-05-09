document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('movieTitle').value.trim();
    if (!title) return;

    const results = document.getElementById('results');
    results.innerHTML = '<p>Шукаємо...</p>';

    fetch('search.php?title=' + encodeURIComponent(title))
        .then(response => response.json())
        .then(data => {
            results.innerHTML = '';
            if (data.results && data.results.length > 0) {
                const movie = data.results[0];

                const posterPath = movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` 
                    : 'https://dummyimage.com/300x450/cccccc/000000&text=No+Image';

                const year = movie.release_date 
                    ? movie.release_date.substring(0, 4) 
                    : movie.first_air_date 
                        ? movie.first_air_date.substring(0, 4) 
                        : 'Невідомо';

                const type = movie.media_type === 'tv' 
                    ? '📺 Серіал' 
                    : movie.media_type === 'movie'
                        ? '🎬 Фільм'
                        : '';

                const div = document.createElement('div');
                div.className = 'movie';
                div.innerHTML = `
                    <img src="${posterPath}" alt="${movie.title || movie.name}">
                    <h2>${movie.title || movie.name} ${type ? `(${type})` : ''}</h2>
                    <p><strong>Рік:</strong> ${year}</p>
                    <p><strong>Рейтинг TMDB:</strong> ${movie.vote_average ? movie.vote_average.toFixed(1) : 'Немає'}/10 ⭐</p>
                    <p><strong>Опис:</strong> ${movie.overview || 'Опису немає.'}</p>
                `;
                results.appendChild(div);
            } else {
                results.innerHTML = '<p>Фільми або серіали не знайдено.</p>';
            }
        })
        .catch(error => {
            console.error('Помилка:', error);
            results.innerHTML = '<p>Сталася помилка при завантаженні даних.</p>';
        });
});
