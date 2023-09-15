<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pokemon;

class PokemonController extends Controller {

    public function list($region = '') {
        if ($region === '') {
            $pokemons = Pokemon::all()->sortBy('#');

            if ($pokemons->isEmpty()) {
                return response()->json("No Pokemon found at all, there seems to be an issue...", 404);
            }

            return $pokemons;
        } else if ($region !== '') {
            $pokemons = Pokemon::all()->where('region', ucfirst($region));

            if ($pokemons->isEmpty()) {
                return response()->json("This region doesn't exist... atleast in Pokemon Gen I-V", 404);
            }

            return $pokemons;
        }
    }

    public function find($id) {
        $pokemon = Pokemon::find($id);

        if (!$pokemon) {
            return response()->json('No Pokemon matches this id...', 404);
        }

        return $pokemon;
    }
}
