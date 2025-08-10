<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
       Schema::create('reclamations', function (Blueprint $table) {
        $table->id();
        $table->string('nombreConsumidor');
        $table->string('domicilio');
        $table->string('documentoIdentidad');
        $table->string('telefono')->nullable();
        $table->string('correo')->nullable();
        $table->string('productoServicio');
        $table->decimal('montoReclamado', 10, 2)->nullable();
        $table->string('tipo'); // Reclamo_Asistido o Reclamo_Independiente
        $table->text('detalle');
        $table->text('pedido');
        $table->timestamps();
    });
    }

    public function down(): void
    {
        Schema::dropIfExists('reclamations');
    }
};
