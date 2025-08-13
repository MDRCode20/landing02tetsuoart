<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }

        // 🔹 Generar un token de acceso
        $token = $admin->createToken('admin_token')->plainTextToken;

        return response()->json([
            'message' => 'Login exitoso',
            'admin' => $admin,
            'token' => $token
        ]);
    }
}
