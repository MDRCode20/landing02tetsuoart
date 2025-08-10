<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        // Validación
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        // Guardar en la base de datos
        Contact::create($validated);

        return response()->json([
            'message' => 'Contacto guardado correctamente'
        ], 201);
    }

      public function index()
    {
        return Contact::latest()->get();
    }
}
