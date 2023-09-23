<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Pokemon;
use Illuminate\Http\Request;

class PokemonController extends Controller {

    public function list($region = '') {
        if ($region === '') {
            $pokemons = Pokemon::all()->sortBy('number')->values();

            if ($pokemons->isEmpty()) {
                return response()->json("No Pokemon found at all, there seems to be an issue...", 404);
            }

            return $pokemons;
        } else if ($region !== '') {
            $pokemons = Pokemon::all()->where('region', ucfirst($region))->values();

            if ($pokemons->isEmpty()) {
                return response()->json("This region doesn't exist... atleast in Pokemon Gen I-V", 404);
            }

            return $pokemons;
        }
    }

    public function find($number) {
        $pokemon = Pokemon::find($number);

        if (!$pokemon) {
            return response()->json('No Pokemon matches this id...', 404);
        }

        // fetch types via pivot table (and relations in Models) and attach it to our json response
        $types = $pokemon->types;
        $pokemon->types = $types;

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

        $user->pokemons()->attach($pokemon);
        return response()->json('This pokemon has been added to your favorites !', 201);
    }

    public function deleteFromFavorite(Request $request) {
        // get values from url params and validate them
        $userId = $request->route('userId');
        $pokemonId = $request->route('pokemonId');

        $user = User::find($userId);
        if (!$user) {
            return response()->json('No User matches this id...', 404);
        }

        $pokemon = Pokemon::find($pokemonId);
        if (!$pokemon) {
            return response()->json('No Pokemon matches this id...', 404);
        }

        // check if there is a row with userId matched with pokemonId
        $rowExist = $user->pokemons()->wherePivot('pokemon_id', $pokemonId)->exists();

        if (!$rowExist) {
            return response()->json("This pokemon i'snt in your favorites yet...", 404);
        }



        $user->pokemons()->detach($pokemon);

        return response()->json('This pokemon has been removed from your favorites !', 200);
    }
}
