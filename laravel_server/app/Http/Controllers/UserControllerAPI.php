<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\DB;

use App\User;
use App\StoreUserRequest;
use Hash;

class UserControllerAPI extends Controller
{
    public function showUser($id){
        return response()->json(User::find($id));
    }

    public function getUsers(Request $request)
    {
        if ($request->has('page')) {
            return UserResource::collection(User::paginate(5));
        } else {
            return UserResource::collection(User::all());
        }
    }

    public function getUser($id)
    {
        return new UserResource(User::find($id));
    }

    public function store(Request $request)
    {
        $request->validate([
                'fullName' => 'required',
                'email' => 'required|email|unique:users,email',
                'nickname' =>'required|unique:users',
                'password' => 'min:3'
            ]);
        $user = new User();
        $user->fill($request->all());
        $user->save();
        return response()->json(new UserResource($user), 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
                'fullName' => 'required',
                'email' => 'required|email|unique:users,email',
                'nickName' =>'required|unique:users',
            ]);
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json($user);
    }

    public function changePassword(Request $request, $id)
    {
        $request->validate([
                'password' => 'required',
            ]);
        $user = User::findOrFail($id);
        $request['password'] = bcrypt($request['password']);
        $user->update($request->all());
        return response()->json($user);
    }

    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }
    public function emailAvailable(Request $request)
    {
        $totalEmail = 1;
        if ($request->has('email') && $request->has('id')) {
            $totalEmail = DB::table('users')->where('email', '=', $request->email)->where('id', '<>', $request->id)->count();
        } else if ($request->has('email')) {
            $totalEmail = DB::table('users')->where('email', '=', $request->email)->count();
        }
        return response()->json($totalEmail == 0);
    }
}
