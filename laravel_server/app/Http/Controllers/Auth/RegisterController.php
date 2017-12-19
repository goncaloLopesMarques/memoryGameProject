<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    protected function create(StoreUserRequest $request)
    {
        User::create([
            'fullName' => $request['fullName'],
            'nickName' => $request['nickName'],
            'email'    => $request['email'],
            'password' => bcrypt($request['password']),
           
        ]);
        return response()-> json([
            'success'=> true,
            'message' => 'Registration success.',
        ]);
    }
}
