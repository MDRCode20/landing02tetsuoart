<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Hash;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = ['email', 'password'];

    protected $hidden = ['password', 'remember_token'];

    /**
     * Mutador para hashear automáticamente la contraseña al asignarla.
     */
    public function setPasswordAttribute($value)
    {
        // Solo hashea si no está hasheada ya
        $this->attributes['password'] = Hash::needsRehash($value) ? Hash::make($value) : $value;
    }
}
