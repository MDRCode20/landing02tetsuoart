<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        // Validar
        $validated = $request->validate([
            'nombre' => 'required|string',
            'correo' => 'required|email',
            'mensaje' => 'required|string',
        ]);

        // Guardar
        $contact = Contact::create($validated);

        return response()->json(['message' => 'Mensaje enviado correctamente'], 201);
    }
}
