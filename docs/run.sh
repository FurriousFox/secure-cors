docker build -t exampleendpoint-demoproxy .
docker run --restart always -dit -p 11711:11711 exampleendpoint-demoproxy