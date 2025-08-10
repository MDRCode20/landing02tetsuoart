<?php

return [

    'paths' => ['api/*', 'login', 'logout', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:5173'], // URL de tu frontend

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,
    // Si vas a usar cookies o tokens en las cabeceras, ponlo en true
    'supports_credentials' => true,

];
