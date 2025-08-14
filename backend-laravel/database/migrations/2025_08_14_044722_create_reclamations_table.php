<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('reclamations', function (Blueprint $table) {
            $table->id();
            $table->string('nombreConsumidor', 255);
            $table->string('domicilio', 255);
            $table->string('documentoIdentidad', 20);
            $table->string('telefono', 15)->nullable();
            $table->string('correo', 255)->nullable();
            $table->string('productoServicio', 255);
            $table->string('tipo');
            $table->text('detalle');
            $table->text('pedido');
            $table->string('estado', 50)->default('Pendiente'); // Nuevo campo estado
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reclamations');
    }
};
