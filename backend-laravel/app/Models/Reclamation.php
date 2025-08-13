<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reclamation extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombreConsumidor',
        'domicilio',
        'documentoIdentidad',
        'telefono',
        'correo',
        'productoServicio',
        'tipo',
        'detalle',
        'pedido',
    ];
}
