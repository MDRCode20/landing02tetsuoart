<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ReclamationController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);

Route::post('/contacto', [ContactController::class, 'store']);
Route::post('/reclamaciones', [ReclamationController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/reclamaciones', [ReclamationController::class, 'index']);
    Route::delete('/reclamaciones/{id}', [ReclamationController::class, 'destroy']);
});
