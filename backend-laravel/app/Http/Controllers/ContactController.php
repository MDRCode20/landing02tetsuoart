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
            'estado' => 'Pendiente', // valor por defecto
        ]);

        return response()->json(['message' => 'Contacto guardado correctamente'], 201);
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
    public function updateEstado(Request $request, $id)
    {
        $request->validate([
            'estado' => 'required|in:Pendiente,En proceso,Contactado'
        ]);

        $contact = Contact::findOrFail($id);
        $contact->estado = $request->estado;
        $contact->save();

        return response()->json(['message' => 'Estado actualizado']);
    }
}
