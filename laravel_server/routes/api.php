<?php

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('user/{id}', function($id){
   return User::findOrFail($id);
});



Route::get('users', 'UserControllerAPI@getUsers');
//edit User
Route::get('/user/{id}','UserControllerAPI@showUser');
Route::put('/user/{id}', 'UserControllerAPI@update');

//
Route::get('users/emailavailable', 'UserControllerAPI@emailAvailable');
Route::get('users/{id}', 'UserControllerAPI@getUser');
Route::post('users', 'UserControllerAPI@store');
Route::post('/register','Auth\RegisterController@create');
//Route::put('users/{id}', 'UserControllerAPI@update');
Route::delete('users/{id}', 'UserControllerAPI@delete');

//Block and unblock users
Route::put('user/blockUser/{id}', 'UserControllerAPI@blockUser');
Route::put('user/activateUser/{id}', 'UserControllerAPI@activateUser');

Route::get('games', 'GameControllerAPI@index');
Route::get('games/lobby', 'GameControllerAPI@lobby');
Route::get('games/status/{status}', 'GameControllerAPI@gamesStatus');
Route::get('games/{id}', 'GameControllerAPI@getGame');
Route::post('games', 'GameControllerAPI@store');
Route::patch('games/{id}/join-start', 'GameControllerAPI@joinAndStart');
Route::patch('games/{id}/endgame/{winner}', 'GameControllerAPI@endgame');

//images
Route::get('images/{id}', 'ImageControllerAPI@getImage');
Route::post('images', 'ImageControllerAPI@store');
Route::put('/image/{id}', 'ImageControllerAPI@update');
Route::delete('images/{id}', 'ImageControllerAPI@delete');
Route::get('images', 'ImageControllerAPI@getImages');

//config
Route::get('/config/{id}', 'ConfigControllerAPI@getConfig');
Route::put('/config/{id}', 'ConfigControllerAPI@changePlatformEmail');

//admin
Route::put('/user/changePassword/{id}', 'UserControllerAPI@changePassword');
Route::put('/user/changeAdminEmail/{id}', 'UserControllerAPI@changeAdminEmail');