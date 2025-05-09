<?php
header('Content-Type: application/json');

$apiKey = 'c967519674ce89697951524aead85af8';

if (!isset($_GET['title']) || empty($_GET['title'])) {
    echo json_encode(['error' => 'Не вказано назву фільму або серіалу']);
    exit;
}

$title = urlencode($_GET['title']);

// Пошук і фільмів, і серіалів
$url = "https://api.themoviedb.org/3/search/multi?api_key=$apiKey&language=uk-UA&query=$title";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
