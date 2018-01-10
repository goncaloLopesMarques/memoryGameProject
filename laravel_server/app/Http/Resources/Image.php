<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Image extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'face' => $this->face,
            'active' => $this->active,
            'path' => $this->path,
        ];
    }
}
