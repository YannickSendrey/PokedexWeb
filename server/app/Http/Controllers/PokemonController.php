<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Pokemon;
use Illuminate\Http\Request;

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

    public function addToFavorite(Request $request) {

        $request->validate([
            'pokemonId' => 'required',
            'userId' => 'required',
        ]);

        $user = User::find($request->input('userId'));
        if (!$user) {
            return response()->json('No User matches this id...', 404);
        }

        $pokemon = Pokemon::find($request->input('pokemonId'));
        if (!$pokemon) {
            return response()->json('No Pokemon matches this id...', 404);
        }

        // voir si je peux faire ça mais avec le # au lieu de l'id ? (ou pas ?)
        $user->pokemons()->attach($pokemon);
        return response()->json('This pokemon has been added to your favorites !', 201);
    }
}
