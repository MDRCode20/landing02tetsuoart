<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    // Guardar un contacto
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'correo' => 'required|email|max:255',
            'mensaje' => 'required|string',
        ]);

        Contact::create([
            'name' => $validated['nombre'],
            'email' => $validated['correo'],
            'message' => $validated['mensaje'],
        ]);

        return response()->json(['message' => 'Contacto guardado correctamente'], 201);
    }

    // Listar todos los contactos (solo para administrador)
    public function index()
    {
        $contacts = Contact::orderBy('created_at', 'desc')->get();
        return response()->json($contacts);
    }

    // Eliminar un contacto
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return response()->json(['message' => 'Contacto eliminado correctamente']);
    }
}
