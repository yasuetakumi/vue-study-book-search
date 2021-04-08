1. Create root project folder, for example "new_project"
2. CD to new_project

2. Clone laravel6spa-starter-kit to api, as follows:
      git clone https://hilmialf@bitbucket.org/gruneasia/laravel6spa-starter-kit.git api

3. Clone vue2-starter-kit to client, as follows:
      git clone https://hilmialf@bitbucket.org/gruneasia/vue2-starter-kit.git client

4. Copy client/docker to new_project/
5. CD to docker/docker-compose/docker-desktop
6. Run "docker-compose up --build -d"
7. Run "docker exec -it --user=dev_user spa_php-fpm bash"
8. Run "composer install"
9. Copy ".env.docker" to ".env"
10. Run "php artisan key:generate"
11. Run "php artisan migrate:fresh --seed"
12. Go to localhost:3000