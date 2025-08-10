<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Reclamation;

class ReclamationController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombreConsumidor' => 'required|string|max:255',
            'domicilio' => 'required|string|max:255',
            'documentoIdentidad' => 'required|string|max:20',
            'telefono' => 'nullable|string|max:15',
            'correo' => 'nullable|email|max:255',
            'productoServicio' => 'required|string|max:255',
            'montoReclamado' => 'nullable|numeric',
            'tipo' => 'required|string',
            'detalle' => 'required|string|min:9',
            'pedido' => 'required|string|min:9',
        ]);

        $reclamation = Reclamation::create($data);

        return response()->json([
            'mensaje' => 'Reclamo guardado correctamente',
            'reclamacion' => $reclamation
        ], 201);
    }
}
