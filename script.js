document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('movieTitle').value.trim();
    if (!title) return;

    const results = document.getElementById('results');
    results.innerHTML = ''; // ← Очищаємо перед новим результатом

    fetch('search.php?title=' + encodeURIComponent(title))
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                results.innerHTML = `<p>${data.error}</p>`;
                return;
            }

            const movieInfo = `
                <img src="${data.poster}" alt="${data.title}">
                <h2>${data.title} ${data.type ? `(${data.type})` : ''}</h2>
                <p><strong>Рік:</strong> ${data.year}</p>
                <p><strong>Рейтинг TMDB:</strong> ${data.rating}/10 ⭐</p>
                <p><strong>Опис:</strong> ${data.overview}</p>
            `;
            results.innerHTML = movieInfo;
        })
        .catch(error => {
            console.error('Помилка:', error);
            results.innerHTML = '<p>Сталася помилка при завантаженні даних.</p>';
        });
});
