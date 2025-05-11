<?php
header('Content-Type: application/json');

$apiKey = '';

if (!isset($_GET['title']) || empty($_GET['title'])) {
    echo json_encode(['error' => 'Не вказано назву фільму або серіалу']);
    exit;
}

$title = urlencode($_GET['title']);
$url = "https://api.themoviedb.org/3/search/multi?api_key=$apiKey&language=uk-UA&query=$title";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);

if (isset($data['results']) && count($data['results']) > 0) {
    $movie = $data['results'][0];

    
    $posterPath = $movie['poster_path'] 
        ? "https://image.tmdb.org/t/p/w300{$movie['poster_path']}" 
        : 'https://dummyimage.com/300x450/cccccc/000000&text=No+Image';

    $year = isset($movie['release_date']) 
    ? substr($movie['release_date'], 0, 4) 
    : (isset($movie['first_air_date']) 
        ? substr($movie['first_air_date'], 0, 4) 
        : 'Невідомо');


    $type = $movie['media_type'] === 'tv' ? '📺 Серіал' : ($movie['media_type'] === 'movie' ? '🎬 Фільм' : '');

    $responseData = [
        'title' => $movie['title'] ?? $movie['name'],
        'year' => $year,
        'poster' => $posterPath,
        'overview' => $movie['overview'] ?? 'Опису немає.',
        'rating' => $movie['vote_average'] ? $movie['vote_average'] : 'Немає',
        'type' => $type
    ];

    echo json_encode($responseData);
} else {
    echo json_encode(['error' => 'Фільми або серіали не знайдено']);
}
?>
