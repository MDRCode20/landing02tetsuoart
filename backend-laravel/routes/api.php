<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ReclamationController;
use App\Http\Controllers\AuthController;

Route::patch('/contactos/{id}/estado', [ContactController::class, 'updateEstadoContact']);


// Auth
Route::post('/login', [AuthController::class, 'login']);

// Contactos
Route::post('/contacto', [ContactController::class, 'store']);
Route::get('/contactos', [ContactController::class, 'index'])->middleware('auth:sanctum');


// Reclamaciones públicas (formulario)
Route::post('/reclamaciones', [ReclamationController::class, 'store']);

Route::patch('/reclamaciones/{id}/estado', [ReclamationController::class, 'updateEstadoReclamo']);


// Rutas protegidas para administración
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/reclamaciones', [ReclamationController::class, 'index']);
    Route::delete('/reclamaciones/{id}', [ReclamationController::class, 'destroy']);
});
