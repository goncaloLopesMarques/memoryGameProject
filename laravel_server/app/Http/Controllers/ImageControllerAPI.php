<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\Image as ImageResource;
use Illuminate\Support\Facades\DB;

use App\Image;

class ImageControllerAPI extends Controller
{
    public function getImage($id){
        return new ImageResource(Image::find($id));
    }

    public function getImages(Request $request)
    {
        if ($request->has('page')) {
            return ImageResource::collection(Image::paginate(5));
        } else {
            return ImageResource::collection(Image::all());
        }
    }

    public function store(Request $request)
    {
        $request->validate([
                'face' => 'required',
                'path' =>'required|unique:images',
            ]);
        
        $image = new Image();
        $image->fill(/*$request->all()*/$request->except('file'));
        $image->save();
        return response()->json(new ImageResource($image), 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
        		'face' => 'required',
                'path' =>'required|unique:images',
            ]);
        $image = Image::findOrFail($id);
        $image->update($request->all());
        return response()->json($image);
    }

    public function delete($id)
    {
        $image = Image::findOrFail($id);
        $image->delete();
        return response()->json(null, 204);
    }
}
