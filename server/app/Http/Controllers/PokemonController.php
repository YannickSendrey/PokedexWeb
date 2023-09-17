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

    public function find($number) {
        $pokemon = Pokemon::find($number);

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

    public function deleteFromFavorite(Request $request) {
        // get values from url params and validate them
        $userId = $request->query('userId');
        $pokemonId = $request->query('pokemonId');

        $request->validate([
            'userId' => 'required',
            'pokemonId' => 'required',
        ]);

        $user = User::find($request->input('userId'));
        if (!$user) {
            return response()->json('No User matches this id...', 404);
        }

        $pokemon = Pokemon::find($request->input('pokemonId'));
        if (!$pokemon) {
            return response()->json('No Pokemon matches this id...', 404);
        }

        // check if there is a row with userId matched with pokemonId
        $rowExist = User::find($userId)->pokemons()->wherePivot('pokemon_id', $pokemonId)->exists();

        if (!$rowExist) {
            return response()->json("This pokemon i'snt in your favorites yet...", 404);
        }



        $user->pokemons()->detach($pokemon);

        return response()->json('This pokemon has been removed from your favorites !', 200);
    }
}
