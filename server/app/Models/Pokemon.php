<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Pokemon extends Model {
    use HasFactory;

    protected $table = 'pokemons';
    // much more convenient to use pokemon # instead of database id
    protected $primaryKey = 'number';

    public function users() {
        return $this->belongsToMany(User::class, 'pokemon_user', 'pokemon_id', 'user_id');
    }
}
