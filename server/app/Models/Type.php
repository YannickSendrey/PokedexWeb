<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Type extends Model {
    use HasFactory;

    public function pokemons() {
        return $this->belongsToMany(Pokemon::class, 'pokemon_user', 'user_id', 'pokemon_id');
    }
}
