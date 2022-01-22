# Sample PHP backend app which can be used to experiment with DevOps concepts

The app uses [Laravel](https://laravel.com/), [MySQL](https://www.mysql.com/) and optionally a session store such as [Redis](https://redis.io/).

To setup the project you need to follow these steps:

1. Install php, supported version is 8.0.14, the mysqli, pdo, pdo_mysql extensions are required
2. Checkout the source repo
3. Install the project dependencies with [Composer](https://getcomposer.org/) (you need to install it locally first):
```
./composer.phar install
```

## Configuration

The project's configuration is done through environment files. Refer to the .env.example file which lists some of the available options. At a minimum you need to supply:

- DB_CONNECTION (should be mysql)
- DB_HOST (host of the database)
- DB_PORT (port of the database)
- DB_DATABASE (the name of the database)
- DB_USERNAME (username used to connect to the database)
- DB_PASSWORD (the password used for connecting to the database)
- APP_ENV (testing for running tests, production for running in a production environment, local for development)
- APP_KEY (base64 encoded random string of 32 characters, php artisan key:generate can be used to create a new key)
- APP_NAME the name of the app, used for logs
- APP_URL the url under which the app runs
- FRONTEND_URL the url of the frontnend, should incude http + the port if it is different than 80/443
- SESSION_DRIVER should be set to "cookie" at the moment
- SESSION_DOMAIN the cookie domain for the session, for example .devops.com

## Artisan

The project includes a [command line interface](https://laravel.com/docs/8.x/artisan) which can be used for some administrative tasks. It can be invoked by running `php artisan` in the project source after depndencies have been installed and the proper environment variables are available.

### 1. php artisan db:setup
  This checks if the database schema is created in the db and if not, it creates it.
### 2. php artisan migrate
  Runs pending database schema changes.
### 3. php artisan lint
  Runs a code linter.
### 4. php artisan analyse:code
  Runs static code analysis.
### 5. php artisan test
  Runs the proect tests.
