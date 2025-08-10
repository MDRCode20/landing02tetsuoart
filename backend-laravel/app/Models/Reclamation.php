<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reclamation extends Model
{
    protected $fillable = [
        'fecha',
        'tipo_documento',
        'numero_documento',
        'nombre_completo',
        'domicilio',
        'correo',
        'telefono',
        'bien_contratado',
        'descripcion',
        'monto_reclamado',
        'tipo_reclamo',
        'detalle',
        'pedido',
        'observaciones',
        'destinatario',
    ];
}
