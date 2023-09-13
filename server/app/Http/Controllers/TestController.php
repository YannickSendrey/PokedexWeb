<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pokemon;

class TestController extends Controller
{
    public function test($id) {
        $pokemon = Pokemon::find($id);

        return $pokemon;
    }
}
