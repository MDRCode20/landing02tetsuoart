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
            'email'  => 'required|email|max:255',
            'mensaje' => 'required|string',
        ]);

        $contact = Contact::create([
            'nombre' => $validated['nombre'],
            'email'  => $validated['email'],
            'mensaje' => $validated['mensaje'],
            'estado' => 'Pendiente',
        ]);

        return response()->json([
            'message' => 'Contacto guardado correctamente',
            'data' => $contact
        ], 201);
    }
    // Listar todos los contactos
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

    // Actualizar estado
    public function updateEstadoContact(Request $request, $id)
    {
        $request->validate([
            'estado' => 'required|in:Pendiente,En proceso,Contactado'
        ]);

        $contacts = Contact::findOrFail($id);
        $contacts->estado = $request->estado;
        $contacts->save();

        return response()->json(['message' => 'Estado actualizado']);
    }
}
