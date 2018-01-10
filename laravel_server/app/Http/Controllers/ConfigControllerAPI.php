<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\Config as ConfigResource;
use Illuminate\Support\Facades\DB;

use App\Config;

class ConfigControllerAPI extends Controller
{
    public function getConfig($id){
        return new ConfigResource(Config::find($id));
    }

    public function changePlatformEmail(Request $request, $id)
    {
        $request->validate([
                'platform_email' => 'required|email',
            ]);
        $config = Config::findOrFail($id);
        $config->update($request->all());
        return response()->json($config);
    }
}
