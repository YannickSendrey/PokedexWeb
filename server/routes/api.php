<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokemonController;
use App\Http\Controllers\UserController;
use App\Models\Pokemon;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/pokemons', [PokemonController::class, 'list']);
Route::get('/pokemons/region/{region}', [PokemonController::class, 'list']);
Route::get('/pokemons/{id}', [PokemonController::class, 'find'])->where('id', '[0-9]+');

Route::post('/pokemons/add', [PokemonController::class, 'addToFavorite']);
Route::delete('/pokemons/remove', [PokemonController::class, 'deleteFromFavorite']);

Route::post('/users/add', [UserController::class, 'create']);
Route::post('/users/sign-in', [UserController::class, 'checkIfUserExists']);
Route::post('/logout', [UserController::class, 'logout']);
