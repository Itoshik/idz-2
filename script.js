document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('movieTitle').value.trim();
    if (!title) return;

    fetch('server.php?title=' + encodeURIComponent(title))
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }

            document.getElementById('result').style.display = 'block';
            document.getElementById('poster').src = data.poster;
            document.getElementById('title').innerText = `${data.title} ${data.type ? `(${data.type})` : ''}`;
            document.getElementById('year').innerText = data.year;
            document.getElementById('rating').innerText = data.rating;
            document.getElementById('overview').innerText = data.overview;
        })
        .catch(error => {
            console.error('Помилка:', error);
            alert('Сталася помилка при завантаженні даних.');
        });
});
