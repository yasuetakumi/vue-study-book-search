1. Create root project folder, for example "new_project"
2. CD to new_project

2. [new_project] Clone laravel6spa-starter-kit to api, as follows:
      git clone https://hilmialf@bitbucket.org/gruneasia/laravel6spa-starter-kit.git api

3. [new_project] Clone vue2-starter-kit to client, as follows:
      git clone https://hilmialf@bitbucket.org/gruneasia/vue2-starter-kit.git client

4. [new_project] Copy client/docker to new_project/
5. [new_project] CD to docker/docker-compose/docker-desktop
6. [new_project/docker/docker-compose/docker-desktop] Run "docker-compose up --build -d"
7. [new_project/docker/docker-compose/docker-desktop] Run "docker exec -it --user=dev_user spa_php-fpm bash". This will bring us to spa_php-fpm root.
8. [spa_php-fpm] Run "composer install"
9. [from editor or spa_php-fpm] Copy ".env.docker" to ".env"
10. [spa_php-fpm] Run "php artisan key:generate"
11. [spa_php-fpm] Run "php artisan migrate:fresh --seed"
12. Change api folder owner to nginx process.
    [new_project] run "sudo chown -R $USER:www-data api/storage && sudo chown -R $USER:www-data api/bootstrap/cache && chmod -R 775 api/storage && chmod -R 775 api/bootstrap/cache"
13. [Browser] Go to localhost:8086