<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller {

    public function register(Request $request) {

        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $username = $request->input('username');
        $password = $request->input('password');

        $userWithSameUsername = User::where('username', $username)->first();
        if ($userWithSameUsername) {
            if (Hash::check($password, $userWithSameUsername->password)) {
                return response()->json('This User already exists...', 303);
            } else {
                return response()->json('A user with this Username already exists...', 303);
            }
        }


        // if these credentials arent already used
        $hashedPassword = Hash::make($password);
        $user = new User();
        $user->username = $username;
        $user->password = $hashedPassword;

        if ($user->save()) {
            return response()->json('Thank you for registering ! your account has been created', 201);
        } else {
            return response(null, 500);
        }
    }

    public function signIn(Request $request) {

        $username = $request->input('username');
        $password = $request->input('password');

        $user = User::where('username', $username)->first();

        if ($user && Hash::check($password, $user->password)) {
            $token = $user->createToken('PokedexWeb')->accessToken;
            return response()->json(['token' => $token, 'user' => $user], 200);
        } else {
            return response()->json('No user matches these credentials', 404);
        }
    }

    public function logout(Request $request) {
        Auth::logout();
        // end user session

        return response()->json('User has been disconnected', 200);
    }
}
