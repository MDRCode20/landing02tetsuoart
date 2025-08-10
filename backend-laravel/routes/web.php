<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login-test', function (Request $req) {
    return response()->json(['ok' => true, 'body' => $req->all()]);
});
