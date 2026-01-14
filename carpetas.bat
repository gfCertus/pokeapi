echo [1/8] Creando estructura backend...
mkdir backend\src\core\domain\entities
mkdir backend\src\core\domain\repositories
mkdir backend\src\core\domain\services
mkdir backend\src\core\application\use-cases
mkdir backend\src\core\infrastructure\api
mkdir backend\src\core\infrastructure\repositories
mkdir backend\src\core\infrastructure\http
mkdir backend\src\presentation\controllers
mkdir backend\src\presentation\routes
mkdir backend\src\presentation\middlewares
mkdir backend\src\config
mkdir backend\src\utils
mkdir backend\dist

echo [2/8] Creando archivos backend...
type nul > backend\src\core\domain\entities\Pokemon.entity.ts
type nul > backend\src\core\domain\repositories\PokemonRepository.interface.ts
type nul > backend\src\core\application\use-cases\GetPokemonUseCase.ts
type nul > backend\src\core\application\use-cases\GetPokemonWithDetailsUseCase.ts
type nul > backend\src\core\infrastructure\api\PokeApiClient.ts
type nul > backend\src\core\infrastructure\repositories\PokeApiRepository.ts
type nul > backend\src\core\infrastructure\repositories\CachedPokemonRepository.ts
type nul > backend\src\presentation\controllers\PokemonController.ts
type nul > backend\src\presentation\middlewares\errorHandler.ts
type nul > backend\src\presentation\routes\pokemon.routes.ts
type nul > backend\src\config\app.config.ts
type nul > backend\src\config\container.ts
type nul > backend\src\config\swagger.config.ts
type nul > backend\src\app.ts
type nul > backend\src\index.ts

echo [3/8] Creando archivos de configuración backend...
type nul > backend\tsconfig.json
type nul > backend\.env.example
type nul > backend\.gitignore
type nul > backend\README.md

echo [4/8] Creando estructura frontend...
mkdir frontend\public\css
mkdir frontend\public\js
mkdir frontend\public\images
mkdir frontend\views\partials
mkdir frontend\views\pages
mkdir frontend\routes
mkdir frontend\services
mkdir frontend\middleware

echo [5/8] Creando archivos frontend...
type nul > frontend\public\css\style.css
type nul > frontend\public\js\app.js
type nul > frontend\views\partials\header.ejs
type nul > frontend\views\partials\footer.ejs
type nul > frontend\views\partials\navigation.ejs
type nul > frontend\views\pages\index.ejs
type nul > frontend\views\pages\login.ejs
type nul > frontend\views\pages\register.ejs
type nul > frontend\views\pages\dashboard.ejs
type nul > frontend\views\pages\pokemon-list.ejs
type nul > frontend\views\pages\pokemon-detail.ejs
type nul > frontend\views\pages\404.ejs
type nul > frontend\views\pages\500.ejs
type nul > frontend\views\layout.ejs
type nul > frontend\routes\index.routes.js
type nul > frontend\routes\auth.routes.js
type nul > frontend\routes\pokemon.routes.js
type nul > frontend\services\api.service.js
type nul > frontend\services\auth.service.js
type nul > frontend\middleware\auth.middleware.js
type nul > frontend\server.js
type nul > frontend\package.json
type nul > frontend\.env.example

echo [6/8] Creando configuración Supabase...
mkdir supabase-config
type nul > supabase-config\supabase-schema.sql
type nul > supabase-config\supabase-policies.sql

echo [7/8] Creando archivos del proyecto...
type nul > docker-compose.yml
type nul > docker-compose.dev.yml
type nul > .gitignore
type nul > README.md
type nul > .env.example