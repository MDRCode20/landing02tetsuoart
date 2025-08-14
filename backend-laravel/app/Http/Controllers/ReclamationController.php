<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reclamation;

class ReclamationController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombreConsumidor'   => 'required|string|max:255',
            'domicilio'          => 'required|string|max:255',
            'documentoIdentidad' => 'required|string|max:20',
            'telefono'           => 'nullable|string|max:15',
            'correo'             => 'nullable|email|max:255',
            'productoServicio'   => 'required|string|max:255',
            'tipo'               => 'required|string',
            'detalle'            => 'required|string|min:9',
            'pedido'             => 'required|string|min:9',
            'estado'             => 'nullable|string|in:pendiente,revisado,resuelto', // validación del estado
        ]);

        // Si no se envía estado, usar "pendiente"
        if (!isset($data['estado'])) {
            $data['estado'] = 'pendiente';
        }

        $reclamation = Reclamation::create($data);

        return response()->json([
            'mensaje'     => 'Reclamo guardado correctamente',
            'reclamacion' => $reclamation
        ], 201);
    }

    public function index()
    {
        return response()->json(Reclamation::all());
    }

    public function destroy($id)
    {
        $reclamation = Reclamation::findOrFail($id);
        $reclamation->delete();

        return response()->json(['message' => 'Reclamación eliminada']);
    }

    public function updateEstado(Request $request, $id)
    {
        $request->validate([
            'estado' => 'required|string|in:pendiente,revisado,resuelto'
        ]);

        $reclamation = Reclamation::findOrFail($id);
        $reclamation->estado = $request->estado;
        $reclamation->save();

        return response()->json([
            'message' => 'Estado actualizado correctamente',
            'reclamacion' => $reclamation
        ]);
    }
}
